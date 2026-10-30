'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  UserProfile, 
  MistakeRecord, 
  StudyTask, 
  TestSubmission, 
  Question, 
  MockTest 
} from '../types';
import { 
  INITIAL_USER, 
  INITIAL_MISTAKES, 
  INITIAL_STUDY_TASKS, 
  INITIAL_PAST_SUBMISSIONS, 
  ALL_QUESTIONS 
} from '../data/mockData';

export interface ActiveTestState {
  id: string;
  testId?: string;
  title: string;
  durationMinutes: number;
  totalTimeSeconds: number;
  timeRemainingSeconds: number;
  questions: Question[];
  currentQuestionIndex: number;
  answers: Record<number, number>; // questionId -> optionIndex
  markedForReview: number[]; // questionId[]
  visitedQuestions: number[]; // questionId[]
  isCompleted: boolean;
}

interface StoreContextType {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  user: UserProfile;
  updateUser: (updates: Partial<UserProfile>) => void;
  streak: number;
  incrementStreak: () => void;
  
  // Bookmarks
  bookmarkedIds: number[];
  toggleBookmark: (questionId: number) => void;
  isBookmarked: (questionId: number) => boolean;

  // Improvement & Mistakes
  mistakes: MistakeRecord[];
  addMistake: (question: Question, userAnswer: number) => void;
  toggleMasteredMistake: (mistakeId: string) => void;
  deleteMistake: (mistakeId: string) => void;

  // Study Planner
  studyTasks: StudyTask[];
  addStudyTask: (task: Omit<StudyTask, 'id'>) => void;
  updateTaskStatus: (taskId: string, status: 'todo' | 'in_progress' | 'completed') => void;
  deleteStudyTask: (taskId: string) => void;

  // Test Submissions
  testSubmissions: TestSubmission[];
  recordSubmission: (submission: TestSubmission) => void;

  // Active Test Engine
  activeTest: ActiveTestState | null;
  startCustomTest: (config: {
    title: string;
    subject?: 'ph' | 'ch' | 'bi' | 'all';
    chapter?: string;
    questionCount: number;
    durationMinutes: number;
    difficulty?: string;
  }) => void;
  startPrebuiltMockTest: (mockTest: MockTest) => void;
  selectOption: (questionId: number, optionIndex: number) => void;
  toggleMarkQuestion: (questionId: number) => void;
  setCurrentQuestionIndex: (index: number) => void;
  tickTimer: () => void;
  submitCurrentTest: () => TestSubmission | null;
  cancelTest: () => void;
  
  // Active review of submitted test
  reviewSubmission: TestSubmission | null;
  setReviewSubmission: (sub: TestSubmission | null) => void;

  // Command palette
  isCommandPaletteOpen: boolean;
  setCommandPaletteOpen: (open: boolean) => void;

