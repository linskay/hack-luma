export interface DockerTask {
  id: number;
  level: number;
  title: string;
  story: string;
  description: string;
  correctCommand: string;
  hints: string[];
  alternativeCommands: string[];
  category: string;
  difficulty: number;
  tags: string[];
}

export interface CommandSubmission {
  level: number;
  command: string;
  userId: string;
}

export interface CommandResult {
  isCorrect: boolean;
  hint: string;
  feedback: string;
  expectedOutput?: string;
  userOutput?: string;
  score: number;
  levelCompleted: boolean;
}

export interface DockerProgress {
  userId: string;
  currentLevel: number;
  completedLevels: number[];
  levelScores: Record<number, number>;
  totalScore: number;
  lastCompletedTask: string;
  lastActivityTime: number;
}

export interface DockerLevel {
  id: number;
  title: string;
  description: string;
  difficulty: string;
  isUnlocked: boolean;
  isCompleted: boolean;
  score: number;
  icon: string;
  color: string;
}
