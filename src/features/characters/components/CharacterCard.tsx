import React from "react";
import { Character } from "../types/character.types";

export const CharacterCard = ({ character }: { character: Character }) => (
  <div className="border rounded-xl p-4">{character.name}</div>
);
