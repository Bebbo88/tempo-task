import React from "react";

export const CharacterGrid = ({ children }: { children?: React.ReactNode }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">{children}</div>
);
