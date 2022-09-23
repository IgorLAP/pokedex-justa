import { api } from "~/services/api";

import { PokemonDetailsI } from "../interfaces/Pokemon";

export async function getPokemonDetails(pokeId: number) {
  const { data } = await api.get<PokemonDetailsI>(`/pokemon/${pokeId}`);
  return data;
}
