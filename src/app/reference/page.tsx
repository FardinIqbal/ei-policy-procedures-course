'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { quickReference } from '@/lib/content';
import { ThemeToggle } from '@/components/ThemeProvider';

function ChevronLeftIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );
}

function PrinterIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 6 2 18 2 18 9" />
      <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
      <rect x="6" y="14" width="12" height="8" />
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

export default function ReferencePage() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[var(--background)] border-b border-[var(--border)] no-print">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="flex items-center gap-1 text-[var(--foreground-subtle)] hover:text-[var(--foreground-muted)] transition-colors"
            >
              <ChevronLeftIcon />
              <span className="text-sm">Back</span>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-4 py-2 text-sm bg-[var(--surface)] hover:bg-[var(--surface-hover)] text-[var(--foreground-muted)] border border-[var(--border)] transition-colors"
            >
              <PrinterIcon />
              Print
            </button>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="pt-28 pb-20 px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto"
        >
          {/* Page Title */}
          <motion.div variants={itemVariants} className="mb-12">
            <p className="text-sm text-[var(--foreground-subtle)] mb-2 tracking-wide">
              NYC Early Intervention Program
            </p>
            <h1 className="font-display text-3xl md:text-4xl text-[var(--foreground)] mb-4">
              Quick Reference
            </h1>
            <p className="text-[var(--foreground-muted)]">
              Essential compliance information for daily reference
            </p>
          </motion.div>

          {/* Critical Timelines */}
          <motion.section variants={itemVariants} className="mb-12">
            <h2 className="text-sm text-[var(--foreground-subtle)] mb-4 tracking-wide uppercase">
              Critical Timelines
            </h2>
            <div className="border-t border-[var(--border)]">
              {quickReference.criticalTimelines.map((timeline, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between py-4 border-b border-[var(--border)]"
                >
                  <div>
                    <p className="text-[var(--foreground)]">{timeline.event}</p>
                    <p className="text-sm text-[var(--foreground-subtle)]">from {timeline.from}</p>
                  </div>
                  <span className="text-sm font-medium text-[var(--accent)]">
                    {timeline.deadline}
                  </span>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Key Forms */}
          <motion.section variants={itemVariants} className="mb-12">
            <h2 className="text-sm text-[var(--foreground-subtle)] mb-4 tracking-wide uppercase">
              Key Forms
            </h2>
            <div className="border-t border-[var(--border)]">
              {quickReference.keyForms.map((form, index) => (
                <div
                  key={index}
                  className="py-4 border-b border-[var(--border)]"
                >
                  <p className="text-[var(--foreground)] mb-1">{form.name}</p>
                  <p className="text-sm text-[var(--foreground-muted)]">{form.use}</p>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Common Mistakes */}
          <motion.section variants={itemVariants} className="mb-12">
            <h2 className="text-sm text-[var(--foreground-subtle)] mb-4 tracking-wide uppercase">
              Common Mistakes to Avoid
            </h2>
            <div className="p-5 border-l-2 border-[var(--red)] bg-[var(--red-muted)]">
              <div className="space-y-3">
                {quickReference.commonMistakes.map((mistake, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <span className="text-sm text-[var(--foreground-subtle)] shrink-0 w-5">
                      {index + 1}.
                    </span>
                    <p className="text-[var(--foreground-muted)]">{mistake}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* Checklists */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Service Coordinator Checklist */}
            <motion.section variants={itemVariants}>
              <h2 className="text-sm text-[var(--foreground-subtle)] mb-4 tracking-wide uppercase">
                Service Coordinator Checklist
              </h2>
              <div className="space-y-2">
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
                  <div
                    key={index}
                    className="flex items-start gap-3 py-2 border-b border-[var(--border)]"
                  >
                    <div className="w-4 h-4 mt-0.5 border border-[var(--border-subtle)] shrink-0" />
                    <p className="text-sm text-[var(--foreground-muted)]">{item}</p>
                  </div>
                ))}
              </div>
            </motion.section>

            {/* Provider Checklist */}
            <motion.section variants={itemVariants}>
              <h2 className="text-sm text-[var(--foreground-subtle)] mb-4 tracking-wide uppercase">
                Provider Checklist
              </h2>
              <div className="space-y-2">
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
                  <div
                    key={index}
                    className="flex items-start gap-3 py-2 border-b border-[var(--border)]"
                  >
                    <div className="w-4 h-4 mt-0.5 border border-[var(--border-subtle)] shrink-0" />
                    <p className="text-sm text-[var(--foreground-muted)]">{item}</p>
                  </div>
                ))}
              </div>
            </motion.section>
          </div>

          {/* Footer Note */}
          <motion.div variants={itemVariants} className="mt-16 pt-8 border-t border-[var(--border)]">
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
