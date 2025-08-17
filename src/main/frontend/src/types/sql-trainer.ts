export interface Task {
  id: number;
  level: number;
  taskNumber: number;
  title: string;
  story: string;
  schema: string;
  question: string;
  solution: string;
  hint: string;
  difficulty: string;
}

export interface TaskSubmission {
  query: string;
  level: number;
  taskNumber: number;
}

export interface TaskResult {
  isCorrect: boolean;
  message: string;
  hint?: string;
  expectedResult?: any[];
  actualResult?: any[];
  errorMessage?: string;
}

export interface Progress {
  userId: string;
  completedTasks: string[];
  currentLevel: number;
  currentTask: number;
}

export interface LevelProgress {
  level: number;
  completedCount: number;
  totalCount: number;
  progress: number;
}

export interface OverallProgress {
  overallProgress: number;
  totalCompleted: number;
  totalTasks: number;
  currentLevel: number;
  currentTask: number;
}
