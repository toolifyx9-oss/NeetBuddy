'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Zap, 
  Atom, 
  FlaskConical, 
  Dna, 
  Filter, 
  SlidersHorizontal, 
  Play, 
  Bookmark, 
  BookmarkCheck, 
  CheckCircle2, 
  XCircle, 
  ChevronDown, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { SUBJECTS, CHAPTERS_BY_SUBJECT, ALL_QUESTIONS } from '@/data/mockData';
import { SubjectCode } from '@/types';

export default function PracticeEngine() {
  const { startCustomTest, toggleBookmark, isBookmarked, addMistake } = useStore();

  const [selectedSubject, setSelectedSubject] = useState<'all' | SubjectCode>('ph');
  const [selectedChapter, setSelectedChapter] = useState<string>('all');
  
  // Custom Configurator state
  const [configQCount, setConfigQCount] = useState<number>(20);
  const [configDuration, setConfigDuration] = useState<number>(25);
  const [configDifficulty, setConfigDifficulty] = useState<string>('all');

  // Single question preview mode states (user answer record)
  const [instantAnswers, setInstantAnswers] = useState<Record<number, number>>({});
  const [expandedExplanations, setExpandedExplanations] = useState<Record<number, boolean>>({});

  // Filter available chapters for current subject
  const currentChapters = selectedSubject === 'all' 
    ? [...CHAPTERS_BY_SUBJECT.ph, ...CHAPTERS_BY_SUBJECT.ch, ...CHAPTERS_BY_SUBJECT.bi]
    : CHAPTERS_BY_SUBJECT[selectedSubject];

  // Filter questions for the instant practice list
  const filteredQuestions = ALL_QUESTIONS.filter((q) => {
    if (selectedSubject !== 'all' && q.subjectCode !== selectedSubject) return false;
    if (selectedChapter !== 'all' && q.chapter !== selectedChapter) return false;
    return true;
  });

  const handleLaunchConfiguredTest = () => {
    const chapTitle = selectedChapter === 'all' ? 'Comprehensive' : selectedChapter;
    const subTitle = selectedSubject === 'all' ? 'All Subjects' : selectedSubject === 'ph' ? 'Physics' : selectedSubject === 'ch' ? 'Chemistry' : 'Biology';
    
    startCustomTest({
      title: `${subTitle}: ${chapTitle} DPP`,
      subject: selectedSubject,
      chapter: selectedChapter,
      questionCount: configQCount,
      durationMinutes: configDuration,
      difficulty: configDifficulty
    });
  };

  const handleInstantAnswer = (qId: number, optIdx: number, correctIdx: number) => {
    if (instantAnswers[qId] !== undefined) return; // already answered
    setInstantAnswers((prev) => ({ ...prev, [qId]: optIdx }));
    setExpandedExplanations((prev) => ({ ...prev, [qId]: true }));

    // If wrong, log to mistake book automatically
    if (optIdx !== correctIdx) {
      const qObj = ALL_QUESTIONS.find((item) => item.id === qId);
      if (qObj) {
        addMistake(qObj, optIdx);
      }
    }
  };

  return (
    <div className="space-y-8">
      {/* Subject Filter Pills */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-2 border-b border-white/[0.08]">
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setSelectedSubject('all');
              setSelectedChapter('all');
            }}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              selectedSubject === 'all'
                ? 'bg-white/[0.1] text-white shadow-sm border border-white/[0.15]'
                : 'text-[#8B949E] hover:text-[#F0F6FC] hover:bg-white/[0.03]'
            }`}
          >
            All Subjects
          </button>

          {SUBJECTS.map((sub) => {
            const Icon = sub.code === 'ph' ? Atom : sub.code === 'ch' ? FlaskConical : Dna;
            const isSelected = selectedSubject === sub.code;

            return (
              <button
                key={sub.code}
                onClick={() => {
                  setSelectedSubject(sub.code);
                  setSelectedChapter('all');
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all border ${
                  isSelected
                    ? `${sub.bg} ${sub.color} shadow-sm`
                    : 'border-transparent text-[#8B949E] hover:text-[#F0F6FC] hover:bg-white/[0.03]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{sub.name}</span>
              </button>
            );
          })}
        </div>

        {/* Question Counter Pill */}
        <div className="text-xs text-[#8B949E]">
          Showing <span className="font-bold text-[#F0F6FC]">{filteredQuestions.length}</span> curated NCERT questions
        </div>
      </div>

      {/* Chapter Selection Horizontal Rail */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-[#8B949E] uppercase tracking-wider">
          Filter by Chapter
        </label>
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <button
            onClick={() => setSelectedChapter('all')}
            className={`flex-shrink-0 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
              selectedChapter === 'all'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'bg-white/[0.025] hover:bg-white/[0.05] border border-white/[0.06] text-[#8B949E] hover:text-[#F0F6FC]'
            }`}
          >
            All Chapters
          </button>
          {currentChapters.map((chap) => (
            <button
              key={chap}
              onClick={() => setSelectedChapter(chap)}
              className={`flex-shrink-0 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                selectedChapter === chap
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-white/[0.025] hover:bg-white/[0.05] border border-white/[0.06] text-[#8B949E] hover:text-[#F0F6FC]'
              }`}
            >
              {chap}
            </button>
          ))}
        </div>
      </div>

      {/* Custom Test Configurator Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-indigo-950/30 via-slate-900/60 to-slate-900/40 border border-indigo-500/20 backdrop-blur-md">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-indigo-500/20 text-indigo-400">
                <SlidersHorizontal className="w-4 h-4" />
              </span>
              <h3 className="text-sm font-bold text-[#F0F6FC]">
                Custom Test & Speed Drill Configurator
              </h3>
            </div>
            <p className="text-xs text-[#8B949E]">
              Generate a high-focus timed session with exact NTA negative marking (-1, +4).
            </p>
          </div>

          {/* Quick Selectors */}
          <div className="flex flex-wrap items-center gap-4">
            {/* Question count selector */}
            <div className="space-y-1">
              <span className="text-[10px] text-[#8B949E] uppercase font-bold tracking-wider">
                Questions
              </span>
              <div className="flex items-center p-1 rounded-xl bg-white/[0.04] border border-white/[0.08] text-xs">
                {[10, 20, 30, 45].map((cnt) => (
                  <button
                    key={cnt}
                    onClick={() => setConfigQCount(cnt)}
                    className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
                      configQCount === cnt
                        ? 'bg-indigo-600 text-white shadow'
                        : 'text-[#8B949E] hover:text-[#F0F6FC]'
                    }`}
                  >
                    {cnt}
                  </button>
                ))}
              </div>
            </div>

            {/* Duration selector */}
            <div className="space-y-1">
              <span className="text-[10px] text-[#8B949E] uppercase font-bold tracking-wider">
                Timer
              </span>
              <div className="flex items-center p-1 rounded-xl bg-white/[0.04] border border-white/[0.08] text-xs">
                {[15, 25, 45, 60].map((dur) => (
                  <button
                    key={dur}
                    onClick={() => setConfigDuration(dur)}
                    className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
                      configDuration === dur
                        ? 'bg-indigo-600 text-white shadow'
                        : 'text-[#8B949E] hover:text-[#F0F6FC]'
                    }`}
                  >
                    {dur}m
                  </button>
                ))}
              </div>
            </div>

            {/* Launch button */}
            <div className="pt-4 lg:pt-0">
              <button
                onClick={handleLaunchConfiguredTest}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-lg shadow-indigo-600/25 hover:scale-[1.02] active:scale-[0.98]"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Launch Test Session</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Instant Practice Question Cards */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-[#F0F6FC] flex items-center gap-2">
            <Zap className="w-4 h-4 text-indigo-400" />
            <span>Interactive Chapter Questions</span>
          </h3>
          <span className="text-xs text-[#8B949E]">
            Click any option for instant evaluation and NCERT explanation
          </span>
        </div>

        <div className="space-y-4">
          {filteredQuestions.slice(0, 15).map((q, idx) => {
            const userAnswer = instantAnswers[q.id];
            const isAnswered = userAnswer !== undefined;
            const isCorrect = isAnswered && userAnswer === q.correctAnswer;
            const showExp = expandedExplanations[q.id];

            return (
              <motion.div
                key={q.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="p-6 rounded-2xl bg-white/[0.02] hover:bg-white/[0.03] border border-white/[0.06] transition-all space-y-4"
              >
                {/* Question Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="text-xs font-mono font-bold text-indigo-400 px-2 py-0.5 rounded bg-indigo-500/10 border border-indigo-500/20">
                      Q{idx + 1}
                    </span>
                    <span className="text-xs font-medium text-[#8B949E]">
                      {q.subjectName} • {q.chapter}
                    </span>
                    {q.difficulty && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/[0.04] text-[#8B949E] border border-white/[0.06]">
                        {q.difficulty}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-3">
                    {isAnswered && (
                      <span
                        className={`text-xs font-bold flex items-center gap-1 ${
                          isCorrect ? 'text-emerald-400' : 'text-rose-400'
                        }`}
                      >
                        {isCorrect ? (
                          <>
                            <CheckCircle2 className="w-3.5 h-3.5" /> Correct (+4)
                          </>
                        ) : (
                          <>
                            <XCircle className="w-3.5 h-3.5" /> Incorrect (-1)
                          </>
                        )}
                      </span>
                    )}

                    <button
                      onClick={() => toggleBookmark(q.id)}
                      className="text-[#8B949E] hover:text-[#F0F6FC] transition-colors p-1 rounded"
                      title="Bookmark Question"
                    >
                      {isBookmarked(q.id) ? (
                        <BookmarkCheck className="w-4 h-4 text-indigo-400 fill-indigo-400/20" />
                      ) : (
                        <Bookmark className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Question Statement */}
                <p className="text-sm font-medium text-[#F0F6FC] leading-relaxed">
                  {q.question}
                </p>

                {/* 4 Options Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {q.options.map((opt, optIdx) => {
                    const isSelected = userAnswer === optIdx;
                    const isTheAnswer = q.correctAnswer === optIdx;

                    let optStyle = 'bg-white/[0.02] hover:bg-white/[0.05] border-white/[0.06] text-[#8B949E]';

                    if (isAnswered) {
                      if (isTheAnswer) {
                        optStyle = 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300 font-semibold';
                      } else if (isSelected && !isTheAnswer) {
                        optStyle = 'bg-rose-500/10 border-rose-500/40 text-rose-300 font-semibold';
                      } else {
                        optStyle = 'opacity-50 border-white/[0.04] text-[#484F58]';
                      }
                    }

                    return (
                      <button
                        key={optIdx}
                        disabled={isAnswered}
                        onClick={() => handleInstantAnswer(q.id, optIdx, q.correctAnswer)}
                        className={`flex items-center gap-3 p-3.5 rounded-xl border text-left text-xs transition-all ${optStyle}`}
                      >
                        <span className="w-6 h-6 rounded-full flex items-center justify-center font-bold text-[11px] border border-current flex-shrink-0">
                          {String.fromCharCode(65 + optIdx)}
                        </span>
                        <span>{opt}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Toggle Explanation Button */}
                {isAnswered && (
                  <div className="pt-2">
                    <button
                      onClick={() =>
                        setExpandedExplanations((prev) => ({ ...prev, [q.id]: !prev[q.id] }))
                      }
                      className="flex items-center gap-1.5 text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-colors"
                    >
                      <span>{showExp ? 'Hide NCERT Explanation' : 'View NCERT Step-by-Step Solution'}</span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform ${showExp ? 'rotate-180' : ''}`}
                      />
                    </button>

                    {showExp && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="mt-3 p-4 rounded-xl bg-white/[0.02] border border-white/[0.05] text-xs space-y-2"
                      >
                        <p className="font-semibold text-[#F0F6FC] flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                          Detailed Solution:
                        </p>
                        <div className="text-[#8B949E] whitespace-pre-line leading-relaxed">
                          {q.explanation.split('|').map((step, sIdx) => (
                            <p key={sIdx} className="mb-1">
                              • {step}
                            </p>
                          ))}
                        </div>

                        {q.commonMistake && (
                          <div className="pt-2 border-t border-white/[0.04] text-rose-400 text-[11px]">
                            <strong>Student Trap Alert:</strong> {q.commonMistake}
                          </div>
                        )}
                      </motion.div>
                    )}
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

