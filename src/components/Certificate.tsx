'use client';

import { useState, useRef } from 'react';
import { jsPDF } from 'jspdf';

interface CertificateProps {
  trackTitle: string;
  completionDate: string;
  chaptersCompleted: number;
  quizScore?: number;
  role?: string;
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

function PrinterIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 6 2 18 2 18 9" />
      <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
      <rect x="6" y="14" width="12" height="8" />
    </svg>
  );
}

// Generate a unique certificate ID based on name, date, and track
function generateCertificateId(name: string, date: string, track: string): string {
  const input = `${name}-${date}-${track}`.toLowerCase();
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    const char = input.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  const positiveHash = Math.abs(hash);
  return `EI-${positiveHash.toString(36).toUpperCase().slice(0, 8)}`;
}

export default function Certificate({ trackTitle, completionDate, chaptersCompleted, quizScore, role }: CertificateProps) {
  const [name, setName] = useState('');
  const certificateRef = useRef<HTMLDivElement>(null);

  const certificateId = name.trim() ? generateCertificateId(name, completionDate, trackTitle) : '';

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = () => {
    if (!name.trim()) return;

    const doc = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: 'a4',
    });

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    // Background
    doc.setFillColor(255, 255, 255);
    doc.rect(0, 0, pageWidth, pageHeight, 'F');

    // Border
    doc.setDrawColor(200, 200, 200);
    doc.setLineWidth(0.5);
    doc.rect(15, 15, pageWidth - 30, pageHeight - 30);
    doc.rect(18, 18, pageWidth - 36, pageHeight - 36);

    // Header
    doc.setFontSize(10);
    doc.setTextColor(128, 128, 128);
    doc.text('NYC EARLY INTERVENTION PROGRAM', pageWidth / 2, 35, { align: 'center' });

    doc.setFontSize(28);
    doc.setTextColor(30, 30, 30);
    doc.text('Certificate of Completion', pageWidth / 2, 50, { align: 'center' });

    // Body
    doc.setFontSize(11);
    doc.setTextColor(128, 128, 128);
    doc.text('This certifies that', pageWidth / 2, 75, { align: 'center' });

    doc.setFontSize(22);
    doc.setTextColor(30, 30, 30);
    doc.text(name, pageWidth / 2, 90, { align: 'center' });

    // Underline for name
    const nameWidth = doc.getTextWidth(name);
    doc.setDrawColor(150, 150, 150);
    doc.setLineWidth(0.3);
    doc.line((pageWidth - nameWidth) / 2 - 10, 93, (pageWidth + nameWidth) / 2 + 10, 93);

    doc.setFontSize(11);
    doc.setTextColor(128, 128, 128);
    doc.text('has successfully completed the professional development training', pageWidth / 2, 108, { align: 'center' });

    doc.setFontSize(16);
    doc.setTextColor(30, 30, 30);
    doc.text(trackTitle, pageWidth / 2, 120, { align: 'center' });

    doc.setFontSize(11);
    doc.setTextColor(128, 128, 128);
    doc.text(`comprising ${chaptersCompleted} chapters of policy and compliance instruction`, pageWidth / 2, 132, { align: 'center' });

    if (quizScore !== undefined) {
      doc.text(`Quiz Performance: ${quizScore}%`, pageWidth / 2, 142, { align: 'center' });
    }

    // Footer
    doc.setFontSize(10);
    doc.setTextColor(128, 128, 128);

    // Left side - Date
    doc.text('Date of Completion', 35, pageHeight - 40);
    doc.setTextColor(30, 30, 30);
    doc.text(completionDate, 35, pageHeight - 34);

    // Center - Certificate ID
    doc.setTextColor(128, 128, 128);
    doc.text('Certificate ID', pageWidth / 2, pageHeight - 40, { align: 'center' });
    doc.setTextColor(30, 30, 30);
    doc.text(certificateId, pageWidth / 2, pageHeight - 34, { align: 'center' });

    // Right side - Policy version
    doc.setTextColor(128, 128, 128);
    doc.text('Policy Manual', pageWidth - 35, pageHeight - 40, { align: 'right' });
    doc.setTextColor(30, 30, 30);
    doc.text('October 2025 Update', pageWidth - 35, pageHeight - 34, { align: 'right' });

    // Save
    const filename = `ei-certificate-${name.toLowerCase().replace(/\s+/g, '-')}-${certificateId}.pdf`;
    doc.save(filename);
  };

  return (
    <div>
      {/* Name Input */}
      <div className="mb-6">
        <label htmlFor="certificate-name" className="block text-sm text-[var(--foreground-subtle)] mb-2">
          Enter your name for the certificate
        </label>
        <input
          id="certificate-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your full name"
          className="w-full px-4 py-3 min-h-[44px] bg-[var(--background)] border border-[var(--border)] text-[var(--foreground)] placeholder:text-[var(--foreground-subtle)] focus:outline-none focus:border-[var(--border-subtle)]"
        />
      </div>

      {/* Certificate Preview */}
      <div
        ref={certificateRef}
        id="certificate-print"
        className="bg-white text-black p-12 border border-[var(--border)]"
        style={{ aspectRatio: '1.414' }}
      >
        <div className="h-full flex flex-col justify-between border-2 border-gray-200 p-8">
          {/* Header */}
          <div className="text-center">
            <p className="text-xs tracking-[0.3em] text-gray-500 uppercase mb-2">
              NYC Early Intervention Program
            </p>
            <h1 className="text-2xl font-serif font-normal tracking-wide text-gray-900">
              Certificate of Completion
            </h1>
          </div>

          {/* Body */}
          <div className="text-center">
            <p className="text-sm text-gray-500 mb-4">This certifies that</p>
            <p className="text-xl font-serif text-gray-900 mb-4 min-h-[2rem] border-b border-gray-300 inline-block px-8">
              {name || 'Your Name'}
            </p>
            <p className="text-sm text-gray-500 mt-6">
              has successfully completed the professional development training
            </p>
            <p className="text-lg font-serif text-gray-900 mt-2 mb-4">
              {trackTitle}
            </p>
            <p className="text-sm text-gray-500">
              comprising {chaptersCompleted} chapters of policy and compliance instruction
            </p>
            {quizScore !== undefined && (
              <p className="text-sm text-gray-500 mt-2">
                Quiz Performance: {quizScore}%
              </p>
            )}
          </div>

          {/* Footer */}
          <div className="flex justify-between items-end text-sm text-gray-500">
            <div>
              <p className="border-t border-gray-300 pt-2 w-40">Date of Completion</p>
              <p className="text-gray-900 mt-1">{completionDate}</p>
            </div>
            <div className="text-center">
              {certificateId && (
                <>
                  <p className="text-xs tracking-wide">Certificate ID</p>
                  <p className="text-gray-900 font-mono text-xs mt-1">{certificateId}</p>
                </>
              )}
            </div>
            <div className="text-right">
              <p className="text-xs tracking-[0.2em] uppercase">Policy Manual</p>
              <p className="text-gray-900">October 2025 Update</p>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-6 flex flex-wrap gap-4">
        <button
          onClick={handleDownloadPDF}
          disabled={!name.trim()}
          aria-label="Download certificate as PDF"
          className="flex items-center gap-2 px-5 py-2 min-h-[44px] text-sm font-medium bg-[var(--foreground)] text-[var(--background)] disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
        >
          <DownloadIcon />
          Download PDF
        </button>
        <button
          onClick={handlePrint}
          disabled={!name.trim()}
          aria-label="Print certificate"
          className="flex items-center gap-2 px-5 py-2 min-h-[44px] text-sm font-medium bg-[var(--surface)] border border-[var(--border)] text-[var(--foreground-muted)] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[var(--surface-hover)] transition-colors"
        >
          <PrinterIcon />
          Print
        </button>
        {!name.trim() && (
          <p className="text-xs text-[var(--foreground-subtle)] self-center">
            Enter your name to enable download
          </p>
        )}
      </div>

      {/* Print Styles */}
      <style jsx global>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #certificate-print, #certificate-print * {
            visibility: visible;
          }
          #certificate-print {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}
