/**
 * NEETBuddy Improvement Book (Trackprep Signature Feature)
 * Turns student mistakes into rank improvements through root-cause tagging,
 * targeted re-testing, and concept mastery tracking.
 */
(function(window) {
  'use strict';

  const ImprovementManager = {
    MISTAKE_TYPES: [
      { id: 'Concept gap', label: 'Concept Gap', color: '#f43f5e', bg: 'rgba(244, 63, 94, 0.12)', desc: 'Theory or governing formula was unclear.' },
      { id: 'Silly mistake', label: 'Silly Mistake', color: '#3b82f6', bg: 'rgba(59, 130, 246, 0.12)', desc: 'Simple slip, missed sign, or minor oversight.' },
      { id: 'Calculation error', label: 'Calculation Error', color: '#10b981', bg: 'rgba(16, 185, 129, 0.12)', desc: 'Math calculation or unit conversion error.' },
      { id: 'Misread question', label: 'Misread Question', color: '#f59e0b', bg: 'rgba(245, 158, 11, 0.12)', desc: 'Missed "INCORRECT", "NOT", or misidentified variables.' }
    ],

    async loadMistakes() {
      return await API.getMistakes();
    },

    async tag(questionId, reason) {
      const res = await API.tagMistake(questionId, reason);
      State.emit('mistakesUpdated');
      return res;
    },

    async toggleMastery(questionId, currentMasteredState) {
      await API.masterMistake(questionId, !currentMasteredState);
      State.emit('mistakesUpdated');
    },

    async startReattempt(filterSubject = 'all', filterType = 'all') {
      const data = await API.getMistakes();
      let mistakes = data.mistakes.filter(m => !m.mastered);

      if (filterSubject !== 'all') {
        mistakes = mistakes.filter(m => m.question && m.question.s === filterSubject);
      }
      if (filterType !== 'all') {
        mistakes = mistakes.filter(m => m.reason === filterType);
      }

      if (mistakes.length === 0) {
        alert('No pending mistakes matching this filter! Great work or start practicing to add new questions.');
        return;
      }

      const retestQuestions = mistakes.map((m, idx) => ({
        ...m.question,
        testQNum: idx + 1,
        section: 'Mistake Re-attempt'
      }));

      TestEngine.initTest({
        id: 'reattempt_' + Date.now(),
        title: `Improvement Re-Test: ${filterType !== 'all' ? filterType : 'All Weak Areas'}`,
        durationMinutes: Math.max(15, retestQuestions.length * 2),
        totalMarks: retestQuestions.length * 4,
        questions: retestQuestions
      });
    }
  };

  window.ImprovementManager = ImprovementManager;
})(window);
