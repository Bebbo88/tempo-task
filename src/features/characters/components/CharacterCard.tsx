import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Character } from "../types/character.types";
import { StatusBadge } from "./StatusBadge";

export interface CharacterCardProps {
  character: Character;
  className?: string;
}

export function CharacterCard({ character, className }: CharacterCardProps) {
  return (
    <Link
      href={`/character/${character.id}`}
      className={`bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden hover:border-zinc-700 transition-all duration-200 group flex flex-col ${className || ""}`}
    >
      <div className="relative aspect-square w-full bg-zinc-950 overflow-hidden">
        <Image
          src={character.image}
          alt={character.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      <div className="p-4 flex flex-col gap-3 flex-1 justify-between">
        <div>
          <h3 className="font-semibold text-zinc-100 group-hover:text-emerald-400 transition-colors truncate">
            {character.name}
          </h3>
          <div className="flex items-center gap-2 mt-2">
            <StatusBadge status={character.status} />
            <span className="text-xs text-zinc-400 truncate">{character.species}</span>
          </div>
        </div>

        {character.location?.name && (
          <div className="text-xs text-zinc-500 pt-2 border-t border-zinc-800/60">
            <span className="text-zinc-400 block truncate">
              {character.location.name}
            </span>
          </div>
        )}
      </div>
    </Link>
  );
}
