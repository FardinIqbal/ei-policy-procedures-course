'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState, lazy, Suspense } from 'react';
import { getTrack, getModule, Role, PolicyRef, QuizQuestion } from '@/lib/content';
import KnowledgeCheck from '@/components/KnowledgeCheck';
import { isModuleComplete, markModuleComplete, markModuleIncomplete } from '@/lib/progress';
import { ThemeToggle } from '@/components/ThemeProvider';

// Lazy load PDF viewer to avoid SSR issues
const PDFViewer = lazy(() => import('@/components/PDFViewer'));

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
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
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
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

export default function ChapterView() {
  const params = useParams();
  const router = useRouter();
  const role = params.role as Role;
  const moduleId = params.module as string;

  const track = getTrack(role);
  const module = getModule(role, moduleId);

  const [isComplete, setIsComplete] = useState(false);
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
        <p className="text-[var(--foreground-muted)]">Chapter not found</p>
      </div>
    );
  }

  const currentIndex = track.modules.findIndex(m => m.id === moduleId);
  const prevModule = currentIndex > 0 ? track.modules[currentIndex - 1] : null;
  const nextModule = currentIndex < track.modules.length - 1 ? track.modules[currentIndex + 1] : null;

  const handleToggleComplete = () => {
    if (isComplete) {
      markModuleIncomplete(role, module.id);
      setIsComplete(false);
    } else {
      markModuleComplete(role, module.id);
      setIsComplete(true);
    }
  };

  const handleContinue = () => {
    if (!isComplete) {
      markModuleComplete(role, module.id);
      setIsComplete(true);
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
        return <strong key={i} className="text-[var(--foreground)] font-medium">{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  return (
    <div className="min-h-screen flex">
      {/* Main Content */}
      <div className={`flex-1 transition-all duration-300 ${showPDF ? 'mr-[480px]' : ''}`}>
        {/* Header */}
        <header
          className="fixed top-0 left-0 z-40 bg-[var(--background)] border-b border-[var(--border)]"
          style={{ right: showPDF ? '480px' : '0' }}
        >
          <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
            <Link
              href={`/course/${role}`}
              className="flex items-center gap-1 text-[var(--foreground-subtle)] hover:text-[var(--foreground-muted)] transition-colors"
            >
              <ChevronLeftIcon />
              <span className="text-sm">Back</span>
            </Link>
            <div className="flex items-center gap-4">
              <span className="text-sm text-[var(--foreground-subtle)]">
                {currentIndex + 1} / {track.modules.length}
              </span>
              <ThemeToggle />
            </div>
          </div>
          {/* Progress bar */}
          <div className="h-0.5 bg-[var(--border)]">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${((currentIndex + (isComplete ? 1 : 0)) / track.modules.length) * 100}%` }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="h-full bg-[var(--foreground-subtle)]"
            />
          </div>
        </header>

        <main className="pt-24 pb-32 px-6">
          <motion.article
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-2xl mx-auto"
          >
            {/* Chapter Header */}
            <motion.header variants={itemVariants} className="mb-10">
              <p className="text-sm text-[var(--foreground-subtle)] mb-3">
                Chapter {currentIndex + 1} &middot; {module.duration}
              </p>
              <h1 className="font-display text-3xl md:text-4xl text-[var(--foreground)] mb-3 leading-tight">
                {module.title}
              </h1>
              <p className="text-lg text-[var(--foreground-muted)]">{module.subtitle}</p>
            </motion.header>

            {/* Lede */}
            <motion.div variants={itemVariants} className="mb-8">
              <p className="prose-editorial drop-cap text-[var(--foreground-muted)] leading-relaxed">
                {module.lede}
              </p>
            </motion.div>

            {/* Pull Quote */}
            {module.pullQuote && (
              <motion.aside variants={itemVariants} className="pull-quote my-10">
                <p>{module.pullQuote}</p>
              </motion.aside>
            )}

            {/* Narrative Content */}
            <motion.div variants={itemVariants} className="mb-10">
              <div className="prose-editorial text-[var(--foreground-muted)] space-y-5">
                {module.narrative.split('\n\n').map((paragraph, i) => (
                  <p key={i} className="leading-relaxed">
                    {renderNarrative(paragraph)}
                  </p>
                ))}
              </div>
            </motion.div>

            {/* Key Insight */}
            <motion.div
              variants={itemVariants}
              className="p-5 border-l-2 border-[var(--accent)] bg-[var(--accent-muted)] mb-10"
            >
              <p className="text-sm font-medium text-[var(--accent)] mb-1">Key Insight</p>
              <p className="text-[var(--foreground-muted)] leading-relaxed">{module.keyInsight}</p>
            </motion.div>

            {/* Checklist */}
            <motion.section variants={itemVariants} className="mb-10">
              <h2 className="text-sm text-[var(--foreground-subtle)] mb-4 tracking-wide uppercase">
                Compliance Checklist
              </h2>
              <div className="space-y-2">
                {module.checklist.map((item, index) => (
                  <div
                    key={index}
                    className={`flex items-start gap-3 py-3 px-4 border-l-2 ${
                      item.critical
                        ? 'border-[var(--accent)] bg-[var(--accent-muted)]'
                        : 'border-[var(--border)] bg-[var(--surface)]'
                    }`}
                  >
                    <div className="w-4 h-4 mt-0.5 border border-[var(--border-subtle)] rounded-sm shrink-0" />
                    <div className="flex-1">
                      <p className={item.critical ? 'text-[var(--foreground)]' : 'text-[var(--foreground-muted)]'}>
                        {item.text}
                      </p>
                      {item.critical && (
                        <span className="text-xs text-[var(--accent)] mt-1 inline-block">Critical</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.section>

            {/* Pro Tips */}
            {module.proTips && module.proTips.length > 0 && (
              <motion.section variants={itemVariants} className="mb-10">
                <h2 className="text-sm text-[var(--foreground-subtle)] mb-4 tracking-wide uppercase">
                  Professional Notes
                </h2>
                <div className="space-y-3">
                  {module.proTips.map((tip, index) => (
                    <div key={index} className="flex items-start gap-3 text-sm">
                      <span className="text-[var(--foreground-subtle)] shrink-0">{index + 1}.</span>
                      <p className="text-[var(--foreground-muted)] leading-relaxed">{tip}</p>
                    </div>
                  ))}
                </div>
              </motion.section>
            )}

            {/* Policy References */}
            <motion.section variants={itemVariants} className="mb-10">
              <h2 className="text-sm text-[var(--foreground-subtle)] mb-4 tracking-wide uppercase">
                Policy References
              </h2>
              <div className="space-y-2">
                {module.policyRefs.map((ref, index) => (
                  <button
                    key={index}
                    onClick={() => openPolicyRef(ref)}
                    className="w-full flex items-center justify-between py-3 px-4 border border-[var(--border)] hover:border-[var(--border-subtle)] hover:bg-[var(--surface-hover)] transition-colors text-left"
                  >
                    <div>
                      <span className="text-sm text-[var(--foreground)]">{ref.policy}</span>
                      {ref.description && (
                        <span className="text-sm text-[var(--foreground-subtle)]"> &middot; {ref.description}</span>
                      )}
                    </div>
                    <span className="text-xs text-[var(--foreground-subtle)]">p. {ref.page}</span>
                  </button>
                ))}
              </div>
            </motion.section>

            {/* Complete Section */}
            <motion.div variants={itemVariants} className="pt-8 border-t border-[var(--border)]">
              <button
                onClick={handleToggleComplete}
                className={`flex items-center gap-2 text-sm transition-colors ${
                  isComplete
                    ? 'text-[var(--success)]'
                    : 'text-[var(--foreground-muted)] hover:text-[var(--foreground)]'
                }`}
              >
                <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                  isComplete
                    ? 'border-[var(--success)] bg-[var(--success)]'
                    : 'border-[var(--border-subtle)]'
                }`}>
                  {isComplete && <CheckIcon />}
                </div>
                {isComplete ? 'Understanding Confirmed' : 'Confirm Understanding'}
              </button>
            </motion.div>
          </motion.article>
        </main>

        {/* Bottom Navigation */}
        <div
          className="fixed bottom-0 left-0 bg-[var(--background)] border-t border-[var(--border)] py-4 px-6"
          style={{ right: showPDF ? '480px' : '0' }}
        >
          <div className="max-w-2xl mx-auto flex items-center justify-between">
            {prevModule ? (
              <Link
                href={`/course/${role}/${prevModule.id}`}
                className="flex items-center gap-1 text-sm text-[var(--foreground-subtle)] hover:text-[var(--foreground-muted)] transition-colors"
              >
                <ChevronLeftIcon />
                Previous
              </Link>
            ) : (
              <div />
            )}

            <button
              onClick={handleContinue}
              className="flex items-center gap-2 px-5 py-2 text-sm font-medium bg-[var(--foreground)] text-[var(--background)] hover:opacity-90 transition-opacity"
            >
              {nextModule ? 'Continue' : 'Finish'}
              <ChevronRightIcon />
            </button>

            {nextModule ? (
              <Link
                href={`/course/${role}/${nextModule.id}`}
                className="flex items-center gap-1 text-sm text-[var(--foreground-subtle)] hover:text-[var(--foreground-muted)] transition-colors"
              >
                Next
                <ChevronRightIcon />
              </Link>
            ) : (
              <div />
            )}
          </div>
        </div>
      </div>

      {/* PDF Sidebar */}
      {showPDF && (
        <aside className="fixed top-0 right-0 bottom-0 w-[480px] z-50 bg-[var(--background)] border-l border-[var(--border)]">
          <div className="absolute top-4 left-4 z-10">
            <button
              onClick={() => setShowPDF(false)}
              className="p-2 bg-[var(--surface)] hover:bg-[var(--surface-hover)] text-[var(--foreground-muted)] transition-colors border border-[var(--border)]"
            >
              <XIcon />
            </button>
          </div>
          <Suspense fallback={
            <div className="flex items-center justify-center h-full">
              <p className="text-sm text-[var(--foreground-subtle)]">Loading...</p>
            </div>
          }>
            <PDFViewer pageNumber={pdfPage} onClose={() => setShowPDF(false)} />
          </Suspense>
        </aside>
      )}
    </div>
  );
}
