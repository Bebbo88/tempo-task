import React from "react";
import { CharacterEpisodeRef } from "../../types/character.types";

export interface EpisodeItemProps {
  episode: CharacterEpisodeRef;
  className?: string;
}

export function EpisodeItem({ episode, className }: EpisodeItemProps) {
  return (
    <div
      className={`bg-surface-subtle/80 border border-border-subtle hover:border-border-strong rounded-md px-3 py-2 flex items-center justify-between gap-3 transition-colors ${className || ""}`}
    >
      <div className="space-y-0.5 min-w-0 flex-1">
        <p className="text-xs font-medium text-primary truncate">
          {episode.name}
        </p>
        {episode.air_date && (
          <p className="text-[11px] text-muted truncate">{episode.air_date}</p>
        )}
      </div>

      <span className="font-mono text-[11px] text-secondary bg-surface-primary border border-border-subtle px-1.5 py-0.5 rounded shrink-0">
        {episode.episode}
      </span>
    </div>
  );
}
