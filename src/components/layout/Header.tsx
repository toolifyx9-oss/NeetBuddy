'use client';

import React from 'react';
import { 
  Search, 
  Flame, 
  Zap, 
  Bell, 
  Target, 
  Sparkles,
  Command
} from 'lucide-react';
import { useStore } from '@/context/StoreContext';

export default function Header() {
  const { 
    activeTab, 
    setCommandPaletteOpen, 
    user, 
    startCustomTest 
  } = useStore();

  const tabLabels: Record<string, { title: string; subtitle: string }> = {
    dashboard: { title: 'Preparation Overview', subtitle: 'Live telemetry, NCERT completion, and high-yield focus areas' },
    practice: { title: 'Practice & DPP Engine', subtitle: 'Targeted chapter questions, instant solutions, and custom configurator' },
    'mock-tests': { title: 'NTA Mock Tests Hub', subtitle: 'Full 720-marks simulations, subject sprints, and timed exam conditions' },
    improvement: { title: 'Improvement Book', subtitle: 'Algorithmic mistake notebook and concept-mastery tracker' },
    'ai-solver': { title: 'AI NEET Doubt Solver', subtitle: 'Deep conceptual derivations, step-by-step math, and formula cheat sheets' },
    'study-planner': { title: 'Intelligent Study Planner', subtitle: 'Adaptive revision roadmap, high-weightage chapters, and deadlines' },
    analytics: { title: 'Performance Analytics', subtitle: 'Accuracy graphs, projected NEET 2026 score, and speed trends' },
    notes: { title: 'High-Yield NCERT Notes', subtitle: 'Condensed formula books, high-yield charts, and mnemonics' },
  };

  const currentInfo = tabLabels[activeTab] || { title: 'NEETBuddy', subtitle: 'Enterprise NEET Platform' };

  const launchInstantDpp = () => {
    startCustomTest({
      title: 'Rapid Sprint DPP (15 Questions)',
      subject: 'all',
      questionCount: 15,
      durationMinutes: 15,
      difficulty: 'all'
    });
  };

  return (
    <header className="sticky top-0 z-20 h-16 bg-[#0D1117]/85 backdrop-blur-md border-b border-white/[0.08] px-8 flex items-center justify-between">
      {/* Title & Subtitle */}
      <div>
        <h1 className="text-base font-bold text-[#F0F6FC] tracking-tight flex items-center gap-2">
          {currentInfo.title}
        </h1>
        <p className="text-xs text-[#8B949E] hidden md:block">
          {currentInfo.subtitle}
        </p>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3">
        {/* Search trigger button */}
        <button
          onClick={() => setCommandPaletteOpen(true)}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.08] text-xs text-[#8B949E] hover:text-[#F0F6FC] transition-all"
        >
          <Search className="w-3.5 h-3.5 text-[#8B949E]" />
          <span className="hidden sm:inline">Search chapters, tests...</span>
          <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-mono bg-white/[0.06] border border-white/[0.1] rounded text-[#8B949E]">
            <Command className="w-2.5 h-2.5" /> K
          </kbd>
        </button>

        {/* Streak Pill */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
          <Flame className="w-3.5 h-3.5 fill-emerald-400" />
          <span>{user.currentStreak} Days</span>
        </div>

        {/* Target Score Pill */}
        <div className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-medium">
          <Target className="w-3.5 h-3.5 text-indigo-400" />
          <span>Goal: {user.targetScore} Marks</span>
        </div>

        {/* Quick Launch DPP Button */}
        <button
          onClick={launchInstantDpp}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition-all shadow-md shadow-indigo-600/20 hover:scale-[1.02] active:scale-[0.98]"
        >
          <Zap className="w-3.5 h-3.5 fill-current" />
          <span className="hidden sm:inline">Quick DPP</span>
        </button>
      </div>
    </header>
  );
}

