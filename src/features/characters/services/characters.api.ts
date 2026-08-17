import { graphqlClient } from "@/shared/lib/graphql-client";
import { GET_CHARACTERS_QUERY, GET_CHARACTER_BY_ID_QUERY } from "./characters.queries";
import { Character, CharacterFilters } from "../types/character.types";
import { ApiResponse } from "@/shared/types/api.types";

export const fetchCharacters = async (filters?: CharacterFilters): Promise<ApiResponse<Character>> => {
  const { page = 1, name, status } = filters || {};

  const filterObj: Record<string, string> = {};
  if (name?.trim()) filterObj.name = name.trim();
  if (status) filterObj.status = status;

  try {
    const data = await graphqlClient.request<{ characters?: ApiResponse<Character> }>(
      GET_CHARACTERS_QUERY,
      {
        page: Math.max(1, page),
        filter: Object.keys(filterObj).length > 0 ? filterObj : undefined,
      }
    );

    if (!data?.characters || !data.characters.info) {
      return { info: { count: 0, pages: 0, next: null, prev: null }, results: [] };
    }

    return {
      info: {
        count: data.characters.info.count ?? 0,
        pages: data.characters.info.pages ?? 0,
        next: data.characters.info.next ?? null,
        prev: data.characters.info.prev ?? null,
      },
      results: data.characters.results ?? [],
    };
  } catch {
    return { info: { count: 0, pages: 0, next: null, prev: null }, results: [] };
  }
};

export const fetchCharacterById = async (id: string): Promise<Character | null> => {
  if (!id) return null;

  try {
    const data = await graphqlClient.request<{ character?: Character }>(
      GET_CHARACTER_BY_ID_QUERY,
      { id }
    );
    return data?.character ?? null;
  } catch {
    return null;
  }
};
