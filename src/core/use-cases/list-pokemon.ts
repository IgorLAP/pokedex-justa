export type PokemonTypeNameI =
  | "grass"
  | "fire"
  | "ground"
  | "poison"
  | "electric"
  | "water"
  | "fairy"
  | "rock"
  | "normal"
  | "ice"
  | "psychic"
  | "dark"
  | "dragon"
  | "fighting"
  | "steel"
  | "bug"
  | "flying"
  | "ghost";

export type Pokemon = {
  id: number;
  image: string;
  name: string;
  types: PokemonTypeNameI[];
  isFavorite: boolean;
}

export interface ListPokemonUseCase {
  list: () => Promise<Pokemon[]>;
}