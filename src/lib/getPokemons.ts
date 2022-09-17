import { api } from "~/services/api";

interface PokemonResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: {
    name: string;
    url: string;
  }[];
}

export async function getPokemons(offset?: number) {
  const { data } = await api.get<PokemonResponse>("/pokemon", {
    params: {
      limit: 100,
      offset,
    },
  });
  return data;
}
