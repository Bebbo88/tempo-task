import React from "react";
import { CharacterStatus } from "../../types/character.types";

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
          className="w-full h-10 text-sm bg-surface-primary border border-border-subtle hover:border-border-strong focus:border-border-focus focus:ring-1 focus:ring-border-focus/30 rounded-lg px-3.5 transition-all text-primary placeholder:text-muted outline-none"
        />
      </div>

      <div className="w-full sm:w-48">
        <select
          value={status}
          onChange={(e) => onStatusChange(e.target.value as CharacterStatus | "")}
          aria-label="Filter by character status"
          className="w-full h-10 text-sm bg-surface-primary border border-border-subtle hover:border-border-strong focus:border-border-focus focus:ring-1 focus:ring-border-focus/30 rounded-lg px-3.5 transition-all text-primary outline-none cursor-pointer appearance-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2371717a'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right 0.75rem center",
            backgroundSize: "1rem",
            paddingRight: "2.25rem",
          }}
        >
          <option value="" className="bg-surface-primary text-primary">All Statuses</option>
          <option value="Alive" className="bg-surface-primary text-primary">Alive</option>
          <option value="Dead" className="bg-surface-primary text-primary">Dead</option>
          <option value="unknown" className="bg-surface-primary text-primary">Unknown</option>
        </select>
      </div>
    </div>
  );
}
