/**
 * NEETBuddy Enterprise Canonical Database Module
 * 
 * Provides unified repository management for subjects, chapters, topics, questions,
 * student attempts, bookmarks, Improvement Book mistakes, and PDF import audit logs.
 */
const fs = require('fs');
const path = require('path');
const supabase = require('./supabase');

class Database {
  constructor() {
    this.dbPath = path.join(__dirname, 'database.json');
    this.seedPath = path.join(__dirname, 'public_dataset.json');

    this.data = {
      SUB: [],
      CH: { ph: [], ch: [], bi: [] },
      TP: {},
      questions: [],
      importJobs: [],
      attempts: [],
      bookmarks: {},
      mistakes: {},
      users: {}
    };

    this.init();
  }

  init() {
    // 1. Check if database.json exists
    if (fs.existsSync(this.dbPath)) {
      try {
        const raw = fs.readFileSync(this.dbPath, 'utf8');
        this.data = JSON.parse(raw);
        console.log(`[Database] Loaded persistent database with ${this.data.questions.length} questions and ${this.data.importJobs.length} import jobs.`);
        return;
      } catch (err) {
        console.error('[Database Error] Corrupt database.json, re-seeding from public_dataset.json:', err.message);
      }
    }

    // 2. Seed from public_dataset.json
    try {
      const seedRaw = fs.readFileSync(this.seedPath, 'utf8');
      const seed = JSON.parse(seedRaw);
      this.data.SUB = seed.SUB || [];
      this.data.CH = seed.CH || { ph: [], ch: [], bi: [] };
      this.data.TP = seed.TP || {};

      // Canonical question pool combining handcrafted + extracted PDF questions
      const combined = [
        ...(seed.QB || []).map((q, idx) => ({ ...q, id: idx, source: 'curated', verifiedStatus: 'verified' })),
        ...(seed.PDFQB || []).map((q, idx) => ({ ...q, id: (seed.QB || []).length + idx, source: 'neet-archive', verifiedStatus: 'verified' }))
      ];

      this.data.questions = combined;
      this.persist();
      console.log(`[Database] Seeded canonical database with ${this.data.questions.length} questions.`);
    } catch (err) {
      console.error('[Database Error] Failed to seed dataset:', err.message);
    }
  }

  persist() {
    try {
      fs.writeFileSync(this.dbPath, JSON.stringify(this.data, null, 2), 'utf8');
    } catch (err) {
      console.error('[Database Error] Failed persisting database.json:', err.message);
    }
  }

  getSubjects() {
    return this.data.SUB;
  }

  getChapters(subjectKey) {
    return subjectKey ? this.data.CH[subjectKey] || [] : this.data.CH;
  }

  getTopics(chapterName) {
    return chapterName ? this.data.TP[chapterName] || [] : this.data.TP;
  }

  getQuestions(filters = {}) {
    let list = this.data.questions;
    if (filters.subject) {
      list = list.filter(q => q.s === filters.subject);
    }
    if (filters.chapter) {
      list = list.filter(q => q.c === filters.chapter);
    }
    if (filters.topic) {
      list = list.filter(q => q.t === filters.topic);
    }
    if (filters.search) {
      const qLower = filters.search.toLowerCase();
      list = list.filter(q => (q.q && q.q.toLowerCase().includes(qLower)) || (q.c && q.c.toLowerCase().includes(qLower)));
    }
    return list;
  }

  addQuestions(newQuestions) {
    const startId = this.data.questions.length;
    const tagged = newQuestions.map((q, idx) => ({
      ...q,
      id: startId + idx,
      created_at: new Date().toISOString()
    }));
    this.data.questions.push(...tagged);
    this.persist();
    tagged.forEach(q => supabase.syncQuestionToCloud(q));
    return tagged;
  }

  saveImportJob(job) {
    const existingIdx = this.data.importJobs.findIndex(j => j.id === job.id);
    if (existingIdx >= 0) {
      this.data.importJobs[existingIdx] = job;
    } else {
      this.data.importJobs.unshift(job);
    }
    this.persist();
  }

  getImportJobs() {
    return this.data.importJobs;
  }

  // Student Attempt Tracking
  recordAttempt(attempt) {
    const entry = {
      id: 'att_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
      timestamp: new Date().toISOString(),
      ...attempt
    };
    this.data.attempts.push(entry);
    supabase.syncAttemptToCloud(entry);

    // If incorrect, automatically track into Improvement Book
    if (attempt.isCorrect === false && attempt.questionId !== undefined) {
      this.logMistake(attempt.userId || 'demo_user', attempt.questionId, attempt.reason || 'Concept gap');
    }

    this.persist();
    return entry;
  }

  getAttempts(userId) {
    return this.data.attempts.filter(a => !userId || a.userId === userId);
  }

  // Bookmarks
  toggleBookmark(userId, questionId) {
    if (!this.data.bookmarks[userId]) {
      this.data.bookmarks[userId] = [];
    }
    const idx = this.data.bookmarks[userId].indexOf(questionId);
    let bookmarked = false;
    if (idx >= 0) {
      this.data.bookmarks[userId].splice(idx, 1);
      bookmarked = false;
    } else {
      this.data.bookmarks[userId].push(questionId);
      bookmarked = true;
    }
    this.persist();
    return { bookmarked, questionId };
  }

  getBookmarks(userId) {
    const qIds = this.data.bookmarks[userId] || [];
    return this.data.questions.filter(q => qIds.includes(q.id));
  }

  // Trackprep-style Improvement Book (Mistake Notebook)
  logMistake(userId, questionId, reason = 'Concept gap') {
    if (!this.data.mistakes[userId]) {
      this.data.mistakes[userId] = {};
    }
    const existing = this.data.mistakes[userId][questionId] || {
      questionId,
      reason,
      status: 'pending',
      count: 0,
      firstLogged: new Date().toISOString()
    };
    existing.count++;
    existing.lastAttempted = new Date().toISOString();
    existing.reason = reason;
    this.data.mistakes[userId][questionId] = existing;
    this.persist();
    return existing;
  }

  getMistakes(userId) {
    const userMistakes = this.data.mistakes[userId] || {};
    return Object.values(userMistakes).map(m => {
      const q = this.data.questions.find(item => item.id === m.questionId);
      return { ...m, question: q };
    }).filter(m => !!m.question);
  }

  updateMistakeStatus(userId, questionId, status, reason) {
    if (this.data.mistakes[userId] && this.data.mistakes[userId][questionId]) {
      if (status) this.data.mistakes[userId][questionId].status = status;
      if (reason) this.data.mistakes[userId][questionId].reason = reason;
      this.persist();
      return this.data.mistakes[userId][questionId];
    }
    return null;
  }
}

module.exports = new Database();
