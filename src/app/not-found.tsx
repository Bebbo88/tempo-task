import React from "react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background text-primary flex items-center justify-center p-4">
      <div className="max-w-md w-full p-8 border border-border-subtle rounded-xl bg-surface-primary text-center space-y-4 shadow-sm">
        <span className="inline-block font-mono text-xs text-muted bg-surface-secondary/80 border border-border-subtle px-2 py-0.5 rounded">
          404
        </span>
        <h2 className="text-lg font-semibold text-primary">
          Character Not Found
        </h2>
        <p className="text-sm text-secondary">
          The entity or dimension you are looking for does not exist in this timeline.
        </p>
        <div>
          <Link
            href="/"
            className="inline-block px-4 py-2 text-sm bg-surface-secondary border border-border-subtle rounded-lg text-primary hover:border-border-strong hover:bg-surface-primary transition-colors"
          >
            Back to Explorer
          </Link>
        </div>
      </div>
    </div>
  );
}
