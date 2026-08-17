export type CharacterStatus = "Alive" | "Dead" | "unknown";
export type CharacterGender = "Female" | "Male" | "Genderless" | "unknown";

export interface CharacterLocationRef {
  id?: string;
  name: string;
}

export interface Character {
  id: string;
  name: string;
  status: CharacterStatus;
  species: string;
  image: string;
}

export interface CharacterFilters {
  name?: string;
  status?: CharacterStatus | "";
  page?: number;
}
