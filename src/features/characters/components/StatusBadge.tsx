import React from "react";
import classNames from "classnames";
import { CharacterStatus } from "../types/character.types";

export interface StatusBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  status: CharacterStatus;
}

export function StatusBadge({ status, className, ...props }: StatusBadgeProps) {
  const dotClasses = classNames("w-2 h-2 rounded-full shrink-0", {
    "bg-emerald-500": status === "Alive",
    "bg-rose-500": status === "Dead",
    "bg-zinc-500": status === "unknown",
  });

  return (
    <span
      role="status"
      aria-label={`Status: ${status}`}
      className={classNames(
        "inline-flex items-center gap-1.5 bg-zinc-800/80 border border-zinc-700/60 px-2.5 py-0.5 rounded-full text-xs font-medium text-zinc-300",
        className
      )}
      {...props}
    >
      <span className={dotClasses} aria-hidden="true" />
      <span>{status}</span>
    </span>
  );
}
