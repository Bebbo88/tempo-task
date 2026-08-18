"use client";

import React, { useState, useEffect, useTransition, useCallback } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useCharacters } from "../../hooks/useCharacters";
import { CharacterFilters } from "../CharacterFilters/CharacterFilters";
import { CharacterGrid } from "../CharacterGrid/CharacterGrid";
import { Pagination } from "@/shared/components/ui/Pagination";
import { CharacterStatus } from "../../types/character.types";
import { useDebounce } from "@/shared/hooks/useDebounce";

export function CharacterDashboard() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();

  // Read URL search params directly as single source of truth
  const nameParam = searchParams.get("name") || "";
  const statusParam = (searchParams.get("status") as CharacterStatus) || "";
  const pageParam = Math.max(1, parseInt(searchParams.get("page") || "1", 10));

  // Local state for instant responsive input typing with render-time adjustment
  const [prevNameParam, setPrevNameParam] = useState(nameParam);
  const [searchInput, setSearchInput] = useState(nameParam);

  // If URL changed externally (e.g. browser Back/Forward navigation), adjust state during render
  if (prevNameParam !== nameParam) {
    setPrevNameParam(nameParam);
    setSearchInput(nameParam);
  }

  const debouncedSearch = useDebounce(searchInput, 400);

  // Helper to push URL updates with transition and clean query parameters
  const updateUrlParams = useCallback(
    (updates: { name?: string; status?: string; page?: number }) => {
      const params = new URLSearchParams(searchParams.toString());

      // Update or delete name
      if (updates.name !== undefined) {
        const trimmed = updates.name.trim();
        if (trimmed) {
          params.set("name", trimmed);
        } else {
          params.delete("name");
        }
      }

      // Update or delete status
      if (updates.status !== undefined) {
        if (updates.status) {
          params.set("status", updates.status);
        } else {
          params.delete("status");
        }
      }

      // Update or delete page
      if (updates.page !== undefined) {
        if (updates.page > 1) {
          params.set("page", updates.page.toString());
        } else {
          params.delete("page");
        }
      }

      const queryString = params.toString();
      const newUrl = queryString ? `${pathname}?${queryString}` : pathname;

      startTransition(() => {
        router.push(newUrl, { scroll: false });
      });
    },
    [pathname, router, searchParams]
  );

  // Sync debounced search with URL & reset page to 1
  useEffect(() => {
    if (debouncedSearch.trim() !== nameParam.trim()) {
      updateUrlParams({ name: debouncedSearch, page: 1 });
    }
  }, [debouncedSearch, nameParam, updateUrlParams]);

  // Handle status filter change & reset page to 1
  const handleStatusChange = (newStatus: CharacterStatus | "") => {
    updateUrlParams({ status: newStatus, page: 1 });
  };

  // Handle page change & scroll smoothly to top
  const handlePageChange = (newPage: number) => {
    updateUrlParams({ page: newPage });
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Fetch characters using current URL parameters
  const { data, isLoading, isFetching } = useCharacters({
    name: nameParam || undefined,
    status: statusParam || undefined,
    page: pageParam,
  });

  const characters = data?.results ?? [];
  const totalCount = data?.info?.count ?? 0;
  const totalPages = data?.info?.pages ?? 1;

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header section */}
      <header className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-2 border-b border-border-subtle/60">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2.5">
            <h1 className="text-xl sm:text-2xl font-semibold tracking-tight text-primary">
              Multiverse Explorer
            </h1>
            {!isLoading && totalCount > 0 && (
              <span className="font-mono text-xs text-secondary bg-surface-primary border border-border-subtle px-2 py-0.5 rounded-full">
                {totalCount.toLocaleString()} beings
              </span>
            )}
          </div>
          <p className="text-sm text-secondary">
            Dimensional character registry and status index
          </p>
        </div>

        {!isLoading && totalPages > 1 && (
          <div className="text-xs text-muted font-mono">
            Page {pageParam} of {totalPages}
          </div>
        )}
      </header>

      {/* Filter bar section */}
      <section aria-label="Character Filters">
        <CharacterFilters
          name={searchInput}
          status={statusParam}
          onNameChange={setSearchInput}
          onStatusChange={handleStatusChange}
        />
      </section>

      {/* Grid and pagination section */}
      <section aria-label="Character List" className="space-y-8">
        <CharacterGrid
          characters={characters}
          isLoading={isLoading}
        />

        {!isLoading && (totalPages > 1 || pageParam > 1) && (
          <Pagination
            currentPage={pageParam}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            isLoading={isFetching}
          />
        )}
      </section>
    </main>
  );
}
