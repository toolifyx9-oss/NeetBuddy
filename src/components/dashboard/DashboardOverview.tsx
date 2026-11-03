'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Flame, 
  Target, 
  Zap, 
  BookOpenCheck, 
  ArrowRight, 
  Award, 
  Clock, 
  CheckCircle2, 
  BarChart3, 
  Sparkles,
  Atom,
  FlaskConical,
  Dna,
  Play
} from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { SUBJECTS, MOCK_TESTS } from '@/data/mockData';

export default function DashboardOverview() {
  const { 
    user, 
    mistakes, 
    studyTasks, 
    testSubmissions, 
    setActiveTab, 
    startCustomTest, 
    startPrebuiltMockTest,
    setReviewSubmission
  } = useStore();

  const unmasteredMistakes = mistakes.filter((m) => !m.isMastered);
  const pendingTasks = studyTasks.filter((t) => t.status !== 'completed');
  const recentTest = testSubmissions[0];

  const handleStartQuickSprint = (subCode: 'ph' | 'ch' | 'bi') => {
    const subName = subCode === 'ph' ? 'Physics' : subCode === 'ch' ? 'Chemistry' : 'Biology';
    startCustomTest({
      title: `${subName} Speed Sprint (15 Questions)`,
      subject: subCode,
      questionCount: 15,
      durationMinutes: 15,
    });
  };

  return (
    <div className="space-y-8">
      {/* Welcome Hero Banner */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-indigo-950/40 via-slate-900/60 to-slate-900/30 border border-indigo-500/20 backdrop-blur-md relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
                <Flame className="w-3.5 h-3.5 fill-emerald-400" />
                {user.currentStreak} Days Consecutive Streak
              </span>
              <span className="text-xs text-[#8B949E]">Target: NEET 2026</span>
            </div>

            <h2 className="text-2xl font-black text-[#F0F6FC] tracking-tight">
              Welcome back, {user.name}! 🎯
            </h2>
            <p className="text-xs text-[#8B949E] max-w-xl leading-relaxed">
              Your projected score is currently <strong className="text-[#F0F6FC]">685+ Marks</strong>. Focus on Laws of Motion friction numerics and Meiosis crossing-over stages to solidify your top percentile rank.
            </p>
          </div>

          {/* Quick Action CTA */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => handleStartQuickSprint('ph')}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-lg shadow-indigo-600/25 hover:scale-[1.02] active:scale-[0.98]"
            >
              <Zap className="w-3.5 h-3.5 fill-current" />
              <span>Launch Daily 15m DPP</span>
            </button>

            <button
              onClick={() => setActiveTab('improvement')}
              className="flex items-center gap-2 px-4 py-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-xs font-semibold text-[#F0F6FC] transition-colors"
            >
              <BookOpenCheck className="w-3.5 h-3.5 text-rose-400" />
              <span>Review {unmasteredMistakes.length} Mistakes</span>
            </button>
          </div>
        </div>
      </div>

      {/* Primary KPI Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Streak */}
        <div className="p-5 rounded-2xl bg-white/[0.025] border border-white/[0.08] space-y-2">
          <div className="flex items-center justify-between text-[#8B949E]">
            <span className="text-xs font-medium">Daily Streak</span>
            <Flame className="w-4 h-4 text-emerald-400 fill-emerald-400" />
          </div>
          <p className="text-2xl font-black text-[#F0F6FC]">{user.currentStreak} Days</p>
          <p className="text-[11px] text-emerald-400 font-medium">Consistency Rank: Top 2%</p>
        </div>

        {/* Accuracy */}
        <div className="p-5 rounded-2xl bg-white/[0.025] border border-white/[0.08] space-y-2">
          <div className="flex items-center justify-between text-[#8B949E]">
            <span className="text-xs font-medium">Mock Accuracy</span>
            <Target className="w-4 h-4 text-indigo-400" />
          </div>
          <p className="text-2xl font-black text-[#F0F6FC]">{user.overallAccuracy}%</p>
          <p className="text-[11px] text-[#8B949E]">Target: &gt;88% for AIIMS</p>
        </div>

        {/* Questions Solved */}
        <div className="p-5 rounded-2xl bg-white/[0.025] border border-white/[0.08] space-y-2">
          <div className="flex items-center justify-between text-[#8B949E]">
            <span className="text-xs font-medium">Questions Attempted</span>
            <Award className="w-4 h-4 text-cyan-400" />
          </div>
          <p className="text-2xl font-black text-[#F0F6FC]">{user.questionsAttempted}</p>
          <p className="text-[11px] text-[#8B949E]">Across {user.testsCompleted} test sessions</p>
        </div>

        {/* Mistakes in Improvement Book */}
        <div
          onClick={() => setActiveTab('improvement')}
          className="p-5 rounded-2xl bg-white/[0.025] hover:bg-white/[0.04] border border-white/[0.08] hover:border-rose-500/30 cursor-pointer transition-all space-y-2"
        >
          <div className="flex items-center justify-between text-[#8B949E]">
            <span className="text-xs font-medium">Improvement Book</span>
            <BookOpenCheck className="w-4 h-4 text-rose-400" />
          </div>
          <p className="text-2xl font-black text-rose-400">{unmasteredMistakes.length}</p>
          <p className="text-[11px] text-[#8B949E] flex items-center gap-1">
            <span>Click to practice</span>
            <ArrowRight className="w-3 h-3 text-rose-400" />
          </p>
        </div>
      </div>

      {/* 3 Subject Quick Sprints */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-[#F0F6FC] uppercase tracking-wider">
            Subject Focus Hub
          </h3>
          <button
            onClick={() => setActiveTab('practice')}
            className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1"
          >
            <span>Open Practice Engine</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SUBJECTS.map((sub) => {
            const Icon = sub.code === 'ph' ? Atom : sub.code === 'ch' ? FlaskConical : Dna;

            return (
              <div
                key={sub.code}
                className="p-6 rounded-2xl bg-white/[0.025] hover:bg-white/[0.04] border border-white/[0.08] transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className={`flex items-center gap-1.5 text-xs font-semibold ${sub.color}`}>
                      <Icon className="w-4 h-4" />
                      <span>{sub.name}</span>
                    </span>
                    <span className="text-[10px] text-[#8B949E]">180 Marks</span>
                  </div>

                  <h4 className="text-sm font-bold text-[#F0F6FC]">
                    {sub.code === 'ph'
                      ? 'Mechanics & Modern Physics'
                      : sub.code === 'ch'
                      ? 'Organic Mechanisms & Bonding'
                      : 'Genetics, Physiology & Ecology'}
                  </h4>

                  <p className="text-xs text-[#8B949E] line-clamp-2">
                    {sub.code === 'ph'
                      ? 'High-weightage friction, banking of roads, and work-energy numerical drills.'
                      : sub.code === 'ch'
                      ? 'SN1/SN2 kinetics, molecular orbital theory, and coordination isomers.'
                      : 'High-frequency Mendelian crosses, lac operon, and cell division checkpoints.'}
                  </p>
                </div>

                <button
                  onClick={() => handleStartQuickSprint(sub.code)}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-xs font-semibold text-[#F0F6FC] border border-white/[0.06] transition-colors"
                >
                  <Play className="w-3.5 h-3.5 fill-current text-indigo-400" />
                  <span>Start 15m Drill</span>
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2-Column Split: Recent Mock Test & Today's Study Tasks */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Test Banner */}
        <div className="p-6 rounded-2xl bg-white/[0.025] border border-white/[0.08] space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">
                Recent Mock Exam
              </span>
              {recentTest && (
                <span className="text-xs text-[#8B949E]">
                  {new Date(recentTest.date).toLocaleDateString()}
                </span>
              )}
            </div>

            {recentTest ? (
              <div className="space-y-2">
                <h4 className="text-base font-bold text-[#F0F6FC]">{recentTest.title}</h4>
                <div className="flex items-center gap-4 text-xs text-[#8B949E]">
                  <span className="text-emerald-400 font-bold text-sm">
                    {recentTest.score} / {recentTest.maxScore} Marks
                  </span>
                  <span>•</span>
                  <span>{recentTest.accuracy}% Accuracy</span>
                  <span>•</span>
                  <span>{Math.round(recentTest.timeSpentSeconds / 60)} mins</span>
                </div>
              </div>
            ) : (
              <p className="text-xs text-[#8B949E]">No test attempted yet today.</p>
            )}
          </div>

          <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between">
            {recentTest ? (
              <button
                onClick={() => setReviewSubmission(recentTest)}
                className="text-xs font-semibold text-indigo-400 hover:text-indigo-300"
              >
                Review Full Answers
              </button>
            ) : (
              <div />
            )}

            <button
              onClick={() => setActiveTab('mock-tests')}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/20"
            >
              <span>Explore All Mocks</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Study Tasks Mini Checklist */}
        <div className="p-6 rounded-2xl bg-white/[0.025] border border-white/[0.08] space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#8B949E] uppercase tracking-wider">
                Today&apos;s Study Plan ({pendingTasks.length} Pending)
              </span>
              <button
                onClick={() => setActiveTab('study-planner')}
                className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold"
              >
                View Planner
              </button>
            </div>

            <div className="space-y-2">
              {pendingTasks.slice(0, 3).map((task) => (
                <div
                  key={task.id}
                  className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.04] flex items-center justify-between gap-3 text-xs"
                >
                  <div className="min-w-0">
                    <p className="font-semibold text-[#F0F6FC] truncate">{task.title}</p>
                    <p className="text-[10px] text-[#8B949E]">{task.chapter} • Due {task.dueDate}</p>
                  </div>
                  <span
                    className={`text-[9px] font-bold px-2 py-0.5 rounded-full uppercase flex-shrink-0 ${
                      task.priority === 'high'
                        ? 'bg-rose-500/10 text-rose-400'
                        : 'bg-amber-500/10 text-amber-400'
                    }`}
                  >
                    {task.priority}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-white/[0.06] text-right">
            <button
              onClick={() => setActiveTab('study-planner')}
              className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 justify-end"
            >
              <span>Manage All Tasks</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

