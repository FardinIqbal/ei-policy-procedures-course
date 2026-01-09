'use client';

import { Role, getTrack } from '@/lib/content';
import { getProgress, getAllQuizScores, getTotalQuizStats, getTotalTimeSpent, formatTime } from '@/lib/progress';

interface ProgressReportProps {
  role: Role;
  userName?: string;
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

function DownloadIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}

export default function ProgressReport({ role, userName = 'Trainee' }: ProgressReportProps) {
  const track = getTrack(role);
  const progress = getProgress();
  const quizScores = getAllQuizScores(role);
  const totalStats = getTotalQuizStats(role);
  const totalTime = getTotalTimeSpent();

  if (!track) return null;

  const completedModules = progress[role];
  const percentage = Math.round((completedModules.length / track.modules.length) * 100);
  const isComplete = percentage === 100;

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    const reportContent = generateTextReport();
    const blob = new Blob([reportContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ei-training-report-${role}-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const generateTextReport = () => {
    const lines = [
      '================================================',
      'NYC EARLY INTERVENTION TRAINING PROGRESS REPORT',
      '================================================',
      '',
      `Generated: ${new Date().toLocaleString()}`,
      `Trainee: ${userName}`,
      `Track: ${track.title}`,
      '',
      '--- SUMMARY ---',
      `Completion: ${completedModules.length}/${track.modules.length} chapters (${percentage}%)`,
      totalStats.total > 0 ? `Quiz Score: ${totalStats.correct}/${totalStats.total} (${totalStats.percentage}%)` : '',
      totalTime > 0 ? `Time Invested: ${formatTime(totalTime)}` : '',
      progress.startedAt ? `Started: ${new Date(progress.startedAt).toLocaleDateString()}` : '',
      isComplete ? `Completed: ${new Date().toLocaleDateString()}` : '',
      '',
      '--- CHAPTER DETAILS ---',
    ];

    track.modules.forEach((module, index) => {
      const isModuleComplete = completedModules.includes(module.id);
      const quizScore = quizScores.find(s => s.moduleId === module.id);

      lines.push('');
      lines.push(`Chapter ${index + 1}: ${module.title}`);
      lines.push(`Status: ${isModuleComplete ? 'COMPLETED' : 'Not completed'}`);
      if (quizScore) {
        lines.push(`Quiz: ${quizScore.correct}/${quizScore.total} (${Math.round((quizScore.correct / quizScore.total) * 100)}%)`);
        lines.push(`Quiz Date: ${new Date(quizScore.completedAt).toLocaleDateString()}`);
      }
    });

    lines.push('');
    lines.push('================================================');
    lines.push('Based on NYC EI Policy Manual (October 2025)');
    lines.push('================================================');

    return lines.filter(l => l !== '').join('\n');
  };

  return (
    <div className="border border-[var(--border)] bg-[var(--surface)]">
      {/* Header */}
      <div className="px-6 py-4 border-b border-[var(--border)] flex items-center justify-between">
        <div>
          <p className="text-sm text-[var(--foreground-subtle)]">Progress Report</p>
          <p className="text-[var(--foreground)] font-display">{track.title}</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-3 py-2 text-sm bg-[var(--surface-hover)] hover:bg-[var(--border)] text-[var(--foreground-muted)] transition-colors"
            title="Print report"
          >
            <PrinterIcon />
            <span className="hidden sm:inline">Print</span>
          </button>
          <button
            onClick={handleDownload}
            className="flex items-center gap-2 px-3 py-2 text-sm bg-[var(--surface-hover)] hover:bg-[var(--border)] text-[var(--foreground-muted)] transition-colors"
            title="Download report"
          >
            <DownloadIcon />
            <span className="hidden sm:inline">Download</span>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 print:p-0">
        {/* Summary Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="text-center p-3 border border-[var(--border)]">
            <p className="text-2xl font-display text-[var(--foreground)]">{percentage}%</p>
            <p className="text-xs text-[var(--foreground-subtle)]">Complete</p>
          </div>
          <div className="text-center p-3 border border-[var(--border)]">
            <p className="text-2xl font-display text-[var(--foreground)]">{completedModules.length}/{track.modules.length}</p>
            <p className="text-xs text-[var(--foreground-subtle)]">Chapters</p>
          </div>
          {totalStats.total > 0 && (
            <div className="text-center p-3 border border-[var(--border)]">
              <p className="text-2xl font-display text-[var(--foreground)]">{totalStats.percentage}%</p>
              <p className="text-xs text-[var(--foreground-subtle)]">Quiz Accuracy</p>
            </div>
          )}
          {totalTime > 0 && (
            <div className="text-center p-3 border border-[var(--border)]">
              <p className="text-2xl font-display text-[var(--foreground)]">{formatTime(totalTime)}</p>
              <p className="text-xs text-[var(--foreground-subtle)]">Time Invested</p>
            </div>
          )}
        </div>

        {/* Chapter Details */}
        <div className="space-y-2">
          <p className="text-sm text-[var(--foreground-subtle)] mb-3">Chapter Details</p>
          {track.modules.map((module, index) => {
            const isModuleComplete = completedModules.includes(module.id);
            const quizScore = quizScores.find(s => s.moduleId === module.id);

            return (
              <div
                key={module.id}
                className={`flex items-center justify-between py-3 px-4 border-l-2 ${
                  isModuleComplete
                    ? 'border-[var(--success)] bg-[var(--success-muted)]'
                    : 'border-[var(--border)] bg-[var(--background-subtle)]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-sm text-[var(--foreground-subtle)] w-6">{index + 1}.</span>
                  <div>
                    <p className={isModuleComplete ? 'text-[var(--foreground)]' : 'text-[var(--foreground-muted)]'}>
                      {module.title}
                    </p>
                    {quizScore && (
                      <p className="text-xs text-[var(--foreground-subtle)]">
                        Quiz: {quizScore.correct}/{quizScore.total} ({Math.round((quizScore.correct / quizScore.total) * 100)}%)
                      </p>
                    )}
                  </div>
                </div>
                <span className={`text-xs ${isModuleComplete ? 'text-[var(--success)]' : 'text-[var(--foreground-subtle)]'}`}>
                  {isModuleComplete ? 'Completed' : 'Pending'}
                </span>
              </div>
            );
          })}
        </div>

        {/* Dates */}
        <div className="mt-6 pt-4 border-t border-[var(--border)] text-xs text-[var(--foreground-subtle)]">
          <div className="flex justify-between">
            {progress.startedAt && (
              <span>Started: {new Date(progress.startedAt).toLocaleDateString()}</span>
            )}
            <span>Report generated: {new Date().toLocaleDateString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
