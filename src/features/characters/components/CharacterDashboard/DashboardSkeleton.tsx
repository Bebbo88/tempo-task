import React from "react";
import { CharacterGridSkeleton } from "../CharacterGrid/CharacterGridSkeleton";

export function DashboardSkeleton() {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <header className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-2 border-b border-border-subtle/60">
        <div className="space-y-1.5">
          <div className="h-7 w-52 bg-surface-primary border border-border-subtle rounded-md animate-pulse" />
          <div className="h-4 w-72 bg-surface-primary/60 rounded animate-pulse" />
        </div>
      </header>
      <div className="h-10 bg-surface-primary border border-border-subtle rounded-lg animate-pulse" />
      <CharacterGridSkeleton />
    </main>
  );
}
