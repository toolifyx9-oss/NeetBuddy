'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { 
  Clock, 
  Bookmark, 
  BookmarkCheck, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  ChevronLeft, 
  ChevronRight, 
  Flag, 
  Award, 
  BarChart3, 
  X,
  Sparkles,
  RotateCcw
} from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { TestSubmission } from '@/types';

export default function TestRunnerModal() {
  const { 
    activeTest, 
    selectOption, 
    toggleMarkQuestion, 
    setCurrentQuestionIndex, 
    tickTimer, 
    submitCurrentTest, 
    cancelTest,
    toggleBookmark,
    isBookmarked,
    reviewSubmission,
    setReviewSubmission,
    setActiveTab
  } = useStore();

  const [showConfirmSubmit, setShowConfirmSubmit] = useState(false);
  const [selectedSection, setSelectedSection] = useState<'all' | 'ph' | 'ch' | 'bi'>('all');

  // Live Timer tick
  useEffect(() => {
    if (!activeTest || activeTest.timeRemainingSeconds <= 0) return;
    const interval = setInterval(() => {
      tickTimer();
    }, 1000);
    return () => clearInterval(interval);
  }, [activeTest, tickTimer]);

  // Auto-submit when time reaches 0
  useEffect(() => {
    if (activeTest && activeTest.timeRemainingSeconds === 0) {
      handleFinalSubmit();
    }
  }, [activeTest?.timeRemainingSeconds]);

  // Confetti trigger on good submission
  useEffect(() => {
    if (reviewSubmission && reviewSubmission.accuracy >= 70) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  }, [reviewSubmission]);

  if (!activeTest && !reviewSubmission) return null;

  // Format seconds to HH:MM:SS or MM:SS
  const formatTime = (secs: number) => {
    const hours = Math.floor(secs / 3600);
    const minutes = Math.floor((secs % 3600) / 60);
    const seconds = secs % 60;
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleFinalSubmit = () => {
    setShowConfirmSubmit(false);
    submitCurrentTest();
  };

  // ----------------------------------------------------
  // 1. POST-TEST SUBMISSION REVIEW SCREEN
  // ----------------------------------------------------
  if (reviewSubmission) {
    const sub = reviewSubmission;
    return (
      <div className="fixed inset-0 z-50 overflow-y-auto bg-[#0D1117] flex flex-col">
        {/* Review Header */}
        <header className="h-16 border-b border-white/[0.08] bg-[#161B22]/90 backdrop-blur-md px-8 flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <span className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
              <Award className="w-5 h-5" />
            </span>
            <div>
              <h2 className="text-sm font-bold text-[#F0F6FC]">{sub.title} - Score Report</h2>
              <p className="text-xs text-[#8B949E]">
                Completed on {new Date(sub.date).toLocaleDateString()} • Time Spent: {formatTime(sub.timeSpentSeconds)}
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              setReviewSubmission(null);
              setActiveTab('improvement');
            }}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition-all shadow-md shadow-indigo-600/20"
          >
            <span>Go to Improvement Book</span>
            <X className="w-4 h-4 ml-1" />
          </button>
        </header>

        {/* Score Telemetry Cards */}
        <div className="max-w-6xl w-full mx-auto p-6 space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-white/[0.025] border border-white/[0.08]">
              <p className="text-xs font-medium text-[#8B949E]">Final Score</p>
              <p className="text-3xl font-extrabold text-[#F0F6FC] mt-1">
                {sub.score}{' '}
                <span className="text-sm font-normal text-[#8B949E]">/ {sub.maxScore}</span>
              </p>
              <div className="mt-2 text-[11px] text-emerald-400 font-medium flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> NEET Ranking Projected
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white/[0.025] border border-white/[0.08]">
              <p className="text-xs font-medium text-[#8B949E]">Accuracy Rate</p>
              <p className="text-3xl font-extrabold text-emerald-400 mt-1">
                {sub.accuracy}%
              </p>
              <div className="mt-2 text-[11px] text-[#8B949E]">
                {sub.correctCount} Correct • {sub.incorrectCount} Wrong
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white/[0.025] border border-white/[0.08]">
              <p className="text-xs font-medium text-[#8B949E]">Time per Question</p>
              <p className="text-3xl font-extrabold text-cyan-400 mt-1">
                {sub.correctCount + sub.incorrectCount > 0
                  ? Math.round(sub.timeSpentSeconds / (sub.correctCount + sub.incorrectCount))
                  : 0}s
              </p>
              <div className="mt-2 text-[11px] text-[#8B949E]">
                Total: {Math.round(sub.timeSpentSeconds / 60)} mins
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white/[0.025] border border-white/[0.08]">
              <p className="text-xs font-medium text-[#8B949E]">Mistakes Logged</p>
              <p className="text-3xl font-extrabold text-rose-400 mt-1">
                {sub.incorrectCount}
              </p>
              <div className="mt-2 text-[11px] text-rose-400 font-medium">
                Auto-saved for revision
              </div>
            </div>
          </div>

          {/* Subject Breakdown */}
          <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-4">
            <h3 className="text-xs font-semibold text-[#8B949E] uppercase tracking-wider">
              Subject-Wise Breakdown
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {Object.entries(sub.subjectScores).map(([subKey, stat]) => (
                <div key={subKey} className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                  <p className="text-xs font-bold text-[#F0F6FC] capitalize">{subKey}</p>
                  <p className="text-xl font-bold text-[#F0F6FC] mt-1">
                    {stat.score} <span className="text-xs font-normal text-[#8B949E]">/ {stat.max}</span>
                  </p>
                  <p className="text-[11px] text-[#8B949E] mt-1">
                    {stat.correct} Correct • {stat.incorrect} Wrong
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Detailed Question Review List */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-[#F0F6FC]">Question-by-Question Detailed Review</h3>
            <div className="space-y-4">
              {sub.questions.map((q, idx) => {
                const userChoice = sub.answers[q.id];
                const isCorrect = userChoice === q.correctAnswer;
                const isUnattempted = userChoice === undefined;

                return (
                  <div
                    key={q.id}
                    className={`p-6 rounded-2xl border transition-all ${
                      isCorrect
                        ? 'bg-emerald-500/[0.02] border-emerald-500/20'
                        : isUnattempted
                        ? 'bg-white/[0.015] border-white/[0.06]'
                        : 'bg-rose-500/[0.02] border-rose-500/20'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono px-2 py-0.5 rounded-md bg-white/[0.06] text-[#8B949E]">
                          Q{idx + 1}
                        </span>
                        <span className="text-xs font-medium text-[#8B949E]">
                          {q.subjectName} • {q.chapter}
                        </span>
                      </div>
                      <div>
                        {isCorrect ? (
                          <span className="flex items-center gap-1 text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg">
                            <CheckCircle2 className="w-3.5 h-3.5" /> +4 Correct
                          </span>
                        ) : isUnattempted ? (
                          <span className="flex items-center gap-1 text-xs font-medium text-[#8B949E] bg-white/[0.05] px-2.5 py-1 rounded-lg">
                            <AlertCircle className="w-3.5 h-3.5" /> 0 Skipped
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 text-xs font-bold text-rose-400 bg-rose-500/10 px-2.5 py-1 rounded-lg">
                            <XCircle className="w-3.5 h-3.5" /> -1 Incorrect
                          </span>
                        )}
                      </div>
                    </div>

                    <p className="text-sm font-medium text-[#F0F6FC] leading-relaxed mb-4">
                      {q.question}
                    </p>

                    {/* Options list */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
                      {q.options.map((opt, optIdx) => {
                        const isChosen = userChoice === optIdx;
                        const isTheCorrect = q.correctAnswer === optIdx;

                        let optClasses = 'bg-white/[0.02] border-white/[0.06] text-[#8B949E]';
                        if (isTheCorrect) {
                          optClasses = 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300 font-medium';
                        } else if (isChosen && !isCorrect) {
                          optClasses = 'bg-rose-500/10 border-rose-500/40 text-rose-300 font-medium';
                        }

                        return (
                          <div
                            key={optIdx}
                            className={`p-3 rounded-xl border text-xs flex items-center gap-3 ${optClasses}`}
                          >
                            <span className="w-5 h-5 rounded-full flex items-center justify-center font-bold text-[10px] border border-current">
                              {String.fromCharCode(65 + optIdx)}
                            </span>
                            <span>{opt}</span>
                          </div>
                        );
                      })}
                    </div>

                    {/* Explanation */}
                    <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.04] text-xs space-y-1.5">
                      <p className="font-semibold text-indigo-400">NCERT Step-by-Step Solution:</p>
                      <p className="text-[#8B949E] whitespace-pre-line leading-relaxed">
                        {q.explanation.split('|').join('\n')}
                      </p>
                      {q.commonMistake && (
                        <p className="text-rose-400 pt-1 text-[11px]">
                          <strong>Mistake Trap:</strong> {q.commonMistake}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ----------------------------------------------------
  // 2. ACTIVE LIVE TEST RUNNER SCREEN
  // ----------------------------------------------------
  const currentQ = activeTest.questions[activeTest.currentQuestionIndex];
  const userSelectedOption = activeTest.answers[currentQ.id];
  const isQuestionMarked = activeTest.markedForReview.includes(currentQ.id);
  const isTimeCritical = activeTest.timeRemainingSeconds < 300; // < 5 mins

  const filteredQuestions = activeTest.questions.filter((q) => {
    if (selectedSection === 'all') return true;
    return q.subjectCode === selectedSection;
  });

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-[#0D1117] flex flex-col select-none">
      {/* Top Test Navigation Bar */}
      <header className="h-16 border-b border-white/[0.08] bg-[#161B22]/90 backdrop-blur-md px-6 flex items-center justify-between flex-shrink-0 z-20">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold">
              Live NTA Exam
            </span>
          </div>
          <span className="text-sm font-bold text-[#F0F6FC] truncate max-w-xs md:max-w-md">
            {activeTest.title}
          </span>
        </div>

        {/* Section Tabs (Physics, Chemistry, Biology) */}
        <div className="hidden md:flex items-center p-1 rounded-xl bg-white/[0.03] border border-white/[0.06] text-xs">
          {(['all', 'ph', 'ch', 'bi'] as const).map((sec) => (
            <button
              key={sec}
              onClick={() => setSelectedSection(sec)}
              className={`px-3 py-1 rounded-lg font-medium transition-all ${
                selectedSection === sec
                  ? 'bg-white/[0.1] text-white shadow'
                  : 'text-[#8B949E] hover:text-[#F0F6FC]'
              }`}
            >
              {sec === 'all'
                ? 'All Sections'
                : sec === 'ph'
                ? 'Physics'
                : sec === 'ch'
                ? 'Chemistry'
                : 'Biology'}
            </button>
          ))}
        </div>

        {/* Timer & Submit */}
        <div className="flex items-center gap-4">
          <div
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl border text-xs font-mono font-bold transition-colors ${
              isTimeCritical
                ? 'bg-rose-500/10 border-rose-500/30 text-rose-400 animate-pulse'
                : 'bg-white/[0.04] border-white/[0.08] text-[#F0F6FC]'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>{formatTime(activeTest.timeRemainingSeconds)}</span>
          </div>

          <button
            onClick={() => setShowConfirmSubmit(true)}
            className="px-4 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-md shadow-emerald-600/20"
          >
            Submit Test
          </button>
        </div>
      </header>

      {/* Main Runner Body */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left / Center: Question & Options View */}
        <div className="flex-1 flex flex-col justify-between overflow-y-auto p-8 border-r border-white/[0.08]">
          <div className="max-w-3xl w-full mx-auto space-y-6">
            {/* Question Info Bar */}
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
              <div className="flex items-center gap-2.5">
                <span className="text-xs font-mono font-bold text-indigo-400 px-2 py-0.5 rounded bg-indigo-500/10 border border-indigo-500/20">
                  Question {activeTest.currentQuestionIndex + 1} of {activeTest.questions.length}
                </span>
                <span className="text-xs text-[#8B949E] font-medium">
                  {currentQ.subjectName} • {currentQ.chapter}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleBookmark(currentQ.id)}
                  className="flex items-center gap-1.5 text-xs text-[#8B949E] hover:text-[#F0F6FC] transition-colors p-1.5 rounded-lg hover:bg-white/[0.05]"
                  title="Bookmark question"
                >
                  {isBookmarked(currentQ.id) ? (
                    <BookmarkCheck className="w-4 h-4 text-indigo-400" />
                  ) : (
                    <Bookmark className="w-4 h-4" />
                  )}
                  <span className="hidden sm:inline">Bookmark</span>
                </button>
              </div>
            </div>

            {/* Question Statement */}
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
              <p className="text-base text-[#F0F6FC] leading-relaxed font-medium">
                {currentQ.question}
              </p>
            </div>

            {/* 4 Options (A, B, C, D) */}
            <div className="space-y-3">
              {currentQ.options.map((option, optIdx) => {
                const isSelected = userSelectedOption === optIdx;
                return (
                  <button
                    key={optIdx}
                    onClick={() => selectOption(currentQ.id, optIdx)}
                    className={`w-full flex items-center gap-4 p-4 rounded-xl border text-left text-sm transition-all ${
                      isSelected
                        ? 'bg-indigo-600/15 border-indigo-500/50 text-[#F0F6FC] shadow-lg shadow-indigo-600/10'
                        : 'bg-white/[0.02] hover:bg-white/[0.04] border-white/[0.06] text-[#8B949E] hover:text-[#F0F6FC]'
                    }`}
                  >
                    <span
                      className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs transition-colors flex-shrink-0 ${
                        isSelected
                          ? 'bg-indigo-600 text-white'
                          : 'bg-white/[0.06] text-[#8B949E] border border-white/[0.08]'
                      }`}
                    >
                      {String.fromCharCode(65 + optIdx)}
                    </span>
                    <span className="font-normal leading-normal">{option}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Bottom Action Controls */}
          <div className="max-w-3xl w-full mx-auto pt-6 border-t border-white/[0.06] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button
                disabled={activeTest.currentQuestionIndex === 0}
                onClick={() => setCurrentQuestionIndex(activeTest.currentQuestionIndex - 1)}
                className="flex items-center gap-1 px-3 py-2 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.08] text-xs text-[#8B949E] hover:text-[#F0F6FC] disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>

              <button
                onClick={() => selectOption(currentQ.id, -1)}
                disabled={userSelectedOption === undefined}
                className="flex items-center gap-1 px-3 py-2 rounded-xl text-xs text-[#8B949E] hover:text-rose-400 hover:bg-white/[0.04] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Clear Selection</span>
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => toggleMarkQuestion(currentQ.id)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl border text-xs font-medium transition-colors ${
                  isQuestionMarked
                    ? 'bg-indigo-500/20 border-indigo-500/40 text-indigo-300'
                    : 'bg-white/[0.03] hover:bg-white/[0.06] border-white/[0.08] text-[#8B949E] hover:text-[#F0F6FC]'
                }`}
              >
                <Flag className="w-3.5 h-3.5" />
                <span>{isQuestionMarked ? 'Marked for Review' : 'Mark for Review'}</span>
              </button>

              <button
                onClick={() => {
                  if (activeTest.currentQuestionIndex < activeTest.questions.length - 1) {
                    setCurrentQuestionIndex(activeTest.currentQuestionIndex + 1);
                  } else {
                    setShowConfirmSubmit(true);
                  }
                }}
                className="flex items-center gap-1 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition-all shadow-md shadow-indigo-600/20"
              >
                <span>
                  {activeTest.currentQuestionIndex === activeTest.questions.length - 1
                    ? 'Save & Finish'
                    : 'Save & Next'}
                </span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Right: Question Palette Sidebar */}
        <aside className="w-80 flex-shrink-0 bg-[#161B22]/40 p-5 flex flex-col justify-between overflow-y-auto">
          <div className="space-y-5">
            <div>
              <h3 className="text-xs font-bold text-[#F0F6FC] uppercase tracking-wider">
                Question Palette
              </h3>
              <p className="text-[11px] text-[#8B949E] mt-0.5">
                Click any number to jump directly
              </p>
            </div>

            {/* Legend */}
            <div className="grid grid-cols-2 gap-2 text-[10px] text-[#8B949E] pt-2 border-t border-white/[0.06]">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-emerald-500" />
                <span>Answered</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-indigo-500" />
                <span>Marked Review</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-white/[0.1] border border-white/[0.2]" />
                <span>Visited</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-white/[0.03] border border-white/[0.05]" />
                <span>Not Visited</span>
              </div>
            </div>

            {/* Question numbers grid */}
            <div className="grid grid-cols-5 gap-2 pt-2 border-t border-white/[0.06]">
              {activeTest.questions.map((q, idx) => {
                const isCurrent = activeTest.currentQuestionIndex === idx;
                const isAnswered = activeTest.answers[q.id] !== undefined;
                const isMarked = activeTest.markedForReview.includes(q.id);
                const isVisited = activeTest.visitedQuestions.includes(q.id);

                let badgeColor = 'bg-white/[0.02] text-[#484F58] border-white/[0.04]';
                if (isMarked) {
                  badgeColor = 'bg-indigo-500 text-white font-bold shadow-md shadow-indigo-500/20';
                } else if (isAnswered) {
                  badgeColor = 'bg-emerald-600 text-white font-bold shadow-md shadow-emerald-600/20';
                } else if (isVisited) {
                  badgeColor = 'bg-white/[0.08] text-[#F0F6FC] border-white/[0.15]';
                }

                return (
                  <button
                    key={q.id}
                    onClick={() => setCurrentQuestionIndex(idx)}
                    className={`h-9 rounded-xl text-xs font-mono flex items-center justify-center transition-all ${badgeColor} ${
                      isCurrent ? 'ring-2 ring-indigo-400 ring-offset-2 ring-offset-[#0D1117] scale-105' : 'hover:scale-105'
                    }`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Bottom Cancel & Leave */}
          <div className="pt-4 border-t border-white/[0.08]">
            <button
              onClick={() => {
                if (confirm('Are you sure you want to exit? Your progress in this session will be lost.')) {
                  cancelTest();
                }
              }}
              className="w-full py-2 rounded-xl text-xs text-[#8B949E] hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
            >
              Cancel & Exit Session
            </button>
          </div>
        </aside>
      </div>

      {/* Submit Confirmation Modal */}
      <AnimatePresence>
        {showConfirmSubmit && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md bg-[#161B22] border border-white/[0.1] rounded-2xl p-6 shadow-2xl space-y-4"
            >
              <div className="flex items-center gap-3">
                <span className="p-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                  <BarChart3 className="w-5 h-5" />
                </span>
                <div>
                  <h3 className="text-base font-bold text-[#F0F6FC]">Confirm Test Submission</h3>
                  <p className="text-xs text-[#8B949E]">Check your response summary before final evaluation</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.025] border border-white/[0.06] space-y-2 text-xs">
                <div className="flex justify-between text-[#8B949E]">
                  <span>Total Questions:</span>
                  <span className="font-bold text-[#F0F6FC]">{activeTest.questions.length}</span>
                </div>
                <div className="flex justify-between text-emerald-400">
                  <span>Answered:</span>
                  <span className="font-bold">{Object.keys(activeTest.answers).length}</span>
                </div>
                <div className="flex justify-between text-indigo-400">
                  <span>Marked for Review:</span>
                  <span className="font-bold">{activeTest.markedForReview.length}</span>
                </div>
                <div className="flex justify-between text-rose-400">
                  <span>Unanswered:</span>
                  <span className="font-bold">
                    {activeTest.questions.length - Object.keys(activeTest.answers).length}
                  </span>
                </div>
              </div>

              <p className="text-xs text-[#8B949E]">
                Once submitted, your final score and rank telemetry will be computed, and any mistakes will be automatically cataloged into your Improvement Book.
              </p>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  onClick={() => setShowConfirmSubmit(false)}
                  className="px-4 py-2 rounded-xl text-xs font-medium text-[#8B949E] hover:text-[#F0F6FC] hover:bg-white/[0.04]"
                >
                  Continue Test
                </button>
                <button
                  onClick={handleFinalSubmit}
                  className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-md shadow-emerald-600/20"
                >
                  Submit & Evaluate
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
