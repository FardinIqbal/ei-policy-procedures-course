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
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

function ChevronRightIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6" />
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
      <header className="fixed top-0 left-0 right-0 z-50 bg-[var(--background)] border-b border-[var(--border)]">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <span className="text-sm font-medium text-[var(--foreground-muted)] tracking-wide uppercase">
            NYC Early Intervention
          </span>
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

      {/* Hero Section */}
      <main className="pt-32 pb-20 px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-3xl mx-auto"
        >
          <motion.p
            variants={itemVariants}
            className="text-sm text-[var(--foreground-subtle)] mb-6 tracking-wide"
          >
            Professional Development
          </motion.p>

          <motion.h1
            variants={itemVariants}
            className="font-display text-4xl md:text-5xl lg:text-6xl text-[var(--foreground)] mb-6 leading-[1.1]"
          >
            Policy & Procedure
            <br />
            <span className="text-[var(--foreground-muted)]">Certification</span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-lg text-[var(--foreground-muted)] max-w-2xl mb-4 leading-relaxed"
          >
            Essential compliance training for Early Intervention professionals.
            Complete your role-specific certification in approximately 30 minutes.
          </motion.p>

          <motion.p
            variants={itemVariants}
            className="text-sm text-[var(--foreground-subtle)] mb-16"
          >
            Based on the NYC Policy Manual, October 2025 Update
          </motion.p>

          {/* Role Selection */}
          <motion.div variants={containerVariants} className="space-y-4">
            <motion.p variants={itemVariants} className="text-sm text-[var(--foreground-subtle)] mb-2">
              Select your role to begin
            </motion.p>

            {/* Coordinator Card */}
            <motion.div variants={itemVariants}>
              <Link href="/course/coordinator" className="block group">
                <div className="p-6 border border-[var(--border)] hover:border-[var(--border-subtle)] bg-[var(--surface)] hover:bg-[var(--surface-hover)] transition-colors">
                  <div className="flex items-start justify-between">
                    <div>
                      <h2 className="font-display text-xl text-[var(--foreground)] mb-1">
                        {tracks[0].title}
                      </h2>
                      <p className="text-sm text-[var(--foreground-muted)] mb-3">
                        {tracks[0].description}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-[var(--foreground-subtle)]">
                        <span>{tracks[0].modules.length} chapters</span>
                        <span>30 min</span>
                        {hasProgress.coordinator && (
                          <span className="text-[var(--accent)]">In progress</span>
                        )}
                      </div>
                    </div>
                    <div className="text-[var(--foreground-subtle)] group-hover:text-[var(--foreground-muted)] transition-colors mt-1">
                      <ChevronRightIcon />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* Provider Card */}
            <motion.div variants={itemVariants}>
              <Link href="/course/provider" className="block group">
                <div className="p-6 border border-[var(--border)] hover:border-[var(--border-subtle)] bg-[var(--surface)] hover:bg-[var(--surface-hover)] transition-colors">
                  <div className="flex items-start justify-between">
                    <div>
                      <h2 className="font-display text-xl text-[var(--foreground)] mb-1">
                        {tracks[1].title}
                      </h2>
                      <p className="text-sm text-[var(--foreground-muted)] mb-3">
                        {tracks[1].description}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-[var(--foreground-subtle)]">
                        <span>{tracks[1].modules.length} chapters</span>
                        <span>28 min</span>
                        {hasProgress.provider && (
                          <span className="text-[var(--teal)]">In progress</span>
                        )}
                      </div>
                    </div>
                    <div className="text-[var(--foreground-subtle)] group-hover:text-[var(--foreground-muted)] transition-colors mt-1">
                      <ChevronRightIcon />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          </motion.div>

          {/* Features - simplified */}
          <motion.div
            variants={itemVariants}
            className="mt-20 pt-12 border-t border-[var(--border)]"
          >
            <div className="grid md:grid-cols-3 gap-8 text-sm">
              <div>
                <h3 className="text-[var(--foreground)] mb-1">Role-specific content</h3>
                <p className="text-[var(--foreground-subtle)]">
                  Training tailored to your responsibilities
                </p>
              </div>
              <div>
                <h3 className="text-[var(--foreground)] mb-1">Compliance-focused</h3>
                <p className="text-[var(--foreground-subtle)]">
                  Critical timelines and audit requirements
                </p>
              </div>
              <div>
                <h3 className="text-[var(--foreground)] mb-1">Verifiable completion</h3>
                <p className="text-[var(--foreground-subtle)]">
                  Certificate of completion provided
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[var(--border)] py-8 px-6">
        <div className="max-w-3xl mx-auto text-xs text-[var(--foreground-subtle)]">
          <p>
            This training is based on the NYC Early Intervention Policy and Procedure Manual (October 2025 Update).
            Refer to the official manual for complete policy details.
          </p>
        </div>
      </footer>
    </div>
  );
}
