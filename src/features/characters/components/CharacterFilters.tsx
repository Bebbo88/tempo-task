import React from "react";
import { CharacterStatus } from "../types/character.types";

export interface CharacterFiltersProps {
  name: string;
  status: CharacterStatus | "";
  onNameChange: (value: string) => void;
  onStatusChange: (value: CharacterStatus | "") => void;
  className?: string;
}

export function CharacterFilters({
  name,
  status,
  onNameChange,
  onStatusChange,
  className,
}: CharacterFiltersProps) {
  return (
    <div className={`flex flex-col sm:flex-row gap-3 items-stretch sm:items-center ${className || ""}`}>
      <div className="flex-1">
        <input
          type="text"
          value={name}
          onChange={(e) => onNameChange(e.target.value)}
          placeholder="Filter by character name..."
          aria-label="Filter by character name"
          className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-zinc-200 placeholder:text-zinc-500 focus:border-zinc-600 focus:outline-none transition-colors"
        />
      </div>

      <div className="w-full sm:w-48">
        <select
          value={status}
          onChange={(e) => onStatusChange(e.target.value as CharacterStatus | "")}
          aria-label="Filter by character status"
          className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-zinc-200 focus:border-zinc-600 focus:outline-none transition-colors cursor-pointer"
        >
          <option value="">All Statuses</option>
          <option value="Alive">Alive</option>
          <option value="Dead">Dead</option>
          <option value="unknown">Unknown</option>
        </select>
      </div>
    </div>
  );
}
