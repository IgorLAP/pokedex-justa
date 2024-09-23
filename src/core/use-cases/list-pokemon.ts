import { HttpResponse } from "~/interface-adapters/http";

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

export type ListPokemonParams = {
  request?: any,
  callback?: (response: any) => Promise<HttpResponse<any>>;
}

export interface ListPokemonUseCase {
  list: (params: ListPokemonParams) => Promise<HttpResponse<Pokemon[]>>;
}