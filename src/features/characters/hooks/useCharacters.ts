import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { fetchCharacters } from "../services/characters.api";
import { CharacterFilters } from "../types/character.types";

export const useCharacters = (filter?: CharacterFilters) =>
  useQuery({
    queryKey: ["characters", filter],
    queryFn: () => fetchCharacters(filter),
    placeholderData: keepPreviousData,
  });
