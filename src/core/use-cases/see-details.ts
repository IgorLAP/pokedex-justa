import { HttpResponse } from "~/interface-adapters/http";

export type PokemonDetails = {
  image: string;
  name: string;
  isFavorite: boolean;
  stats: {
    hp: number;
    attack: number;
    defense: number;
    specialAt: number;
    specialDe: number;
    speed: number;
  };
}

export interface SeePokemonDetailsUseCase {
  seeDetails: (pokemonId: number) => Promise<HttpResponse<PokemonDetails>>;
}