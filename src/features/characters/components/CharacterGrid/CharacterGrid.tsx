import React from "react";
import { Character } from "../../types/character.types";
import { CharacterCard } from "../CharacterCard/CharacterCard";
import { CharacterGridSkeleton } from "./CharacterGridSkeleton";

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
    return <CharacterGridSkeleton count={8} />;
  }

  if (characters.length === 0) {
    return (
      <div className="text-center py-16 px-4 border border-dashed border-border-subtle rounded-xl bg-surface-primary/30">
        <p className="text-secondary text-sm">No characters found matching your criteria.</p>
      </div>
    );
  }

  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ${className || ""}`}>
      {characters.map((character, index) => (
        <CharacterCard
          key={character.id}
          character={character}
          priority={index < 4}
        />
      ))}
    </div>
  );
}
