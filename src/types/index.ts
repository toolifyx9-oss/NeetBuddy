export type SubjectCode = 'ph' | 'ch' | 'bi';
export type SubjectName = 'Physics' | 'Chemistry' | 'Biology';

export interface Question {
  id: number;
  subjectCode: SubjectCode;
  subjectName: SubjectName;
  chapter: string;
  topic: string;
  question: string;
  options: string[];
  correctAnswer: number; // 0, 1, 2, 3
  explanation: string;
  commonMistake?: string;
  difficulty?: 'Easy' | 'Medium' | 'Hard';
}

export interface MistakeRecord {
  id: string;
  questionId: number;
  question: Question;
  userAnswer: number;
  correctAnswer: number;
  date: string;
  isMastered: boolean;
  notes?: string;
}

export interface MockTest {
  id: string;
  title: string;
  subtitle: string;
  category: 'full_syllabus' | 'subject_wise' | 'high_yield';
  durationMinutes: number;
  totalQuestions: number;
  totalMarks: number;
  syllabus: string[];
  difficulty: 'NTA Standard' | 'AIIMS Level' | 'Moderate';
  recommended?: boolean;
  subjectDistribution: {
    physics: number;
    chemistry: number;
    biology: number;
  };
  sampleQuestionIds?: number[];
}

export interface TestSubmission {
  id: string;
  testId: string;
  title: string;
  date: string;
  score: number;
  maxScore: number;
  accuracy: number;
  timeSpentSeconds: number;
  correctCount: number;
  incorrectCount: number;
  unattemptedCount: number;
  subjectScores: {
    physics: { score: number; max: number; correct: number; incorrect: number };
    chemistry: { score: number; max: number; correct: number; incorrect: number };
    biology: { score: number; max: number; correct: number; incorrect: number };
  };
  answers: Record<number, number>;
  questions: Question[];
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  cls: string;
  targetScore: number;
  dreamCollege: string;
  currentStreak: number;
  longestStreak: number;
  lastActiveDate: string;
  testsCompleted: number;
  questionsAttempted: number;
  overallAccuracy: number;
  avatar: string;
}

export interface StudyTask {
  id: string;
  title: string;
  subject: SubjectName;
  chapter: string;
  status: 'todo' | 'in_progress' | 'completed';
  priority: 'high' | 'medium' | 'low';
  dueDate: string;
}

export interface AiDoubtResponse {
  id: string;
  prompt: string;
  subject: string;
  concept: string;
  solutionSteps: string[];
  formulas: string[];
  proTip: string;
  timestamp: string;
}

export interface ChapterNote {
  id: string;
  subject: SubjectName;
  chapter: string;
  weightage: string;
  summary: string;
  keyFormulas: { name: string; formula: string; note: string }[];
  highYieldPoints: string[];
}

