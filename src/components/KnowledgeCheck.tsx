'use client';

import { useState } from 'react';

export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

interface KnowledgeCheckProps {
  questions: QuizQuestion[];
  onComplete?: () => void;
}

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

export default function KnowledgeCheck({ questions, onComplete }: KnowledgeCheckProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [completed, setCompleted] = useState(false);

  if (questions.length === 0) return null;

  const question = questions[currentQuestion];
  const isCorrect = selectedAnswer === question.correctIndex;
  const isLastQuestion = currentQuestion === questions.length - 1;

  const handleSelectAnswer = (index: number) => {
    if (showResult) return;
    setSelectedAnswer(index);
  };

  const handleCheckAnswer = () => {
    if (selectedAnswer === null) return;
    setShowResult(true);
  };

  const handleNext = () => {
    if (isLastQuestion) {
      setCompleted(true);
      onComplete?.();
    } else {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    }
  };

  if (completed) {
    return (
      <div className="border border-[var(--border)] bg-[var(--surface)] p-6">
        <p className="text-sm text-[var(--foreground-subtle)] mb-2">Knowledge Check</p>
        <p className="text-[var(--foreground)]">
          You have completed the knowledge verification for this chapter.
        </p>
      </div>
    );
  }

  return (
    <div className="border border-[var(--border)] bg-[var(--surface)]">
      {/* Header */}
      <div className="px-6 py-4 border-b border-[var(--border)]">
        <p className="text-sm text-[var(--foreground-subtle)]">
          Verify Your Understanding &middot; Question {currentQuestion + 1} of {questions.length}
        </p>
      </div>

      {/* Question */}
      <div className="p-6">
        <p className="text-[var(--foreground)] mb-6">{question.question}</p>

        {/* Options */}
        <div className="space-y-2 mb-6">
          {question.options.map((option, index) => {
            let borderColor = 'border-[var(--border)]';
            let bgColor = 'bg-transparent';
            let textColor = 'text-[var(--foreground-muted)]';

            if (showResult) {
              if (index === question.correctIndex) {
                borderColor = 'border-[var(--success)]';
                bgColor = 'bg-[var(--success-muted)]';
                textColor = 'text-[var(--foreground)]';
              } else if (index === selectedAnswer && !isCorrect) {
                borderColor = 'border-[var(--red)]';
                bgColor = 'bg-[var(--red-muted)]';
                textColor = 'text-[var(--foreground)]';
              }
            } else if (index === selectedAnswer) {
              borderColor = 'border-[var(--border-subtle)]';
              bgColor = 'bg-[var(--surface-hover)]';
              textColor = 'text-[var(--foreground)]';
            }

            return (
              <button
                key={index}
                onClick={() => handleSelectAnswer(index)}
                disabled={showResult}
                className={`w-full flex items-center gap-3 p-4 border ${borderColor} ${bgColor} text-left transition-colors ${
                  !showResult ? 'hover:border-[var(--border-subtle)] hover:bg-[var(--surface-hover)]' : ''
                }`}
              >
                <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                  showResult && index === question.correctIndex
                    ? 'border-[var(--success)] bg-[var(--success)] text-[var(--background)]'
                    : showResult && index === selectedAnswer && !isCorrect
                    ? 'border-[var(--red)] bg-[var(--red)] text-[var(--background)]'
                    : index === selectedAnswer
                    ? 'border-[var(--foreground-muted)]'
                    : 'border-[var(--border-subtle)]'
                }`}>
                  {showResult && index === question.correctIndex && <CheckIcon />}
                  {showResult && index === selectedAnswer && !isCorrect && <XIcon />}
                </div>
                <span className={`text-sm ${textColor}`}>{option}</span>
              </button>
            );
          })}
        </div>

        {/* Explanation */}
        {showResult && (
          <div className={`p-4 border-l-2 mb-6 ${
            isCorrect
              ? 'border-[var(--success)] bg-[var(--success-muted)]'
              : 'border-[var(--accent)] bg-[var(--accent-muted)]'
          }`}>
            <p className="text-sm text-[var(--foreground-muted)]">{question.explanation}</p>
          </div>
        )}

        {/* Actions */}
        <div className="flex justify-end">
          {!showResult ? (
            <button
              onClick={handleCheckAnswer}
              disabled={selectedAnswer === null}
              className="px-4 py-2 text-sm font-medium bg-[var(--foreground)] text-[var(--background)] disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
            >
              Check Answer
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="px-4 py-2 text-sm font-medium bg-[var(--foreground)] text-[var(--background)] hover:opacity-90 transition-opacity"
            >
              {isLastQuestion ? 'Complete' : 'Next Question'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
