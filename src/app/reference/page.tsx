'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { quickReference } from '@/lib/content';
import { ThemeToggle } from '@/components/ThemeProvider';

function BookIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
  );
}

function ChevronLeftIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );
}

function PrinterIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 6 2 18 2 18 9" />
      <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
      <rect x="6" y="14" width="12" height="8" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function FileTextIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  );
}

function AlertTriangleIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
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

export default function ReferencePage() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-[var(--background)]/80 border-b border-[var(--border)] no-print"
      >
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="flex items-center gap-2 text-[var(--foreground-muted)] hover:text-[var(--foreground)] transition-colors"
            >
              <ChevronLeftIcon />
              <span className="text-sm">Back</span>
            </Link>
            <div className="w-px h-6 bg-[var(--border)]" />
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[var(--accent-muted)] flex items-center justify-center text-[var(--accent)]">
                <BookIcon />
              </div>
              <span className="font-medium text-[var(--foreground)]">Quick Reference</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-[var(--surface)] hover:bg-[var(--surface-hover)] text-[var(--foreground)] border border-[var(--border)] transition-colors"
            >
              <PrinterIcon />
              Print Cards
            </button>
            <ThemeToggle />
          </div>
        </div>
      </motion.header>

      <main className="pt-28 pb-20 px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-5xl mx-auto"
        >
          {/* Page Title */}
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h1 className="font-display text-4xl md:text-5xl font-medium text-[var(--foreground)] mb-4">
              Quick Reference Cards
            </h1>
            <p className="text-lg text-[var(--foreground-muted)]">
              Print these cards for easy access to critical EI compliance information
            </p>
          </motion.div>

          {/* Reference Cards Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Critical Timelines Card */}
            <motion.div
              variants={itemVariants}
              className="p-6 rounded-2xl border border-[var(--accent)]/30 bg-[var(--surface)] print-break"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-[var(--accent-muted)] flex items-center justify-center text-[var(--accent)]">
                  <ClockIcon />
                </div>
                <div>
                  <h2 className="font-display text-xl font-medium text-[var(--foreground)]">
                    Critical Timelines
                  </h2>
                  <p className="text-sm text-[var(--foreground-muted)]">The "Clocks" You Must Know</p>
                </div>
              </div>

              <div className="space-y-4">
                {quickReference.criticalTimelines.map((timeline, index) => (
                  <div key={index} className="flex items-start justify-between gap-4 pb-4 border-b border-[var(--border)] last:border-0 last:pb-0">
                    <div className="flex-1">
                      <p className="font-medium text-[var(--foreground)]">{timeline.event}</p>
                      <p className="text-sm text-[var(--foreground-subtle)]">from {timeline.from}</p>
                    </div>
                    <div className="px-3 py-1 rounded-full bg-[var(--accent-muted)] text-[var(--accent)] text-sm font-medium whitespace-nowrap">
                      {timeline.deadline}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Key Forms Card */}
            <motion.div
              variants={itemVariants}
              className="p-6 rounded-2xl border border-[var(--teal)]/30 bg-[var(--surface)] print-break"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-[var(--teal-muted)] flex items-center justify-center text-[var(--teal)]">
                  <FileTextIcon />
                </div>
                <div>
                  <h2 className="font-display text-xl font-medium text-[var(--foreground)]">
                    Key Forms
                  </h2>
                  <p className="text-sm text-[var(--foreground-muted)]">Essential Documentation</p>
                </div>
              </div>

              <div className="space-y-4">
                {quickReference.keyForms.map((form, index) => (
                  <div key={index} className="pb-4 border-b border-[var(--border)] last:border-0 last:pb-0">
                    <p className="font-medium text-[var(--foreground)] mb-1">{form.name}</p>
                    <p className="text-sm text-[var(--foreground-muted)]">{form.use}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Common Mistakes Card - Full Width */}
            <motion.div
              variants={itemVariants}
              className="md:col-span-2 p-6 rounded-2xl border border-red-500/30 bg-[var(--surface)] print-break"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center text-red-400">
                  <AlertTriangleIcon />
                </div>
                <div>
                  <h2 className="font-display text-xl font-medium text-[var(--foreground)]">
                    Common Mistakes to Avoid
                  </h2>
                  <p className="text-sm text-[var(--foreground-muted)]">Top compliance issues found in audits</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {quickReference.commonMistakes.map((mistake, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-red-500/10 text-red-400 flex items-center justify-center text-sm font-medium shrink-0">
                      {index + 1}
                    </span>
                    <p className="text-[var(--foreground-muted)]">{mistake}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Service Coordinator Checklist */}
            <motion.div
              variants={itemVariants}
              className="p-6 rounded-2xl border border-[var(--accent)]/30 bg-[var(--surface)] print-break"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-[var(--accent-muted)] flex items-center justify-center text-[var(--accent)]">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                    <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
                  </svg>
                </div>
                <div>
                  <h2 className="font-display text-xl font-medium text-[var(--foreground)]">
                    Service Coordinator Checklist
                  </h2>
                  <p className="text-sm text-[var(--foreground-muted)]">New case essentials</p>
                </div>
              </div>

              <div className="space-y-3">
                {[
                  'Contact family within 2 business days',
                  'Meet family within 7 calendar days',
                  'Collect & upload insurance cards',
                  'Determine foster care/surrogate status',
                  'Send consents to evaluation agency',
                  'Review MDE before IFSP meeting',
                  'Complete IFSP within 45 days',
                  'Begin transition planning at age 2',
                  'Notify CPSE 120 days before age 3',
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded border-2 border-[var(--accent)]/50 shrink-0" />
                    <p className="text-sm text-[var(--foreground-muted)]">{item}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Provider Checklist */}
            <motion.div
              variants={itemVariants}
              className="p-6 rounded-2xl border border-[var(--teal)]/30 bg-[var(--surface)] print-break"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-[var(--teal-muted)] flex items-center justify-center text-[var(--teal)]">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                </div>
                <div>
                  <h2 className="font-display text-xl font-medium text-[var(--foreground)]">
                    Provider Checklist
                  </h2>
                  <p className="text-sm text-[var(--foreground-muted)]">Every session essentials</p>
                </div>
              </div>

              <div className="space-y-3">
                {[
                  'Verify service authorized on IFSP',
                  'Confirm valid prescription (PT/OT/Nursing)',
                  'Check telehealth justification if applicable',
                  'Complete session note with all elements',
                  'Get parent/caregiver signature',
                  'Update Service Log',
                  'Document cancellations immediately',
                  'Offer make-up within 2 weeks',
                  'Submit notes within required timeframe',
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded border-2 border-[var(--teal)]/50 shrink-0" />
                    <p className="text-sm text-[var(--foreground-muted)]">{item}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Footer Note */}
          <motion.div variants={itemVariants} className="mt-12 text-center">
            <p className="text-sm text-[var(--foreground-subtle)]">
              Based on NYC Early Intervention Policy Manual (October 2025 Update).
              Always refer to the official manual for complete requirements.
            </p>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
}
