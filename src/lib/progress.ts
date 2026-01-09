'use client';

import { Role } from './content';

const STORAGE_KEY = 'ei-training-progress';

export interface QuizScore {
  moduleId: string;
  correct: number;
  total: number;
  completedAt: string;
}

export interface ModuleProgress {
  moduleId: string;
  startedAt: string;
  completedAt?: string;
  timeSpentSeconds: number;
}

export interface Progress {
  coordinator: string[];
  provider: string[];
  startedAt?: string;
  lastActiveAt?: string;
  lastModule?: {
    role: Role;
    moduleId: string;
    scrollPosition?: number;
  };
  quizScores?: {
    coordinator: QuizScore[];
    provider: QuizScore[];
  };
  moduleProgress?: {
    coordinator: ModuleProgress[];
    provider: ModuleProgress[];
  };
  totalTimeSeconds?: number;
}

function getDefaultProgress(): Progress {
  return {
    coordinator: [],
    provider: [],
  };
}

export function getProgress(): Progress {
  if (typeof window === 'undefined') return getDefaultProgress();

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return getDefaultProgress();
    return JSON.parse(stored) as Progress;
  } catch {
    return getDefaultProgress();
  }
}

export function saveProgress(progress: Progress): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      ...progress,
      lastActiveAt: new Date().toISOString(),
    }));
  } catch {
    console.error('Failed to save progress');
  }
}

export function markModuleComplete(role: Role, moduleId: string): void {
  const progress = getProgress();
  const completed = progress[role];

  if (!completed.includes(moduleId)) {
    progress[role] = [...completed, moduleId];
    if (!progress.startedAt) {
      progress.startedAt = new Date().toISOString();
    }
    saveProgress(progress);
  }
}

export function markModuleIncomplete(role: Role, moduleId: string): void {
  const progress = getProgress();
  progress[role] = progress[role].filter(id => id !== moduleId);
  saveProgress(progress);
}

export function isModuleComplete(role: Role, moduleId: string): boolean {
  const progress = getProgress();
  return progress[role].includes(moduleId);
}

export function getCompletedModules(role: Role): string[] {
  const progress = getProgress();
  return progress[role];
}

export function getCompletionPercentage(role: Role, totalModules: number): number {
  const progress = getProgress();
  const completed = progress[role].length;
  return Math.round((completed / totalModules) * 100);
}

export function resetProgress(role?: Role): void {
  if (role) {
    const progress = getProgress();
    progress[role] = [];
    saveProgress(progress);
  } else {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEY);
    }
  }
}

export function getEstimatedTimeRemaining(role: Role, totalModules: number, avgMinutesPerModule: number = 4): number {
  const progress = getProgress();
  const completed = progress[role].length;
  const remaining = totalModules - completed;
  return remaining * avgMinutesPerModule;
}

export function saveQuizScore(role: Role, moduleId: string, correct: number, total: number): void {
  const progress = getProgress();

  if (!progress.quizScores) {
    progress.quizScores = { coordinator: [], provider: [] };
  }

  const existingIndex = progress.quizScores[role].findIndex(s => s.moduleId === moduleId);
  const score: QuizScore = {
    moduleId,
    correct,
    total,
    completedAt: new Date().toISOString(),
  };

  if (existingIndex >= 0) {
    progress.quizScores[role][existingIndex] = score;
  } else {
    progress.quizScores[role].push(score);
  }

  saveProgress(progress);
}

export function getQuizScore(role: Role, moduleId: string): QuizScore | undefined {
  const progress = getProgress();
  return progress.quizScores?.[role]?.find(s => s.moduleId === moduleId);
}

export function getAllQuizScores(role: Role): QuizScore[] {
  const progress = getProgress();
  return progress.quizScores?.[role] || [];
}

export function getTotalQuizStats(role: Role): { correct: number; total: number; percentage: number } {
  const scores = getAllQuizScores(role);
  const correct = scores.reduce((sum, s) => sum + s.correct, 0);
  const total = scores.reduce((sum, s) => sum + s.total, 0);
  return {
    correct,
    total,
    percentage: total > 0 ? Math.round((correct / total) * 100) : 0,
  };
}

export function setLastModule(role: Role, moduleId: string, scrollPosition?: number): void {
  const progress = getProgress();
  progress.lastModule = { role, moduleId, scrollPosition };
  saveProgress(progress);
}

export function getLastModule(): Progress['lastModule'] {
  const progress = getProgress();
  return progress.lastModule;
}

export function updateTimeSpent(role: Role, moduleId: string, secondsToAdd: number): void {
  const progress = getProgress();

  if (!progress.moduleProgress) {
    progress.moduleProgress = { coordinator: [], provider: [] };
  }

  const existingIndex = progress.moduleProgress[role].findIndex(p => p.moduleId === moduleId);

  if (existingIndex >= 0) {
    progress.moduleProgress[role][existingIndex].timeSpentSeconds += secondsToAdd;
  } else {
    progress.moduleProgress[role].push({
      moduleId,
      startedAt: new Date().toISOString(),
      timeSpentSeconds: secondsToAdd,
    });
  }

  progress.totalTimeSeconds = (progress.totalTimeSeconds || 0) + secondsToAdd;
  saveProgress(progress);
}

export function getTotalTimeSpent(): number {
  const progress = getProgress();
  return progress.totalTimeSeconds || 0;
}

export function getModuleTimeSpent(role: Role, moduleId: string): number {
  const progress = getProgress();
  const moduleProgress = progress.moduleProgress?.[role]?.find(p => p.moduleId === moduleId);
  return moduleProgress?.timeSpentSeconds || 0;
}

export function formatTime(seconds: number): string {
  if (seconds < 60) return `${seconds}s`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} min`;
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return `${hours}h ${remainingMinutes}m`;
}

export function getLastActiveDate(): Date | null {
  const progress = getProgress();
  return progress.lastActiveAt ? new Date(progress.lastActiveAt) : null;
}

export function formatRelativeTime(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSeconds = Math.floor(diffMs / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffSeconds < 60) return 'Just now';
  if (diffMinutes < 60) return `${diffMinutes} min ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} week${Math.floor(diffDays / 7) > 1 ? 's' : ''} ago`;
  return date.toLocaleDateString();
}
