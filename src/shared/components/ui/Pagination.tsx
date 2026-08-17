import React from "react";

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  isLoading?: boolean;
  className?: string;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  isLoading = false,
  className,
}: PaginationProps) {
  const isFirstPage = currentPage <= 1;
  const isLastPage = totalPages <= 1 || currentPage >= totalPages;

  const handlePrev = () => {
    if (!isFirstPage && !isLoading) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (!isLastPage && !isLoading) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className={`flex items-center justify-between gap-4 py-4 ${className || ""}`}>
      <button
        type="button"
        disabled={isFirstPage || isLoading}
        onClick={handlePrev}
        className="px-3 py-1.5 text-sm bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-200 hover:bg-zinc-800 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-zinc-900 transition-colors"
      >
        Previous
      </button>

      <span className="text-sm text-zinc-400">
        Page <span className="font-medium text-zinc-200">{currentPage}</span> of{" "}
        <span className="font-medium text-zinc-200">{Math.max(1, totalPages)}</span>
      </span>

      <button
        type="button"
        disabled={isLastPage || isLoading}
        onClick={handleNext}
        className="px-3 py-1.5 text-sm bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-200 hover:bg-zinc-800 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-zinc-900 transition-colors"
      >
        Next
      </button>
    </div>
  );
}
