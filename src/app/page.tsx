'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/context/StoreContext';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import CommandPalette from '@/components/modals/CommandPalette';
import TestRunnerModal from '@/components/test-runner/TestRunnerModal';

import DashboardOverview from '@/components/dashboard/DashboardOverview';
import PracticeEngine from '@/components/practice/PracticeEngine';
import MockTestsHub from '@/components/mock-tests/MockTestsHub';
import ImprovementBook from '@/components/improvement/ImprovementBook';
import AiDoubtSolver from '@/components/ai-solver/AiDoubtSolver';
import StudyPlanner from '@/components/study-planner/StudyPlanner';
import AnalyticsView from '@/components/analytics/AnalyticsView';
import RevisionNotes from '@/components/notes/RevisionNotes';
import { CheckCircle2 } from 'lucide-react';

export default function Home() {
  const { activeTab, toastMessage } = useStore();

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardOverview />;
      case 'practice':
        return <PracticeEngine />;
      case 'mock-tests':
        return <MockTestsHub />;
      case 'improvement':
        return <ImprovementBook />;
      case 'ai-solver':
        return <AiDoubtSolver />;
      case 'study-planner':
        return <StudyPlanner />;
      case 'analytics':
        return <AnalyticsView />;
      case 'notes':
        return <RevisionNotes />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className="flex min-h-screen bg-[#0D1117] text-[#F0F6FC]">
      {/* Sleek Studio Dark Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <Header />

        <main className="flex-1 p-8 max-w-7xl w-full mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18, ease: 'easeOut' }}
            >
              {renderActiveTab()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* Global Modals */}
      <CommandPalette />
      <TestRunnerModal />

      {/* Toast Notification Banner */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-[#161B22] border border-white/[0.1] shadow-2xl text-xs text-[#F0F6FC]"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span className="font-medium">{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
