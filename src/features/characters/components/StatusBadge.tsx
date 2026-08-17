import React from "react";
import classNames from "classnames";
import { CharacterStatus } from "../types/character.types";

export const StatusBadge = ({ status }: { status: CharacterStatus }) => (
  <span className={classNames("px-2 py-0.5 text-xs rounded-full border", {
    "bg-emerald-500/10 text-emerald-400 border-emerald-500/30": status === "Alive",
    "bg-rose-500/10 text-rose-400 border-rose-500/30": status === "Dead",
    "bg-zinc-800 text-zinc-400 border-zinc-700": status === "unknown",
  })}>
    {status}
  </span>
);