  // Toast notifications
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const STORAGE_KEY = 'neetbuddy_store_v2';

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [user, setUser] = useState<UserProfile>(INITIAL_USER);
  const [bookmarkedIds, setBookmarkedIds] = useState<number[]>([0, 101, 250]);
  const [mistakes, setMistakes] = useState<MistakeRecord[]>(INITIAL_MISTAKES);
  const [studyTasks, setStudyTasks] = useState<StudyTask[]>(INITIAL_STUDY_TASKS);
  const [testSubmissions, setTestSubmissions] = useState<TestSubmission[]>(INITIAL_PAST_SUBMISSIONS);
  const [activeTest, setActiveTest] = useState<ActiveTestState | null>(null);
  const [reviewSubmission, setReviewSubmission] = useState<TestSubmission | null>(null);
  const [isCommandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load from LocalStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.user) setUser(parsed.user);
        if (parsed.bookmarkedIds) setBookmarkedIds(parsed.bookmarkedIds);
        if (parsed.mistakes) setMistakes(parsed.mistakes);
        if (parsed.studyTasks) setStudyTasks(parsed.studyTasks);
        if (parsed.testSubmissions) setTestSubmissions(parsed.testSubmissions);
      }
    } catch (e) {
      console.warn('Could not read from local storage', e);
    }
    setIsHydrated(true);
  }, []);

  // Save to LocalStorage
  useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          user,
          bookmarkedIds,
          mistakes,
          studyTasks,
          testSubmissions,
        })
      );
    } catch (e) {
      console.warn('Could not save to local storage', e);
    }
  }, [user, bookmarkedIds, mistakes, studyTasks, testSubmissions, isHydrated]);

  // Global Keyboard listener for Command Palette (Cmd+K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((cur) => (cur === msg ? null : cur));
    }, 3500);
  };

  const updateUser = (updates: Partial<UserProfile>) => {
    setUser((prev) => ({ ...prev, ...updates }));
  };

  const incrementStreak = () => {
    setUser((prev) => {
      const nextStreak = prev.currentStreak + 1;
      return {
        ...prev,
        currentStreak: nextStreak,
        longestStreak: Math.max(prev.longestStreak, nextStreak),
        lastActiveDate: new Date().toISOString(),
      };
    });
  };

  const toggleBookmark = (questionId: number) => {
    setBookmarkedIds((prev) => {
      const exists = prev.includes(questionId);
      const next = exists ? prev.filter((id) => id !== questionId) : [...prev, questionId];
      showToast(exists ? 'Removed from Bookmarks' : 'Saved to Question Bookmarks');
      return next;
    });
  };

  const isBookmarked = (questionId: number) => bookmarkedIds.includes(questionId);

  const addMistake = (question: Question, userAnswer: number) => {
    setMistakes((prev) => {
      const existing = prev.find((m) => m.questionId === question.id);
      if (existing) {
        return prev.map((m) =>
          m.questionId === question.id
            ? { ...m, userAnswer, date: new Date().toISOString(), isMastered: false }
            : m
        );
      }
      const newRecord: MistakeRecord = {
        id: `mistake_${Date.now()}_${question.id}`,
        questionId: question.id,
        question,
        userAnswer,
        correctAnswer: question.correctAnswer,
        date: new Date().toISOString(),
        isMastered: false,
        notes: question.commonMistake,
      };
      return [newRecord, ...prev];
    });
  };

  const toggleMasteredMistake = (mistakeId: string) => {
    setMistakes((prev) =>
      prev.map((m) => {
        if (m.id === mistakeId) {
          const nextState = !m.isMastered;
          showToast(nextState ? 'Marked as Mastered! 🎉' : 'Moved back to active mistakes');
          return { ...m, isMastered: nextState };
        }
        return m;
      })
    );
  };

  const deleteMistake = (mistakeId: string) => {
    setMistakes((prev) => prev.filter((m) => m.id !== mistakeId));
    showToast('Question removed from Mistake Book');
  };

  const addStudyTask = (task: Omit<StudyTask, 'id'>) => {
    const newTask: StudyTask = {
      ...task,
      id: `task_${Date.now()}`,
    };
    setStudyTasks((prev) => [newTask, ...prev]);
    showToast('Task added to Study Planner');
  };

  const updateTaskStatus = (taskId: string, status: 'todo' | 'in_progress' | 'completed') => {
    setStudyTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, status } : t))
    );
  };

  const deleteStudyTask = (taskId: string) => {
    setStudyTasks((prev) => prev.filter((t) => t.id !== taskId));
    showToast('Task deleted');
  };

  const recordSubmission = (submission: TestSubmission) => {
    setTestSubmissions((prev) => [submission, ...prev]);
    incrementStreak();

    // Recalculate user telemetry
    setUser((prev) => {
      const totalTests = prev.testsCompleted + 1;
      const totalQuestions = prev.questionsAttempted + submission.questions.length;
      const newAcc = Math.round(
        ((prev.overallAccuracy * prev.questionsAttempted +
          submission.accuracy * submission.questions.length) /
          totalQuestions) *
          10
      ) / 10;
      return {
        ...prev,
        testsCompleted: totalTests,
        questionsAttempted: totalQuestions,
        overallAccuracy: newAcc,
      };
    });
  };

  const startCustomTest = (config: {
    title: string;
    subject?: 'ph' | 'ch' | 'bi' | 'all';
    chapter?: string;
    questionCount: number;
    durationMinutes: number;
    difficulty?: string;
  }) => {
    let pool = [...ALL_QUESTIONS];
    if (config.subject && config.subject !== 'all') {
      pool = pool.filter((q) => q.subjectCode === config.subject);
    }
    if (config.chapter && config.chapter !== 'all') {
      pool = pool.filter((q) => q.chapter.toLowerCase() === config.chapter?.toLowerCase());
    }
    if (config.difficulty && config.difficulty !== 'all') {
      pool = pool.filter((q) => q.difficulty === config.difficulty);
    }

    // Shuffle pool
    const shuffled = [...pool].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, Math.min(config.questionCount, shuffled.length));

    // Fallback if pool was small
    if (selected.length === 0) {
      selected.push(...ALL_QUESTIONS.slice(0, config.questionCount));
    }

    setActiveTest({
      id: `session_${Date.now()}`,
      title: config.title,
      durationMinutes: config.durationMinutes,
      totalTimeSeconds: config.durationMinutes * 60,
      timeRemainingSeconds: config.durationMinutes * 60,
      questions: selected,
      currentQuestionIndex: 0,
      answers: {},
      markedForReview: [],
      visitedQuestions: [selected[0]?.id ?? 0],
      isCompleted: false,
    });
  };

  const startPrebuiltMockTest = (mockTest: MockTest) => {
    let selected: Question[] = [];
    const phPool = ALL_QUESTIONS.filter((q) => q.subjectCode === 'ph');
    const chPool = ALL_QUESTIONS.filter((q) => q.subjectCode === 'ch');
    const biPool = ALL_QUESTIONS.filter((q) => q.subjectCode === 'bi');

    const phCount = mockTest.subjectDistribution.physics;
    const chCount = mockTest.subjectDistribution.chemistry;
    const biCount = mockTest.subjectDistribution.biology;

    selected.push(...phPool.sort(() => 0.5 - Math.random()).slice(0, phCount));
    selected.push(...chPool.sort(() => 0.5 - Math.random()).slice(0, chCount));
    selected.push(...biPool.sort(() => 0.5 - Math.random()).slice(0, biCount));

    // If total count is still under target, fill with any
    if (selected.length < mockTest.totalQuestions) {
      const remainder = mockTest.totalQuestions - selected.length;
      const unused = ALL_QUESTIONS.filter((q) => !selected.some((s) => s.id === q.id));
      selected.push(...unused.slice(0, remainder));
    }

    setActiveTest({
      id: `mock_${mockTest.id}_${Date.now()}`,
      testId: mockTest.id,
      title: mockTest.title,
      durationMinutes: mockTest.durationMinutes,
      totalTimeSeconds: mockTest.durationMinutes * 60,
      timeRemainingSeconds: mockTest.durationMinutes * 60,
      questions: selected,
      currentQuestionIndex: 0,
      answers: {},
      markedForReview: [],
      visitedQuestions: [selected[0]?.id ?? 0],
      isCompleted: false,
    });
  };

  const selectOption = (questionId: number, optionIndex: number) => {
    if (!activeTest) return;
    setActiveTest((prev) => {
      if (!prev) return null;
      const currentVal = prev.answers[questionId];
      const nextAnswers = { ...prev.answers };
      if (currentVal === optionIndex) {
        delete nextAnswers[questionId]; // Deselect if clicked again
      } else {
        nextAnswers[questionId] = optionIndex;
      }
      return {
        ...prev,
        answers: nextAnswers,
      };
    });
  };

  const toggleMarkQuestion = (questionId: number) => {
    if (!activeTest) return;
    setActiveTest((prev) => {
      if (!prev) return null;
      const isMarked = prev.markedForReview.includes(questionId);
      return {
        ...prev,
        markedForReview: isMarked
          ? prev.markedForReview.filter((id) => id !== questionId)
          : [...prev.markedForReview, questionId],
      };
    });
  };

  const setCurrentQuestionIndex = (index: number) => {
    if (!activeTest) return;
    const bounded = Math.max(0, Math.min(index, activeTest.questions.length - 1));
    const targetQ = activeTest.questions[bounded];
    setActiveTest((prev) => {
      if (!prev) return null;
      const visited = prev.visitedQuestions.includes(targetQ.id)
        ? prev.visitedQuestions
        : [...prev.visitedQuestions, targetQ.id];
      return {
        ...prev,
        currentQuestionIndex: bounded,
        visitedQuestions: visited,
      };
    });
  };

  const tickTimer = () => {
    if (!activeTest) return;
    setActiveTest((prev) => {
      if (!prev) return null;
      if (prev.timeRemainingSeconds <= 1) {
        return { ...prev, timeRemainingSeconds: 0 };
      }
      return { ...prev, timeRemainingSeconds: prev.timeRemainingSeconds - 1 };
    });
  };

  const submitCurrentTest = (): TestSubmission | null => {
    if (!activeTest) return null;

    let correctCount = 0;
    let incorrectCount = 0;
    let unattemptedCount = 0;
    let score = 0;

    const subjectStats = {
      physics: { score: 0, max: 0, correct: 0, incorrect: 0 },
      chemistry: { score: 0, max: 0, correct: 0, incorrect: 0 },
      biology: { score: 0, max: 0, correct: 0, incorrect: 0 },
    };

    activeTest.questions.forEach((q) => {
      const userChoice = activeTest.answers[q.id];
      const sKey = q.subjectCode === 'ph' ? 'physics' : q.subjectCode === 'ch' ? 'chemistry' : 'biology';
      subjectStats[sKey].max += 4;

      if (userChoice === undefined) {
        unattemptedCount++;
      } else if (userChoice === q.correctAnswer) {
        correctCount++;
        score += 4;
        subjectStats[sKey].score += 4;
        subjectStats[sKey].correct += 1;
      } else {
        incorrectCount++;
        score -= 1;
        subjectStats[sKey].score -= 1;
        subjectStats[sKey].incorrect += 1;
        // Auto-save mistake to Improvement Book!
        addMistake(q, userChoice);
      }
    });

    const totalQuestions = activeTest.questions.length;
    const maxScore = totalQuestions * 4;
    const accuracy =
      correctCount + incorrectCount > 0
        ? Math.round((correctCount / (correctCount + incorrectCount)) * 1000) / 10
        : 0;

    const submission: TestSubmission = {
      id: `submission_${Date.now()}`,
      testId: activeTest.testId || activeTest.id,
      title: activeTest.title,
      date: new Date().toISOString(),
      score,
      maxScore,
      accuracy,
      timeSpentSeconds: activeTest.totalTimeSeconds - activeTest.timeRemainingSeconds,
      correctCount,
      incorrectCount,
      unattemptedCount,
      subjectScores: subjectStats,
      answers: activeTest.answers,
      questions: activeTest.questions,
    };

    recordSubmission(submission);
    setReviewSubmission(submission);
    setActiveTest(null);
    showToast(`Test Submitted! Score: ${score}/${maxScore} (${accuracy}% accuracy)`);
    return submission;
  };

  const cancelTest = () => {
    setActiveTest(null);
    showToast('Test session cancelled');
  };

  return (
    <StoreContext.Provider
      value={{
        activeTab,
        setActiveTab,
        user,
        updateUser,
        streak: user.currentStreak,
        incrementStreak,
        bookmarkedIds,
        toggleBookmark,
        isBookmarked,
        mistakes,
        addMistake,
        toggleMasteredMistake,
        deleteMistake,
        studyTasks,
        addStudyTask,
        updateTaskStatus,
        deleteStudyTask,
        testSubmissions,
        recordSubmission,
        activeTest,
        startCustomTest,
        startPrebuiltMockTest,
        selectOption,
        toggleMarkQuestion,
        setCurrentQuestionIndex,
        tickTimer,
        submitCurrentTest,
        cancelTest,
        reviewSubmission,
        setReviewSubmission,
        isCommandPaletteOpen,
        setCommandPaletteOpen,
        toastMessage,
        showToast,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
}
