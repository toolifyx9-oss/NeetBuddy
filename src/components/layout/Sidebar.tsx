'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  Zap, 
  FileText, 
  BookOpenCheck, 
  Sparkles, 
  CalendarDays, 
  BarChart3, 
  BookMarked,
  Flame,
  Award,
  ChevronRight
} from 'lucide-react';
import { useStore } from '@/context/StoreContext';

interface NavItem {
  id: string;
  label: string;
  icon: React.ElementType;
  badge?: number | string;
  badgeColor?: string;
}

export default function Sidebar() {
  const { activeTab, setActiveTab, user, mistakes, studyTasks } = useStore();

  const unmasteredMistakes = mistakes.filter((m) => !m.isMastered).length;
  const pendingTasks = studyTasks.filter((t) => t.status !== 'completed').length;

  const navItems: NavItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'practice', label: 'Practice & DPP', icon: Zap },
    { id: 'mock-tests', label: 'Mock Tests Hub', icon: FileText, badge: 'NTA' },
    { 
      id: 'improvement', 
      label: 'Improvement Book', 
      icon: BookOpenCheck, 
      badge: unmasteredMistakes > 0 ? unmasteredMistakes : undefined,
      badgeColor: 'bg-rose-500/20 text-rose-400 border-rose-500/30'
    },
    { id: 'ai-solver', label: 'AI Doubt Solver', icon: Sparkles, badge: 'AI', badgeColor: 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30' },
    { 
      id: 'study-planner', 
      label: 'Study Planner', 
      icon: CalendarDays, 
      badge: pendingTasks > 0 ? pendingTasks : undefined 
    },
    { id: 'analytics', label: 'Analytics & Trends', icon: BarChart3 },
    { id: 'notes', label: 'High-Yield Notes', icon: BookMarked },
  ];

  return (
    <aside className="w-64 flex-shrink-0 h-screen sticky top-0 bg-[#0D1117] border-r border-white/[0.08] flex flex-col justify-between p-4 select-none z-30">
      <div className="space-y-6">
        {/* Brand Header with Horizontal Logo */}
        <div className="px-2 pt-2 pb-1">
          <div className="flex items-center gap-3">
            <div className="relative w-full h-11 flex items-center">
              <Image
                src="/images/logo.png"
                alt="NEETBuddy"
                width={200}
                height={55}
                className="object-contain object-left max-h-11 w-auto"
                priority
              />
            </div>
          </div>
          <div className="mt-2.5 flex items-center justify-between text-[11px] text-[#8B949E] px-1 font-medium">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              NTA Engine 2026 Ready
            </span>
            <span className="text-[#484F58] font-mono">v2.5 Pro</span>
          </div>
        </div>

        {/* Navigation items */}
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`relative w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  isActive
                    ? 'text-[#F0F6FC] font-semibold'
                    : 'text-[#8B949E] hover:text-[#F0F6FC] hover:bg-white/[0.03]'
                }`}
              >
                {/* Active Indicator with Framer Motion layoutId */}
                {isActive && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute inset-0 bg-white/[0.06] border border-white/[0.1] rounded-xl shadow-inner"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}

                <div className="relative flex items-center gap-3 z-10">
                  <Icon
                    className={`w-4 h-4 transition-transform duration-200 ${
                      isActive ? 'text-indigo-400 scale-110' : 'text-[#8B949E]'
                    }`}
                  />
                  <span>{item.label}</span>
                </div>

                {item.badge !== undefined && (
                  <span
                    className={`relative z-10 text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                      item.badgeColor || 'bg-white/[0.06] text-[#8B949E] border-white/[0.08]'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* User Status / Target Card */}
      <div className="pt-4 border-t border-white/[0.08] space-y-3">
        {/* Streak & College Target */}
        <div className="p-3 rounded-xl bg-white/[0.025] border border-white/[0.06] space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400">
              <Flame className="w-4 h-4 fill-emerald-400 text-emerald-400" />
              <span>{user.currentStreak} Day Streak</span>
            </div>
            <span className="text-[10px] font-mono text-[#8B949E] uppercase tracking-wider">
              Daily Goal
            </span>
          </div>

          <div className="flex items-center gap-2 pt-1 border-t border-white/[0.04]">
            <Award className="w-3.5 h-3.5 text-indigo-400 flex-shrink-0" />
            <div className="min-w-0">
              <p className="text-[11px] font-medium text-[#F0F6FC] truncate">
                {user.dreamCollege}
              </p>
              <p className="text-[10px] text-[#8B949E]">Target: {user.targetScore}/720 Marks</p>
            </div>
          </div>
        </div>

        {/* User Mini Profile */}
        <div className="flex items-center justify-between px-2 py-1.5">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-600 to-cyan-500 p-[1.5px] flex-shrink-0">
              <div className="w-full h-full rounded-full bg-[#161B22] flex items-center justify-center font-bold text-xs text-white">
                {user.name.split(' ').map((n) => n[0]).join('')}
              </div>
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-[#F0F6FC] truncate">{user.name}</p>
              <p className="text-[10px] text-[#8B949E] truncate">{user.cls}</p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-[#484F58]" />
        </div>
      </div>
    </aside>
  );
}
