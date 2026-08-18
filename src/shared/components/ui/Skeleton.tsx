import React from "react";

export function Skeleton({ className }: { className?: string }) {
  return <div className={`animate-pulse bg-surface-secondary/80 rounded ${className || ""}`} />;
}
