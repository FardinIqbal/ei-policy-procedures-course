'use client';

import { Role } from './content';

const STORAGE_KEY = 'ei-training-progress';

export interface Progress {
  coordinator: string[];
  provider: string[];
  startedAt?: string;
  lastActiveAt?: string;
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
