import { graphqlClient } from "@/shared/lib/graphql-client";
import { GET_CHARACTERS_QUERY, GET_CHARACTER_BY_ID_QUERY } from "./characters.queries";
import { Character, CharacterFilters } from "../types/character.types";
import { ApiResponse } from "@/shared/types/api.types";

export const fetchCharacters = async (filter?: CharacterFilters): Promise<ApiResponse<Character>> => {
  try {
    const data = await graphqlClient.request<{ characters: ApiResponse<Character> }>(GET_CHARACTERS_QUERY, { filter });
    return data.characters;
  } catch {
    return { info: { count: 0, pages: 0, next: null, prev: null }, results: [] };
  }
};

export const fetchCharacterById = async (id: string): Promise<Character | null> => {
  const data = await graphqlClient.request<{ character: Character }>(GET_CHARACTER_BY_ID_QUERY, { id });
  return data.character ?? null;
};
