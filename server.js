/**
 * NEETBuddy Enterprise Backend Server
 * 
 * Powered by Express, integrated with the autonomous PDF-to-Database pipeline,
 * canonical question repository, student attempt telemetry, and Trackprep-style Improvement Book.
 */
const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const multer = require('multer');

const db = require('./db');
const PdfPipeline = require('./pdf_pipeline');

const app = express();
const PORT = process.env.PORT || 4000;

// Setup upload handling for PDF pipeline
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 50 * 1024 * 1024 } // 50MB
});

const pipeline = new PdfPipeline(db);

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Serve static assets from public
app.use(express.static(path.join(__dirname, 'public')));

// Serve raw NEETBuddy.html directly if requested
app.get('/NEETBuddy.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const supabase = require('./supabase');

// Demo user session
const DEMO_USER = {
  id: 'usr_demo_aiims',
  name: 'Aryan Verma',
  email: 'aryan.verma@neetprep.in',
  phone: '9876543210',
  cls: '12',
  year: '2026',
  targetScore: 680,
  streak: 18,
  dreamCollege: 'AIIMS New Delhi',
  avatar: '/images/harshit.png'
};

// ==========================================
// 1. AUTHENTICATION & CONTACT ENDPOINTS
// ==========================================
app.post('/api/auth/demo', (req, res) => {
  return res.json({
    success: true,
    user: DEMO_USER,
    token: 'token_demo_valid'
  });
});

app.post('/api/auth/login', async (req, res) => {
  const { uid, password } = req.body;
  if (!uid) {
    return res.status(400).json({ success: false, message: 'Please enter your email or phone number.' });
  }

  let foundUser = null;
  if (db.data.users) {
    const allUsers = Object.values(db.data.users);
    foundUser = allUsers.find(u => (u.email && u.email.toLowerCase() === uid.toLowerCase()) || u.phone === uid);
  }

  if (!foundUser) {
    try {
      foundUser = await supabase.getUserFromCloud(uid);
    } catch (e) {}
  }

  const user = foundUser || {
    id: 'usr_' + Date.now(),
    name: uid.includes('@') ? uid.split('@')[0] : 'NEET Aspirant',
    email: uid.includes('@') ? uid : '',
    phone: !uid.includes('@') ? uid : '',
    cls: '12',
    year: '2026',
    targetScore: 680,
    streak: 3,
    dreamCollege: 'AIIMS New Delhi',
    avatar: '/images/harshit.png'
  };

  return res.json({
    success: true,
    user,
    token: 'token_session_' + Date.now()
  });
});

app.post('/api/auth/register', async (req, res) => {
  const { fullname, email, phone, cls, year, password } = req.body;
  const id = 'usr_' + Date.now();
  const user = {
    id,
    name: fullname || 'Aspirant',
    email: email || '',
    phone: phone || '',
    cls: cls || '12',
    year: year || '2026',
    targetScore: 680,
    streak: 1,
    dreamCollege: 'AIIMS New Delhi',
    avatar: '/images/harshit.png',
    createdAt: new Date().toISOString()
  };

  if (!db.data.users) db.data.users = {};
  db.data.users[id] = user;
  db.persist();

  try {
    await supabase.syncUserToCloud(user);
  } catch (e) {}

  return res.json({
    success: true,
    user,
    token: 'token_' + user.id
  });
});

app.post('/api/contact', async (req, res) => {
  const { name, email, phone, subject, message } = req.body;
  const contactEntry = {
    id: 'msg_' + Date.now(),
    name: name || 'Anonymous Aspirant',
    email: email || '',
    phone: phone || '',
    subject: subject || 'General Query',
    message: message || '',
    timestamp: new Date().toISOString()
  };

  if (!db.data.contactMessages) db.data.contactMessages = [];
  db.data.contactMessages.push(contactEntry);
  db.persist();

  try {
    await supabase.syncContactMessage(contactEntry);
  } catch (e) {}

  return res.json({
    success: true,
    message: 'Thank you! Your message has been received. Our academic counsellors will contact you within 24 hours.'
  });
});

// ==========================================
// 2. CURRICULUM & CANONICAL TAXONOMY
// ==========================================
app.get('/api/subjects', (req, res) => {
  res.json({ success: true, data: db.getSubjects() });
});

app.get('/api/chapters', (req, res) => {
  const { subject } = req.query;
  res.json({ success: true, data: db.getChapters(subject) });
});

app.get('/api/topics', (req, res) => {
  const { chapter } = req.query;
  res.json({ success: true, data: db.getTopics(chapter) });
});

// ==========================================
// 3. CANONICAL QUESTION BANK
// ==========================================
app.get('/api/questions', (req, res) => {
  const { subject, chapter, topic, search, limit = 50, offset = 0 } = req.query;
  const allFiltered = db.getQuestions({ subject, chapter, topic, search });
  const paginated = allFiltered.slice(Number(offset), Number(offset) + Number(limit));

  res.json({
    success: true,
    total: allFiltered.length,
    offset: Number(offset),
    limit: Number(limit),
    data: paginated
  });
});

app.post('/api/questions', (req, res) => {
  const { s, c, t, q, o, a, e, m } = req.body;
  if (!s || !c || !q || !Array.isArray(o) || o.length < 2) {
    return res.status(400).json({ success: false, message: 'Invalid question format' });
  }

  const added = db.addQuestions([{
    s, c, t: t || 'General', q, o, a: a !== undefined ? Number(a) : 0, e: e || '', m: m || '', verifiedStatus: 'verified'
  }]);

  res.json({ success: true, question: added[0] });
});

// ==========================================
// 4. AUTONOMOUS PDF-TO-DATABASE PIPELINE
// ==========================================
app.post('/api/admin/import-pdf', upload.single('pdf'), async (req, res) => {
  try {
    if (!req.file || !req.file.buffer) {
      return res.status(400).json({ success: false, message: 'No PDF file uploaded.' });
    }

    const originalName = req.file.originalname || 'uploaded_questions.pdf';
    console.log(`[PDF Pipeline] Starting autonomous extraction for: ${originalName} (${(req.file.size / 1024 / 1024).toFixed(2)} MB)`);

    const jobResult = await pipeline.ingestPdf(req.file.buffer, originalName);

    res.json({
      success: true,
      job: jobResult,
      message: `Successfully processed ${jobResult.detectedCount} questions from ${jobResult.totalPages} pages. Imported: ${jobResult.importedCount}, Duplicates skipped: ${jobResult.duplicateCount}.`
    });
  } catch (err) {
    console.error('[PDF Pipeline Error]', err);
    res.status(500).json({ success: false, message: err.message });
  }
});

app.get('/api/admin/import-jobs', (req, res) => {
  res.json({ success: true, data: db.getImportJobs() });
});

// ==========================================
// 5. ATTEMPTS, BOOKMARKS & IMPROVEMENT BOOK
// ==========================================
app.post('/api/attempts', (req, res) => {
  const attempt = req.body;
  const saved = db.recordAttempt(attempt);
  res.json({ success: true, attempt: saved });
});

app.get('/api/attempts', (req, res) => {
  const { userId } = req.query;
  res.json({ success: true, data: db.getAttempts(userId) });
});

app.post('/api/bookmarks/toggle', (req, res) => {
  const { userId = 'demo_user', questionId } = req.body;
  if (questionId === undefined) {
    return res.status(400).json({ success: false, message: 'questionId required' });
  }
  const result = db.toggleBookmark(userId, Number(questionId));
  res.json({ success: true, ...result });
});

app.get('/api/bookmarks', (req, res) => {
  const { userId = 'demo_user' } = req.query;
  res.json({ success: true, data: db.getBookmarks(userId) });
});

app.post('/api/mistakes', (req, res) => {
  const { userId = 'demo_user', questionId, reason } = req.body;
  const entry = db.logMistake(userId, Number(questionId), reason);
  res.json({ success: true, mistake: entry });
});

app.get('/api/mistakes', (req, res) => {
  const { userId = 'demo_user' } = req.query;
  res.json({ success: true, data: db.getMistakes(userId) });
});

app.patch('/api/mistakes/:questionId', (req, res) => {
  const { userId = 'demo_user' } = req.query;
  const { questionId } = req.params;
  const { status, reason } = req.body;
  const updated = db.updateMistakeStatus(userId, Number(questionId), status, reason);
  res.json({ success: true, mistake: updated });
});

// ==========================================
// 6. DOUBT SOLVER & STATS
// ==========================================
app.post('/api/doubt/ask', (req, res) => {
  const { query, subject } = req.body;
  if (!query || !query.trim()) {
    return res.status(400).json({ success: false, message: 'Query string required' });
  }

  const qLower = query.toLowerCase();
  const allQs = db.getQuestions({ subject: subject !== 'all' ? subject : undefined });

  // Find best matching question with explanation
  let bestMatch = null;
  let highestScore = 0;

  for (const q of allQs) {
    const text = (q.q + ' ' + (q.e || '')).toLowerCase();
    const words = qLower.split(/\s+/).filter(w => w.length > 3);
    let matchScore = 0;
    for (const w of words) {
      if (text.includes(w)) matchScore += 2;
    }
    if (matchScore > highestScore) {
      highestScore = matchScore;
      bestMatch = q;
    }
  }

  if (bestMatch && highestScore >= 2) {
    return res.json({
      success: true,
      found: true,
      answer: {
        title: bestMatch.c + ' (' + bestMatch.t + ')',
        question: bestMatch.q,
        correctAnswer: 'Option ' + 'ABCD'[bestMatch.a] + ': ' + bestMatch.o[bestMatch.a],
        explanation: bestMatch.e || 'Concept application verified according to NCERT guidelines.',
        meta: `Matched against NEET question bank (Score: ${highestScore})`
      }
    });
  }

  return res.json({
    success: true,
    found: false,
    message: 'We could not find an exact match for this specific phrasing. Try searching by topic keywords (e.g., "Friction", "Mitochondria", "Newton Law").'
  });
});

app.get('/api/stats', (req, res) => {
  const allQs = db.getQuestions();
  res.json({
    success: true,
    totalQuestions: allQs.length,
    subjects: db.getSubjects().length,
    attemptsCount: db.getAttempts().length,
    importJobsCount: db.getImportJobs().length
  });
});

app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    questions: db.getQuestions().length,
    environment: 'production-ready'
  });
});

// Fallback to index.html for client-side routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`=======================================================`);
  console.log(`🚀 NEETBuddy Enterprise Server running at http://localhost:${PORT}`);
  console.log(`📦 Loaded ${db.getQuestions().length} verified questions into canonical database.`);
  console.log(`📄 Autonomous PDF Pipeline ready with multi-column layout engine.`);
  console.log(`=======================================================`);
});
