export type CharacterStatus = "Alive" | "Dead" | "unknown";
export type CharacterGender = "Female" | "Male" | "Genderless" | "unknown";

export interface CharacterLocationRef {
  id?: string;
  name: string;
}

export interface CharacterEpisodeRef {
  id: string;
  name: string;
  episode: string;
  air_date: string;
}

export interface Character {
  id: string;
  name: string;
  status: CharacterStatus;
  species: string;
  gender?: CharacterGender;
  image: string;
  origin?: CharacterLocationRef;
  location?: CharacterLocationRef;
  episode?: CharacterEpisodeRef[];
}

export interface CharacterFilters {
  name?: string;
  status?: CharacterStatus | "";
  page?: number;
}