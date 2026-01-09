'use client';

import { Component, ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

function RefreshIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 4 23 10 17 10" />
      <polyline points="1 20 1 14 7 14" />
      <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
    </svg>
  );
}

export default class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="flex flex-col items-center justify-center p-8 min-h-[200px] bg-[var(--surface)] border border-[var(--border)]">
          <div className="text-center max-w-md">
            <h2 className="font-display text-xl text-[var(--foreground)] mb-2">
              Something went wrong
            </h2>
            <p className="text-sm text-[var(--foreground-muted)] mb-4">
              An error occurred while loading this content. Please try again.
            </p>
            {this.state.error && (
              <p className="text-xs text-[var(--foreground-subtle)] mb-4 font-mono bg-[var(--background)] p-2 border border-[var(--border)] overflow-auto max-h-20">
                {this.state.error.message}
              </p>
            )}
            <button
              onClick={this.handleRetry}
              className="inline-flex items-center gap-2 px-4 py-2 min-h-[44px] text-sm bg-[var(--foreground)] text-[var(--background)] hover:opacity-90 transition-opacity"
            >
              <RefreshIcon />
              Try Again
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
