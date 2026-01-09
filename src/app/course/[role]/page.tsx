'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { getTrack, Role } from '@/lib/content';
import { getCompletedModules, getCompletionPercentage } from '@/lib/progress';
import { ThemeToggle } from '@/components/ThemeProvider';
import Certificate from '@/components/Certificate';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

function ChevronLeftIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

export default function CourseDashboard() {
  const params = useParams();
  const role = params.role as Role;
  const track = getTrack(role);

  const [completedModules, setCompletedModules] = useState<string[]>([]);
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    if (track) {
      const completed = getCompletedModules(role);
      setCompletedModules(completed);
      setPercentage(getCompletionPercentage(role, track.modules.length));
    }
  }, [role, track]);

  if (!track) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-[var(--foreground-muted)]">Track not found</p>
      </div>
    );
  }

  // Find the next incomplete module
  const nextModule = track.modules.find(m => !completedModules.includes(m.id));

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[var(--background)] border-b border-[var(--border)]">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="flex items-center gap-1 text-[var(--foreground-subtle)] hover:text-[var(--foreground-muted)] transition-colors"
            >
              <ChevronLeftIcon />
              <span className="text-sm">Back</span>
            </Link>
          </div>
          <div className="flex items-center gap-6">
            <Link
              href="/reference"
              className="text-sm text-[var(--foreground-subtle)] hover:text-[var(--foreground-muted)] transition-colors"
            >
              Reference
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="pt-28 pb-20 px-6">
        <div className="max-w-3xl mx-auto">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <p className="text-sm text-[var(--foreground-subtle)] mb-2 tracking-wide">
              {track.title}
            </p>
            <h1 className="font-display text-3xl md:text-4xl text-[var(--foreground)] mb-6">
              {percentage === 100 ? 'Training Complete' : percentage === 0 ? 'Begin Training' : 'Continue Training'}
            </h1>

            {/* Progress Bar */}
            <div className="mb-4">
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-[var(--foreground-muted)]">
                  {completedModules.length} of {track.modules.length} chapters completed
                </span>
                <span className="text-[var(--foreground-subtle)]">{percentage}%</span>
              </div>
              <div className="h-1 bg-[var(--border)] rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${percentage}%` }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  className="h-full bg-[var(--foreground-muted)] rounded-full"
                />
              </div>
            </div>

            {nextModule && (
              <Link
                href={`/course/${role}/${nextModule.id}`}
                className="inline-flex items-center gap-2 text-sm text-[var(--accent)] hover:text-[var(--accent-hover)] transition-colors"
              >
                {percentage === 0 ? 'Start with Chapter 1' : `Continue to Chapter ${track.modules.findIndex(m => m.id === nextModule.id) + 1}`}
                <ChevronRightIcon />
              </Link>
            )}
          </motion.div>

          {/* Chapters List */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <h2 className="text-sm text-[var(--foreground-subtle)] mb-4 tracking-wide uppercase">
              Chapters
            </h2>

            <div className="border-t border-[var(--border)]">
              {track.modules.map((module, index) => {
                const isComplete = completedModules.includes(module.id);

                return (
                  <motion.div key={module.id} variants={itemVariants}>
                    <Link
                      href={`/course/${role}/${module.id}`}
                      className="block group"
                    >
                      <div className="py-5 border-b border-[var(--border)] hover:bg-[var(--surface-hover)] transition-colors -mx-4 px-4">
                        <div className="flex items-start gap-4">
                          {/* Chapter Number / Check */}
                          <div className="w-8 h-8 flex items-center justify-center shrink-0">
                            {isComplete ? (
                              <div className="w-6 h-6 rounded-full bg-[var(--success)] flex items-center justify-center text-[var(--background)]">
                                <CheckIcon />
                              </div>
                            ) : (
                              <span className="text-sm text-[var(--foreground-subtle)] font-medium">
                                {index + 1}
                              </span>
                            )}
                          </div>

                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <h3 className={`font-display text-lg mb-1 ${isComplete ? 'text-[var(--foreground-muted)]' : 'text-[var(--foreground)]'}`}>
                              {module.title}
                            </h3>
                            <p className="text-sm text-[var(--foreground-subtle)]">
                              {module.subtitle}
                            </p>
                          </div>

                          {/* Duration */}
                          <span className="text-xs text-[var(--foreground-subtle)] shrink-0">
                            {module.duration}
                          </span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Certificate */}
          {percentage === 100 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-12"
            >
              <h2 className="text-sm text-[var(--foreground-subtle)] mb-4 tracking-wide uppercase">
                Certificate of Completion
              </h2>
              <Certificate
                trackTitle={track.title}
                completionDate={new Date().toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
                chaptersCompleted={track.modules.length}
              />
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
}
