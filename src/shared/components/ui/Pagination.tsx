import React from "react";

export const Pagination = ({ page, totalPages, onPageChange }: { page: number; totalPages: number; onPageChange: (p: number) => void }) => (
  <div className="flex items-center gap-2">Page {page} of {totalPages}</div>
);
