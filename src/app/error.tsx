"use client";

import React, { useEffect } from "react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorBoundary({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error("Root Error Boundary caught an error:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-background text-primary flex items-center justify-center p-4">
      <div className="max-w-md w-full p-8 border border-border-subtle rounded-xl bg-surface-primary text-center space-y-4 shadow-sm">
        <h2 className="text-lg font-semibold text-primary">
          Something went wrong
        </h2>
        <p className="text-sm text-secondary">
          An unexpected error occurred while traversing dimensions. Please try again.
        </p>
        <div>
          <button
            type="button"
            onClick={() => reset()}
            className="px-4 py-2 text-sm bg-surface-secondary border border-border-subtle rounded-lg text-primary hover:border-border-strong hover:bg-surface-primary transition-colors cursor-pointer"
          >
            Try Again
          </button>
        </div>
      </div>
    </div>
  );
}
