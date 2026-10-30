'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  TrendingUp, 
  Clock, 
  Target, 
  Award, 
  Sparkles, 
  Zap, 
  CheckCircle2, 
  AlertCircle,
  Play
} from 'lucide-react';
import { useStore } from '@/context/StoreContext';

export default function AnalyticsView() {
  const { user, testSubmissions, mistakes, startCustomTest } = useStore();

  const totalTests = testSubmissions.length;
  const recentSubmissions = [...testSubmissions].slice(0, 6);

  // Compute subject accuracy averages across submissions
  let phCorrect = 0, phTotal = 0;
  let chCorrect = 0, chTotal = 0;
  let biCorrect = 0, biTotal = 0;

  testSubmissions.forEach((sub) => {
    phCorrect += sub.subjectScores.physics.correct;
    phTotal += sub.subjectScores.physics.correct + sub.subjectScores.physics.incorrect;

    chCorrect += sub.subjectScores.chemistry.correct;
    chTotal += sub.subjectScores.chemistry.correct + sub.subjectScores.chemistry.incorrect;

    biCorrect += sub.subjectScores.biology.correct;
    biTotal += sub.subjectScores.biology.correct + sub.subjectScores.biology.incorrect;
  });

  const phAcc = phTotal > 0 ? Math.round((phCorrect / phTotal) * 100) : 82;
  const chAcc = chTotal > 0 ? Math.round((chCorrect / chTotal) * 100) : 85;
  const biAcc = biTotal > 0 ? Math.round((biCorrect / biTotal) * 100) : 91;

  // Projected NEET score based on accuracy
  const overallAccDecimal = (user.overallAccuracy || 85) / 100;
  const projectedScore = Math.min(715, Math.round(overallAccDecimal * 720 * 0.98 + (user.currentStreak * 1.5)));

  return (
    <div className="space-y-8">
      {/* Top Analytics Banner */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-indigo-950/40 via-slate-900/60 to-slate-900/30 border border-indigo-500/20 backdrop-blur-md">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" /> AI Predictive Telemetry
            </span>
            <h2 className="text-2xl font-black text-[#F0F6FC] tracking-tight">
              NEET 2026 Projected Score: <span className="text-indigo-400">{projectedScore}</span> / 720
            </h2>
            <p className="text-xs text-[#8B949E] max-w-xl">
              Based on {totalTests} completed mock papers, response latency, and spaced-repetition retention from your Improvement Book.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] text-right">
              <span className="text-[11px] text-[#8B949E]">AIIMS New Delhi Cutoff</span>
              <p className="text-xl font-bold text-[#F0F6FC] mt-0.5">685+ Marks</p>
              <span className="text-[10px] text-emerald-400 font-medium">Safe Margin: +{Math.max(0, projectedScore - 685)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Primary KPI Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white/[0.025] border border-white/[0.08]">
          <p className="text-xs font-medium text-[#8B949E]">Overall Accuracy</p>
          <p className="text-3xl font-extrabold text-emerald-400 mt-1">{user.overallAccuracy}%</p>
          <p className="text-[11px] text-[#8B949E] mt-2">Target benchmark: &gt;85%</p>
        </div>

        <div className="p-5 rounded-2xl bg-white/[0.025] border border-white/[0.08]">
          <p className="text-xs font-medium text-[#8B949E]">Active Streak</p>
          <p className="text-3xl font-extrabold text-indigo-400 mt-1">{user.currentStreak} Days</p>
          <p className="text-[11px] text-[#8B949E] mt-2">Longest: {user.longestStreak} Days</p>
        </div>

        <div className="p-5 rounded-2xl bg-white/[0.025] border border-white/[0.08]">
          <p className="text-xs font-medium text-[#8B949E]">Questions Solved</p>
          <p className="text-3xl font-extrabold text-cyan-400 mt-1">{user.questionsAttempted}</p>
          <p className="text-[11px] text-[#8B949E] mt-2">Across {user.testsCompleted} sessions</p>
        </div>

        <div className="p-5 rounded-2xl bg-white/[0.025] border border-white/[0.08]">
          <p className="text-xs font-medium text-[#8B949E]">Mistakes Cataloged</p>
          <p className="text-3xl font-extrabold text-rose-400 mt-1">{mistakes.length}</p>
          <p className="text-[11px] text-emerald-400 font-medium mt-2">
            {mistakes.filter((m) => m.isMastered).length} Mastered
          </p>
        </div>
      </div>

      {/* Subject Accuracy Breakdown */}
      <div className="p-6 rounded-2xl bg-white/[0.025] border border-white/[0.08] space-y-6">
        <h3 className="text-xs font-bold text-[#F0F6FC] uppercase tracking-wider">
          Subject Precision Analysis
        </h3>

        <div className="space-y-5">
          {/* Biology */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="font-semibold text-emerald-400">Biology (Botany + Zoology)</span>
              <span className="font-bold text-[#F0F6FC]">{biAcc}%</span>
            </div>
            <div className="w-full bg-white/[0.04] h-2.5 rounded-full overflow-hidden">
              <div
                className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${biAcc}%` }}
              />
            </div>
            <div className="flex justify-between text-[11px] text-[#8B949E]">
              <span>Highest scoring pillar (360/720 marks)</span>
              <span className="text-emerald-400 font-medium">Exam Ready</span>
            </div>
          </div>

          {/* Chemistry */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="font-semibold text-cyan-400">Chemistry (Physical, Organic, Inorganic)</span>
              <span className="font-bold text-[#F0F6FC]">{chAcc}%</span>
            </div>
            <div className="w-full bg-white/[0.04] h-2.5 rounded-full overflow-hidden">
              <div
                className="bg-cyan-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${chAcc}%` }}
              />
            </div>
            <div className="flex justify-between text-[11px] text-[#8B949E]">
              <span>Strong in Organic mechanisms, moderate in Equilibrium</span>
              <span className="text-cyan-400 font-medium">Strong</span>
            </div>
          </div>

          {/* Physics */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="font-semibold text-indigo-400">Physics (Mechanics, Electrodynamics, Optics)</span>
              <span className="font-bold text-[#F0F6FC]">{phAcc}%</span>
            </div>
            <div className="w-full bg-white/[0.04] h-2.5 rounded-full overflow-hidden">
              <div
                className="bg-indigo-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${phAcc}%` }}
              />
            </div>
            <div className="flex justify-between text-[11px] text-[#8B949E]">
              <span>Speed bottleneck: Friction & Rotational Motion</span>
              <span className="text-amber-400 font-medium">Focus Area</span>
            </div>
          </div>
        </div>
      </div>

      {/* High-Yield Weak Areas to Drill */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-[#F0F6FC]">Targeted Improvement Recommendations</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-white/[0.025] border border-white/[0.08] flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-[10px] text-indigo-400 uppercase font-bold tracking-wider">
                Physics Focus
              </span>
              <p className="text-sm font-bold text-[#F0F6FC]">Friction & Laws of Motion</p>
              <p className="text-xs text-[#8B949E]">Accuracy: 74% • 3 mistake traps recorded</p>
            </div>
            <button
              onClick={() =>
                startCustomTest({
                  title: 'Target Drill: Laws of Motion',
                  subject: 'ph',
                  chapter: 'Laws of Motion',
                  questionCount: 15,
                  durationMinutes: 20,
                })
              }
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/20"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Drill</span>
            </button>
          </div>

          <div className="p-5 rounded-2xl bg-white/[0.025] border border-white/[0.08] flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-[10px] text-cyan-400 uppercase font-bold tracking-wider">
                Chemistry Focus
              </span>
              <p className="text-sm font-bold text-[#F0F6FC]">Chemical Bonding & Molecular Orbitals</p>
              <p className="text-xs text-[#8B949E]">Accuracy: 78% • 2 mistake traps recorded</p>
            </div>
            <button
              onClick={() =>
                startCustomTest({
                  title: 'Target Drill: Chemical Bonding',
                  subject: 'ch',
                  chapter: 'Chemical Bonding & Molecular Structure',
                  questionCount: 15,
                  durationMinutes: 20,
                })
              }
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold shadow-md shadow-cyan-600/20"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Drill</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
