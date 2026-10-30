/**
 * NEETBuddy Professional NTA NEET Mock Test Engine
 * Full-screen, authentic NTA computer-based exam simulator with official marking (+4 / -1),
 * Section A & B, countdown clock, full question palette, and AIR rank predictor.
 */
(function(window) {
  'use strict';

  const TestEngine = {
    timerInterval: null,

    initTest(testData) {
      const questions = testData.questions || [];
      const statusMap = {};
      questions.forEach((q, idx) => {
        statusMap[q.id] = idx === 0 ? 'not_answered' : 'not_visited';
      });

      const session = {
        id: testData.id || 'test_' + Date.now(),
        title: testData.title || 'NEET (UG) All-India Mock Test',
        questions,
        answers: {},
        status: statusMap,
        currentIndex: 0,
        activeSection: questions[0]?.section || 'Physics Sec A',
        secondsRemaining: (testData.durationMinutes || 200) * 60,
        totalSeconds: (testData.durationMinutes || 200) * 60,
        startedAt: Date.now()
      };

      State.set('activeTest', session);
      this.startTimer();
      State.navigate('mock-exam');
    },

    startTimer() {
      if (this.timerInterval) clearInterval(this.timerInterval);
      this.timerInterval = setInterval(() => {
        const test = State.get('activeTest');
        if (!test) {
          clearInterval(this.timerInterval);
          return;
        }

        if (test.secondsRemaining <= 1) {
          clearInterval(this.timerInterval);
          this.submitTest(true);
        } else {
          test.secondsRemaining--;
          State.emit('timerTick', test.secondsRemaining);
        }
      }, 1000);
    },

    formatTime(seconds) {
      const h = Math.floor(seconds / 3600);
      const m = Math.floor((seconds % 3600) / 60);
      const s = seconds % 60;
      return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
    },

    selectOption(optionIndex) {
      const test = State.get('activeTest');
      if (!test) return;
      const currentQ = test.questions[test.currentIndex];
      test.answers[currentQ.id] = optionIndex;
      test.status[currentQ.id] = 'answered';
      State.set('activeTest', { ...test });
    },

    clearResponse() {
      const test = State.get('activeTest');
      if (!test) return;
      const currentQ = test.questions[test.currentIndex];
      delete test.answers[currentQ.id];
      test.status[currentQ.id] = 'not_answered';
      State.set('activeTest', { ...test });
    },

    markForReview() {
      const test = State.get('activeTest');
      if (!test) return;
      const currentQ = test.questions[test.currentIndex];
      const hasAnswer = test.answers[currentQ.id] !== undefined;
      test.status[currentQ.id] = hasAnswer ? 'answered_marked' : 'marked';
      this.nextQuestion();
    },

    saveAndNext() {
      const test = State.get('activeTest');
      if (!test) return;
      const currentQ = test.questions[test.currentIndex];
      if (test.answers[currentQ.id] !== undefined) {
        test.status[currentQ.id] = 'answered';
      } else {
        test.status[currentQ.id] = 'not_answered';
      }
      this.nextQuestion();
    },

    nextQuestion() {
      const test = State.get('activeTest');
      if (!test) return;
      if (test.currentIndex < test.questions.length - 1) {
        test.currentIndex++;
        const nextQ = test.questions[test.currentIndex];
        if (test.status[nextQ.id] === 'not_visited') {
          test.status[nextQ.id] = 'not_answered';
        }
        test.activeSection = nextQ.section || test.activeSection;
        State.set('activeTest', { ...test });
      }
    },

    prevQuestion() {
      const test = State.get('activeTest');
      if (!test) return;
      if (test.currentIndex > 0) {
        test.currentIndex--;
        const prevQ = test.questions[test.currentIndex];
        test.activeSection = prevQ.section || test.activeSection;
        State.set('activeTest', { ...test });
      }
    },

    jumpToQuestion(index) {
      const test = State.get('activeTest');
      if (!test || index < 0 || index >= test.questions.length) return;
      test.currentIndex = index;
      const targetQ = test.questions[index];
      if (test.status[targetQ.id] === 'not_visited') {
        test.status[targetQ.id] = 'not_answered';
      }
      test.activeSection = targetQ.section || test.activeSection;
      State.set('activeTest', { ...test });
    },

    jumpToSection(sectionName) {
      const test = State.get('activeTest');
      if (!test) return;
      const index = test.questions.findIndex(q => q.section === sectionName);
      if (index !== -1) {
        this.jumpToQuestion(index);
      }
    },

    getPaletteCounts() {
      const test = State.get('activeTest');
      if (!test) return { answered: 0, not_answered: 0, marked: 0, answered_marked: 0, not_visited: 0 };
      const counts = {
        answered: 0,
        not_answered: 0,
        marked: 0,
        answered_marked: 0,
        not_visited: 0
      };
      Object.values(test.status).forEach(status => {
        if (counts[status] !== undefined) counts[status]++;
      });
      return counts;
    },

    async submitTest(forceAutoSubmit = false) {
      if (this.timerInterval) clearInterval(this.timerInterval);
      const test = State.get('activeTest');
      if (!test) return;

      const timeSpent = test.totalSeconds - test.secondsRemaining;
      const result = await API.submitTest(test.id, test.answers, timeSpent);

      State.set('lastScorecard', result);
      State.set('activeTest', null);
      State.navigate('test-scorecard');
    }
  };

  window.TestEngine = TestEngine;
})(window);
