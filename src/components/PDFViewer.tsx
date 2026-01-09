'use client';

import { useState, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

// Set up PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface PDFViewerProps {
  pageNumber: number;
  onClose?: () => void;
}

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

function XIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function ZoomInIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
      <line x1="11" y1="8" x2="11" y2="14" />
      <line x1="8" y1="11" x2="14" y2="11" />
    </svg>
  );
}

function ZoomOutIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
      <line x1="8" y1="11" x2="14" y2="11" />
    </svg>
  );
}

export default function PDFViewer({ pageNumber: initialPage, onClose }: PDFViewerProps) {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState(initialPage);
  const [scale, setScale] = useState(1.0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setPageNumber(initialPage);
  }, [initialPage]);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
    setLoading(false);
  }

  const goToPrevPage = () => setPageNumber(prev => Math.max(prev - 1, 1));
  const goToNextPage = () => setPageNumber(prev => Math.min(prev + 1, numPages));
  const zoomIn = () => setScale(prev => Math.min(prev + 0.2, 2.0));
  const zoomOut = () => setScale(prev => Math.max(prev - 0.2, 0.6));

  return (
    <div className="flex flex-col h-full bg-[var(--background-subtle)] rounded-xl border border-[var(--border)] overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--border)] bg-[var(--surface)]">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-[var(--foreground)]">Policy Manual</span>
          <span className="text-xs text-[var(--foreground-subtle)]">
            Page {pageNumber} of {numPages || '...'}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={zoomOut}
            className="p-2 rounded-lg hover:bg-[var(--surface-hover)] text-[var(--foreground-muted)] transition-colors"
            title="Zoom out"
          >
            <ZoomOutIcon />
          </button>
          <span className="text-xs text-[var(--foreground-subtle)] w-12 text-center">
            {Math.round(scale * 100)}%
          </span>
          <button
            onClick={zoomIn}
            className="p-2 rounded-lg hover:bg-[var(--surface-hover)] text-[var(--foreground-muted)] transition-colors"
            title="Zoom in"
          >
            <ZoomInIcon />
          </button>
          {onClose && (
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-[var(--surface-hover)] text-[var(--foreground-muted)] transition-colors ml-2"
              title="Close"
            >
              <XIcon />
            </button>
          )}
        </div>
      </div>

      {/* PDF Content */}
      <div className="flex-1 overflow-auto p-4 flex justify-center">
        {loading && (
          <div className="flex items-center justify-center h-full">
            <div className="w-8 h-8 border-2 border-[var(--accent)] border-t-transparent rounded-full animate-spin" />
          </div>
        )}
        <Document
          file="/policy-manual.pdf"
          onLoadSuccess={onDocumentLoadSuccess}
          loading=""
          className="flex justify-center"
        >
          <Page
            pageNumber={pageNumber}
            scale={scale}
            className="shadow-2xl"
            renderTextLayer={true}
            renderAnnotationLayer={true}
          />
        </Document>
      </div>

      {/* Footer Navigation */}
      <div className="flex items-center justify-center gap-4 px-4 py-3 border-t border-[var(--border)] bg-[var(--surface)]">
        <button
          onClick={goToPrevPage}
          disabled={pageNumber <= 1}
          className="p-2 rounded-lg hover:bg-[var(--surface-hover)] text-[var(--foreground-muted)] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
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
          className="w-16 px-2 py-1 text-center text-sm bg-[var(--background)] border border-[var(--border)] rounded-lg text-[var(--foreground)] focus:outline-none focus:border-[var(--accent)]"
        />
        <button
          onClick={goToNextPage}
          disabled={pageNumber >= numPages}
          className="p-2 rounded-lg hover:bg-[var(--surface-hover)] text-[var(--foreground-muted)] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ChevronRightIcon />
        </button>
      </div>
    </div>
  );
}
