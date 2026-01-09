'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getTrack, getModule, Role } from '@/lib/content';
import { isModuleComplete, markModuleComplete, markModuleIncomplete } from '@/lib/progress';

function ChevronLeftIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function AlertCircleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  );
}

function LightbulbIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 18h6" />
      <path d="M10 22h4" />
      <path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14" />
    </svg>
  );
}

function BookOpenIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  );
}

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

export default function ModuleViewer() {
  const params = useParams();
  const router = useRouter();
  const role = params.role as Role;
  const moduleId = params.module as string;

  const track = getTrack(role);
  const module = getModule(role, moduleId);

  const [isComplete, setIsComplete] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (module) {
      setIsComplete(isModuleComplete(role, module.id));
    }
  }, [role, module]);

  if (!track || !module) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-[var(--foreground-muted)]">Module not found</p>
      </div>
    );
  }

  const currentIndex = track.modules.findIndex(m => m.id === moduleId);
  const prevModule = currentIndex > 0 ? track.modules[currentIndex - 1] : null;
  const nextModule = currentIndex < track.modules.length - 1 ? track.modules[currentIndex + 1] : null;

  const accentColor = track.color === 'amber' ? 'var(--accent)' : 'var(--teal)';
  const accentMuted = track.color === 'amber' ? 'var(--accent-muted)' : 'var(--teal-muted)';

  const handleToggleComplete = () => {
    if (isComplete) {
      markModuleIncomplete(role, module.id);
      setIsComplete(false);
    } else {
      markModuleComplete(role, module.id);
      setIsComplete(true);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 2000);
    }
  };

  const handleContinue = () => {
    if (!isComplete) {
      markModuleComplete(role, module.id);
    }
    if (nextModule) {
      router.push(`/course/${role}/${nextModule.id}`);
    } else {
      router.push(`/course/${role}`);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Confetti effect */}
      <AnimatePresence>
        {showConfetti && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: 'spring', damping: 15 }}
              className="w-24 h-24 rounded-full flex items-center justify-center"
              style={{ backgroundColor: 'var(--success)', color: 'white' }}
            >
              <CheckIcon />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 z-40 backdrop-blur-md bg-[var(--background)]/80 border-b border-[var(--border)]"
      >
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link
              href={`/course/${role}`}
              className="flex items-center gap-2 text-[var(--foreground-muted)] hover:text-[var(--foreground)] transition-colors"
            >
              <ChevronLeftIcon />
              <span className="text-sm">Back to {track.title}</span>
            </Link>
            <div className="flex items-center gap-2 text-sm text-[var(--foreground-subtle)]">
              <span>{currentIndex + 1} / {track.modules.length}</span>
            </div>
          </div>
          {/* Progress bar */}
          <div className="mt-3 h-1 bg-[var(--border)] rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${((currentIndex + (isComplete ? 1 : 0)) / track.modules.length) * 100}%` }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="h-full rounded-full"
              style={{ backgroundColor: accentColor }}
            />
          </div>
        </div>
      </motion.header>

      <main className="pt-28 pb-32 px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-3xl mx-auto"
        >
          {/* Module Header */}
          <motion.div variants={itemVariants} className="mb-8">
            <div className="flex items-center gap-2 text-sm mb-3" style={{ color: accentColor }}>
              <span className="font-medium">Module {currentIndex + 1}</span>
              <span className="text-[var(--foreground-subtle)]">|</span>
              <span className="text-[var(--foreground-subtle)]">{module.duration} read</span>
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-medium text-[var(--foreground)] mb-3">
              {module.title}
            </h1>
            <p className="text-xl text-[var(--foreground-muted)]">{module.subtitle}</p>
          </motion.div>

          {/* Key Point Card */}
          <motion.div
            variants={itemVariants}
            className="p-6 rounded-xl border mb-8"
            style={{ borderColor: accentColor, backgroundColor: accentMuted }}
          >
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: accentColor }}>
                <AlertCircleIcon />
              </div>
              <div>
                <h2 className="font-medium text-[var(--foreground)] mb-2">Key Point</h2>
                <p className="text-[var(--foreground-muted)] leading-relaxed">{module.keyPoint}</p>
              </div>
            </div>
          </motion.div>

          {/* Why It Matters */}
          <motion.div variants={itemVariants} className="mb-8">
            <h2 className="flex items-center gap-2 font-medium text-[var(--foreground)] mb-3">
              <AlertCircleIcon />
              Why It Matters
            </h2>
            <p className="text-[var(--foreground-muted)] leading-relaxed pl-6 border-l-2 border-[var(--border)]">
              {module.whyItMatters}
            </p>
          </motion.div>

          {/* Checklist */}
          <motion.div variants={itemVariants} className="mb-8">
            <h2 className="flex items-center gap-2 font-medium text-[var(--foreground)] mb-4">
              <CheckIcon />
              Compliance Checklist
            </h2>
            <div className="space-y-3">
              {module.checklist.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.05 }}
                  className={`flex items-start gap-3 p-4 rounded-lg ${
                    item.critical
                      ? 'bg-[var(--accent-muted)] border border-[var(--accent)]/30'
                      : 'bg-[var(--surface)]'
                  }`}
                >
                  <div
                    className="w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 mt-0.5"
                    style={{
                      borderColor: item.critical ? accentColor : 'var(--border-subtle)',
                    }}
                  >
                    {item.critical && (
                      <div className="w-2 h-2 rounded-sm" style={{ backgroundColor: accentColor }} />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className={`${item.critical ? 'text-[var(--foreground)]' : 'text-[var(--foreground-muted)]'}`}>
                      {item.text}
                    </p>
                    {item.critical && (
                      <span className="text-xs font-medium mt-1 inline-block" style={{ color: accentColor }}>
                        CRITICAL
                      </span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Tips */}
          {module.tips && module.tips.length > 0 && (
            <motion.div variants={itemVariants} className="mb-8">
              <h2 className="flex items-center gap-2 font-medium text-[var(--foreground)] mb-4">
                <LightbulbIcon />
                Pro Tips
              </h2>
              <div className="space-y-3">
                {module.tips.map((tip, index) => (
                  <div key={index} className="flex items-start gap-3 text-[var(--foreground-muted)]">
                    <span className="text-[var(--foreground-subtle)]">{index + 1}.</span>
                    <p>{tip}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Policy References */}
          <motion.div variants={itemVariants} className="mb-8">
            <h2 className="flex items-center gap-2 font-medium text-[var(--foreground)] mb-3">
              <BookOpenIcon />
              Policy References
            </h2>
            <div className="flex flex-wrap gap-2">
              {module.policyReferences.map((ref, index) => (
                <span
                  key={index}
                  className="px-3 py-1 text-sm rounded-full bg-[var(--surface)] text-[var(--foreground-muted)] border border-[var(--border)]"
                >
                  {ref}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Complete Button */}
          <motion.div variants={itemVariants} className="flex flex-col items-center gap-4 pt-8 border-t border-[var(--border)]">
            <button
              onClick={handleToggleComplete}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all ${
                isComplete
                  ? 'bg-[var(--success-muted)] text-[var(--success)] border border-[var(--success)]/30'
                  : 'border border-[var(--border)] text-[var(--foreground-muted)] hover:bg-[var(--surface)]'
              }`}
            >
              {isComplete ? (
                <>
                  <CheckIcon />
                  Completed
                </>
              ) : (
                'Mark as Complete'
              )}
            </button>
          </motion.div>
        </motion.div>
      </main>

      {/* Bottom Navigation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="fixed bottom-0 left-0 right-0 backdrop-blur-md bg-[var(--background)]/90 border-t border-[var(--border)] py-4 px-6"
      >
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          {prevModule ? (
            <Link
              href={`/course/${role}/${prevModule.id}`}
              className="flex items-center gap-2 text-[var(--foreground-muted)] hover:text-[var(--foreground)] transition-colors"
            >
              <ChevronLeftIcon />
              <span className="text-sm hidden sm:inline">Previous</span>
            </Link>
          ) : (
            <div />
          )}

          <button
            onClick={handleContinue}
            className="flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all"
            style={{ backgroundColor: accentColor, color: 'var(--background)' }}
          >
            {nextModule ? 'Continue to Next Module' : 'Finish Track'}
            <ChevronRightIcon />
          </button>

          {nextModule ? (
            <Link
              href={`/course/${role}/${nextModule.id}`}
              className="flex items-center gap-2 text-[var(--foreground-muted)] hover:text-[var(--foreground)] transition-colors"
            >
              <span className="text-sm hidden sm:inline">Next</span>
              <ChevronRightIcon />
            </Link>
          ) : (
            <div />
          )}
        </div>
      </motion.div>
    </div>
  );
}
