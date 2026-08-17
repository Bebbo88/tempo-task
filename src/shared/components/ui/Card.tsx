import React from "react";

export const Card = ({ children, className }: { children?: React.ReactNode; className?: string }) => (
  <div className={`rounded-xl border p-4 ${className || ""}`}>{children}</div>
);
