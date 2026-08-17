import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { fetchCharacters } from "../services/characters.api";
import { CharacterFilters } from "../types/character.types";

export const getCharactersQueryKey = (filters?: CharacterFilters) => [
  "characters",
  {
    name: filters?.name || undefined,
    status: filters?.status || undefined,
    page: filters?.page || 1,
  },
] as const;

export const useCharacters = (filter?: CharacterFilters) =>
  useQuery({
    queryKey: getCharactersQueryKey(filter),
    queryFn: () => fetchCharacters(filter),
    placeholderData: keepPreviousData,
  });
