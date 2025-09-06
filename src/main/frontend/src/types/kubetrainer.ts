export interface KubeTask {
  id: number;
  level: number;
  title: string;
  story: string;
  description: string;
  validationCriteria: string;
}

export interface KubeSubmission {
  taskId: number;
  yaml: string;
}

export interface KubeResult {
  success: boolean;
  message: string;
  details?: string;
  hint?: string;
  taskCompleted: boolean;
}
