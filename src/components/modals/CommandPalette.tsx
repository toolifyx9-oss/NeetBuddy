'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  X, 
  BookOpen, 
  Zap, 
  FileText, 
  Sparkles, 
  Calendar, 
  BarChart, 
  Dna, 
  Atom, 
  FlaskConical,
  ArrowRight
} from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { CHAPTERS_BY_SUBJECT, MOCK_TESTS } from '@/data/mockData';

export default function CommandPalette() {
  const { 
    isCommandPaletteOpen, 
    setCommandPaletteOpen, 
    setActiveTab, 
    startCustomTest, 
    startPrebuiltMockTest 
  } = useStore();

  const [search, setSearch] = useState('');

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setCommandPaletteOpen(false);
      }
    };
    if (isCommandPaletteOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCommandPaletteOpen, setCommandPaletteOpen]);

  if (!isCommandPaletteOpen) return null;

  const query = search.toLowerCase().trim();

  // Filter Chapters
  const matchingChapters: { subject: string; code: 'ph' | 'ch' | 'bi'; chapter: string }[] = [];
  (['ph', 'ch', 'bi'] as const).forEach((code) => {
    const subName = code === 'ph' ? 'Physics' : code === 'ch' ? 'Chemistry' : 'Biology';
    CHAPTERS_BY_SUBJECT[code].forEach((chap) => {
      if (!query || chap.toLowerCase().includes(query) || subName.toLowerCase().includes(query)) {
        matchingChapters.push({ subject: subName, code, chapter: chap });
      }
    });
  });

  // Filter Mock Tests
  const matchingTests = MOCK_TESTS.filter(
    (t) => !query || t.title.toLowerCase().includes(query) || t.subtitle.toLowerCase().includes(query)
  );

  const handleSelectChapter = (item: { subject: string; code: 'ph' | 'ch' | 'bi'; chapter: string }) => {
    setCommandPaletteOpen(false);
    startCustomTest({
      title: `${item.chapter} Practice Set`,
      subject: item.code,
      chapter: item.chapter,
      questionCount: 15,
      durationMinutes: 20,
    });
  };

  const handleSelectTest = (test: (typeof MOCK_TESTS)[0]) => {
    setCommandPaletteOpen(false);
    startPrebuiltMockTest(test);
  };

  const handleJumpTab = (tab: string) => {
    setActiveTab(tab);
    setCommandPaletteOpen(false);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4 bg-black/60 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: -10 }}
          transition={{ duration: 0.15 }}
          className="w-full max-w-2xl bg-[#161B22] border border-white/[0.1] rounded-2xl shadow-2xl overflow-hidden"
        >
          {/* Search Input Bar */}
          <div className="flex items-center px-4 border-b border-white/[0.08] bg-[#0D1117]/50">
            <Search className="w-5 h-5 text-[#8B949E] mr-3" />
            <input
              type="text"
              autoFocus
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search chapters, mock tests, formulas, or quick jump..."
              className="w-full py-4 bg-transparent text-sm text-[#F0F6FC] placeholder-[#484F58] outline-none"
            />
            <button
              onClick={() => setCommandPaletteOpen(false)}
              className="p-1 rounded-lg text-[#8B949E] hover:text-[#F0F6FC] hover:bg-white/[0.05]"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Actions & Search Results */}
          <div className="max-h-96 overflow-y-auto p-3 space-y-4">
            {/* Quick Jumps */}
            {!query && (
              <div>
                <p className="px-2 text-[11px] font-semibold text-[#8B949E] uppercase tracking-wider mb-1.5">
                  Navigation
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                  <button
                    onClick={() => handleJumpTab('practice')}
                    className="flex items-center gap-2 p-2 rounded-xl text-xs text-[#F0F6FC] hover:bg-white/[0.05] transition-colors text-left"
                  >
                    <Zap className="w-4 h-4 text-indigo-400" />
                    <span>Practice Engine</span>
                  </button>
                  <button
                    onClick={() => handleJumpTab('mock-tests')}
                    className="flex items-center gap-2 p-2 rounded-xl text-xs text-[#F0F6FC] hover:bg-white/[0.05] transition-colors text-left"
                  >
                    <FileText className="w-4 h-4 text-cyan-400" />
                    <span>Mock Tests</span>
                  </button>
                  <button
                    onClick={() => handleJumpTab('improvement')}
                    className="flex items-center gap-2 p-2 rounded-xl text-xs text-[#F0F6FC] hover:bg-white/[0.05] transition-colors text-left"
                  >
                    <BookOpen className="w-4 h-4 text-rose-400" />
                    <span>Mistake Book</span>
                  </button>
                  <button
                    onClick={() => handleJumpTab('ai-solver')}
                    className="flex items-center gap-2 p-2 rounded-xl text-xs text-[#F0F6FC] hover:bg-white/[0.05] transition-colors text-left"
                  >
                    <Sparkles className="w-4 h-4 text-emerald-400" />
                    <span>AI Doubt Solver</span>
                  </button>
                </div>
              </div>
            )}

            {/* Matching Chapters */}
            {matchingChapters.length > 0 && (
              <div>
                <p className="px-2 text-[11px] font-semibold text-[#8B949E] uppercase tracking-wider mb-1.5">
                  Chapters & Topics ({matchingChapters.length})
                </p>
                <div className="space-y-1">
                  {matchingChapters.slice(0, 5).map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSelectChapter(item)}
                      className="w-full flex items-center justify-between p-2.5 rounded-xl text-xs text-[#F0F6FC] hover:bg-white/[0.05] transition-colors group"
                    >
                      <div className="flex items-center gap-2.5">
                        {item.code === 'ph' ? (
                          <Atom className="w-4 h-4 text-indigo-400" />
                        ) : item.code === 'ch' ? (
                          <FlaskConical className="w-4 h-4 text-cyan-400" />
                        ) : (
                          <Dna className="w-4 h-4 text-emerald-400" />
                        )}
                        <span className="font-medium">{item.chapter}</span>
                        <span className="text-[10px] text-[#8B949E] px-1.5 py-0.5 rounded bg-white/[0.04]">
                          {item.subject}
                        </span>
                      </div>
                      <span className="flex items-center gap-1 text-[11px] text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity">
                        Practice <ArrowRight className="w-3 h-3" />
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Matching Mock Tests */}
            {matchingTests.length > 0 && (
              <div>
                <p className="px-2 text-[11px] font-semibold text-[#8B949E] uppercase tracking-wider mb-1.5">
                  Mock Tests ({matchingTests.length})
                </p>
                <div className="space-y-1">
                  {matchingTests.slice(0, 3).map((test) => (
                    <button
                      key={test.id}
                      onClick={() => handleSelectTest(test)}
                      className="w-full flex items-center justify-between p-2.5 rounded-xl text-xs text-[#F0F6FC] hover:bg-white/[0.05] transition-colors group"
                    >
                      <div className="flex items-center gap-2.5">
                        <FileText className="w-4 h-4 text-indigo-400" />
                        <div className="text-left">
                          <p className="font-medium text-[#F0F6FC]">{test.title}</p>
                          <p className="text-[10px] text-[#8B949E]">{test.durationMinutes}m • {test.totalMarks} Marks</p>
                        </div>
                      </div>
                      <span className="flex items-center gap-1 text-[11px] text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity">
                        Start Test <ArrowRight className="w-3 h-3" />
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {matchingChapters.length === 0 && matchingTests.length === 0 && (
              <div className="py-8 text-center text-xs text-[#8B949E]">
                No matching chapters or mock tests found for &quot;{search}&quot;.
              </div>
            )}
          </div>

          {/* Footer note */}
          <div className="px-4 py-2.5 bg-[#0D1117]/80 border-t border-white/[0.06] flex items-center justify-between text-[11px] text-[#8B949E]">
            <span>Press <kbd className="px-1.5 py-0.5 rounded bg-white/[0.08] text-[#F0F6FC] font-mono">ESC</kbd> to exit</span>
            <span className="flex items-center gap-1 text-emerald-400">
              <Sparkles className="w-3 h-3" /> NEET 2026 Engine
            </span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
