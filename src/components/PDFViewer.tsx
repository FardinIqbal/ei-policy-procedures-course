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

function ZoomInIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
      <line x1="11" y1="8" x2="11" y2="14" />
      <line x1="8" y1="11" x2="14" y2="11" />
    </svg>
  );
}

function ZoomOutIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
      <line x1="8" y1="11" x2="14" y2="11" />
    </svg>
  );
}

function ExpandIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="15 3 21 3 21 9" />
      <polyline points="9 21 3 21 3 15" />
      <line x1="21" y1="3" x2="14" y2="10" />
      <line x1="3" y1="21" x2="10" y2="14" />
    </svg>
  );
}

function ShrinkIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="4 14 10 14 10 20" />
      <polyline points="20 10 14 10 14 4" />
      <line x1="14" y1="10" x2="21" y2="3" />
      <line x1="3" y1="21" x2="10" y2="14" />
    </svg>
  );
}

export default function PDFViewer({ pageNumber: initialPage, onClose }: PDFViewerProps) {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState(initialPage);
  const [loading, setLoading] = useState(true);
  const [containerWidth, setContainerWidth] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [fitToWidth, setFitToWidth] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const fullscreenRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setPageNumber(initialPage);
  }, [initialPage]);

  // Use ResizeObserver to detect container size changes
  useEffect(() => {
    const container = isFullscreen ? fullscreenRef.current : containerRef.current;
    if (!container) return;

    const updateWidth = () => {
      if (container) {
        const width = container.clientWidth - 32;
        setContainerWidth(width > 0 ? width : 0);
      }
    };

    updateWidth();

    const resizeObserver = new ResizeObserver(() => {
      updateWidth();
    });

    resizeObserver.observe(container);

    return () => {
      resizeObserver.disconnect();
    };
  }, [isFullscreen]);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't handle if user is typing in an input
      if (e.target instanceof HTMLInputElement) return;

      switch (e.key) {
        case 'Escape':
          if (isFullscreen) {
            setIsFullscreen(false);
          } else if (onClose) {
            onClose();
          }
          break;
        case 'ArrowLeft':
        case 'ArrowUp':
          e.preventDefault();
          goToPrevPage();
          break;
        case 'ArrowRight':
        case 'ArrowDown':
          e.preventDefault();
          goToNextPage();
          break;
        case 'f':
        case 'F':
          if (!e.metaKey && !e.ctrlKey) {
            e.preventDefault();
            toggleFullscreen();
          }
          break;
        case '+':
        case '=':
          if (!e.metaKey && !e.ctrlKey) {
            e.preventDefault();
            zoomIn();
          }
          break;
        case '-':
          if (!e.metaKey && !e.ctrlKey) {
            e.preventDefault();
            zoomOut();
          }
          break;
        case '0':
          if (!e.metaKey && !e.ctrlKey) {
            e.preventDefault();
            resetZoom();
          }
          break;
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isFullscreen, numPages, pageNumber, onClose]);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
    setLoading(false);
  }

  const goToPrevPage = () => setPageNumber(prev => Math.max(prev - 1, 1));
  const goToNextPage = () => setPageNumber(prev => Math.min(prev + 1, numPages));

  const zoomIn = () => {
    setFitToWidth(false);
    setZoom(prev => Math.min(prev + 0.25, 3));
  };

  const zoomOut = () => {
    setFitToWidth(false);
    setZoom(prev => Math.max(prev - 0.25, 0.5));
  };

  const resetZoom = () => {
    setFitToWidth(true);
    setZoom(1);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(prev => !prev);
    // Reset zoom when entering fullscreen for best fit
    if (!isFullscreen) {
      setFitToWidth(true);
      setZoom(1);
    }
  };

  const pdfWidth = fitToWidth ? containerWidth : containerWidth * zoom;

  const renderContent = (ref: React.RefObject<HTMLDivElement | null>) => (
    <>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--border)] bg-[var(--surface)]">
        <div className="flex items-center gap-3">
          {!isFullscreen && onClose && (
            <button
              onClick={onClose}
              className="p-2 hover:bg-[var(--surface-hover)] text-[var(--foreground-muted)] transition-colors"
              title="Close"
            >
              <XIcon />
            </button>
          )}
          {isFullscreen && (
            <button
              onClick={toggleFullscreen}
              className="p-2 hover:bg-[var(--surface-hover)] text-[var(--foreground-muted)] transition-colors"
              title="Exit fullscreen"
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

        {/* Zoom Controls */}
        <div className="flex items-center gap-1">
          <button
            onClick={zoomOut}
            disabled={!fitToWidth && zoom <= 0.5}
            className="p-2 hover:bg-[var(--surface-hover)] text-[var(--foreground-muted)] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            title="Zoom out"
          >
            <ZoomOutIcon />
          </button>
          <button
            onClick={resetZoom}
            className={`px-2 py-1 text-xs transition-colors ${fitToWidth ? 'text-[var(--accent)]' : 'text-[var(--foreground-muted)] hover:bg-[var(--surface-hover)]'}`}
            title="Fit to width"
          >
            {fitToWidth ? 'Fit' : `${Math.round(zoom * 100)}%`}
          </button>
          <button
            onClick={zoomIn}
            disabled={!fitToWidth && zoom >= 3}
            className="p-2 hover:bg-[var(--surface-hover)] text-[var(--foreground-muted)] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            title="Zoom in"
          >
            <ZoomInIcon />
          </button>
          <div className="w-px h-4 bg-[var(--border)] mx-1" />
          <button
            onClick={toggleFullscreen}
            className="p-2 hover:bg-[var(--surface-hover)] text-[var(--foreground-muted)] transition-colors"
            title={isFullscreen ? "Exit fullscreen" : "Fullscreen"}
          >
            {isFullscreen ? <ShrinkIcon /> : <ExpandIcon />}
          </button>
        </div>
      </div>

      {/* PDF Content */}
      <div
        ref={ref}
        className="flex-1 overflow-auto p-4 cursor-pointer"
        onClick={!isFullscreen ? toggleFullscreen : undefined}
      >
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
            className={fitToWidth ? "flex justify-center" : ""}
          >
            <Page
              pageNumber={pageNumber}
              width={pdfWidth}
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
          title="Previous page (Arrow Left)"
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
          onClick={(e) => e.stopPropagation()}
        />
        <button
          onClick={goToNextPage}
          disabled={pageNumber >= numPages}
          className="p-2 hover:bg-[var(--surface-hover)] text-[var(--foreground-muted)] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          title="Next page (Arrow Right)"
        >
          <ChevronRightIcon />
        </button>
      </div>

      {/* Keyboard Shortcuts Hint */}
      <div className="px-4 py-2 border-t border-[var(--border)] bg-[var(--background-subtle)]">
        <p className="text-xs text-[var(--foreground-subtle)] text-center">
          Keyboard: <span className="text-[var(--foreground-muted)]">Arrows</span> navigate &middot; <span className="text-[var(--foreground-muted)]">F</span> fullscreen &middot; <span className="text-[var(--foreground-muted)]">+/-</span> zoom &middot; <span className="text-[var(--foreground-muted)]">Esc</span> close
        </p>
      </div>
    </>
  );

  // Fullscreen modal
  if (isFullscreen) {
    return (
      <div className="fixed inset-0 z-[100] bg-[var(--background)] flex flex-col">
        {renderContent(fullscreenRef)}
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-[var(--background-subtle)] border-l border-[var(--border)]">
      {renderContent(containerRef)}
    </div>
  );
}
