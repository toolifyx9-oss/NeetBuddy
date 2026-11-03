'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CalendarDays, 
  Plus, 
  CheckCircle2, 
  Clock, 
  Trash2, 
  ArrowRight, 
  AlertCircle,
  X,
  Dna,
  Atom,
  FlaskConical
} from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { StudyTask, SubjectName } from '@/types';
import { CHAPTERS_BY_SUBJECT } from '@/data/mockData';

export default function StudyPlanner() {
  const { studyTasks, addStudyTask, updateTaskStatus, deleteStudyTask } = useStore();

  const [showAddModal, setShowAddModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newSubject, setNewSubject] = useState<SubjectName>('Biology');
  const [newChapter, setNewChapter] = useState('');
  const [newPriority, setNewPriority] = useState<'high' | 'medium' | 'low'>('high');
  const [newDueDate, setNewDueDate] = useState('Tomorrow');

  const todoTasks = studyTasks.filter((t) => t.status === 'todo');
  const inProgressTasks = studyTasks.filter((t) => t.status === 'in_progress');
  const completedTasks = studyTasks.filter((t) => t.status === 'completed');

  const total = studyTasks.length;
  const done = completedTasks.length;
  const progressPercent = total > 0 ? Math.round((done / total) * 100) : 0;

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    addStudyTask({
      title: newTitle.trim(),
      subject: newSubject,
      chapter: newChapter || 'General Revision',
      status: 'todo',
      priority: newPriority,
      dueDate: newDueDate || 'This week',
    });

    setNewTitle('');
    setShowAddModal(false);
  };

  const getSubjectIcon = (sub: SubjectName) => {
    if (sub === 'Physics') return <Atom className="w-3.5 h-3.5 text-indigo-400" />;
    if (sub === 'Chemistry') return <FlaskConical className="w-3.5 h-3.5 text-cyan-400" />;
    return <Dna className="w-3.5 h-3.5 text-emerald-400" />;
  };

  return (
    <div className="space-y-8">
      {/* Top Planner Header & Progress */}
      <div className="p-6 rounded-2xl bg-white/[0.025] border border-white/[0.08] backdrop-blur-md flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-400">
              <CalendarDays className="w-4 h-4" />
            </span>
            <h2 className="text-sm font-bold text-[#F0F6FC]">
              NEET 2026 Adaptive Study Planner
            </h2>
          </div>
          <p className="text-xs text-[#8B949E]">
            Organize daily NCERT readings, PYQ sets, and formula practice with high-weightage priority tags.
          </p>
        </div>

        <div className="flex items-center gap-6">
          <div className="text-right">
            <p className="text-xs text-[#8B949E]">Tasks Completed</p>
            <p className="text-xl font-black text-[#F0F6FC] mt-0.5">
              {done} <span className="text-xs font-normal text-[#8B949E]">/ {total} ({progressPercent}%)</span>
            </p>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-md shadow-indigo-600/20"
          >
            <Plus className="w-4 h-4" />
            <span>Add Task</span>
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-white/[0.04] h-2 rounded-full overflow-hidden">
        <div
          className="bg-indigo-500 h-full rounded-full transition-all duration-500"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Kanban Columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Column 1: To Do */}
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-white/[0.08]">
            <h3 className="text-xs font-bold text-[#F0F6FC] uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <span>To Do ({todoTasks.length})</span>
            </h3>
          </div>

          <div className="space-y-3">
            {todoTasks.map((task) => (
              <div
                key={task.id}
                className="p-4 rounded-xl bg-white/[0.025] hover:bg-white/[0.04] border border-white/[0.06] transition-all space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-[10px] font-semibold text-[#8B949E]">
                    {getSubjectIcon(task.subject)}
                    <span>{task.subject}</span>
                  </span>
                  <span
                    className={`text-[9px] font-bold px-2 py-0.5 rounded-full uppercase ${
                      task.priority === 'high'
                        ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                        : task.priority === 'medium'
                        ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                        : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                    }`}
                  >
                    {task.priority}
                  </span>
                </div>

                <p className="text-xs font-semibold text-[#F0F6FC] leading-snug">{task.title}</p>
                <p className="text-[11px] text-[#8B949E]">{task.chapter}</p>

                <div className="pt-2 border-t border-white/[0.04] flex items-center justify-between text-[11px] text-[#8B949E]">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-[#484F58]" />
                    {task.dueDate}
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => deleteStudyTask(task.id)}
                      className="text-[#484F58] hover:text-rose-400 transition-colors p-1"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                    <button
                      onClick={() => updateTaskStatus(task.id, 'in_progress')}
                      className="flex items-center gap-1 text-[11px] font-semibold text-indigo-400 hover:text-indigo-300"
                    >
                      <span>Start</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Column 2: In Progress */}
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-white/[0.08]">
            <h3 className="text-xs font-bold text-[#F0F6FC] uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-400" />
              <span>In Progress ({inProgressTasks.length})</span>
            </h3>
          </div>

          <div className="space-y-3">
            {inProgressTasks.map((task) => (
              <div
                key={task.id}
                className="p-4 rounded-xl bg-indigo-500/[0.04] border border-indigo-500/25 transition-all space-y-3 shadow-md shadow-indigo-500/5"
              >
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-[10px] font-semibold text-indigo-300">
                    {getSubjectIcon(task.subject)}
                    <span>{task.subject}</span>
                  </span>
                  <span className="text-[9px] font-bold px-2 py-0.5 rounded-full uppercase bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                    Active
                  </span>
                </div>

                <p className="text-xs font-semibold text-[#F0F6FC] leading-snug">{task.title}</p>
                <p className="text-[11px] text-[#8B949E]">{task.chapter}</p>

                <div className="pt-2 border-t border-white/[0.04] flex items-center justify-between text-[11px] text-[#8B949E]">
                  <span className="flex items-center gap-1 text-indigo-400">
                    <Clock className="w-3 h-3" />
                    {task.dueDate}
                  </span>

                  <button
                    onClick={() => updateTaskStatus(task.id, 'completed')}
                    className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 text-[11px] font-semibold hover:bg-emerald-600/30 transition-colors"
                  >
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Complete</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Column 3: Completed */}
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-white/[0.08]">
            <h3 className="text-xs font-bold text-[#F0F6FC] uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>Completed ({completedTasks.length})</span>
            </h3>
          </div>

          <div className="space-y-3">
            {completedTasks.map((task) => (
              <div
                key={task.id}
                className="p-4 rounded-xl bg-white/[0.015] border border-white/[0.04] transition-all space-y-2 opacity-75 hover:opacity-100"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-[#8B949E]">{task.subject}</span>
                  <span className="text-[10px] text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Done
                  </span>
                </div>

                <p className="text-xs font-medium text-[#8B949E] line-through">{task.title}</p>
                <p className="text-[10px] text-[#484F58]">{task.chapter}</p>

                <div className="pt-2 border-t border-white/[0.03] flex justify-end">
                  <button
                    onClick={() => deleteStudyTask(task.id)}
                    className="text-[#484F58] hover:text-rose-400 transition-colors p-1"
                    title="Remove task"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Add Task Modal */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg bg-[#161B22] border border-white/[0.1] rounded-2xl p-6 shadow-2xl space-y-5"
            >
              <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
                <h3 className="text-sm font-bold text-[#F0F6FC]">Add Study Task</h3>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="p-1 rounded-lg text-[#8B949E] hover:text-[#F0F6FC]"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleCreateTask} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-[#8B949E]">Task Objective / Title</label>
                  <input
                    type="text"
                    required
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="e.g. Read Genetics NCERT lines 120-145 and solve 30 PYQs"
                    className="w-full p-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-xs text-[#F0F6FC] placeholder-[#484F58] outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-[#8B949E]">Subject</label>
                    <select
                      value={newSubject}
                      onChange={(e) => setNewSubject(e.target.value as SubjectName)}
                      className="w-full p-2.5 rounded-xl bg-[#0D1117] border border-white/[0.08] text-xs text-[#F0F6FC] outline-none"
                    >
                      <option value="Physics">Physics</option>
                      <option value="Chemistry">Chemistry</option>
                      <option value="Biology">Biology</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-medium text-[#8B949E]">Priority</label>
                    <select
                      value={newPriority}
                      onChange={(e) => setNewPriority(e.target.value as any)}
                      className="w-full p-2.5 rounded-xl bg-[#0D1117] border border-white/[0.08] text-xs text-[#F0F6FC] outline-none"
                    >
                      <option value="high">High Priority</option>
                      <option value="medium">Medium</option>
                      <option value="low">Low</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-[#8B949E]">Chapter</label>
                  <input
                    type="text"
                    value={newChapter}
                    onChange={(e) => setNewChapter(e.target.value)}
                    placeholder="e.g. Molecular Basis of Inheritance"
                    className="w-full p-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-xs text-[#F0F6FC] placeholder-[#484F58] outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-[#8B949E]">Target Deadline</label>
                  <input
                    type="text"
                    value={newDueDate}
                    onChange={(e) => setNewDueDate(e.target.value)}
                    placeholder="e.g. Tonight, 10 PM"
                    className="w-full p-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-xs text-[#F0F6FC] placeholder-[#484F58] outline-none"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2 rounded-xl text-xs text-[#8B949E] hover:text-[#F0F6FC]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-md shadow-indigo-600/25"
                  >
                    Create Task
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

