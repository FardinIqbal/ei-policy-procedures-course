'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState, lazy, Suspense, useCallback, useRef } from 'react';
import { getTrack, getModule, Role, PolicyRef } from '@/lib/content';
import KnowledgeCheck from '@/components/KnowledgeCheck';
import { isModuleComplete, markModuleComplete, markModuleIncomplete, saveQuizScore, setLastModule, updateTimeSpent } from '@/lib/progress';
import { ThemeToggle } from '@/components/ThemeProvider';

const PDFViewer = lazy(() => import('@/components/PDFViewer'));

const MIN_SIDEBAR_WIDTH = 320;
const MAX_SIDEBAR_WIDTH = 800;
const DEFAULT_SIDEBAR_WIDTH = 480;

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
  const [sidebarWidth, setSidebarWidth] = useState(DEFAULT_SIDEBAR_WIDTH);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartX = useRef(0);
  const dragStartWidth = useRef(DEFAULT_SIDEBAR_WIDTH);

  useEffect(() => {
    if (module) {
      setIsComplete(isModuleComplete(role, module.id));
      setLastModule(role, module.id);
    }
  }, [role, module]);

  // Track time spent on module
  useEffect(() => {
    if (!module) return;
    const interval = setInterval(() => {
      updateTimeSpent(role, module.id, 30);
    }, 30000); // Update every 30 seconds
    return () => clearInterval(interval);
  }, [role, module]);

  // Prevent body scroll when PDF modal is open on mobile only
  useEffect(() => {
    const handleResize = () => {
      // Only lock scroll on mobile (< 1024px) when PDF is shown
      const isMobile = window.innerWidth < 1024;
      if (showPDF && isMobile) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('resize', handleResize);
    };
  }, [showPDF]);

  // Handle drag resize
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    dragStartX.current = e.clientX;
    dragStartWidth.current = sidebarWidth;
  }, [sidebarWidth]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging) return;
    const delta = dragStartX.current - e.clientX;
    const newWidth = Math.min(MAX_SIDEBAR_WIDTH, Math.max(MIN_SIDEBAR_WIDTH, dragStartWidth.current + delta));
    setSidebarWidth(newWidth);
  }, [isDragging]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';
    } else {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    }
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

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

  const handleQuizComplete = (correct: number, total: number) => {
    saveQuizScore(role, module.id, correct, total);
    if (!isComplete) {
      markModuleComplete(role, module.id);
      setIsComplete(true);
    }
  };

  const handleAdvanceToNext = () => {
    if (nextModule) {
      router.push(`/course/${role}/${nextModule.id}`);
    }
  };

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
    <div className="min-h-screen">
      {/* Main Content */}
      <div
        className={`${isDragging ? '' : 'transition-all duration-300'}`}
        style={{ marginRight: showPDF ? `${sidebarWidth}px` : 0 }}
      >
        {/* Header */}
        <header
          className={`fixed top-0 left-0 z-40 bg-[var(--background)] border-b border-[var(--border)] ${isDragging ? '' : 'transition-all duration-300'}`}
          style={{ right: showPDF ? `${sidebarWidth}px` : 0 }}
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
                    <div className="w-4 h-4 mt-0.5 border border-[var(--border-subtle)] shrink-0" />
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

            {/* Knowledge Check */}
            {module.quiz && module.quiz.length > 0 && (
              <motion.section variants={itemVariants} className="mb-10">
                <h2 className="text-sm text-[var(--foreground-subtle)] mb-4 tracking-wide uppercase">
                  Verify Your Understanding
                </h2>
                <KnowledgeCheck
                  questions={module.quiz}
                  onComplete={handleQuizComplete}
                  onAdvanceToNext={handleAdvanceToNext}
                  hasNextModule={!!nextModule}
                />
              </motion.section>
            )}

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
          className={`fixed bottom-0 left-0 bg-[var(--background)] border-t border-[var(--border)] py-4 px-6 ${isDragging ? '' : 'transition-all duration-300'}`}
          style={{ right: showPDF ? `${sidebarWidth}px` : 0 }}
        >
          <div className="max-w-2xl mx-auto flex items-center justify-between">
            {prevModule ? (
              <Link
                href={`/course/${role}/${prevModule.id}`}
                className="flex items-center gap-1 text-sm text-[var(--foreground-subtle)] hover:text-[var(--foreground-muted)] transition-colors"
              >
                <ChevronLeftIcon />
                <span className="hidden sm:inline">Previous</span>
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
                <span className="hidden sm:inline">Next</span>
                <ChevronRightIcon />
              </Link>
            ) : (
              <div />
            )}
          </div>
        </div>
      </div>

      {/* PDF Panel - Desktop: Resizable Sidebar, Mobile: Full-screen modal */}
      {showPDF && (
        <>
          {/* Desktop Sidebar with Drag Handle */}
          <aside
            className="hidden lg:block fixed top-0 right-0 bottom-0 z-50 bg-[var(--background)]"
            style={{ width: `${sidebarWidth}px` }}
          >
            {/* Drag Handle */}
            <div
              onMouseDown={handleMouseDown}
              className="absolute top-0 left-0 bottom-0 w-1 cursor-col-resize group z-10 hover:bg-[var(--accent)] transition-colors"
            >
              <div className={`absolute top-1/2 -translate-y-1/2 left-0 w-1 h-16 rounded-full transition-colors ${isDragging ? 'bg-[var(--accent)]' : 'bg-[var(--border-subtle)] group-hover:bg-[var(--accent)]'}`} />
            </div>
            <Suspense fallback={
              <div className="flex items-center justify-center h-full">
                <div className="w-6 h-6 border-2 border-[var(--foreground-subtle)] border-t-transparent rounded-full animate-spin" />
              </div>
            }>
              <PDFViewer pageNumber={pdfPage} onClose={() => setShowPDF(false)} />
            </Suspense>
          </aside>

          {/* Mobile Full-screen Modal */}
          <div className="lg:hidden fixed inset-0 z-50 bg-[var(--background)]">
            <Suspense fallback={
              <div className="flex items-center justify-center h-full">
                <div className="w-6 h-6 border-2 border-[var(--foreground-subtle)] border-t-transparent rounded-full animate-spin" />
              </div>
            }>
              <PDFViewer pageNumber={pdfPage} onClose={() => setShowPDF(false)} />
            </Suspense>
          </div>
        </>
      )}
    </div>
  );
}
