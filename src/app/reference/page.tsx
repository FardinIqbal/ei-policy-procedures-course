'use client';

import { useState, useMemo } from 'react';
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

function SearchIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

function BookOpenIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
  const [searchQuery, setSearchQuery] = useState('');

  const handlePrint = () => {
    window.print();
  };

  // Filter all content based on search query
  const filteredContent = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) {
      return {
        timelines: quickReference.criticalTimelines,
        forms: quickReference.keyForms,
        mistakes: quickReference.commonMistakes,
        glossary: quickReference.glossary,
        policyJumps: quickReference.policyJumpPoints,
        showCoordinatorChecklist: true,
        showProviderChecklist: true,
      };
    }

    return {
      timelines: quickReference.criticalTimelines.filter(
        t => t.event.toLowerCase().includes(query) || t.deadline.toLowerCase().includes(query) || t.from.toLowerCase().includes(query)
      ),
      forms: quickReference.keyForms.filter(
        f => f.name.toLowerCase().includes(query) || f.use.toLowerCase().includes(query)
      ),
      mistakes: quickReference.commonMistakes.filter(m => m.toLowerCase().includes(query)),
      glossary: quickReference.glossary.filter(
        g => g.term.toLowerCase().includes(query) || g.definition.toLowerCase().includes(query)
      ),
      policyJumps: quickReference.policyJumpPoints.filter(
        p => p.label.toLowerCase().includes(query) || p.policy.toLowerCase().includes(query)
      ),
      showCoordinatorChecklist: [
        'service coordinator', 'isc', 'osc', 'contact', 'meet', 'insurance', 'foster', 'consent',
        'mde', 'ifsp', 'transition', 'cpse', 'coordinator'
      ].some(term => term.includes(query) || query.includes(term)),
      showProviderChecklist: [
        'provider', 'service', 'authorized', 'prescription', 'telehealth', 'session', 'signature',
        'cancellation', 'make-up', 'notes', 'pt', 'ot', 'slp', 'therapy'
      ].some(term => term.includes(query) || query.includes(term)),
    };
  }, [searchQuery]);

  const hasResults = filteredContent.timelines.length > 0 ||
    filteredContent.forms.length > 0 ||
    filteredContent.mistakes.length > 0 ||
    filteredContent.glossary.length > 0 ||
    filteredContent.policyJumps.length > 0 ||
    filteredContent.showCoordinatorChecklist ||
    filteredContent.showProviderChecklist;

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
              aria-label="Print reference guide"
              className="flex items-center gap-2 px-4 py-2 min-h-[44px] text-sm bg-[var(--surface)] hover:bg-[var(--surface-hover)] text-[var(--foreground-muted)] border border-[var(--border)] transition-colors"
            >
              <PrinterIcon />
              Print
            </button>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main id="main-content" className="pt-28 pb-20 px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto"
        >
          {/* Page Title */}
          <motion.div variants={itemVariants} className="mb-8">
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

          {/* Search */}
          <motion.div variants={itemVariants} className="mb-12 no-print">
            <div className="relative">
              <label htmlFor="reference-search" className="sr-only">
                Search reference content
              </label>
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--foreground-subtle)]">
                <SearchIcon />
              </div>
              <input
                id="reference-search"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search timelines, forms, glossary..."
                className="w-full pl-12 pr-4 py-3 min-h-[44px] bg-[var(--background)] border border-[var(--border)] text-[var(--foreground)] placeholder:text-[var(--foreground-subtle)] focus:outline-none focus:border-[var(--border-subtle)] transition-colors"
              />
            </div>
            {searchQuery && !hasResults && (
              <p className="mt-4 text-[var(--foreground-subtle)] text-sm">
                No results found for &ldquo;{searchQuery}&rdquo;
              </p>
            )}
          </motion.div>

          {/* Glossary */}
          {filteredContent.glossary.length > 0 && (
            <motion.section variants={itemVariants} className="mb-12">
              <h2 className="text-sm text-[var(--foreground-subtle)] mb-4 tracking-wide uppercase">
                Glossary of Terms
              </h2>
              <div className="border-t border-[var(--border)]">
                {filteredContent.glossary.map((item, index) => (
                  <div
                    key={index}
                    className="py-4 border-b border-[var(--border)]"
                  >
                    <p className="text-[var(--foreground)] font-medium mb-1">{item.term}</p>
                    <p className="text-sm text-[var(--foreground-muted)]">{item.definition}</p>
                  </div>
                ))}
              </div>
            </motion.section>
          )}

          {/* Policy Quick Jump */}
          {filteredContent.policyJumps.length > 0 && (
            <motion.section variants={itemVariants} className="mb-12">
              <h2 className="text-sm text-[var(--foreground-subtle)] mb-4 tracking-wide uppercase">
                Policy Manual Quick Jump
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                {filteredContent.policyJumps.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 border border-[var(--border)] bg-[var(--surface)] hover:bg-[var(--surface-hover)] transition-colors"
                  >
                    <div className="text-[var(--foreground-subtle)]">
                      <BookOpenIcon />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-[var(--foreground)] truncate">{item.label}</p>
                      <p className="text-xs text-[var(--foreground-subtle)]">
                        {item.policy} &middot; Page {item.page}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-xs text-[var(--foreground-subtle)]">
                Open the PDF viewer in any chapter, then use the page input to jump to these sections.
              </p>
            </motion.section>
          )}

          {/* Critical Timelines */}
          {filteredContent.timelines.length > 0 && (
            <motion.section variants={itemVariants} className="mb-12">
              <h2 className="text-sm text-[var(--foreground-subtle)] mb-4 tracking-wide uppercase">
                Critical Timelines
              </h2>
              <div className="border-t border-[var(--border)]">
                {filteredContent.timelines.map((timeline, index) => (
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
          )}

          {/* Key Forms */}
          {filteredContent.forms.length > 0 && (
            <motion.section variants={itemVariants} className="mb-12">
              <h2 className="text-sm text-[var(--foreground-subtle)] mb-4 tracking-wide uppercase">
                Key Forms
              </h2>
              <div className="border-t border-[var(--border)]">
                {filteredContent.forms.map((form, index) => (
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
          )}

          {/* Common Mistakes */}
          {filteredContent.mistakes.length > 0 && (
            <motion.section variants={itemVariants} className="mb-12">
              <h2 className="text-sm text-[var(--foreground-subtle)] mb-4 tracking-wide uppercase">
                Common Mistakes to Avoid
              </h2>
              <div className="p-5 border-l-2 border-[var(--red)] bg-[var(--red-muted)]">
                <div className="space-y-3">
                  {filteredContent.mistakes.map((mistake, index) => (
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
          )}

          {/* Checklists */}
          {(filteredContent.showCoordinatorChecklist || filteredContent.showProviderChecklist) && (
            <div className="grid md:grid-cols-2 gap-8">
              {/* Service Coordinator Checklist */}
              {filteredContent.showCoordinatorChecklist && (
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
              )}

              {/* Provider Checklist */}
              {filteredContent.showProviderChecklist && (
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
              )}
            </div>
          )}

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
