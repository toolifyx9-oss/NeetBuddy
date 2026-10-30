/**
 * NEETBuddy AI Doubt Solver Controller
 * Socratic question-bank assistant with step-by-step logic, NCERT reference principles,
 * and relevant previous year question (PYQ) recommendations.
 */
(function(window) {
  'use strict';

  const DoubtSolver = {
    samples: [
      { text: "Explain Newton's second law of motion with friction", subject: 'ph' },
      { text: "How to find dimensional formula for Work and Energy?", subject: 'ph' },
      { text: "Difference between Ascomycetes and Basidiomycetes", subject: 'bi' },
      { text: "What is Binomial Nomenclature rules by Linnaeus?", subject: 'bi' },
      { text: "IUPAC naming of organic alcohols and alkyl halides", subject: 'ch' },
      { text: "Heterocysts role in Nostoc and Anabaena", subject: 'bi' }
    ],

    async ask(subject, questionText) {
      if (!questionText || questionText.trim().length === 0) return null;
      return await API.askDoubt(subject, questionText);
    }
  };

  window.DoubtSolver = DoubtSolver;
})(window);
