'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, 
  Clock, 
  Award, 
  CheckCircle, 
  Play, 
  ChevronRight, 
  Sparkles, 
  History,
  Target,
  BarChart2
} from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { MOCK_TESTS } from '@/data/mockData';
import { MockTest } from '@/types';

export default function MockTestsHub() {
  const { startPrebuiltMockTest, testSubmissions, setReviewSubmission } = useStore();

  const [activeCategory, setActiveCategory] = useState<'all' | 'full_syllabus' | 'subject_wise' | 'high_yield' | 'completed'>('all');

  const filteredTests = MOCK_TESTS.filter((t) => {
    if (activeCategory === 'all') return true;
    if (activeCategory === 'completed') {
      return testSubmissions.some((sub) => sub.testId === t.id);
    }
    return t.category === activeCategory;
  });

  return (
    <div className="space-y-8">
      {/* Category Pills Rail */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-2 border-b border-white/[0.08]">
        <div className="flex items-center gap-2">
          {[
            { id: 'all', label: 'All Tests' },
            { id: 'full_syllabus', label: 'Full Syllabus (720M)' },
            { id: 'subject_wise', label: 'Subject Sprints' },
            { id: 'high_yield', label: 'High Yield & AIIMS' },
            { id: 'completed', label: `Completed (${testSubmissions.length})` },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id as any)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeCategory === cat.id
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                  : 'bg-white/[0.025] hover:bg-white/[0.05] border border-white/[0.06] text-[#8B949E] hover:text-[#F0F6FC]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="text-xs text-[#8B949E] flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
          <span>Calculated with 2026 Revised NTA Marking (+4, -1)</span>
        </div>
      </div>

      {/* Featured Full Mock Banner */}
      {activeCategory === 'all' && (
        <div className="p-8 rounded-3xl bg-gradient-to-r from-indigo-950/40 via-slate-900/70 to-slate-900/40 border border-indigo-500/25 relative overflow-hidden backdrop-blur-md">
          <div className="max-w-2xl space-y-4 relative z-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" /> Recommended NTA Benchmark
            </span>
            <h2 className="text-2xl font-black text-[#F0F6FC] tracking-tight">
              NEET 2026 All-India Grand Mock Test #1
            </h2>
            <p className="text-xs text-[#8B949E] leading-relaxed">
              Standard 200 questions across Physics, Chemistry, and Biology (Zoology + Botany). Simulate real examination pressure, strict countdown, and instant percentile analytics.
            </p>
            <div className="flex flex-wrap items-center gap-6 text-xs text-[#8B949E] pt-2">
              <span className="flex items-center gap-1.5 text-[#F0F6FC]">
                <Clock className="w-4 h-4 text-indigo-400" /> 180 Minutes
              </span>
              <span className="flex items-center gap-1.5 text-[#F0F6FC]">
                <Target className="w-4 h-4 text-cyan-400" /> 720 Max Marks
              </span>
              <span className="flex items-center gap-1.5 text-[#F0F6FC]">
                <Award className="w-4 h-4 text-emerald-400" /> NTA Strict Mode
              </span>
            </div>
            <div className="pt-2">
              <button
                onClick={() => startPrebuiltMockTest(MOCK_TESTS[0])}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-xl shadow-indigo-600/30 hover:scale-[1.02] active:scale-[0.98]"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>Start Full Mock Exam</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Test Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredTests.map((test) => {
          const pastSub = testSubmissions.find((s) => s.testId === test.id);

          return (
            <motion.div
              key={test.id}
              whileHover={{ y: -2 }}
              className="p-6 rounded-2xl bg-white/[0.025] hover:bg-white/[0.04] border border-white/[0.08] hover:border-white/[0.15] transition-all flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                {/* Header row */}
                <div className="flex items-center justify-between">
                  <span
                    className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider border ${
                      test.difficulty === 'AIIMS Level'
                        ? 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                        : test.difficulty === 'NTA Standard'
                        ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20'
                        : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                    }`}
                  >
                    {test.difficulty}
                  </span>

                  {pastSub && (
                    <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                      <CheckCircle className="w-3.5 h-3.5" />
                      Score: {pastSub.score}/{pastSub.maxScore}
                    </span>
                  )}
                </div>

                <div>
                  <h3 className="text-base font-bold text-[#F0F6FC]">{test.title}</h3>
                  <p className="text-xs text-[#8B949E] mt-1 leading-relaxed">{test.subtitle}</p>
                </div>

                {/* Key Metrics */}
                <div className="flex items-center gap-4 text-xs text-[#8B949E] pt-1">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-indigo-400" />
                    {test.durationMinutes} mins
                  </span>
                  <span>•</span>
                  <span>{test.totalQuestions} Questions</span>
                  <span>•</span>
                  <span>{test.totalMarks} Marks</span>
                </div>

                {/* Syllabus Tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {test.syllabus.map((syl, sIdx) => (
                    <span
                      key={sIdx}
                      className="text-[10px] px-2 py-0.5 rounded-md bg-white/[0.03] text-[#8B949E] border border-white/[0.04]"
                    >
                      {syl}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between">
                {pastSub ? (
                  <button
                    onClick={() => setReviewSubmission(pastSub)}
                    className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
                  >
                    <span>View Performance & Solutions</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <span className="text-xs text-[#484F58]">Not attempted yet</span>
                )}

                <button
                  onClick={() => startPrebuiltMockTest(test)}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-md shadow-indigo-600/20"
                >
                  <Play className="w-3 h-3 fill-current" />
                  <span>{pastSub ? 'Re-attempt Test' : 'Start Test'}</span>
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Completed Test History Ledger */}
      {testSubmissions.length > 0 && (
        <div className="space-y-4 pt-6 border-t border-white/[0.08]">
          <h3 className="text-sm font-bold text-[#F0F6FC] flex items-center gap-2">
            <History className="w-4 h-4 text-indigo-400" />
            <span>Test Performance Ledger</span>
          </h3>

          <div className="overflow-x-auto rounded-2xl border border-white/[0.08] bg-white/[0.015]">
            <table className="w-full text-left text-xs">
              <thead className="bg-white/[0.03] text-[#8B949E] border-b border-white/[0.06]">
                <tr>
                  <th className="p-4 font-semibold">Test Title</th>
                  <th className="p-4 font-semibold">Date</th>
                  <th className="p-4 font-semibold">Score</th>
                  <th className="p-4 font-semibold">Accuracy</th>
                  <th className="p-4 font-semibold">Correct/Wrong</th>
                  <th className="p-4 font-semibold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                {testSubmissions.map((sub) => (
                  <tr key={sub.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="p-4 font-medium text-[#F0F6FC]">{sub.title}</td>
                    <td className="p-4 text-[#8B949E]">
                      {new Date(sub.date).toLocaleDateString(undefined, {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </td>
                    <td className="p-4 font-bold text-[#F0F6FC]">
                      {sub.score}{' '}
                      <span className="text-[10px] font-normal text-[#8B949E]">/ {sub.maxScore}</span>
                    </td>
                    <td className="p-4">
                      <span className="font-semibold text-emerald-400">{sub.accuracy}%</span>
                    </td>
                    <td className="p-4 text-[#8B949E]">
                      <span className="text-emerald-400">{sub.correctCount}</span> /{' '}
                      <span className="text-rose-400">{sub.incorrectCount}</span>
                    </td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => setReviewSubmission(sub)}
                        className="px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-indigo-400 text-xs font-semibold transition-colors"
                      >
                        Review
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

