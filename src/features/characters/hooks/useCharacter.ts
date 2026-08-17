import { useQuery } from "@tanstack/react-query";
import { fetchCharacterById } from "../services/characters.api";

export const useCharacter = (id: string) =>
  useQuery({
    queryKey: ["character", id],
    queryFn: () => fetchCharacterById(id),
    enabled: Boolean(id),
  });
