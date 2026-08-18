import React from "react";
import { Skeleton } from "@/shared/components/ui/Skeleton";

export function CharacterDetailsSkeleton() {
  return (
    <div className="min-h-screen bg-background text-primary">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-6">
        <div className="h-4 w-28 bg-surface-primary rounded animate-pulse" />
        <div className="bg-surface-primary/60 border border-border-subtle rounded-xl overflow-hidden flex flex-col md:flex-row shadow-sm">
          <div className="aspect-square w-full md:w-80 bg-surface-primary/80 animate-pulse shrink-0" />
          <div className="p-6 sm:p-8 flex flex-col justify-between space-y-6 flex-1">
            <div className="space-y-4">
              <Skeleton className="h-7 w-3/4" />
              <div className="flex gap-2">
                <Skeleton className="h-5 w-20 rounded-full" />
                <Skeleton className="h-5 w-24" />
              </div>
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border-subtle">
                <div className="space-y-1.5">
                  <Skeleton className="h-3 w-12" />
                  <Skeleton className="h-4 w-24" />
                </div>
                <div className="space-y-1.5">
                  <Skeleton className="h-3 w-20" />
                  <Skeleton className="h-4 w-28" />
                </div>
              </div>
            </div>
            <div className="space-y-3 pt-4 border-t border-border-subtle">
              <Skeleton className="h-3.5 w-24" />
              <div className="space-y-1.5">
                <Skeleton className="h-9 w-full rounded-md" />
                <Skeleton className="h-9 w-full rounded-md" />
                <Skeleton className="h-9 w-full rounded-md" />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
