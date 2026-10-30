/**
 * NEETBuddy Reactive State Manager
 * Centralized, observable state store for seamless single-page app interactions.
 */
(function(window) {
  'use strict';

  class Store {
    constructor() {
      this.state = {
        theme: localStorage.getItem('nb_theme_v2') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'),
        user: null,
        currentView: 'landing',
        history: ['landing'],
        
        // Navigation & Curriculum state
        activeSubject: 'ph',
        activeChapter: null,
        activeTopic: null,
        classFilter: 'all', // 'all', '11', '12'
        
        // Active Mock Test Simulator State
        activeTest: null,
        /* activeTest structure:
        {
          id: string,
          title: string,
          questions: Array,
          answers: { [qId]: optionIndex },
          status: { [qId]: 'not_visited' | 'not_answered' | 'answered' | 'marked' | 'answered_marked' },
          currentIndex: 0,
          secondsRemaining: 12000,
          totalSeconds: 12000,
          timerInterval: null,
          startedAt: timestamp,
          activeSection: 'Physics Sec A'
        }
        */

        // Practice Session State
        activePractice: null,

        // Test Result State
        lastScorecard: null,

        // Mistake Notebook state
        mistakesFilter: 'all', // 'all', 'conceptual', 'silly', 'calculation', 'reading'
        mistakesSubject: 'all',

        // Flashcards state
        flashcardIndex: 0,
        flashcardFlipped: false,

        // AI Doubt state
        doubtSubject: 'all',
        doubtHistory: [],

        // Daily Planner Checklist (keyed by date string)
        dailyTasks: this.loadDailyTasks()
      };

      this.listeners = new Map();
      this.applyTheme(this.state.theme);
    }

    applyTheme(theme) {
      document.documentElement.setAttribute('data-theme', theme);
      try {
        localStorage.setItem('nb_theme_v2', theme);
      } catch (e) {}
    }

    toggleTheme() {
      const next = this.state.theme === 'dark' ? 'light' : 'dark';
      this.set('theme', next);
      this.applyTheme(next);
    }

    get(key) {
      return this.state[key];
    }

    set(key, value) {
      const old = this.state[key];
      this.state[key] = value;
      this.emit(key, value, old);
      this.emit('*', this.state);
    }

    update(partial) {
      Object.entries(partial).forEach(([k, v]) => {
        this.set(k, v);
      });
    }

    subscribe(key, callback) {
      if (!this.listeners.has(key)) {
        this.listeners.set(key, new Set());
      }
      this.listeners.get(key).add(callback);
      return () => {
        this.listeners.get(key).delete(callback);
      };
    }

    emit(key, value, old) {
      if (this.listeners.has(key)) {
        this.listeners.get(key).forEach(fn => fn(value, old));
      }
    }

    navigate(view, payload = {}) {
      const prev = this.state.currentView;
      this.state.history.push(view);
      this.state.currentView = view;
      if (Object.keys(payload).length > 0) {
        this.update(payload);
      }
      this.emit('viewChange', view, prev);
      this.emit('*', this.state);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    goBack() {
      if (this.state.history.length > 1) {
        this.state.history.pop();
        const prev = this.state.history[this.state.history.length - 1];
        this.state.currentView = prev;
        this.emit('viewChange', prev);
        this.emit('*', this.state);
      } else {
        this.navigate(this.state.user ? 'home' : 'landing');
      }
    }

    loadDailyTasks() {
      try {
        const saved = localStorage.getItem('nb_daily_tasks_v2');
        if (saved) return JSON.parse(saved);
      } catch (e) {}
      return [
        { id: 1, title: 'Solve 25 Physics MCQs (Laws of Motion)', subject: 'ph', completed: true, time: '40 min' },
        { id: 2, title: 'Revise Chemistry Formula Sheet (Redox & Equilibrium)', subject: 'ch', completed: false, time: '25 min' },
        { id: 3, title: 'NCERT Biology Line-by-Line (Plant Kingdom)', subject: 'bi', completed: true, time: '35 min' },
        { id: 4, title: 'Review 5 Mistakes in Improvement Book', subject: 'all', completed: false, time: '15 min' }
      ];
    }

    toggleDailyTask(id) {
      const tasks = this.state.dailyTasks.map(t => {
        if (t.id === id) return { ...t, completed: !t.completed };
        return t;
      });
      this.set('dailyTasks', tasks);
      try {
        localStorage.setItem('nb_daily_tasks_v2', JSON.stringify(tasks));
      } catch (e) {}
    }
  }

  window.State = new Store();
})(window);
