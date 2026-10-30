'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookMarked, 
  Atom, 
  FlaskConical, 
  Dna, 
  Play, 
  Sparkles, 
  X, 
  ChevronRight,
  Bookmark
} from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { CHAPTER_NOTES } from '@/data/mockData';
import { ChapterNote, SubjectName } from '@/types';

export default function RevisionNotes() {
  const { startCustomTest, showToast } = useStore();

  const [selectedSubject, setSelectedSubject] = useState<'All' | SubjectName>('All');
  const [activeNoteModal, setActiveNoteModal] = useState<ChapterNote | null>(null);

  const filteredNotes = CHAPTER_NOTES.filter(
    (n) => selectedSubject === 'All' || n.subject === selectedSubject
  );

  const handleLaunchChapterQuiz = (note: ChapterNote) => {
    setActiveNoteModal(null);
    const subCode = note.subject === 'Physics' ? 'ph' : note.subject === 'Chemistry' ? 'ch' : 'bi';
    startCustomTest({
      title: `${note.chapter} Flash Quiz`,
      subject: subCode,
      chapter: note.chapter,
      questionCount: 15,
      durationMinutes: 20,
    });
  };

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="p-6 rounded-2xl bg-white/[0.025] border border-white/[0.08] backdrop-blur-md flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-400">
              <BookMarked className="w-4 h-4" />
            </span>
            <h2 className="text-sm font-bold text-[#F0F6FC]">
              High-Yield NCERT Revision & Formula Vault
            </h2>
          </div>
          <p className="text-xs text-[#8B949E]">
            Rapid revision cheat sheets, formula sheets, and high-frequency exam mnemonics.
          </p>
        </div>

        {/* Subject Filter Pills */}
        <div className="flex items-center p-1 rounded-xl bg-white/[0.04] border border-white/[0.08] text-xs">
          {(['All', 'Biology', 'Physics', 'Chemistry'] as const).map((sub) => (
            <button
              key={sub}
              onClick={() => setSelectedSubject(sub)}
              className={`px-3 py-1 rounded-lg font-medium transition-colors ${
                selectedSubject === sub
                  ? 'bg-indigo-600 text-white shadow'
                  : 'text-[#8B949E] hover:text-[#F0F6FC]'
              }`}
            >
              {sub}
            </button>
          ))}
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredNotes.map((note) => {
          const Icon = note.subject === 'Physics' ? Atom : note.subject === 'Chemistry' ? FlaskConical : Dna;
          const colorClass = note.subject === 'Physics' ? 'text-indigo-400' : note.subject === 'Chemistry' ? 'text-cyan-400' : 'text-emerald-400';

          return (
            <div
              key={note.id}
              className="p-6 rounded-2xl bg-white/[0.025] hover:bg-white/[0.04] border border-white/[0.08] transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className={`flex items-center gap-1.5 text-xs font-semibold ${colorClass}`}>
                    <Icon className="w-4 h-4" />
                    <span>{note.subject}</span>
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/[0.04] text-[#8B949E] border border-white/[0.06]">
                    {note.weightage.split('(')[0]}
                  </span>
                </div>

                <h3 className="text-base font-bold text-[#F0F6FC]">{note.chapter}</h3>
                <p className="text-xs text-[#8B949E] line-clamp-3 leading-relaxed">
                  {note.summary}
                </p>

                <div className="pt-2 border-t border-white/[0.04] text-[11px] text-[#8B949E] space-y-1">
                  <p className="font-semibold text-[#F0F6FC]">{note.keyFormulas.length} Core Formulas</p>
                  <p>{note.highYieldPoints.length} High-Yield NCERT Takeaways</p>
                </div>
              </div>

              <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between">
                <button
                  onClick={() => setActiveNoteModal(note)}
                  className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
                >
                  <span>Read Cheat Sheet</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => handleLaunchChapterQuiz(note)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-xs font-medium text-[#F0F6FC] transition-colors"
                >
                  <Play className="w-3 h-3 fill-current text-indigo-400" />
                  <span>Quiz</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Full Sheet Reader Modal */}
      <AnimatePresence>
        {activeNoteModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-3xl max-h-[85vh] bg-[#161B22] border border-white/[0.1] rounded-3xl p-8 shadow-2xl flex flex-col justify-between overflow-y-auto space-y-6"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded-lg">
                      {activeNoteModal.subject}
                    </span>
                    <span className="text-xs text-[#8B949E]">{activeNoteModal.weightage}</span>
                  </div>

                  <button
                    onClick={() => setActiveNoteModal(null)}
                    className="p-1 rounded-lg text-[#8B949E] hover:text-[#F0F6FC]"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div>
                  <h2 className="text-xl font-black text-[#F0F6FC]">{activeNoteModal.chapter}</h2>
                  <p className="text-xs text-[#8B949E] mt-1 leading-relaxed">{activeNoteModal.summary}</p>
                </div>

                {/* Key Formulas */}
                <div className="space-y-3 pt-2">
                  <h4 className="text-xs font-bold text-indigo-300 uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" /> Key Formulas & Equations
                  </h4>
                  <div className="space-y-2">
                    {activeNoteModal.keyFormulas.map((f, fIdx) => (
                      <div
                        key={fIdx}
                        className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                      >
                        <div>
                          <p className="text-xs font-bold text-[#F0F6FC]">{f.name}</p>
                          <p className="text-xs font-mono text-cyan-300 mt-0.5">{f.formula}</p>
                        </div>
                        <span className="text-[11px] text-[#8B949E] bg-white/[0.03] px-2 py-1 rounded border border-white/[0.04]">
                          {f.note}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* High-Yield Points */}
                <div className="space-y-3 pt-2">
                  <h4 className="text-xs font-bold text-emerald-300 uppercase tracking-wider">
                    High-Yield NCERT Exam Notes
                  </h4>
                  <div className="space-y-2">
                    {activeNoteModal.highYieldPoints.map((pt, pIdx) => (
                      <div
                        key={pIdx}
                        className="p-3 rounded-xl bg-white/[0.015] border border-white/[0.04] text-xs text-[#8B949E] leading-relaxed"
                      >
                        • {pt}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between">
                <span className="text-xs text-[#8B949E]">
                  Ready to test your retention on this chapter?
                </span>

                <button
                  onClick={() => handleLaunchChapterQuiz(activeNoteModal)}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-md shadow-indigo-600/20"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Launch Chapter DPP (15 Questions)</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
