'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpenCheck, 
  Bookmark, 
  CheckCircle2, 
  XCircle, 
  Trash2, 
  RotateCcw, 
  Play, 
  Sparkles, 
  Filter, 
  Check, 
  BookmarkCheck,
  ChevronDown
} from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { ALL_QUESTIONS } from '@/data/mockData';
import { SubjectCode } from '@/types';

export default function ImprovementBook() {
  const { 
    mistakes, 
    toggleMasteredMistake, 
    deleteMistake, 
    bookmarkedIds, 
    toggleBookmark,
    startCustomTest 
  } = useStore();

  const [activeTab, setActiveTab] = useState<'mistakes' | 'bookmarks'>('mistakes');
  const [filterSubject, setFilterSubject] = useState<'all' | SubjectCode>('all');
  const [filterMastered, setFilterMastered] = useState<'all' | 'unmastered' | 'mastered'>('unmastered');
  const [expandedExplanations, setExpandedExplanations] = useState<Record<string, boolean>>({});

  // Filter mistakes
  const filteredMistakes = mistakes.filter((m) => {
    if (filterSubject !== 'all' && m.question.subjectCode !== filterSubject) return false;
    if (filterMastered === 'unmastered' && m.isMastered) return false;
    if (filterMastered === 'mastered' && !m.isMastered) return false;
    return true;
  });

  // Filter bookmarks
  const bookmarkedQuestions = ALL_QUESTIONS.filter((q) => bookmarkedIds.includes(q.id)).filter((q) => {
    if (filterSubject !== 'all' && q.subjectCode !== filterSubject) return false;
    return true;
  });

  const unmasteredCount = mistakes.filter((m) => !m.isMastered).length;
  const masteredCount = mistakes.filter((m) => m.isMastered).length;
  const masteryRate = mistakes.length > 0 ? Math.round((masteredCount / mistakes.length) * 100) : 100;

  // Launch Drill from mistakes
  const handleStartMistakeDrill = () => {
    const unmastered = mistakes.filter((m) => !m.isMastered).map((m) => m.question);
    if (unmastered.length === 0) return;

    startCustomTest({
      title: 'Improvement Book: Mistake Mastery Drill',
      subject: 'all',
      questionCount: Math.min(unmastered.length, 25),
      durationMinutes: Math.max(10, Math.min(unmastered.length * 2, 45)),
    });
  };

  return (
    <div className="space-y-8">
      {/* Top Mastery Progress Banner */}
      <div className="p-6 rounded-2xl bg-white/[0.025] border border-white/[0.08] backdrop-blur-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-rose-500/10 text-rose-400">
                <BookOpenCheck className="w-4 h-4" />
              </span>
              <h2 className="text-sm font-bold text-[#F0F6FC]">
                Trackprep-Style Improvement Notebook
              </h2>
            </div>
            <p className="text-xs text-[#8B949E]">
              Every mistake from your mock tests and practice is automatically archived here for deliberate spaced-repetition.
            </p>
          </div>

          <div className="flex items-center gap-6">
            <div className="text-right">
              <p className="text-xs text-[#8B949E]">Concept Mastery Rate</p>
              <p className="text-2xl font-black text-emerald-400 mt-0.5">{masteryRate}%</p>
            </div>

            <button
              disabled={unmasteredCount === 0}
              onClick={handleStartMistakeDrill}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-md shadow-indigo-600/20 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Practice Unmastered ({unmasteredCount})</span>
            </button>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-5 w-full bg-white/[0.04] h-2 rounded-full overflow-hidden">
          <div
            className="bg-gradient-to-r from-indigo-500 to-emerald-400 h-full rounded-full transition-all duration-500"
            style={{ width: `${masteryRate}%` }}
          />
        </div>
      </div>

      {/* Navigation Tabs & Subject Filter */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-2 border-b border-white/[0.08]">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('mistakes')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'mistakes'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                : 'bg-white/[0.025] hover:bg-white/[0.05] border border-white/[0.06] text-[#8B949E] hover:text-[#F0F6FC]'
            }`}
          >
            <BookOpenCheck className="w-3.5 h-3.5" />
            <span>Mistake Book ({mistakes.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('bookmarks')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'bookmarks'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                : 'bg-white/[0.025] hover:bg-white/[0.05] border border-white/[0.06] text-[#8B949E] hover:text-[#F0F6FC]'
            }`}
          >
            <Bookmark className="w-3.5 h-3.5" />
            <span>Bookmarked Questions ({bookmarkedIds.length})</span>
          </button>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-3">
          {/* Subject Filter */}
          <div className="flex items-center p-1 rounded-xl bg-white/[0.04] border border-white/[0.08] text-xs">
            {(['all', 'ph', 'ch', 'bi'] as const).map((s) => (
              <button
                key={s}
                onClick={() => setFilterSubject(s)}
                className={`px-3 py-1 rounded-lg font-medium transition-colors ${
                  filterSubject === s
                    ? 'bg-white/[0.1] text-white shadow'
                    : 'text-[#8B949E] hover:text-[#F0F6FC]'
                }`}
              >
                {s === 'all' ? 'All' : s.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Mastered Filter (only on mistakes tab) */}
          {activeTab === 'mistakes' && (
            <div className="flex items-center p-1 rounded-xl bg-white/[0.04] border border-white/[0.08] text-xs">
              {(['all', 'unmastered', 'mastered'] as const).map((m) => (
                <button
                  key={m}
                  onClick={() => setFilterMastered(m)}
                  className={`px-3 py-1 rounded-lg font-medium capitalize transition-colors ${
                    filterMastered === m
                      ? 'bg-white/[0.1] text-white shadow'
                      : 'text-[#8B949E] hover:text-[#F0F6FC]'
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mistake List */}
      {activeTab === 'mistakes' && (
        <div className="space-y-4">
          {filteredMistakes.length === 0 ? (
            <div className="py-16 text-center rounded-2xl bg-white/[0.015] border border-white/[0.06] space-y-3">
              <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
              <p className="text-sm font-semibold text-[#F0F6FC]">
                {filterMastered === 'unmastered'
                  ? 'No unmastered mistakes remaining! Outstanding work!'
                  : 'No mistakes found in this filter.'}
              </p>
              <p className="text-xs text-[#8B949E]">
                Attempt more practice sets or mock tests to capture challenging questions.
              </p>
            </div>
          ) : (
            filteredMistakes.map((record) => {
              const q = record.question;
              const isExpanded = expandedExplanations[record.id];

              return (
                <motion.div
                  key={record.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-6 rounded-2xl border transition-all space-y-4 ${
                    record.isMastered
                      ? 'bg-emerald-500/[0.015] border-emerald-500/20 opacity-80'
                      : 'bg-white/[0.025] hover:bg-white/[0.035] border-white/[0.08]'
                  }`}
                >
                  {/* Top Bar */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <span className="text-xs font-semibold text-rose-400 bg-rose-500/10 px-2.5 py-0.5 rounded-lg border border-rose-500/20">
                        Mistake Logged
                      </span>
                      <span className="text-xs font-medium text-[#8B949E]">
                        {q.subjectName} • {q.chapter}
                      </span>
                      <span className="text-[10px] text-[#484F58]">
                        {new Date(record.date).toLocaleDateString()}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      {/* Mastered Checkbox Button */}
                      <button
                        onClick={() => toggleMasteredMistake(record.id)}
                        className={`flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-semibold border transition-all ${
                          record.isMastered
                            ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 shadow-sm'
                            : 'bg-white/[0.04] text-[#8B949E] hover:text-[#F0F6FC] border-white/[0.08]'
                        }`}
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>{record.isMastered ? 'Mastered' : 'Mark as Mastered'}</span>
                      </button>

                      <button
                        onClick={() => deleteMistake(record.id)}
                        className="text-[#8B949E] hover:text-rose-400 transition-colors p-1"
                        title="Delete record"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Question Stem */}
                  <p className="text-sm font-medium text-[#F0F6FC] leading-relaxed">
                    {q.question}
                  </p>

                  {/* Comparison: Your Choice vs Correct Answer */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    <div className="p-3.5 rounded-xl bg-rose-500/[0.08] border border-rose-500/20 text-xs space-y-1">
                      <span className="text-[10px] font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1">
                        <XCircle className="w-3 h-3" /> Your Answer (Mistake)
                      </span>
                      <p className="text-rose-200 font-medium">
                        {String.fromCharCode(65 + record.userAnswer)}: {q.options[record.userAnswer]}
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-emerald-500/[0.08] border border-emerald-500/20 text-xs space-y-1">
                      <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Correct NCERT Answer
                      </span>
                      <p className="text-emerald-200 font-medium">
                        {String.fromCharCode(65 + record.correctAnswer)}: {q.options[record.correctAnswer]}
                      </p>
                    </div>
                  </div>

                  {/* Mistake Note Warning */}
                  {q.commonMistake && (
                    <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.04] text-xs text-rose-300">
                      <strong>Why Students Get Trapped:</strong> {q.commonMistake}
                    </div>
                  )}

                  {/* Toggle Solution */}
                  <div className="pt-1">
                    <button
                      onClick={() =>
                        setExpandedExplanations((prev) => ({ ...prev, [record.id]: !prev[record.id] }))
                      }
                      className="flex items-center gap-1 text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-colors"
                    >
                      <span>{isExpanded ? 'Hide Solution' : 'View Detailed Step-by-Step Derivation'}</span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                      />
                    </button>

                    {isExpanded && (
                      <div className="mt-3 p-4 rounded-xl bg-white/[0.02] border border-white/[0.05] text-xs text-[#8B949E] whitespace-pre-line leading-relaxed">
                        {q.explanation.split('|').map((step, sIdx) => (
                          <p key={sIdx} className="mb-1">
                            • {step}
                          </p>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })
          )}
        </div>
      )}

      {/* Bookmarks List */}
      {activeTab === 'bookmarks' && (
        <div className="space-y-4">
          {bookmarkedQuestions.length === 0 ? (
            <div className="py-16 text-center rounded-2xl bg-white/[0.015] border border-white/[0.06] space-y-2">
              <Bookmark className="w-8 h-8 text-[#8B949E] mx-auto opacity-50" />
              <p className="text-sm font-semibold text-[#F0F6FC]">No Bookmarked Questions Yet</p>
              <p className="text-xs text-[#8B949E]">
                Click the bookmark flag on any question during test sessions or practice to collect key questions here.
              </p>
            </div>
          ) : (
            bookmarkedQuestions.map((q) => (
              <div
                key={q.id}
                className="p-6 rounded-2xl bg-white/[0.025] hover:bg-white/[0.035] border border-white/[0.08] transition-all space-y-4"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-indigo-400 bg-indigo-500/10 px-2.5 py-0.5 rounded-lg border border-indigo-500/20">
                    {q.subjectName} • {q.chapter}
                  </span>

                  <button
                    onClick={() => toggleBookmark(q.id)}
                    className="flex items-center gap-1.5 text-xs text-indigo-400 hover:text-rose-400 transition-colors"
                  >
                    <BookmarkCheck className="w-4 h-4 fill-indigo-400/20" />
                    <span>Saved</span>
                  </button>
                </div>

                <p className="text-sm font-medium text-[#F0F6FC] leading-relaxed">
                  {q.question}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {q.options.map((opt, optIdx) => (
                    <div
                      key={optIdx}
                      className={`p-3 rounded-xl border flex items-center gap-2.5 ${
                        optIdx === q.correctAnswer
                          ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300 font-medium'
                          : 'bg-white/[0.02] border-white/[0.04] text-[#8B949E]'
                      }`}
                    >
                      <span className="font-bold text-[11px]">{String.fromCharCode(65 + optIdx)}.</span>
                      <span>{opt}</span>
                    </div>
                  ))}
                </div>

                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.04] text-xs text-[#8B949E]">
                  <strong>NCERT Solution:</strong> {q.explanation.split('|').join(' ')}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

