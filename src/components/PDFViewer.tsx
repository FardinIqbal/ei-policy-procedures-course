'use client';

import { useState, useEffect, useRef } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface PDFViewerProps {
  pageNumber: number;
  onClose?: () => void;
}

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

function XIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

export default function PDFViewer({ pageNumber: initialPage, onClose }: PDFViewerProps) {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState(initialPage);
  const [loading, setLoading] = useState(true);
  const [containerWidth, setContainerWidth] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setPageNumber(initialPage);
  }, [initialPage]);

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.clientWidth - 32);
      }
    };

    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
    setLoading(false);
  }

  const goToPrevPage = () => setPageNumber(prev => Math.max(prev - 1, 1));
  const goToNextPage = () => setPageNumber(prev => Math.min(prev + 1, numPages));

  return (
    <div className="flex flex-col h-full bg-[var(--background-subtle)] border-l border-[var(--border)]">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--border)] bg-[var(--surface)]">
        <div className="flex items-center gap-3">
          {onClose && (
            <button
              onClick={onClose}
              className="p-2 hover:bg-[var(--surface-hover)] text-[var(--foreground-muted)] transition-colors"
            >
              <XIcon />
            </button>
          )}
          <div>
            <p className="text-sm font-medium text-[var(--foreground)]">Policy Manual</p>
            <p className="text-xs text-[var(--foreground-subtle)]">
              Page {pageNumber} of {numPages || '...'}
            </p>
          </div>
        </div>
      </div>

      {/* PDF Content */}
      <div ref={containerRef} className="flex-1 overflow-auto p-4">
        {loading && (
          <div className="flex items-center justify-center h-full">
            <div className="w-6 h-6 border-2 border-[var(--foreground-subtle)] border-t-transparent rounded-full animate-spin" />
          </div>
        )}
        {containerWidth > 0 && (
          <Document
            file="/policy-manual.pdf"
            onLoadSuccess={onDocumentLoadSuccess}
            loading=""
            className="flex justify-center"
          >
            <Page
              pageNumber={pageNumber}
              width={containerWidth}
              renderTextLayer={true}
              renderAnnotationLayer={true}
            />
          </Document>
        )}
      </div>

      {/* Footer Navigation */}
      <div className="flex items-center justify-center gap-4 px-4 py-3 border-t border-[var(--border)] bg-[var(--surface)]">
        <button
          onClick={goToPrevPage}
          disabled={pageNumber <= 1}
          className="p-2 hover:bg-[var(--surface-hover)] text-[var(--foreground-muted)] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ChevronLeftIcon />
        </button>
        <input
          type="number"
          min={1}
          max={numPages}
          value={pageNumber}
          onChange={(e) => {
            const val = parseInt(e.target.value);
            if (val >= 1 && val <= numPages) setPageNumber(val);
          }}
          className="w-16 px-2 py-1 text-center text-sm bg-[var(--background)] border border-[var(--border)] text-[var(--foreground)] focus:outline-none focus:border-[var(--border-subtle)]"
        />
        <button
          onClick={goToNextPage}
          disabled={pageNumber >= numPages}
          className="p-2 hover:bg-[var(--surface-hover)] text-[var(--foreground-muted)] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ChevronRightIcon />
        </button>
      </div>
    </div>
  );
}
