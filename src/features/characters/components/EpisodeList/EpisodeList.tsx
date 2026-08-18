import React from "react";
import { CharacterEpisodeRef } from "../../types/character.types";
import { EpisodeItem } from "../EpisodeItem/EpisodeItem";

export interface EpisodeListProps {
  episodes?: CharacterEpisodeRef[];
  className?: string;
}

export function EpisodeList({ episodes = [], className }: EpisodeListProps) {
  const count = episodes.length;

  return (
    <div className={`space-y-3 pt-4 border-t border-border-subtle ${className || ""}`}>
      <div className="flex items-center justify-between">
        <h2 className="text-xs uppercase tracking-wider text-secondary font-semibold">
          Episodes
        </h2>
        <span className="font-mono text-[11px] text-muted">
          {count} {count === 1 ? "episode" : "episodes"}
        </span>
      </div>

      {count === 0 ? (
        <div className="p-4 rounded-lg bg-surface-subtle/40 border border-dashed border-border-subtle text-center">
          <p className="text-xs text-muted">No episodes available for this character.</p>
        </div>
      ) : (
        <div
          tabIndex={0}
          aria-label="Episodes list"
          className="max-h-56 overflow-y-auto space-y-1.5 pr-2 scrollbar-thin focus:outline-none focus:ring-1 focus:ring-border-subtle rounded"
        >
          {episodes.map((ep) => (
            <EpisodeItem key={ep.id} episode={ep} />
          ))}
        </div>
      )}
    </div>
  );
}
