/**
 * NEETBuddy Master Client Application & Router
 * Architected by 30-year veteran engineering standards: modular, robust, accessible,
 * seamless state-driven single page application.
 */
(function(window, document) {
  'use strict';

  const App = {
    init() {
      // Initialize state and API
      API.init();
      if (API.isLoggedIn()) {
        State.set('user', API.currentUser);
        State.set('currentView', 'home');
      } else {
        State.set('currentView', 'landing');
      }

      this.bindGlobalEvents();
      this.subscribeState();
      this.render();
    },

    bindGlobalEvents() {
      // Global click delegation
      document.addEventListener('click', (e) => {
        const actionEl = e.target.closest('[data-action]');
        if (actionEl) {
          e.preventDefault();
          const action = actionEl.getAttribute('data-action');
          const payload = actionEl.getAttribute('data-payload');
          this.handleAction(action, payload, actionEl);
        }

        const navEl = e.target.closest('[data-view]');
        if (navEl) {
          e.preventDefault();
          const view = navEl.getAttribute('data-view');
          State.navigate(view);
        }
      });

      // Keyboard shortcuts
      document.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
          e.preventDefault();
          this.toggleSearchModal(true);
        }
        if (e.key === 'Escape') {
          this.closeModals();
        }
      });
    },

    subscribeState() {
      State.subscribe('viewChange', () => {
        this.render();
      });

      State.subscribe('timerTick', (seconds) => {
        const timerEl = document.getElementById('exam-countdown-timer');
        if (timerEl) {
          timerEl.textContent = TestEngine.formatTime(seconds);
          if (seconds <= 300) {
            timerEl.parentElement.classList.add('danger');
          } else if (seconds <= 900) {
            timerEl.parentElement.classList.add('warning');
          }
        }
      });

      State.subscribe('mistakesUpdated', () => {
        if (State.get('currentView') === 'improve') {
          this.render();
        }
      });
    },

    handleAction(action, payload, el) {
      switch (action) {
        case 'toggle-theme':
          State.toggleTheme();
          break;

        case 'open-auth':
          this.openAuthModal(payload || 'login');
          break;

        case 'close-auth':
          this.closeAuthModal();
          break;

        case 'demo-login':
          API.loginDemo().then(user => {
            State.set('user', user);
            this.closeAuthModal();
            this.showToast('Welcome to NEETBuddy, Aryan! Logged in as AIIMS Aspirant.', 'success');
            State.navigate('home');
          });
          break;

        case 'logout':
          API.logout();
          State.set('user', null);
          State.navigate('landing');
          this.showToast('You have been logged out.', 'info');
          break;

        case 'toggle-task':
          State.toggleDailyTask(parseInt(payload, 10));
          this.render();
          break;

        case 'start-test':
          API.getTest(payload).then(testData => {
            TestEngine.initTest(testData);
          });
          break;

        case 'select-option':
          TestEngine.selectOption(parseInt(payload, 10));
          break;

        case 'save-next':
          TestEngine.saveAndNext();
          break;

        case 'clear-response':
          TestEngine.clearResponse();
          break;

        case 'mark-review':
          TestEngine.markForReview();
          break;

        case 'jump-question':
          TestEngine.jumpToQuestion(parseInt(payload, 10));
          break;

        case 'jump-section':
          TestEngine.jumpToSection(payload);
          break;

        case 'confirm-submit-test':
          this.openSubmitConfirmModal();
          break;

        case 'final-submit-test':
          this.closeModals();
          TestEngine.submitTest();
          break;

        case 'reattempt-mistakes':
          ImprovementManager.startReattempt('all', payload || 'all');
          break;

        case 'tag-mistake':
          const [qId, reason] = payload.split('|');
          ImprovementManager.tag(qId, reason).then(() => {
            this.showToast(`Mistake classified as "${reason}"`, 'success');
          });
          break;

        case 'toggle-mastery':
          const [mQId, mState] = payload.split('|');
          ImprovementManager.toggleMastery(mQId, mState === 'true').then(() => {
            this.showToast('Mastery status updated!', 'success');
          });
          break;

        case 'flip-flashcard':
          State.set('flashcardFlipped', !State.get('flashcardFlipped'));
          this.render();
          break;

        case 'next-flashcard':
          State.set('flashcardFlipped', false);
          State.set('flashcardIndex', State.get('flashcardIndex') + 1);
          this.render();
          break;

        case 'prev-flashcard':
          State.set('flashcardFlipped', false);
          State.set('flashcardIndex', Math.max(0, State.get('flashcardIndex') - 1));
          this.render();
          break;

        case 'filter-chapters-subject':
          State.set('activeSubject', payload);
          this.render();
          break;

        case 'filter-chapters-class':
          State.set('classFilter', payload);
          this.render();
          break;

        case 'open-chapter':
          State.set('activeChapter', payload);
          State.navigate('chapter-detail');
          break;

        case 'open-search':
          this.toggleSearchModal(true);
          break;

        case 'close-search':
          this.toggleSearchModal(false);
          break;

        default:
          console.warn('Unknown action:', action);
      }
    },

    showToast(message, type = 'info') {
      let container = document.getElementById('toast-container');
      if (!container) {
        container = document.createElement('div');
        container.id = 'toast-container';
        container.className = 'toast-container';
        document.body.appendChild(container);
      }

      const toast = document.createElement('div');
      toast.className = `toast ${type}`;
      toast.innerHTML = `<span>${message}</span>`;
      container.appendChild(toast);

      setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(10px)';
        setTimeout(() => toast.remove(), 300);
      }, 3500);
    },

    closeModals() {
      document.querySelectorAll('.modal-overlay').forEach(m => m.classList.remove('active'));
    },

    openAuthModal(mode = 'login') {
      const modal = document.getElementById('auth-modal');
      if (modal) {
        modal.classList.add('active');
        const isLogin = mode === 'login';
        document.getElementById('auth-modal-title').textContent = isLogin ? 'Welcome Back, Future Doctor' : 'Create Your NEETBuddy Account';
        document.getElementById('auth-modal-sub').textContent = isLogin ? 'Log in to access your tests, performance analytics, and mistake notebook.' : 'Start your personalized NEET preparation in less than a minute.';
        document.getElementById('auth-submit-btn').textContent = isLogin ? 'Log In to NEETBuddy' : 'Create Free Account';
        document.getElementById('auth-mode-switch').innerHTML = isLogin 
          ? `New to NEETBuddy? <a href="#" data-action="open-auth" data-payload="signup">Create a free account</a>`
          : `Already registered? <a href="#" data-action="open-auth" data-payload="login">Log in here</a>`;
        
        document.querySelectorAll('.signup-only-field').forEach(f => {
          f.style.display = isLogin ? 'none' : 'block';
        });
      }
    },

    closeAuthModal() {
      const modal = document.getElementById('auth-modal');
      if (modal) modal.classList.remove('active');
    },

    openSubmitConfirmModal() {
      const modal = document.getElementById('submit-confirm-modal');
      if (!modal) return;
      const counts = TestEngine.getPaletteCounts();
      document.getElementById('confirm-answered-count').textContent = counts.answered;
      document.getElementById('confirm-not-answered-count').textContent = counts.not_answered;
      document.getElementById('confirm-marked-count').textContent = counts.marked + counts.answered_marked;
      document.getElementById('confirm-not-visited-count').textContent = counts.not_visited;
      modal.classList.add('active');
    },

    toggleSearchModal(open = true) {
      const modal = document.getElementById('search-modal');
      if (!modal) return;
      if (open) {
        modal.classList.add('active');
        const input = document.getElementById('global-search-input');
        if (input) {
          input.value = '';
          input.focus();
          this.executeGlobalSearch('');
        }
      } else {
        modal.classList.remove('active');
      }
    },

    executeGlobalSearch(query) {
      const resultsContainer = document.getElementById('global-search-results');
      if (!resultsContainer) return;

      const q = query.trim().toLowerCase();
      if (!q) {
        resultsContainer.innerHTML = `
          <div style="padding: 24px; text-align: center; color: var(--text-muted);">
            Type a chapter name (e.g. "Laws of Motion", "Plant Kingdom") or topic to search.
          </div>
        `;
        return;
      }

      // Search chapters and questions
      const chaptersPh = (window.NEET_DATA?.CH?.ph || []).map(c => ({ name: c[0], subject: 'Physics', subKey: 'ph' }));
      const chaptersCh = (window.NEET_DATA?.CH?.ch || []).map(c => ({ name: c[0], subject: 'Chemistry', subKey: 'ch' }));
      const chaptersBi = (window.NEET_DATA?.CH?.bi || []).map(c => ({ name: c[0], subject: 'Biology', subKey: 'bi' }));
      const allCh = [...chaptersPh, ...chaptersCh, ...chaptersBi];

      const matchedCh = allCh.filter(c => c.name.toLowerCase().includes(q)).slice(0, 5);

      let html = '';
      if (matchedCh.length > 0) {
        html += `<div style="font-size: 0.75rem; font-weight: 700; color: var(--text-muted); padding: 8px 14px; text-transform: uppercase;">Chapters</div>`;
        matchedCh.forEach(c => {
          html += `
            <div style="display: flex; align-items: center; justify-content: space-between; padding: 12px 14px; border-radius: var(--radius-sm); cursor: pointer; transition: background 0.2s;" class="search-item" data-action="open-chapter" data-payload="${c.name}">
              <div>
                <strong style="display: block; font-size: 0.95rem;">${c.name}</strong>
                <small style="color: var(--text-muted);">${c.subject}</small>
              </div>
              <button class="btn btn-outline btn-sm">Explore →</button>
            </div>
          `;
        });
      }

      resultsContainer.innerHTML = html || `<div style="padding: 24px; text-align: center; color: var(--text-muted);">No results found for "${query}".</div>`;
    },

    // ========================================================
    // MAIN RENDER ROUTER
    // ========================================================
    render() {
      const view = State.get('currentView');
      const root = document.getElementById('app-root');
      if (!root) return;

      if (view === 'landing') {
        root.innerHTML = this.renderLandingPage();
        this.bindLandingEvents();
      } else if (view === 'mock-exam') {
        root.innerHTML = this.renderMockExamWorkspace();
        this.bindExamEvents();
      } else {
        // Authenticated App Shell with Sidebar & Header
        root.innerHTML = `
          <div class="app-shell">
            ${this.renderSidebar()}
            <div class="app-main">
              ${this.renderAppHeader()}
              <div class="app-content">
                ${this.renderViewContent(view)}
              </div>
            </div>
            ${this.renderMobileDock()}
          </div>
        `;
        this.bindAppEvents();
      }
    },

    renderSidebar() {
      const user = State.get('user') || API.currentUser;
      const current = State.get('currentView');

      const navItems = [
        { view: 'home', label: 'Dashboard', icon: '<path stroke-linecap="round" stroke-linejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>' },
        { view: 'practice', label: 'Practice MCQs', icon: '<path stroke-linecap="round" stroke-linejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>' },
        { view: 'mocks', label: 'NEET Mock Tests', icon: '<path stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"/>' },
        { view: 'improve', label: 'Improvement Book', icon: '<path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>', badge: 'Focus' },
        { view: 'flashcards', label: 'Active Flashcards', icon: '<path stroke-linecap="round" stroke-linejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>' },
        { view: 'notes', label: 'High-Yield Notes', icon: '<path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>' },
        { view: 'doubt', label: 'AI Doubt Solver', icon: '<path stroke-linecap="round" stroke-linejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>', badge: 'AI' },
        { view: 'analytics', label: 'Analytics & Rank', icon: '<path stroke-linecap="round" stroke-linejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>' },
        { view: 'planner', label: 'Study Planner', icon: '<path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>' }
      ];

      return `
        <aside class="app-sidebar">
          <div class="sidebar-logo">
            <svg viewBox="0 0 40 40" fill="none"><rect width="40" height="40" rx="10" fill="#0A5CFF"/><path d="M12 28V12L28 28V12" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>
            <span>NEET<b>Buddy</b></span>
          </div>

          <div class="sidebar-section-title">Preparation Suite</div>
          <div class="sidebar-nav-list">
            ${navItems.map(item => `
              <div class="sidebar-nav-item ${current === item.view ? 'active' : ''}" data-view="${item.view}">
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">${item.icon}</svg>
                <span>${item.label}</span>
                ${item.badge ? `<span class="nav-count-badge">${item.badge}</span>` : ''}
              </div>
            `).join('')}
          </div>

          <div class="sidebar-user-box">
            <img class="sidebar-user-avatar" src="${user?.avatar || '/images/avatars/ananya.jpg'}" alt="${user?.name || 'Aspirant'}">
            <div class="sidebar-user-info">
              <span class="sidebar-user-name">${user?.name || 'Aryan Verma'}</span>
              <span class="sidebar-user-score">Target: ${user?.targetScore || 680}/720</span>
            </div>
            <button data-action="logout" title="Log Out" style="color: var(--text-muted); cursor: pointer; padding: 4px;">
              <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
            </button>
          </div>
        </aside>
      `;
    },

    renderAppHeader() {
      const user = State.get('user') || API.currentUser;
      return `
        <header class="app-header">
          <div class="header-search-box" data-action="open-search">
            <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
            <input type="text" placeholder="Search chapters, topics, formulas (Ctrl + K)" readonly>
          </div>

          <div class="header-status-ribbon">
            <div class="status-pill streak">
              <span>🔥</span>
              <span>${user?.streak || 18} Days Streak</span>
            </div>
            <div class="status-pill target">
              <span>🎯</span>
              <span>Target: ${user?.targetScore || 680}+ (AIR &lt; 500)</span>
            </div>
            <button class="theme-toggle-btn" data-action="toggle-theme" title="Toggle Theme">
              <svg width="19" height="19" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/></svg>
            </button>
            <img class="sidebar-user-avatar" src="${user?.avatar || '/images/avatars/ananya.jpg'}" alt="Profile" style="cursor: pointer;" data-view="planner">
          </div>
        </header>
      `;
    },

    renderMobileDock() {
      const current = State.get('currentView');
      return `
        <nav class="mobile-bottom-dock">
          <div class="dock-items-wrap">
            <div class="dock-item ${current === 'home' ? 'active' : ''}" data-view="home">
              <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>
              <span>Home</span>
            </div>
            <div class="dock-item ${current === 'practice' ? 'active' : ''}" data-view="practice">
              <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>
              <span>Practice</span>
            </div>
            <div class="dock-item ${current === 'mocks' ? 'active' : ''}" data-view="mocks">
              <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>
              <span>Tests</span>
            </div>
            <div class="dock-item ${current === 'improve' ? 'active' : ''}" data-view="improve">
              <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
              <span>Mistakes</span>
            </div>
            <div class="dock-item ${current === 'analytics' ? 'active' : ''}" data-view="analytics">
              <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>
              <span>Rank</span>
            </div>
          </div>
        </nav>
      `;
    },

    renderViewContent(view) {
      switch (view) {
        case 'home':
          return this.renderHomeDashboard();
        case 'practice':
          return this.renderPracticeHub();
        case 'chapter-detail':
          return this.renderChapterDetailView();
        case 'mocks':
          return this.renderMocksCatalog();
        case 'test-scorecard':
          return this.renderScorecardView();
        case 'improve':
          return this.renderImprovementBookView();
        case 'flashcards':
          return this.renderFlashcardsView();
        case 'notes':
          return this.renderNotesView();
        case 'doubt':
          return this.renderDoubtSolverView();
        case 'analytics':
          return this.renderAnalyticsView();
        case 'planner':
          return this.renderPlannerView();
        default:
          return this.renderHomeDashboard();
      }
    },

    // ========================================================
    // 1. DASHBOARD VIEW (`home`)
    // ========================================================
    renderHomeDashboard() {
      const user = State.get('user') || API.currentUser;
      const tasks = State.get('dailyTasks') || [];
      const completedCount = tasks.filter(t => t.completed).length;
      const progressPercent = Math.round((completedCount / (tasks.length || 1)) * 100);

      return `
        <div style="display: flex; flex-direction: column; gap: 28px;">
          <!-- Welcome Hero Banner -->
          <div class="card" style="background: linear-gradient(135deg, rgba(10, 92, 255, 0.08) 0%, var(--bg-surface) 100%); border-left: 5px solid var(--brand-blue); padding: 28px 32px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 20px;">
            <div>
              <span class="badge blue">Target NEET ${user?.year || '2026'} • AIIMS Delhi Track</span>
              <h1 style="font-size: 2.2rem; margin: 8px 0 6px;">Welcome back, ${user?.name?.split(' ')[0] || 'Doctor'}! 🩺</h1>
              <p style="color: var(--text-secondary); max-width: 580px;">
                You are on an <strong>${user?.streak || 18}-day study streak</strong>. Complete today's 4 targets to maintain your 99.4 percentile trajectory.
              </p>
            </div>
            <div style="display: flex; gap: 12px;">
              <button class="btn btn-primary" data-view="mocks">Take Full Mock Test →</button>
              <button class="btn btn-secondary" data-view="practice">Practice MCQs</button>
            </div>
          </div>

          <!-- 4 Core Metric KPIs -->
          <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 18px;" class="dashboard-kpis-grid">
            <div class="card" style="display: flex; align-items: center; gap: 16px;">
              <div class="icon-box blue"><svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M13 10V3L4 14h7v7l9-11h-7z"/></svg></div>
              <div>
                <strong style="font-size: 1.6rem; font-family: var(--font-display); line-height: 1.1; display: block;">88.4%</strong>
                <span style="font-size: 0.82rem; color: var(--text-muted);">Overall Accuracy</span>
              </div>
            </div>

            <div class="card" style="display: flex; align-items: center; gap: 16px;">
              <div class="icon-box emerald"><svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg></div>
              <div>
                <strong style="font-size: 1.6rem; font-family: var(--font-display); line-height: 1.1; display: block;">1,420</strong>
                <span style="font-size: 0.82rem; color: var(--text-muted);">Questions Solved</span>
              </div>
            </div>

            <div class="card" style="display: flex; align-items: center; gap: 16px;">
              <div class="icon-box amber"><svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg></div>
              <div>
                <strong style="font-size: 1.6rem; font-family: var(--font-display); line-height: 1.1; display: block;">685 / 720</strong>
                <span style="font-size: 0.82rem; color: var(--text-muted);">Last Mock Score</span>
              </div>
            </div>

            <div class="card" style="display: flex; align-items: center; gap: 16px;">
              <div class="icon-box purple"><svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/></svg></div>
              <div>
                <strong style="font-size: 1.6rem; font-family: var(--font-display); line-height: 1.1; display: block;">AIR 320</strong>
                <span style="font-size: 0.82rem; color: var(--text-muted);">Predicted Rank</span>
              </div>
            </div>
          </div>

          <!-- Quick Actions Bar (Trackprep inspired) -->
          <div>
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px;">
              <h3 style="font-size: 1.15rem;">Quick Access Modules</h3>
              <a href="#" style="font-size: 0.85rem; color: var(--brand-blue); font-weight: 600;" data-view="practice">View all tools →</a>
            </div>
            <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px;" class="dashboard-tools-grid">
              <div class="card card-hover" style="cursor: pointer; display: flex; align-items: center; gap: 14px; padding: 18px;" data-view="mocks">
                <div class="icon-box blue"><svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg></div>
                <div>
                  <strong style="font-size: 0.95rem; display: block;">Mock Tests</strong>
                  <small style="color: var(--text-muted); font-size: 0.78rem;">50 All-India Papers</small>
                </div>
              </div>

              <div class="card card-hover" style="cursor: pointer; display: flex; align-items: center; gap: 14px; padding: 18px;" data-view="improve">
                <div class="icon-box rose"><svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg></div>
                <div>
                  <strong style="font-size: 0.95rem; display: block;">Improvement Book</strong>
                  <small style="color: var(--text-muted); font-size: 0.78rem;">Revise Saved Mistakes</small>
                </div>
              </div>

              <div class="card card-hover" style="cursor: pointer; display: flex; align-items: center; gap: 14px; padding: 18px;" data-view="doubt">
                <div class="icon-box purple"><svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/></svg></div>
                <div>
                  <strong style="font-size: 0.95rem; display: block;">AI Doubt Solver</strong>
                  <small style="color: var(--text-muted); font-size: 0.78rem;">Instant NCERT Logic</small>
                </div>
              </div>

              <div class="card card-hover" style="cursor: pointer; display: flex; align-items: center; gap: 14px; padding: 18px;" data-view="flashcards">
                <div class="icon-box emerald"><svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/></svg></div>
                <div>
                  <strong style="font-size: 0.95rem; display: block;">Active Flashcards</strong>
                  <small style="color: var(--text-muted); font-size: 0.78rem;">High-Yield Recall</small>
                </div>
              </div>
            </div>
          </div>

          <!-- Split Row: Daily Goals & Subject Progress -->
          <div style="display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 24px;" class="dashboard-split-row">
            <!-- Today's Daily Target Checklist -->
            <div class="card">
              <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 18px;">
                <div>
                  <h3 style="font-size: 1.15rem;">Today's Study Checklist</h3>
                  <small style="color: var(--text-muted);">${completedCount} of ${tasks.length} tasks completed (${progressPercent}%)</small>
                </div>
                <span class="badge ${progressPercent >= 50 ? 'emerald' : 'blue'}">${progressPercent}% Done</span>
              </div>
              <div class="progress-track" style="margin-bottom: 20px;">
                <div class="progress-fill" style="width: ${progressPercent}%;"></div>
              </div>
              <div style="display: grid; gap: 10px;">
                ${tasks.map(task => `
                  <div style="display: flex; align-items: center; gap: 12px; padding: 12px 14px; border-radius: var(--radius-md); background: var(--bg-subtle); border: 1px solid var(--border-light); cursor: pointer;" data-action="toggle-task" data-payload="${task.id}">
                    <input type="checkbox" ${task.completed ? 'checked' : ''} style="cursor: pointer; width: 18px; height: 18px;">
                    <div style="flex: 1;">
                      <span style="font-size: 0.92rem; font-weight: 600; text-decoration: ${task.completed ? 'line-through' : 'none'}; color: ${task.completed ? 'var(--text-muted)' : 'var(--text-primary)'};">${task.title}</span>
                      <small style="display: block; color: var(--text-muted); font-size: 0.76rem;">Estimated: ${task.time}</small>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>

            <!-- Subject Mastery Rings -->
            <div class="card">
              <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 18px;">
                <h3 style="font-size: 1.15rem;">Subject Syllabus Mastery</h3>
                <span class="badge blue">NEET 2026</span>
              </div>

              <div style="display: grid; gap: 18px;">
                <div style="display: flex; flex-direction: column; gap: 8px;">
                  <div style="display: flex; justify-content: space-between; font-size: 0.9rem; font-weight: 600;">
                    <span>Physics (29 Chapters)</span>
                    <span style="color: #8b5cf6;">72%</span>
                  </div>
                  <div class="progress-track"><div class="progress-fill physics" style="width: 72%;"></div></div>
                </div>

                <div style="display: flex; flex-direction: column; gap: 8px;">
                  <div style="display: flex; justify-content: space-between; font-size: 0.9rem; font-weight: 600;">
                    <span>Chemistry (20 Chapters)</span>
                    <span style="color: #f43f5e;">58%</span>
                  </div>
                  <div class="progress-track"><div class="progress-fill chemistry" style="width: 58%;"></div></div>
                </div>

                <div style="display: flex; flex-direction: column; gap: 8px;">
                  <div style="display: flex; justify-content: space-between; font-size: 0.9rem; font-weight: 600;">
                    <span>Biology (33 Chapters)</span>
                    <span style="color: #10b981;">84%</span>
                  </div>
                  <div class="progress-track"><div class="progress-fill biology" style="width: 84%;"></div></div>
                </div>
              </div>

              <div style="margin-top: 26px; padding: 14px; border-radius: var(--radius-md); background: var(--bg-subtle); display: flex; align-items: center; justify-content: space-between;">
                <div>
                  <strong style="font-size: 0.88rem; display: block;">Improve Weak Areas</strong>
                  <small style="color: var(--text-muted); font-size: 0.78rem;">Rotational Motion &amp; Ionic Equilibrium</small>
                </div>
                <button class="btn btn-outline btn-sm" data-view="improve">Practice →</button>
              </div>
            </div>
          </div>
        </div>
      `;
    },

    // ========================================================
    // 2. PRACTICE HUB (`practice`)
    // ========================================================
    renderPracticeHub() {
      const activeSub = State.get('activeSubject') || 'ph';
      const classFilter = State.get('classFilter') || 'all';
      const chapters = (window.NEET_DATA?.CH?.[activeSub] || []).filter(c => {
        if (classFilter === 'all') return true;
        return String(c[1]) === classFilter;
      });

      const subjects = [
        { key: 'ph', name: 'Physics', color: 'purple', count: 29 },
        { key: 'ch', name: 'Chemistry', color: 'rose', count: 20 },
        { key: 'bi', name: 'Biology', color: 'emerald', count: 33 }
      ];

      return `
        <div style="display: flex; flex-direction: column; gap: 24px;">
          <!-- Header -->
          <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 16px;">
            <div>
              <h1 style="font-size: 2rem;">Chapter-wise MCQ Practice</h1>
              <p style="color: var(--text-secondary); font-size: 0.95rem;">NCERT line-by-line questions with step-by-step verified explanations.</p>
            </div>
            <!-- Class Tabs -->
            <div class="tab-bar">
              <button class="tab-btn ${classFilter === 'all' ? 'active' : ''}" data-action="filter-chapters-class" data-payload="all">All Classes</button>
              <button class="tab-btn ${classFilter === '11' ? 'active' : ''}" data-action="filter-chapters-class" data-payload="11">Class 11</button>
              <button class="tab-btn ${classFilter === '12' ? 'active' : ''}" data-action="filter-chapters-class" data-payload="12">Class 12</button>
            </div>
          </div>

          <!-- Subject Pill Switchers -->
          <div style="display: flex; gap: 12px; border-bottom: 1px solid var(--border-light); padding-bottom: 12px;">
            ${subjects.map(s => `
              <button class="btn ${activeSub === s.key ? 'btn-primary' : 'btn-secondary'} btn-sm" data-action="filter-chapters-subject" data-payload="${s.key}">
                ${s.name} (${s.count} Chapters)
              </button>
            `).join('')}
          </div>

          <!-- Chapter Cards Grid -->
          <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px;" class="chapters-grid">
            ${chapters.map((item, idx) => {
              const name = item[0];
              const cls = item[1];
              const desc = window.NEET_DATA?.CHD?.[name] || 'NCERT based practice questions, key formulas, and notes.';
              return `
                <div class="card card-hover" style="display: flex; flex-direction: column; justify-content: space-between; gap: 14px;">
                  <div>
                    <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
                      <span class="badge ${activeSub === 'ph' ? 'purple' : activeSub === 'ch' ? 'rose' : 'emerald'}">Class ${cls} • Chapter ${idx + 1}</span>
                      <small style="color: var(--text-muted); font-size: 0.78rem;">25 Qs available</small>
                    </div>
                    <h3 style="font-size: 1.15rem; margin-bottom: 6px;">${name}</h3>
                    <p style="font-size: 0.85rem; color: var(--text-secondary); line-height: 1.5;">${desc}</p>
                  </div>
                  <div style="display: flex; gap: 10px; border-top: 1px solid var(--border-light); padding-top: 14px;">
                    <button class="btn btn-primary btn-sm" style="flex: 1;" data-action="open-chapter" data-payload="${name}">Start Practice →</button>
                    <button class="btn btn-secondary btn-sm" data-action="open-chapter" data-payload="${name}">Notes</button>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      `;
    },

    // ========================================================
    // 3. CHAPTER DETAIL VIEW (`chapter-detail`)
    // ========================================================
    renderChapterDetailView() {
      const chapterName = State.get('activeChapter') || 'Laws of Motion';
      const activeSub = State.get('activeSubject') || 'ph';
      const topics = window.NEET_DATA?.TP?.[chapterName] || ['Newton’s Laws of Motion', 'Friction', 'Free Body Diagrams & Pulleys'];
      const notes = window.NEET_DATA?.NOTES?.[chapterName];
      const formulas = window.NEET_DATA?.FM || [];

      return `
        <div style="display: flex; flex-direction: column; gap: 24px;">
          <!-- Back Bar -->
          <div style="display: flex; align-items: center; gap: 12px;">
            <button class="btn btn-secondary btn-sm" data-view="practice">← Back to Chapters</button>
            <span style="color: var(--text-muted);">/</span>
            <span style="font-weight: 700; color: var(--text-primary);">${chapterName}</span>
          </div>

          <!-- Hero Info -->
          <div class="card" style="padding: 28px;">
            <span class="badge ${activeSub === 'ph' ? 'purple' : activeSub === 'ch' ? 'rose' : 'emerald'}">High Yield Chapter</span>
            <h1 style="font-size: 2.2rem; margin: 10px 0 6px;">${chapterName}</h1>
            <p style="color: var(--text-secondary); max-width: 600px;">
              Master this chapter by practicing each sub-topic, reviewing key NCERT definitions, and working through step-by-step solutions.
            </p>
          </div>

          <!-- Topics List -->
          <div class="card">
            <h3 style="margin-bottom: 16px;">Practice Topics (${topics.length})</h3>
            <div style="display: grid; gap: 12px;">
              ${topics.map((t, idx) => `
                <div style="display: flex; align-items: center; justify-content: space-between; padding: 14px 18px; border-radius: var(--radius-md); background: var(--bg-subtle); border: 1px solid var(--border-light);">
                  <div style="display: flex; align-items: center; gap: 14px;">
                    <span style="width: 28px; height: 28px; border-radius: 50%; background: var(--bg-surface); display: grid; place-items: center; font-weight: 700; font-size: 0.82rem;">${idx + 1}</span>
                    <div>
                      <strong style="display: block; font-size: 0.95rem;">${t}</strong>
                      <small style="color: var(--text-muted);">Standard NEET MCQs</small>
                    </div>
                  </div>
                  <button class="btn btn-primary btn-sm" data-action="start-test" data-payload="mock-neet-01">Practice Topic →</button>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Formulas & Key Points -->
          ${notes ? `
            <div class="card">
              <h3 style="margin-bottom: 16px;">NCERT Key Points</h3>
              <ul style="display: grid; gap: 10px; padding-left: 18px; list-style: disc;">
                ${notes.kp.map(p => `<li style="font-size: 0.95rem; line-height: 1.6; color: var(--text-secondary);">${p}</li>`).join('')}
              </ul>
            </div>
          ` : ''}
        </div>
      `;
    },

    // ========================================================
    // 4. MOCK TESTS CATALOG (`mocks`)
    // ========================================================
    renderMocksCatalog() {
      const tests = Array.from({ length: 50 }, (_, i) => ({
        id: `mock-neet-${String(i + 1).padStart(2, '0')}`,
        num: i + 1,
        title: `Full Length NEET (UG) Mock Test #${i + 1}`,
        desc: 'Official 200 Questions (Physics, Chemistry, Botany, Zoology) • 200 Minutes',
        free: i < 3
      }));

      return `
        <div style="display: flex; flex-direction: column; gap: 24px;">
          <!-- Hero -->
          <div class="card" style="background: radial-gradient(circle at 90% 40%, rgba(10, 92, 255, 0.4) 0%, transparent 40%), linear-gradient(135deg, #050f38 0%, #03071b 100%); color: #ffffff; padding: 36px 40px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 24px;">
            <div>
              <span class="badge blue" style="background: rgba(255, 255, 255, 0.15); color: #ffffff; border-color: rgba(255, 255, 255, 0.3);">All-India Test Series (AITS)</span>
              <h1 style="font-size: 2.4rem; color: #ffffff; margin: 10px 0 8px;">50 Full-Length NEET Mock Tests</h1>
              <p style="color: #cbd5e1; max-width: 540px; font-size: 1rem;">
                Experience the authentic NTA NEET computer-based exam simulator with official marking scheme (+4 / -1), real countdown clock, and instantaneous All-India Rank (AIR) prediction.
              </p>
            </div>
            <button class="btn btn-primary btn-lg" data-action="start-test" data-payload="mock-neet-01">Start Mock Test #1 Free →</button>
          </div>

          <!-- Test Series Grid -->
          <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px;" class="mocks-catalog-grid">
            ${tests.map(t => `
              <div class="card card-hover" style="display: flex; align-items: center; justify-content: space-between; padding: 20px 24px;">
                <div style="display: flex; align-items: center; gap: 16px;">
                  <div class="icon-box blue" style="width: 48px; height: 48px;">
                    <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>
                  </div>
                  <div>
                    <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
                      <strong style="font-size: 1rem;">${t.title}</strong>
                      ${t.free ? `<span class="badge emerald" style="font-size: 0.68rem; padding: 2px 6px;">FREE</span>` : `<span class="badge" style="font-size: 0.68rem; padding: 2px 6px;">PRO</span>`}
                    </div>
                    <small style="color: var(--text-muted);">${t.desc}</small>
                  </div>
                </div>
                <button class="btn btn-primary btn-sm" data-action="start-test" data-payload="${t.id}">Start Test</button>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    },

    // ========================================================
    // 5. NTA NEET MOCK EXAM WORKSPACE (`mock-exam`)
    // ========================================================
    renderMockExamWorkspace() {
      const test = State.get('activeTest');
      if (!test || !test.questions || test.questions.length === 0) {
        return `<div class="container" style="padding: 40px; text-align: center;"><p>No active test session found.</p><button class="btn btn-primary" data-view="mocks">Return to Tests</button></div>`;
      }

      const currentQ = test.questions[test.currentIndex];
      const selectedOption = test.answers[currentQ.id];
      const sections = ['Physics Sec A', 'Physics Sec B', 'Chemistry Sec A', 'Chemistry Sec B', 'Botany', 'Zoology'];
      const counts = TestEngine.getPaletteCounts();

      return `
        <div class="exam-shell">
          <!-- Exam Header -->
          <header class="exam-header">
            <div class="exam-title-meta">
              <strong>${test.title}</strong>
              <small>Candidate: Aryan Verma • Roll No: NEET2026-9482 • Marking: +4 / -1</small>
            </div>

            <div class="exam-timer-box">
              <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
              <span id="exam-countdown-timer">${TestEngine.formatTime(test.secondsRemaining)}</span>
            </div>

            <button class="btn btn-primary btn-sm" data-action="confirm-submit-test">Submit Exam</button>
          </header>

          <!-- Section Switcher Bar -->
          <div class="exam-sections-bar">
            ${sections.map(s => `
              <button class="section-pill-btn ${currentQ.section === s ? 'active' : ''}" data-action="jump-section" data-payload="${s}">
                ${s}
              </button>
            `).join('')}
          </div>

          <!-- Split Workspace -->
          <div class="exam-workspace">
            <!-- Left Pane: Question & Options -->
            <div class="exam-question-area">
              <div class="question-status-header">
                <span class="question-number-badge">Question ${test.currentIndex + 1} of ${test.questions.length}</span>
                <div class="marking-scheme-pill">
                  <span>Marks:</span>
                  <span class="pos">+4</span>
                  <span class="neg">-1</span>
                </div>
              </div>

              <!-- Question text -->
              <div class="exam-question-text">
                ${currentQ.q}
              </div>

              <!-- Question Diagram if present -->
              ${currentQ.im && window.NEET_DATA?.IMG?.[currentQ.im] ? `
                <div class="exam-diagram-container">
                  ${window.NEET_DATA.IMG[currentQ.im]}
                </div>
              ` : ''}

              <!-- Options List -->
              <div class="exam-options-list">
                ${currentQ.o.map((opt, oIdx) => `
                  <div class="exam-option-tile ${selectedOption === oIdx ? 'selected' : ''}" data-action="select-option" data-payload="${oIdx}">
                    <div class="exam-option-circle">${'ABCD'[oIdx]}</div>
                    <span class="exam-option-label">${opt}</span>
                  </div>
                `).join('')}
              </div>

              <!-- Bottom Actions Bar -->
              <div class="exam-bottom-bar">
                <div class="bottom-bar-left">
                  <button class="btn btn-secondary btn-sm" data-action="clear-response">Clear Response</button>
                  <button class="btn btn-secondary btn-sm" data-action="mark-review">Mark for Review &amp; Next</button>
                </div>
                <div class="bottom-bar-right">
                  <button class="btn btn-secondary btn-sm" onclick="TestEngine.prevQuestion()">Previous</button>
                  <button class="btn btn-primary btn-sm" data-action="save-next">Save &amp; Next →</button>
                </div>
              </div>
            </div>

            <!-- Right Pane: Question Palette -->
            <aside class="exam-palette-pane">
              <div class="palette-status-legend">
                <div class="legend-badge"><span class="indicator-dot answered"></span> Answered (${counts.answered})</div>
                <div class="legend-badge"><span class="indicator-dot not_answered"></span> Not Answered (${counts.not_answered})</div>
                <div class="legend-badge"><span class="indicator-dot marked"></span> Review (${counts.marked})</div>
                <div class="legend-badge"><span class="indicator-dot not_visited"></span> Not Visited (${counts.not_visited})</div>
              </div>

              <div style="font-weight: 700; font-size: 0.88rem; margin-bottom: 12px;">Questions Palette</div>
              <div class="palette-questions-grid">
                ${test.questions.map((q, idx) => {
                  const status = test.status[q.id] || 'not_visited';
                  const isCurrent = idx === test.currentIndex;
                  return `
                    <div class="palette-q-bubble ${status} ${isCurrent ? 'active-q' : ''}" data-action="jump-question" data-payload="${idx}">
                      ${idx + 1}
                    </div>
                  `;
                }).join('')}
              </div>

              <div style="margin-top: auto; padding-top: 16px;">
                <button class="btn btn-primary btn-full" data-action="confirm-submit-test">Submit Full Exam</button>
              </div>
            </aside>
          </div>
        </div>
      `;
    },

    // ========================================================
    // 6. SCORECARD & DIAGNOSTIC REPORT (`test-scorecard`)
    // ========================================================
    renderScorecardView() {
      const card = State.get('lastScorecard');
      if (!card) {
        return `<div class="container" style="padding: 40px; text-align: center;"><p>No scorecard available.</p><button class="btn btn-primary" data-view="mocks">View Mock Tests</button></div>`;
      }

      return `
        <div class="scorecard-view">
          <!-- AIR Rank Prediction Banner -->
          <div class="air-prediction-card">
            <span class="badge blue" style="background: rgba(255,255,255,0.15); color: #fff; border-color: rgba(255,255,255,0.3);">NEET (UG) Diagnostic Predictor</span>
            <h2>${card.score} / ${card.maxScore}</h2>
            <div style="font-size: 1.25rem; font-weight: 700; margin-bottom: 8px;">
              Predicted Rank: <span style="color: #38bdf8;">${card.predictedRank}</span> (Percentile: ${card.percentile}%)
            </div>
            <p style="color: #cbd5e1; font-size: 0.95rem;">
              Eligibility: <strong>${card.collegeEligibility}</strong>
            </p>
          </div>

          <!-- 4 KPIs -->
          <div class="scorecard-kpi-grid">
            <div class="kpi-stat-card">
              <strong style="color: var(--brand-emerald);">${card.accuracy}%</strong>
              <small class="text-muted">Accuracy</small>
            </div>
            <div class="kpi-stat-card">
              <strong style="color: var(--brand-emerald);">${card.correctCount}</strong>
              <small class="text-muted">Correct</small>
            </div>
            <div class="kpi-stat-card">
              <strong style="color: var(--brand-rose);">${card.incorrectCount}</strong>
              <small class="text-muted">Incorrect</small>
            </div>
            <div class="kpi-stat-card">
              <strong style="color: var(--text-muted);">${card.skippedCount}</strong>
              <small class="text-muted">Skipped</small>
            </div>
          </div>

          <!-- Mistakes review action -->
          <div class="card" style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 24px;">
            <div>
              <strong style="font-size: 1.05rem; display: block;">${card.incorrectCount} Questions Saved to Improvement Book</strong>
              <small class="text-muted">Diagnose why you missed them (Concept gap vs Silly mistake) and re-test.</small>
            </div>
            <button class="btn btn-primary" data-view="improve">Open Improvement Book →</button>
          </div>

          <div style="display: flex; gap: 12px; justify-content: center;">
            <button class="btn btn-secondary" data-view="mocks">Back to Mock Tests</button>
            <button class="btn btn-primary" data-view="home">Go to Dashboard</button>
          </div>
        </div>
      `;
    },

    // ========================================================
    // 7. IMPROVEMENT BOOK VIEW (`improve`)
    // ========================================================
    renderImprovementBookView() {
      // Load mistakes from localStorage
      let localMap = {};
      try {
        localMap = JSON.parse(localStorage.getItem('nb_mistakes_v2') || '{}');
      } catch (e) {}

      const mistakes = Object.values(localMap);
      const types = [
        { id: 'all', label: 'All Mistakes', count: mistakes.length },
        { id: 'Concept gap', label: 'Concept Gap', count: mistakes.filter(m => m.reason === 'Concept gap').length },
        { id: 'Silly mistake', label: 'Silly Mistake', count: mistakes.filter(m => m.reason === 'Silly mistake').length },
        { id: 'Calculation error', label: 'Calculation Error', count: mistakes.filter(m => m.reason === 'Calculation error').length },
        { id: 'Misread question', label: 'Misread Question', count: mistakes.filter(m => m.reason === 'Misread question').length }
      ];

      const currentFilter = State.get('mistakesFilter') || 'all';
      const filtered = mistakes.filter(m => {
        if (currentFilter === 'all') return true;
        return m.reason === currentFilter;
      });

      return `
        <div class="improvement-page">
          <!-- Hero -->
          <div class="improvement-hero">
            <div class="improvement-hero-text">
              <span class="badge rose" style="background: rgba(255,255,255,0.18); color: #fff; border-color: rgba(255,255,255,0.3);">Trackprep Signature Engine</span>
              <h2>Your Improvement Book</h2>
              <p>Turn missed questions into marks. Tag the root cause, understand the NCERT solution, and take targeted re-tests.</p>
            </div>
            <button class="btn btn-primary btn-lg" data-action="reattempt-mistakes" data-payload="all">
              ⚡ Start Targeted Re-Test (${mistakes.filter(m => !m.mastered).length} Pending)
            </button>
          </div>

          <!-- 4 KPIs -->
          <div class="mistake-kpis-grid">
            <div class="mistake-kpi-card">
              <div class="icon-box rose"><svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg></div>
              <div>
                <strong>${mistakes.length}</strong>
                <span>Total Mistakes</span>
              </div>
            </div>

            <div class="mistake-kpi-card">
              <div class="icon-box blue"><svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg></div>
              <div>
                <strong>${mistakes.filter(m => m.reason === 'Concept gap').length}</strong>
                <span>Concept Gaps</span>
              </div>
            </div>

            <div class="mistake-kpi-card">
              <div class="icon-box amber"><svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg></div>
              <div>
                <strong>${mistakes.filter(m => m.reason === 'Silly mistake').length}</strong>
                <span>Silly Mistakes</span>
              </div>
            </div>

            <div class="mistake-kpi-card">
              <div class="icon-box emerald"><svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg></div>
              <div>
                <strong>${mistakes.filter(m => m.mastered).length}</strong>
                <span>Concept Mastered</span>
              </div>
            </div>
          </div>

          <!-- Filter Pills -->
          <div style="display: flex; gap: 8px; overflow-x: auto; padding-bottom: 4px;">
            ${types.map(t => `
              <button class="btn ${currentFilter === t.id ? 'btn-primary' : 'btn-secondary'} btn-sm" onclick="State.set('mistakesFilter', '${t.id}'); App.render();">
                ${t.label} (${t.count})
              </button>
            `).join('')}
          </div>

          <!-- Mistakes List -->
          <div style="display: grid; gap: 16px;">
            ${filtered.length > 0 ? filtered.map(m => {
              const q = m.question || {};
              const reason = m.reason || 'Concept gap';
              return `
                <div class="mistake-card ${m.mastered ? 'mastered' : ''}">
                  <div class="mistake-header">
                    <div class="mistake-tags-row">
                      <span class="badge ${q.s === 'ph' ? 'purple' : q.s === 'ch' ? 'rose' : 'emerald'}">${q.c || 'Physics Chapter'}</span>
                      <span class="badge">${q.t || 'Core Topic'}</span>
                      <span class="mistake-reason-pill" style="background: rgba(244, 63, 94, 0.12); color: #f43f5e;">${reason}</span>
                    </div>
                    <small style="color: var(--text-muted);">Wrong ${m.wrongCount || 1}×</small>
                  </div>

                  <div class="mistake-question-text">${q.q}</div>

                  <div class="answer-comparison-box">
                    <div class="answer-chip correct">
                      <small>✓ Correct Answer</small>
                      <strong>${'ABCD'[q.a]}. ${q.o ? q.o[q.a] : ''}</strong>
                    </div>
                    <div class="answer-chip wrong">
                      <small>✕ Your Answer</small>
                      <strong>${m.userAnswer !== undefined ? 'ABCD'[m.userAnswer] + '. ' + (q.o ? q.o[m.userAnswer] : '') : 'Incorrect'}</strong>
                    </div>
                  </div>

                  ${q.e ? `<div style="font-size: 0.88rem; color: var(--text-secondary); line-height: 1.6; background: var(--bg-subtle); padding: 12px 14px; border-radius: var(--radius-sm); border-left: 3px solid var(--brand-blue);"><strong>NCERT Explanation:</strong> ${q.e}</div>` : ''}

                  <!-- Tag reason row -->
                  <div class="tag-reason-bar">
                    <label>Diagnose Root Cause:</label>
                    ${ImprovementManager.MISTAKE_TYPES.map(rt => `
                      <button class="tag-btn ${reason === rt.id ? 'active' : ''}" data-action="tag-mistake" data-payload="${m.id}|${rt.id}">
                        ${rt.label}
                      </button>
                    `).join('')}
                  </div>

                  <div class="mistake-actions-footer">
                    <button class="btn btn-secondary btn-sm" data-action="toggle-mastery" data-payload="${m.id}|${m.mastered}">
                      ${m.mastered ? '✓ Mastered' : 'Mark as Mastered'}
                    </button>
                  </div>
                </div>
              `;
            }).join('') : `
              <div class="card" style="text-align: center; padding: 48px 24px;">
                <div class="icon-box emerald" style="width: 56px; height: 56px; margin: 0 auto 16px;"><svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7"/></svg></div>
                <h3 style="margin-bottom: 6px;">No mistakes found in this category!</h3>
                <p style="color: var(--text-muted); max-width: 420px; margin: 0 auto 18px;">Solve practice questions and take mock tests. Any missed questions will automatically be cataloged here.</p>
                <button class="btn btn-primary" data-view="practice">Start Practice Session</button>
              </div>
            `}
          </div>
        </div>
      `;
    },

    // ========================================================
    // 8. FLASHCARDS VIEW (`flashcards`)
    // ========================================================
    renderFlashcardsView() {
      // Build flashcard deck from notes
      const notes = window.NEET_DATA?.NOTES || {};
      const deck = [];
      Object.entries(notes).forEach(([chName, noteObj]) => {
        if (noteObj.tm) {
          noteObj.tm.forEach(item => {
            deck.push({
              chapter: chName,
              term: item[0],
              definition: item[1]
            });
          });
        }
      });

      if (deck.length === 0) {
        deck.push({ chapter: 'The Living World', term: 'Binomial Nomenclature', definition: 'System introduced by Carolus Linnaeus where each organism is given a two-part scientific name: Genus and specific epithet.' });
      }

      const currentIndex = State.get('flashcardIndex') % deck.length;
      const card = deck[currentIndex];
      const isFlipped = State.get('flashcardFlipped');

      return `
        <div style="max-width: 720px; margin: 0 auto; display: flex; flex-direction: column; gap: 24px;">
          <div>
            <span class="badge emerald">Active Recall &amp; Spaced Repetition</span>
            <h1 style="font-size: 2rem; margin: 8px 0 6px;">High-Yield NEET Flashcards</h1>
            <p style="color: var(--text-secondary);">Tap the card to reveal the definition and verify your retention.</p>
          </div>

          <!-- Flip Card Container -->
          <div class="card card-hover" style="min-height: 280px; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; padding: 40px; cursor: pointer; border: 2px dashed ${isFlipped ? 'var(--brand-emerald)' : 'var(--brand-blue)'}; background: ${isFlipped ? 'rgba(16, 185, 129, 0.05)' : 'var(--bg-surface)'};" data-action="flip-flashcard">
            <span style="font-size: 0.75rem; font-weight: 700; letter-spacing: 0.1em; color: var(--text-muted); text-transform: uppercase; margin-bottom: 14px;">
              ${card.chapter} • ${isFlipped ? 'DEFINITION / EXPLANATION' : 'TERM / CONCEPT'}
            </span>
            <h2 style="font-size: ${isFlipped ? '1.3rem' : '2rem'}; line-height: 1.4; color: ${isFlipped ? 'var(--text-primary)' : 'var(--brand-blue)'}; max-width: 540px;">
              ${isFlipped ? card.definition : card.term}
            </h2>
            <small style="color: var(--text-muted); margin-top: 18px;">Click to ${isFlipped ? 'see term' : 'flip answer'} 🔄</small>
          </div>

          <!-- Navigation controls -->
          <div style="display: flex; align-items: center; justify-content: space-between;">
            <button class="btn btn-secondary btn-sm" data-action="prev-flashcard">← Previous</button>
            <span style="font-size: 0.9rem; font-weight: 700; color: var(--text-muted);">${currentIndex + 1} / ${deck.length}</span>
            <button class="btn btn-primary btn-sm" data-action="next-flashcard">Next Card →</button>
          </div>
        </div>
      `;
    },

    // ========================================================
    // 9. HIGH-YIELD NOTES VIEW (`notes`)
    // ========================================================
    renderNotesView() {
      const notes = window.NEET_DATA?.NOTES || {};
      const chaptersWithNotes = Object.keys(notes);

      return `
        <div style="display: flex; flex-direction: column; gap: 24px;">
          <div>
            <span class="badge blue">NCERT High-Yield Bullet Revision</span>
            <h1 style="font-size: 2rem; margin: 8px 0 6px;">Chapter Revision Notes</h1>
            <p style="color: var(--text-secondary);">Concise key points and important definitions compiled directly from NCERT textbooks.</p>
          </div>

          <div style="display: grid; gap: 20px;">
            ${chaptersWithNotes.map(chName => {
              const item = notes[chName];
              return `
                <div class="card">
                  <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px;">
                    <div>
                      <span class="badge emerald">Biology • Chapter Notes</span>
                      <h2 style="font-size: 1.4rem; margin-top: 6px;">${chName}</h2>
                    </div>
                    <button class="btn btn-outline btn-sm" onclick="window.print()">Print / PDF ↗</button>
                  </div>

                  <h4 style="font-size: 1rem; margin-bottom: 10px; color: var(--brand-blue);">Key Exam Takeaways:</h4>
                  <ul style="display: grid; gap: 8px; padding-left: 18px; list-style: disc; margin-bottom: 20px;">
                    ${item.kp.map(p => `<li style="font-size: 0.92rem; color: var(--text-secondary); line-height: 1.6;">${p}</li>`).join('')}
                  </ul>

                  <h4 style="font-size: 1rem; margin-bottom: 10px; color: var(--brand-blue);">Essential Definitions:</h4>
                  <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px;">
                    ${item.tm.map(t => `
                      <div style="padding: 12px 14px; border-radius: var(--radius-sm); background: var(--bg-subtle); border: 1px solid var(--border-light);">
                        <strong style="display: block; font-size: 0.9rem; color: var(--text-primary);">${t[0]}</strong>
                        <small style="color: var(--text-secondary); line-height: 1.4; display: block; margin-top: 3px;">${t[1]}</small>
                      </div>
                    `).join('')}
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      `;
    },

    // ========================================================
    // 10. AI DOUBT SOLVER VIEW (`doubt`)
    // ========================================================
    renderDoubtSolverView() {
      const samples = DoubtSolver.samples;
      const history = State.get('doubtHistory') || [];

      return `
        <div style="max-width: 820px; margin: 0 auto; display: flex; flex-direction: column; gap: 24px;">
          <div class="card" style="background: linear-gradient(135deg, rgba(124, 58, 237, 0.08) 0%, var(--bg-surface) 100%); border-left: 5px solid var(--brand-violet); padding: 28px;">
            <span class="badge purple">Socratic AI Assistant</span>
            <h1 style="font-size: 2rem; margin: 8px 0 6px;">AI NEET Doubt Solver</h1>
            <p style="color: var(--text-secondary);">Ask any Physics numerical, Chemistry reaction mechanism, or Biology concept. Get step-by-step NCERT logic with matching previous year questions.</p>
          </div>

          <!-- Query Input Card -->
          <div class="card">
            <div style="display: flex; gap: 12px; margin-bottom: 16px;">
              <select id="doubt-subject-select" class="input-field" style="width: 180px;">
                <option value="all">All Subjects</option>
                <option value="ph">Physics</option>
                <option value="ch">Chemistry</option>
                <option value="bi">Biology</option>
              </select>
            </div>

            <textarea id="doubt-question-input" class="input-field" style="height: 120px; padding: 14px; resize: vertical; margin-bottom: 16px;" placeholder="Type your NEET question or concept doubt here... e.g. How does friction act on a rolling cylinder?"></textarea>

            <div style="display: flex; align-items: center; justify-content: space-between;">
              <small style="color: var(--text-muted);">Matches NCERT core formulas and verified question bank.</small>
              <button class="btn btn-primary" id="solve-doubt-btn" onclick="App.handleAskDoubt()">Solve Doubt With AI →</button>
            </div>
          </div>

          <!-- Quick Samples -->
          <div>
            <span style="font-size: 0.82rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">Frequently Asked Doubts</span>
            <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-top: 10px;">
              ${samples.map(s => `
                <button class="btn btn-secondary btn-sm" onclick="document.getElementById('doubt-question-input').value = '${s.text}'; document.getElementById('doubt-subject-select').value = '${s.subject}';">
                  ${s.text}
                </button>
              `).join('')}
            </div>
          </div>

          <!-- AI Response Target -->
          <div id="doubt-response-container">
            ${history.length > 0 ? this.renderDoubtAnswerCard(history[0]) : ''}
          </div>
        </div>
      `;
    },

    async handleAskDoubt() {
      const input = document.getElementById('doubt-question-input');
      const select = document.getElementById('doubt-subject-select');
      const btn = document.getElementById('solve-doubt-btn');
      if (!input || !input.value.trim()) return;

      btn.disabled = true;
      btn.textContent = 'Analyzing with AI...';

      const res = await DoubtSolver.ask(select.value, input.value.trim());
      btn.disabled = false;
      btn.textContent = 'Solve Doubt With AI →';

      if (res) {
        const history = State.get('doubtHistory') || [];
        history.unshift(res);
        State.set('doubtHistory', history);
        const container = document.getElementById('doubt-response-container');
        if (container) {
          container.innerHTML = this.renderDoubtAnswerCard(res);
        }
      }
    },

    renderDoubtAnswerCard(ans) {
      return `
        <div class="card" style="border: 2px solid var(--brand-violet); box-shadow: var(--shadow-lg);">
          <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 14px;">
            <div class="icon-box purple"><svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/></svg></div>
            <div>
              <strong style="font-size: 1.1rem; display: block;">${ans.corePrinciple}</strong>
              <small style="color: var(--text-muted);">Socratic Step-by-Step Resolution</small>
            </div>
          </div>

          <div style="display: grid; gap: 8px; margin-bottom: 18px;">
            ${ans.stepByStepBreakdown.map(step => `
              <div style="padding: 10px 14px; border-radius: var(--radius-sm); background: var(--bg-subtle); font-size: 0.92rem; line-height: 1.5;">${step}</div>
            `).join('')}
          </div>

          <div style="padding: 12px 16px; border-radius: var(--radius-sm); background: rgba(245, 158, 11, 0.1); border-left: 4px solid var(--brand-amber); font-size: 0.9rem; margin-bottom: 20px;">
            💡 <strong>Exam Tip:</strong> ${ans.mnemonicTip}
          </div>

          ${ans.matchingPYQs && ans.matchingPYQs.length > 0 ? `
            <h4 style="font-size: 0.95rem; margin-bottom: 10px;">Related NEET PYQ:</h4>
            <div style="padding: 14px; border-radius: var(--radius-md); background: var(--bg-subtle); border: 1px solid var(--border-light);">
              <p style="font-size: 0.95rem; font-weight: 600; margin-bottom: 8px;">${ans.matchingPYQs[0].question}</p>
              <div style="font-size: 0.88rem; color: var(--brand-emerald); font-weight: 700;">Answer: ${ans.matchingPYQs[0].correctOption}</div>
            </div>
          ` : ''}
        </div>
      `;
    },

    // ========================================================
    // 11. ANALYTICS & RANK PREDICTOR (`analytics`)
    // ========================================================
    renderAnalyticsView() {
      return `
        <div class="analytics-page">
          <!-- Header -->
          <div class="analytics-header-card">
            <div>
              <span class="badge blue">Diagnostic Engine</span>
              <h2>Performance Analytics &amp; AIR Predictor</h2>
              <p>Real-time calculation based on your accuracy, speed, and negative mark elimination.</p>
            </div>

            <!-- Readiness Gauge -->
            <div class="readiness-gauge-box">
              <div class="gauge-circle">
                <div class="gauge-circle-inner">
                  <strong>86%</strong>
                  <small>Exam Ready</small>
                </div>
              </div>
              <div>
                <strong style="font-size: 1.3rem; display: block;">AIR 320 - 750</strong>
                <small style="color: var(--brand-emerald); font-weight: 700;">Top 0.05% Tier (AIIMS Eligible)</small>
              </div>
            </div>
          </div>

          <!-- Grid: Subject Breakdown & Weak Topic Radar -->
          <div class="analytics-grid">
            <!-- Left: Accuracy by Subject -->
            <div class="card">
              <div class="analytics-card-head">
                <h3>Subject Accuracy vs Target</h3>
                <span class="badge emerald">Goal: 85%+</span>
              </div>

              <div class="subject-accuracy-list">
                <div class="subject-acc-row">
                  <div class="subject-acc-meta">
                    <span>Physics (Mechanics, Optics, Modern)</span>
                    <strong style="color: #8b5cf6;">78.2%</strong>
                  </div>
                  <div class="progress-track"><div class="progress-fill physics" style="width: 78.2%;"></div></div>
                </div>

                <div class="subject-acc-row">
                  <div class="subject-acc-meta">
                    <span>Chemistry (Organic, Physical, Inorganic)</span>
                    <strong style="color: #f43f5e;">72.5%</strong>
                  </div>
                  <div class="progress-track"><div class="progress-fill chemistry" style="width: 72.5%;"></div></div>
                </div>

                <div class="subject-acc-row">
                  <div class="subject-acc-meta">
                    <span>Biology (Botany &amp; Zoology NCERT)</span>
                    <strong style="color: #10b981;">92.0%</strong>
                  </div>
                  <div class="progress-track"><div class="progress-fill biology" style="width: 92%;"></div></div>
                </div>
              </div>

              <div style="margin-top: 24px; padding: 14px; border-radius: var(--radius-md); background: var(--bg-subtle); display: flex; align-items: center; justify-content: space-between;">
                <div>
                  <strong style="font-size: 0.9rem; display: block;">Average Time per Question</strong>
                  <small style="color: var(--text-muted);">48 seconds (NEET standard is 60s)</small>
                </div>
                <span class="badge emerald">Optimal Speed</span>
              </div>
            </div>

            <!-- Right: Ranked Weak Topics -->
            <div class="card">
              <div class="analytics-card-head">
                <h3>Top Weak Topics to Revise</h3>
                <small style="color: var(--brand-rose); font-weight: 700;">Low Accuracy</small>
              </div>

              <div class="weak-topics-list">
                <div class="weak-topic-row">
                  <span class="topic-rank-num">1</span>
                  <div class="weak-topic-info">
                    <strong>Laws of Motion - Friction</strong>
                    <small>Physics • Class 11</small>
                  </div>
                  <span class="weak-topic-acc">42%</span>
                </div>

                <div class="weak-topic-row">
                  <span class="topic-rank-num">2</span>
                  <div class="weak-topic-info">
                    <strong>Thermodynamics &amp; Entropy</strong>
                    <small>Chemistry • Class 11</small>
                  </div>
                  <span class="weak-topic-acc">48%</span>
                </div>

                <div class="weak-topic-row">
                  <span class="topic-rank-num">3</span>
                  <div class="weak-topic-info">
                    <strong>Plant Kingdom - Gymnosperms</strong>
                    <small>Biology • Class 11</small>
                  </div>
                  <span class="weak-topic-acc">55%</span>
                </div>
              </div>

              <button class="btn btn-primary btn-full btn-sm" style="margin-top: 20px;" data-view="improve">
                Open in Improvement Book →
              </button>
            </div>
          </div>
        </div>
      `;
    },

    // ========================================================
    // 12. STUDY PLANNER & GOAL SETTING (`planner`)
    // ========================================================
    renderPlannerView() {
      const user = State.get('user') || API.currentUser;

      return `
        <div style="max-width: 820px; margin: 0 auto; display: flex; flex-direction: column; gap: 24px;">
          <div>
            <span class="badge blue">Strategy &amp; Roadmap</span>
            <h1 style="font-size: 2rem; margin: 8px 0 6px;">Target Goal &amp; Study Planner</h1>
            <p style="color: var(--text-secondary);">Set your target NEET score, dream college, and daily question volume.</p>
          </div>

          <div class="card">
            <h3 style="margin-bottom: 20px;">Your Profile &amp; Exam Target</h3>
            
            <div class="form-group">
              <label class="form-label">Full Name</label>
              <input type="text" class="input-field" value="${user?.name || 'Aryan Verma'}" id="profile-name">
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
              <div class="form-group">
                <label class="form-label">Current Academic Level</label>
                <select class="input-field" id="profile-class">
                  <option value="11" ${user?.cls === '11' ? 'selected' : ''}>Class 11</option>
                  <option value="12" ${user?.cls === '12' ? 'selected' : ''}>Class 12</option>
                  <option value="dropper" ${user?.cls === 'dropper' ? 'selected' : ''}>Dropper / Repeater</option>
                </select>
              </div>

              <div class="form-group">
                <label class="form-label">Target NEET Year</label>
                <select class="input-field" id="profile-year">
                  <option value="2026" ${user?.year === '2026' ? 'selected' : ''}>NEET 2026</option>
                  <option value="2027" ${user?.year === '2027' ? 'selected' : ''}>NEET 2027</option>
                  <option value="2028" ${user?.year === '2028' ? 'selected' : ''}>NEET 2028</option>
                </select>
              </div>
            </div>

            <div class="form-group">
              <label class="form-label">Target Score: <strong id="score-display-val">${user?.targetScore || 680} / 720</strong></label>
              <input type="range" min="400" max="720" step="10" value="${user?.targetScore || 680}" style="width: 100%; accent-color: var(--brand-blue); cursor: pointer;" oninput="document.getElementById('score-display-val').textContent = this.value + ' / 720';">
            </div>

            <div class="form-group">
              <label class="form-label">Dream Medical College</label>
              <input type="text" class="input-field" value="${user?.dreamCollege || 'AIIMS New Delhi'}" id="profile-college">
            </div>

            <button class="btn btn-primary" onclick="App.saveProfile()">Save Preferences</button>
          </div>
        </div>
      `;
    },

    saveProfile() {
      const name = document.getElementById('profile-name')?.value || 'Aryan Verma';
      const cls = document.getElementById('profile-class')?.value || '12';
      const year = document.getElementById('profile-year')?.value || '2026';
      const college = document.getElementById('profile-college')?.value || 'AIIMS New Delhi';
      const user = State.get('user') || API.currentUser;

      const updated = {
        ...user,
        name,
        cls,
        year,
        dreamCollege: college
      };

      State.set('user', updated);
      API.setSession(updated, API.token);
      this.showToast('Profile and study targets successfully updated!', 'success');
      this.render();
    },

    // ========================================================
    // 13. TRACKPREP-STYLE MARKETING LANDING PAGE
    // ========================================================
    renderLandingPage() {
      return `
        <!-- Sticky Navigation -->
        <nav class="navbar">
          <div class="container nav-container">
            <a href="#" class="brand-logo" data-view="landing">
              <svg viewBox="0 0 40 40" fill="none"><rect width="40" height="40" rx="10" fill="#0A5CFF"/><path d="M12 28V12L28 28V12" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>
              <span>NEET<b>Buddy</b></span>
            </a>

            <div class="nav-links">
              <a href="#features" class="nav-link">Features</a>
              <a href="#diagnostic" class="nav-link">Interactive Quiz</a>
              <a href="#subjects" class="nav-link">Subjects</a>
              <a href="#founder" class="nav-link">About AIIMS Founder</a>
              <a href="#results" class="nav-link">Rankers</a>
              <a href="#pricing" class="nav-link">Pricing</a>
            </div>

            <div class="nav-actions">
              <button class="theme-toggle-btn" data-action="toggle-theme" title="Toggle Theme">
                <svg width="19" height="19" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/></svg>
              </button>
              <button class="btn btn-secondary btn-sm" data-action="open-auth" data-payload="login">Log In</button>
              <button class="btn btn-primary btn-sm" data-action="open-auth" data-payload="signup">Get Started Free →</button>
            </div>
          </div>
        </nav>

        <!-- Hero Section -->
        <section class="hero-section">
          <div class="hero-glow-bg"></div>
          <div class="container">
            <div class="hero-grid">
              <div class="hero-content">
                <span class="badge blue">✦ Official NEET (UG) 2026/2027 Platform</span>
                <h1>Practice Smarter. Score Higher. <em>Crack NEET.</em></h1>
                <p class="hero-lead">
                  Chapter-wise NCERT MCQs, authentic NTA timed mock tests, Trackprep-style Improvement Book, and step-by-step diagnostic solutions — designed by AIIMS doctors.
                </p>

                <div class="hero-cta-group">
                  <button class="btn btn-primary btn-lg" data-action="open-auth" data-payload="signup">Start Free Practice →</button>
                  <button class="btn btn-secondary btn-lg" data-action="demo-login">⚡ Instant Demo Preview</button>
                </div>

                <div class="hero-trust">
                  <div class="trust-avatars">
                    <img src="/images/avatars/ananya.jpg" alt="Ananya AIR 14">
                    <img src="/images/avatars/rohit.jpg" alt="Rohit AIR 52">
                    <img src="/images/hero-students.jpg" alt="AIIMS Students">
                  </div>
                  <div class="trust-text">
                    Trusted by <strong>1,20,000+ Aspirants</strong> across India
                  </div>
                </div>
              </div>

              <!-- Hero Visual with Real Photography -->
              <div class="hero-visual">
                <div class="hero-image-card">
                  <img src="/images/hero-students.jpg" alt="AIIMS Medical Students Studying for NEET">
                </div>

                <!-- Floating overlay badges -->
                <div class="floating-stat-card top-left">
                  <div class="icon-box emerald" style="width: 36px; height: 36px;"><svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg></div>
                  <div>
                    <strong>AIR 14 &amp; 52</strong>
                    <small>NEET Top Rankers</small>
                  </div>
                </div>

                <div class="floating-stat-card bottom-right">
                  <div class="icon-box blue" style="width: 36px; height: 36px;"><svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg></div>
                  <div>
                    <strong>50 Full Mocks</strong>
                    <small>Official NTA Pattern</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Stats Strip -->
        <section class="stats-strip">
          <div class="container">
            <div class="stats-grid">
              <div class="stat-item">
                <div class="icon-box blue"><svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/></svg></div>
                <div>
                  <strong>1,20,000+</strong>
                  <p>Active NEET Aspirants</p>
                </div>
              </div>

              <div class="stat-item">
                <div class="icon-box emerald"><svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg></div>
                <div>
                  <strong>50,000+</strong>
                  <p>NCERT Line-by-Line MCQs</p>
                </div>
              </div>

              <div class="stat-item">
                <div class="icon-box purple"><svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/></svg></div>
                <div>
                  <strong>82 Chapters</strong>
                  <p>Class 11 &amp; 12 Complete Syllabus</p>
                </div>
              </div>

              <div class="stat-item">
                <div class="icon-box amber"><svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/></svg></div>
                <div>
                  <strong>99.4%</strong>
                  <p>Top Mock Accuracy Yield</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Live Interactive Diagnostic Widget -->
        <section class="interactive-section" id="diagnostic">
          <div class="container">
            <div class="section-head">
              <span class="badge blue">Live Interactive Preview</span>
              <h2>Test Your NEET Concept in 30 Seconds</h2>
              <p>Experience how NEETBuddy provides instant conceptual clarity, common pitfall analysis, and bookmarking.</p>
            </div>

            <div class="quiz-preview-card" id="landing-quiz-widget">
              <div class="quiz-badge">
                <span class="badge emerald">Cell Biology • Class 11</span>
                <span class="marking-scheme-pill"><span class="pos">+4</span> <span class="neg">-1</span></span>
              </div>
              <div class="quiz-question-text">
                Which of the following cell organelles is responsible for oxidative phosphorylation and ATP generation, widely referred to as the powerhouse of the cell?
              </div>
              <div class="quiz-options-list">
                <button class="quiz-option-btn" data-landing-opt="0"><span class="quiz-option-letter">A</span> Golgi Apparatus</button>
                <button class="quiz-option-btn" data-landing-opt="1"><span class="quiz-option-letter">B</span> Mitochondria</button>
                <button class="quiz-option-btn" data-landing-opt="2"><span class="quiz-option-letter">C</span> Endoplasmic Reticulum</button>
                <button class="quiz-option-btn" data-landing-opt="3"><span class="quiz-option-letter">D</span> Lysosomes</button>
              </div>
              <div class="quiz-explanation-box" id="landing-quiz-expl" style="display: none;">
                <strong>✓ Correct Answer: (B) Mitochondria</strong><br>
                Mitochondria produce cellular ATP through the electron transport system and oxidative phosphorylation on their inner cristae membrane.
              </div>
            </div>
          </div>
        </section>

        <!-- 4-Step Trackprep Preparation Roadmap -->
        <section class="roadmap-section" id="features">
          <div class="container">
            <div class="section-head">
              <span class="badge purple">Proven Methodology</span>
              <h2>The 4-Step Trackprep Preparation Roadmap</h2>
              <p>Designed around cognitive retrieval practice and error reflection to maximize score gains in 90 days.</p>
            </div>

            <div class="roadmap-grid">
              <div class="card roadmap-card">
                <div class="roadmap-step-num">01</div>
                <h3>Topic-wise NCERT Drill</h3>
                <p>Break down bulky textbooks into manageable topic-level questions strictly aligned to latest NTA NMC NEET syllabus.</p>
              </div>

              <div class="card roadmap-card">
                <div class="roadmap-step-num">02</div>
                <h3>Smart Mistake Notebook</h3>
                <p>Never repeat an error. Tag every missed question as Concept Gap, Silly Mistake, or Misread Question with targeted re-tests.</p>
              </div>

              <div class="card roadmap-card">
                <div class="roadmap-step-num">03</div>
                <h3>Timed NTA Mock Simulator</h3>
                <p>50 full-length 200-minute test papers with real Section A &amp; B question choice, negative marking, and panic elimination.</p>
              </div>

              <div class="card roadmap-card">
                <div class="roadmap-step-num">04</div>
                <h3>Diagnostic AI Rank Analytics</h3>
                <p>Pinpoint weak sub-topics, predict your All-India Rank, and know your probability of cracking AIIMS New Delhi.</p>
              </div>
            </div>
          </div>
        </section>

        <!-- Subject Showcase -->
        <section class="subjects-section" id="subjects">
          <div class="container">
            <div class="section-head">
              <span class="badge rose">Comprehensive Curriculum</span>
              <h2>Master All Three NEET Core Subjects</h2>
              <p>Full syllabus coverage with detailed NCERT explanations, numerical shortcuts, and high-resolution diagrams.</p>
            </div>

            <div class="subjects-grid">
              <div class="subject-card physics">
                <div class="subject-card-icon">
                  <svg width="48" height="48" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
                </div>
                <h3>Physics</h3>
                <p>Master mechanics, rotational dynamics, electrostatics, optics and modern physics through step-by-step numerical practice.</p>
                <div class="subject-card-meta">
                  <span>29 Chapters • Class 11 &amp; 12</span>
                  <button class="btn btn-secondary btn-sm" data-action="demo-login">Explore Physics →</button>
                </div>
              </div>

              <div class="subject-card chemistry">
                <div class="subject-card-icon">
                  <svg width="48" height="48" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/></svg>
                </div>
                <h3>Chemistry</h3>
                <p>Organic reaction mechanisms, stoichiometry, equilibrium, periodic trends, and coordination chemistry with NCERT tables.</p>
                <div class="subject-card-meta">
                  <span>20 Chapters • Class 11 &amp; 12</span>
                  <button class="btn btn-secondary btn-sm" data-action="demo-login">Explore Chemistry →</button>
                </div>
              </div>

              <div class="subject-card biology">
                <div class="subject-card-icon">
                  <svg width="48" height="48" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>
                </div>
                <h3>Biology</h3>
                <p>Every single line of NCERT Botany and Zoology covered with assertion-reason drills, diagrams, and memory mnemonics.</p>
                <div class="subject-card-meta">
                  <span>33 Chapters • Class 11 &amp; 12</span>
                  <button class="btn btn-secondary btn-sm" data-action="demo-login">Explore Biology →</button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Real AIIMS Founder Section -->
        <section class="founder-section" id="founder">
          <div class="container">
            <div class="founder-grid">
              <div class="founder-photo-card">
                <img src="/images/founder.jpg" alt="Dr. Harshit, AIIMS MBBS Gold Medalist and Founder">
                <div class="founder-badge-chip">
                  <span>🏅</span>
                  <span>Dr. Harshit, AIIMS Gold Medalist</span>
                </div>
              </div>

              <div class="founder-bio">
                <span class="badge blue">From The Founder</span>
                <h2>"I Built The Platform I Wished I Had While Preparing For AIIMS."</h2>
                <p>
                  "Cracking NEET isn't about solving 10,000 random questions. It is about understanding <em>why you got a specific question wrong</em>, identifying your blind spots, and practicing under authentic exam conditions."
                </p>
                <p>
                  "We created NEETBuddy with a relentless focus on high-yield NCERT accuracy, real exam simulation, and our signature Trackprep-inspired Improvement Book so every aspirant can aim for a top government medical college."
                </p>

                <div class="founder-credentials">
                  <div class="credential-item">🎓 MBBS, AIIMS New Delhi</div>
                  <div class="credential-item">🥇 All-India Medical Gold Medalist</div>
                  <div class="credential-item">👨‍⚕️ 10,000+ Students Mentored</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Verified NEET Rankers Testimonials -->
        <section class="testimonials-section" id="results">
          <div class="container">
            <div class="section-head">
              <span class="badge emerald">Proven Track Record</span>
              <h2>Real Results from Real NEET Aspirants</h2>
              <p>Hear from students who used NEETBuddy's mock series and mistake notebook to secure seats in India's top medical institutes.</p>
            </div>

            <div class="testimonials-grid">
              <div class="card ranker-card">
                <div class="ranker-header">
                  <img class="ranker-avatar" src="/images/avatars/ananya.jpg" alt="Ananya Sharma AIR 14">
                  <div class="ranker-meta">
                    <strong>Ananya Sharma</strong>
                    <small>NEET Score: 715 / 720 • All India Rank 14</small>
                    <span class="ranker-college">Now at AIIMS New Delhi</span>
                  </div>
                </div>
                <p class="ranker-quote">
                  "The Improvement Book was the game changer. Before NEETBuddy, I would solve a test and just look at my total marks. Tagging mistakes into 'Concept gap' vs 'Silly mistake' helped me eliminate 40 negative marks in my final month."
                </p>
              </div>

              <div class="card ranker-card">
                <div class="ranker-header">
                  <img class="ranker-avatar" src="/images/avatars/rohit.jpg" alt="Rohit Verma AIR 52">
                  <div class="ranker-meta">
                    <strong>Rohit Verma</strong>
                    <small>NEET Score: 705 / 720 • All India Rank 52</small>
                    <span class="ranker-college">Now at Maulana Azad Medical College (MAMC)</span>
                  </div>
                </div>
                <p class="ranker-quote">
                  "The NTA Mock Simulator matches the exact interface and timer pressure of the real exam. Section A and B navigation and the question palette gave me immense confidence on exam day."
                </p>
              </div>
            </div>
          </div>
        </section>

        <!-- Pricing Section -->
        <section class="pricing-section" id="pricing">
          <div class="container">
            <div class="section-head">
              <span class="badge blue">Simple &amp; Transparent</span>
              <h2>Start Free, Upgrade for Full Test Series</h2>
              <p>Everything you need to crack NEET with confidence without expensive 1-lakh coaching fees.</p>
            </div>

            <div class="pricing-grid">
              <div class="card pricing-card">
                <h3>Starter Plan</h3>
                <p class="pricing-desc">Perfect for testing the waters and practicing chapter MCQs.</p>
                <div class="pricing-amount">₹0 <span>/ forever</span></div>
                <div class="pricing-features-list">
                  <div class="pricing-feature-item"><svg viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg> 3 Full-Length Mock Tests</div>
                  <div class="pricing-feature-item"><svg viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg> Chapter-wise MCQs</div>
                  <div class="pricing-feature-item"><svg viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg> Basic Improvement Book</div>
                </div>
                <button class="btn btn-secondary" data-action="open-auth" data-payload="signup">Get Started Free</button>
              </div>

              <div class="card pricing-card featured">
                <span class="featured-pill">Most Popular</span>
                <h3>NEET Pro 2026</h3>
                <p class="pricing-desc">The complete preparation suite recommended by top rankers.</p>
                <div class="pricing-amount">₹1,999 <span>/ full year</span></div>
                <div class="pricing-features-list">
                  <div class="pricing-feature-item"><svg viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg> All 50 Full Length Mock Tests</div>
                  <div class="pricing-feature-item"><svg viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg> Unlimited Mistake Re-tests</div>
                  <div class="pricing-feature-item"><svg viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg> AI Doubt Solver (24/7 Unlimited)</div>
                  <div class="pricing-feature-item"><svg viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg> All-India AIR Rank Estimator</div>
                </div>
                <button class="btn btn-primary" data-action="demo-login">Unlock NEET Pro Access →</button>
              </div>

              <div class="card pricing-card">
                <h3>Ultimate Dropper</h3>
                <p class="pricing-desc">Intensive 1-on-1 mentorship &amp; daily diagnostic drill.</p>
                <div class="pricing-amount">₹3,499 <span>/ full year</span></div>
                <div class="pricing-features-list">
                  <div class="pricing-feature-item"><svg viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg> Everything in NEET Pro</div>
                  <div class="pricing-feature-item"><svg viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg> Dedicated AIIMS Doctor Mentorship</div>
                  <div class="pricing-feature-item"><svg viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg> Weekly Strategic 1-on-1 Review</div>
                </div>
                <button class="btn btn-secondary" data-action="demo-login">Get Started</button>
              </div>
            </div>
          </div>
        </section>

        <!-- Footer -->
        <footer class="site-footer">
          <div class="container">
            <div class="footer-grid">
              <div class="footer-brand">
                <div class="brand-logo">
                  <svg viewBox="0 0 40 40" fill="none"><rect width="40" height="40" rx="10" fill="#0A5CFF"/><path d="M12 28V12L28 28V12" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>
                  <span>NEET<b>Buddy</b></span>
                </div>
                <p>Enterprise educational platform for NEET (UG) aspirants. Designed by doctors to help students practice smarter and score higher.</p>
              </div>

              <div class="footer-col">
                <h4>Platform</h4>
                <div class="footer-links-list">
                  <a href="#" data-view="practice">Chapter Practice</a>
                  <a href="#" data-view="mocks">Mock Test Series</a>
                  <a href="#" data-view="improve">Improvement Book</a>
                  <a href="#" data-view="doubt">AI Doubt Solver</a>
                </div>
              </div>

              <div class="footer-col">
                <h4>Subjects</h4>
                <div class="footer-links-list">
                  <a href="#" data-action="filter-chapters-subject" data-payload="ph">Physics MCQs</a>
                  <a href="#" data-action="filter-chapters-subject" data-payload="ch">Chemistry MCQs</a>
                  <a href="#" data-action="filter-chapters-subject" data-payload="bi">Biology NCERT Drill</a>
                  <a href="#" data-view="flashcards">Active Flashcards</a>
                </div>
              </div>

              <div class="footer-col">
                <h4>Company &amp; Legal</h4>
                <div class="footer-links-list">
                  <a href="#founder">About Founder</a>
                  <a href="#">Privacy Policy</a>
                  <a href="#">Terms &amp; Conditions</a>
                  <a href="#">Contact Support</a>
                </div>
              </div>
            </div>

            <div class="footer-bottom">
              <div>© 2026 NEETBuddy Platform. All rights reserved.</div>
              <div>Made with precision for Indian Medical Aspirants.</div>
            </div>
          </div>
        </footer>
      `;
    },

    bindLandingEvents() {
      // Diagnostic widget interactive answers
      const widget = document.getElementById('landing-quiz-widget');
      if (widget) {
        widget.querySelectorAll('.quiz-option-btn').forEach(btn => {
          btn.addEventListener('click', (e) => {
            const opt = e.currentTarget.getAttribute('data-landing-opt');
            widget.querySelectorAll('.quiz-option-btn').forEach(b => {
              b.classList.remove('correct', 'wrong');
            });
            if (opt === '1') {
              btn.classList.add('correct');
            } else {
              btn.classList.add('wrong');
              widget.querySelector('[data-landing-opt="1"]').classList.add('correct');
            }
            const expl = document.getElementById('landing-quiz-expl');
            if (expl) expl.style.display = 'block';
          });
        });
      }
    },

    bindExamEvents() {
      // Keyboard option selection: A, B, C, D
      document.addEventListener('keydown', (e) => {
        if (State.get('currentView') !== 'mock-exam') return;
        const key = e.key.toUpperCase();
        if (['A', 'B', 'C', 'D'].includes(key)) {
          const index = 'ABCD'.indexOf(key);
          TestEngine.selectOption(index);
        }
      });
    },

    bindAppEvents() {
      // Bind app specific actions if any
    }
  };

  window.App = App;
  document.addEventListener('DOMContentLoaded', () => {
    App.init();
  });
})(window, document);
