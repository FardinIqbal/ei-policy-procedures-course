'use client';

import { useState, useRef } from 'react';

interface CertificateProps {
  trackTitle: string;
  completionDate: string;
  chaptersCompleted: number;
}

export default function Certificate({ trackTitle, completionDate, chaptersCompleted }: CertificateProps) {
  const [name, setName] = useState('');
  const certificateRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div>
      {/* Name Input */}
      <div className="mb-6">
        <label className="block text-sm text-[var(--foreground-subtle)] mb-2">
          Enter your name for the certificate
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your full name"
          className="w-full px-4 py-3 bg-[var(--background)] border border-[var(--border)] text-[var(--foreground)] placeholder:text-[var(--foreground-subtle)] focus:outline-none focus:border-[var(--border-subtle)]"
        />
      </div>

      {/* Certificate Preview */}
      <div
        ref={certificateRef}
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
            <p className="text-lg font-serif text-gray-900 mt-2 mb-6">
              {trackTitle}
            </p>
            <p className="text-sm text-gray-500">
              comprising {chaptersCompleted} chapters of policy and compliance instruction
            </p>
          </div>

          {/* Footer */}
          <div className="flex justify-between items-end text-sm text-gray-500">
            <div>
              <p className="border-t border-gray-300 pt-2 w-40">Date of Completion</p>
              <p className="text-gray-900 mt-1">{completionDate}</p>
            </div>
            <div className="text-right">
              <p className="text-xs tracking-[0.2em] uppercase">Policy Manual</p>
              <p className="text-gray-900">October 2025 Update</p>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-6 flex gap-4">
        <button
          onClick={handlePrint}
          disabled={!name.trim()}
          className="px-5 py-2 text-sm font-medium bg-[var(--foreground)] text-[var(--background)] disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
        >
          Print Certificate
        </button>
        <p className="text-xs text-[var(--foreground-subtle)] self-center">
          Enter your name to enable printing
        </p>
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
