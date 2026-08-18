import React from "react";
import { Skeleton } from "@/shared/components/ui/Skeleton";

export function CharacterCardSkeleton() {
  return (
    <div className="bg-surface-primary/60 border border-border-subtle rounded-xl overflow-hidden p-4 space-y-3">
      <Skeleton className="aspect-square w-full rounded-lg" />
      <Skeleton className="h-5 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
    </div>
  );
}
