import React from "react";

export const Badge = ({ children, className }: { children?: React.ReactNode; className?: string }) => (
  <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs ${className || ""}`}>{children}</span>
);
