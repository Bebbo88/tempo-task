import React from "react";
import { Character } from "../types/character.types";
import { CharacterCard } from "./CharacterCard";
import { Skeleton } from "@/shared/components/ui/Skeleton";

export interface CharacterGridProps {
  characters?: Character[];
  isLoading?: boolean;
  className?: string;
}

export function CharacterGrid({
  characters = [],
  isLoading = false,
  className,
}: CharacterGridProps) {
  if (isLoading) {
    return (
      <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ${className || ""}`}>
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden p-4 space-y-3"
          >
            <Skeleton className="aspect-square w-full rounded-lg" />
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        ))}
      </div>
    );
  }

  if (characters.length === 0) {
    return (
      <div className="text-center py-16 px-4 border border-dashed border-zinc-800 rounded-xl bg-zinc-900/30">
        <p className="text-zinc-400 text-sm">No characters found matching your criteria.</p>
      </div>
    );
  }

  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ${className || ""}`}>
      {characters.map((character) => (
        <CharacterCard key={character.id} character={character} />
      ))}
    </div>
  );
}
