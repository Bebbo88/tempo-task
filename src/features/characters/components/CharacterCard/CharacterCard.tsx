import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Character } from "../../types/character.types";
import { StatusBadge } from "../StatusBadge/StatusBadge";

export interface CharacterCardProps {
  character: Character;
  priority?: boolean;
  className?: string;
}

export function CharacterCard({
  character,
  priority = false,
  className,
}: CharacterCardProps) {
  return (
    <Link
      href={`/character/${character.id}`}
      className={`bg-surface-primary/60 border border-border-subtle hover:border-border-strong hover:bg-surface-primary transition-all duration-200 rounded-xl overflow-hidden flex flex-col group shadow-sm ${className || ""}`}
    >
      <div className="relative aspect-square w-full bg-background overflow-hidden">
        <Image
          src={character.image}
          alt={character.name}
          fill
          unoptimized
          priority={priority}
          loading={priority ? "eager" : "lazy"}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {/* Subtle dark bottom gradient to blend image base into card */}
        <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-surface-primary/80 to-transparent pointer-events-none" />
      </div>

      <div className="p-4 flex flex-col gap-3 flex-1 justify-between">
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-primary group-hover:text-accent transition-colors truncate">
            {character.name}
          </h3>
          <div className="flex items-center gap-2">
            <StatusBadge status={character.status} />
            <span className="text-xs text-secondary truncate">{character.species}</span>
          </div>
        </div>

        {character.location?.name && (
          <div className="pt-2.5 border-t border-border-subtle/60 flex flex-col gap-0.5">
            <span className="text-[11px] text-muted font-normal">Location</span>
            <span className="text-xs text-secondary font-normal truncate">
              {character.location.name}
            </span>
          </div>
        )}
      </div>
    </Link>
  );
}
