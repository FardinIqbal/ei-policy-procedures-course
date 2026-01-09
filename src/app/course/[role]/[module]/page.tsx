'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState, lazy, Suspense } from 'react';
import { getTrack, getModule, Role, PolicyRef } from '@/lib/content';
import { isModuleComplete, markModuleComplete, markModuleIncomplete } from '@/lib/progress';
import { ThemeToggle } from '@/components/ThemeProvider';

// Lazy load PDF viewer to avoid SSR issues
const PDFViewer = lazy(() => import('@/components/PDFViewer'));

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

function BookOpenIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  );
}

function LightbulbIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 18h6" />
      <path d="M10 22h4" />
      <path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14" />
    </svg>
  );
}

function FileTextIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
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
  const [showPDF, setShowPDF] = useState(false);
  const [pdfPage, setPdfPage] = useState(1);

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

  const openPolicyRef = (ref: PolicyRef) => {
    setPdfPage(ref.page);
    setShowPDF(true);
  };

  // Parse markdown-like formatting in narrative
  const renderNarrative = (text: string) => {
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i} className="text-[var(--foreground)] font-semibold">{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  return (
    <div className="min-h-screen flex">
      {/* Main Content */}
      <div className={`flex-1 transition-all duration-300 ${showPDF ? 'mr-[500px]' : ''}`}>
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
          style={{ right: showPDF ? '500px' : '0' }}
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
              <div className="flex items-center gap-3">
                <span className="text-sm text-[var(--foreground-subtle)]">{currentIndex + 1} / {track.modules.length}</span>
                <ThemeToggle />
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
          <motion.article
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-3xl mx-auto"
          >
            {/* Module Header */}
            <motion.header variants={itemVariants} className="mb-10">
              <div className="flex items-center gap-3 text-sm mb-4">
                <span className="font-medium px-3 py-1 rounded-full" style={{ color: accentColor, backgroundColor: accentMuted }}>
                  Module {currentIndex + 1}
                </span>
                <span className="text-[var(--foreground-subtle)]">{module.duration} read</span>
              </div>
              <h1 className="font-display text-4xl md:text-5xl font-medium text-[var(--foreground)] mb-4 leading-tight">
                {module.title}
              </h1>
              <p className="text-xl text-[var(--foreground-muted)] font-light">{module.subtitle}</p>
            </motion.header>

            {/* Lede - The Opening Hook */}
            <motion.div variants={itemVariants} className="mb-10">
              <p className="prose-editorial drop-cap text-[var(--foreground-muted)] leading-relaxed">
                {module.lede}
              </p>
            </motion.div>

            {/* Pull Quote */}
            {module.pullQuote && (
              <motion.aside variants={itemVariants} className="pull-quote my-12">
                <p>{module.pullQuote}</p>
              </motion.aside>
            )}

            {/* Narrative Content */}
            <motion.div variants={itemVariants} className="mb-12">
              <div className="prose-editorial text-[var(--foreground-muted)] space-y-6">
                {module.narrative.split('\n\n').map((paragraph, i) => (
                  <p key={i} className="leading-relaxed">
                    {renderNarrative(paragraph)}
                  </p>
                ))}
              </div>
            </motion.div>

            {/* Key Insight Card */}
            <motion.div
              variants={itemVariants}
              className="p-6 rounded-2xl border-2 mb-12"
              style={{ borderColor: accentColor, backgroundColor: accentMuted }}
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 text-[var(--background)]" style={{ backgroundColor: accentColor }}>
                  <LightbulbIcon />
                </div>
                <div>
                  <h3 className="font-display text-lg font-medium text-[var(--foreground)] mb-2">Key Insight</h3>
                  <p className="text-[var(--foreground-muted)] leading-relaxed">{module.keyInsight}</p>
                </div>
              </div>
            </motion.div>

            {/* Compliance Checklist */}
            <motion.section variants={itemVariants} className="mb-12">
              <h2 className="font-display text-2xl font-medium text-[var(--foreground)] mb-6 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: accentMuted, color: accentColor }}>
                  <CheckIcon />
                </span>
                Compliance Checklist
              </h2>
              <div className="space-y-3">
                {module.checklist.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.05 }}
                    className={`flex items-start gap-4 p-4 rounded-xl transition-colors ${
                      item.critical
                        ? 'bg-[var(--accent-muted)] border border-[var(--accent)]/20'
                        : 'bg-[var(--surface)] hover:bg-[var(--surface-hover)]'
                    }`}
                  >
                    <div
                      className="w-6 h-6 rounded-md border-2 flex items-center justify-center shrink-0 mt-0.5"
                      style={{
                        borderColor: item.critical ? accentColor : 'var(--border-subtle)',
                        backgroundColor: item.critical ? accentColor : 'transparent',
                      }}
                    >
                      {item.critical && (
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--background)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      )}
                    </div>
                    <div className="flex-1">
                      <p className={`${item.critical ? 'text-[var(--foreground)] font-medium' : 'text-[var(--foreground-muted)]'}`}>
                        {item.text}
                      </p>
                      {item.critical && (
                        <span className="text-xs font-semibold mt-2 inline-block px-2 py-0.5 rounded" style={{ color: accentColor, backgroundColor: 'var(--background)' }}>
                          CRITICAL
                        </span>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* Pro Tips */}
            {module.proTips && module.proTips.length > 0 && (
              <motion.section variants={itemVariants} className="mb-12">
                <h2 className="font-display text-2xl font-medium text-[var(--foreground)] mb-6 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg flex items-center justify-center bg-[var(--teal-muted)] text-[var(--teal)]">
                    <LightbulbIcon />
                  </span>
                  Pro Tips
                </h2>
                <div className="space-y-4">
                  {module.proTips.map((tip, index) => (
                    <div key={index} className="flex items-start gap-4 p-4 rounded-xl bg-[var(--teal-muted)] border border-[var(--teal)]/20">
                      <span className="w-6 h-6 rounded-full flex items-center justify-center text-sm font-semibold shrink-0 bg-[var(--teal)] text-[var(--background)]">
                        {index + 1}
                      </span>
                      <p className="text-[var(--foreground-muted)] leading-relaxed">{tip}</p>
                    </div>
                  ))}
                </div>
              </motion.section>
            )}

            {/* Policy References */}
            <motion.section variants={itemVariants} className="mb-12">
              <h2 className="font-display text-2xl font-medium text-[var(--foreground)] mb-6 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg flex items-center justify-center bg-[var(--surface)] text-[var(--foreground-muted)]">
                  <BookOpenIcon />
                </span>
                Policy References
              </h2>
              <div className="grid gap-3">
                {module.policyRefs.map((ref, index) => (
                  <button
                    key={index}
                    onClick={() => openPolicyRef(ref)}
                    className="flex items-center gap-4 p-4 rounded-xl bg-[var(--surface)] hover:bg-[var(--surface-hover)] border border-[var(--border)] transition-all hover:border-[var(--border-subtle)] text-left group"
                  >
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-[var(--background)] text-[var(--foreground-subtle)] group-hover:text-[var(--foreground-muted)] transition-colors">
                      <FileTextIcon />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-[var(--foreground)]">{ref.policy}</span>
                        <span className="text-xs text-[var(--foreground-subtle)]">Page {ref.page}</span>
                      </div>
                      {ref.description && (
                        <p className="text-sm text-[var(--foreground-muted)] mt-0.5">{ref.description}</p>
                      )}
                    </div>
                    <ChevronRightIcon />
                  </button>
                ))}
              </div>
            </motion.section>

            {/* Complete Button */}
            <motion.div variants={itemVariants} className="flex flex-col items-center gap-4 pt-8 border-t border-[var(--border)]">
              <button
                onClick={handleToggleComplete}
                className={`flex items-center gap-2 px-8 py-4 rounded-full font-medium transition-all text-lg ${
                  isComplete
                    ? 'bg-[var(--success-muted)] text-[var(--success)] border-2 border-[var(--success)]/30'
                    : 'border-2 border-[var(--border)] text-[var(--foreground-muted)] hover:bg-[var(--surface)] hover:border-[var(--border-subtle)]'
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
          </motion.article>
        </main>

        {/* Bottom Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="fixed bottom-0 left-0 backdrop-blur-md bg-[var(--background)]/90 border-t border-[var(--border)] py-4 px-6"
          style={{ right: showPDF ? '500px' : '0' }}
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
              className="flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all hover:scale-105"
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

      {/* PDF Sidebar */}
      <AnimatePresence>
        {showPDF && (
          <motion.aside
            initial={{ x: 500, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 500, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-[500px] z-50 bg-[var(--background)] border-l border-[var(--border)] shadow-2xl"
          >
            <div className="absolute top-4 left-4 z-10">
              <button
                onClick={() => setShowPDF(false)}
                className="p-2 rounded-lg bg-[var(--surface)] hover:bg-[var(--surface-hover)] text-[var(--foreground-muted)] transition-colors"
              >
                <XIcon />
              </button>
            </div>
            <Suspense fallback={
              <div className="flex items-center justify-center h-full">
                <div className="w-8 h-8 border-2 border-[var(--accent)] border-t-transparent rounded-full animate-spin" />
              </div>
            }>
              <PDFViewer pageNumber={pdfPage} onClose={() => setShowPDF(false)} />
            </Suspense>
          </motion.aside>
        )}
      </AnimatePresence>
    </div>
  );
}
