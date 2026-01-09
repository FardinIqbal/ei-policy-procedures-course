'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { tracks } from '@/lib/content';
import { getProgress } from '@/lib/progress';
import { useEffect, useState } from 'react';
import { ThemeToggle } from '@/components/ThemeProvider';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

function ClipboardIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
      <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

function BookIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

export default function Home() {
  const [hasProgress, setHasProgress] = useState<{ coordinator: boolean; provider: boolean }>({
    coordinator: false,
    provider: false,
  });

  useEffect(() => {
    const progress = getProgress();
    setHasProgress({
      coordinator: progress.coordinator.length > 0,
      provider: progress.provider.length > 0,
    });
  }, []);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-[var(--background)]/80 border-b border-[var(--border)]"
      >
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[var(--accent-muted)] flex items-center justify-center text-[var(--accent)]">
              <BookIcon />
            </div>
            <span className="font-medium text-[var(--foreground)]">NYC EI Training</span>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/reference"
              className="text-sm text-[var(--foreground-muted)] hover:text-[var(--foreground)] transition-colors"
            >
              Quick Reference
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <main className="pt-32 pb-20 px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto text-center"
        >
          <motion.div variants={itemVariants} className="mb-4">
            <span className="inline-block px-3 py-1 text-xs font-medium tracking-wide uppercase text-[var(--accent)] bg-[var(--accent-muted)] rounded-full">
              NYC Early Intervention Program
            </span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="font-display text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight text-[var(--foreground)] mb-6"
          >
            Master EI Policies
            <br />
            <span className="text-[var(--foreground-muted)]">in 30 Minutes</span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-[var(--foreground-muted)] max-w-2xl mx-auto mb-4"
          >
            Transform 595 pages of policy into essential, role-specific training.
            Learn the critical timelines, compliance requirements, and documentation
            standards that matter most.
          </motion.p>

          <motion.p
            variants={itemVariants}
            className="text-sm text-[var(--foreground-subtle)] mb-16"
          >
            Based on NYC Policy Manual (October 2025 Update)
          </motion.p>

          {/* Role Selection Cards */}
          <motion.div
            variants={containerVariants}
            className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto"
          >
            {/* Coordinator Card */}
            <motion.div variants={cardVariants}>
              <Link href="/course/coordinator" className="block group">
                <div className="relative p-8 rounded-2xl border border-[var(--border)] bg-[var(--surface)] hover:bg-[var(--surface-hover)] transition-all duration-300 hover:border-[var(--accent)] hover:shadow-[0_0_40px_-10px_var(--accent)]">
                  <div className="absolute top-4 right-4">
                    <motion.div
                      className="w-10 h-10 rounded-full bg-[var(--accent-muted)] flex items-center justify-center text-[var(--accent)] opacity-0 group-hover:opacity-100 transition-opacity"
                      whileHover={{ scale: 1.1 }}
                    >
                      <ArrowRightIcon />
                    </motion.div>
                  </div>

                  <div className="w-14 h-14 rounded-xl bg-[var(--accent-muted)] flex items-center justify-center text-[var(--accent)] mb-6">
                    <ClipboardIcon />
                  </div>

                  <h2 className="font-display text-2xl font-medium text-[var(--foreground)] mb-2 text-left">
                    {tracks[0].title}
                  </h2>

                  <p className="text-[var(--foreground-muted)] text-left mb-4">
                    {tracks[0].description}
                  </p>

                  <div className="flex items-center gap-4 text-sm text-[var(--foreground-subtle)]">
                    <span>{tracks[0].modules.length} modules</span>
                    <span className="w-1 h-1 rounded-full bg-[var(--border-subtle)]" />
                    <span>~30 min</span>
                    {hasProgress.coordinator && (
                      <>
                        <span className="w-1 h-1 rounded-full bg-[var(--border-subtle)]" />
                        <span className="text-[var(--accent)]">In progress</span>
                      </>
                    )}
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* Provider Card */}
            <motion.div variants={cardVariants}>
              <Link href="/course/provider" className="block group">
                <div className="relative p-8 rounded-2xl border border-[var(--border)] bg-[var(--surface)] hover:bg-[var(--surface-hover)] transition-all duration-300 hover:border-[var(--teal)] hover:shadow-[0_0_40px_-10px_var(--teal)]">
                  <div className="absolute top-4 right-4">
                    <motion.div
                      className="w-10 h-10 rounded-full bg-[var(--teal-muted)] flex items-center justify-center text-[var(--teal)] opacity-0 group-hover:opacity-100 transition-opacity"
                      whileHover={{ scale: 1.1 }}
                    >
                      <ArrowRightIcon />
                    </motion.div>
                  </div>

                  <div className="w-14 h-14 rounded-xl bg-[var(--teal-muted)] flex items-center justify-center text-[var(--teal)] mb-6">
                    <HeartIcon />
                  </div>

                  <h2 className="font-display text-2xl font-medium text-[var(--foreground)] mb-2 text-left">
                    {tracks[1].title}
                  </h2>

                  <p className="text-[var(--foreground-muted)] text-left mb-4">
                    {tracks[1].description}
                  </p>

                  <div className="flex items-center gap-4 text-sm text-[var(--foreground-subtle)]">
                    <span>{tracks[1].modules.length} modules</span>
                    <span className="w-1 h-1 rounded-full bg-[var(--border-subtle)]" />
                    <span>~28 min</span>
                    {hasProgress.provider && (
                      <>
                        <span className="w-1 h-1 rounded-full bg-[var(--border-subtle)]" />
                        <span className="text-[var(--teal)]">In progress</span>
                      </>
                    )}
                  </div>
                </div>
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="max-w-4xl mx-auto mt-24"
        >
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Role-Specific',
                description: 'Content tailored to your job responsibilities',
              },
              {
                title: 'Compliance-Focused',
                description: 'Critical timelines and requirements that cause audit findings',
              },
              {
                title: 'Progress Tracking',
                description: 'Pick up where you left off, track your completion',
              },
            ].map((feature, i) => (
              <div key={i} className="text-center">
                <h3 className="font-medium text-[var(--foreground)] mb-2">{feature.title}</h3>
                <p className="text-sm text-[var(--foreground-muted)]">{feature.description}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[var(--border)] py-8 px-6">
        <div className="max-w-4xl mx-auto text-center text-sm text-[var(--foreground-subtle)]">
          <p>
            This training is based on the NYC Early Intervention Policy and Procedure Manual (October 2025 Update).
            Always refer to the official manual for complete policy details.
          </p>
        </div>
      </footer>
    </div>
  );
}
