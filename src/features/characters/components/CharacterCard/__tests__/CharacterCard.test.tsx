import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { CharacterCard } from "../CharacterCard";
import { CharacterEpisodeRef } from "@/features/characters/types/character.types";

const mockCharacter = {
  id: "1",
  name: "Rick Sanchez",
  status: "Alive" as const,
  species: "Human",
  image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
  location: { name: "Citadel of Ricks" },
  gender: "Male" as const,
  origin: { name: "Earth (C-137)" },
  episode: [
    {
      id: "1",
      name: "Pilot",
      episode: "S01E01",
      air_date: "2021-01-01",
    } as CharacterEpisodeRef,
  ],
};

describe("CharacterCard", () => {
  it("renders character name, species, and location", () => {
    render(<CharacterCard character={mockCharacter} />);
    expect(screen.getByText("Rick Sanchez")).toBeInTheDocument();
    expect(screen.getByText("Human")).toBeInTheDocument();
    expect(screen.getByText("Citadel of Ricks")).toBeInTheDocument();
  });

  it("links to /character/1", () => {
    render(<CharacterCard character={mockCharacter} />);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/character/1");
  });
});
