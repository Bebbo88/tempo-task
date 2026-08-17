import React from "react";

export const Skeleton = ({ className }: { className?: string }) => (
  <div className={`animate-pulse bg-zinc-800 rounded ${className || ""}`} />
);
