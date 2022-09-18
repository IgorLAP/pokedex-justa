import axios from "axios";

import { GeneralApiResponse } from "~/interfaces/GeneralApiResponse";
import { PokemonI } from "~/interfaces/PokemonI";
import { api } from "~/services/api";

export async function searchPokemon(query: string, filterBy: "name" | "type") {
  const { data } = await api.get<GeneralApiResponse>("/pokemon", {
    params: { limit: 1 },
  });
  const { data: allData } = await api.get<GeneralApiResponse>("/pokemon", {
    params: { limit: data.count },
  });
  if (filterBy === "name") {
    return allData.results.filter((result) =>
      result.name.toLowerCase().includes(query.toLowerCase())
    );
  }
  const endpoints: string[] = [];
  allData.results.forEach((pokemon) => endpoints.push(pokemon.url));
  const responseList = await axios.all(
    endpoints.map((endpoint) => axios.get<PokemonI>(endpoint))
  );
  const pokemonList = responseList.map((i) => i.data);
  return pokemonList.filter((pokemon) =>
    query.toLowerCase().includes(pokemon.types[0].type.name.toLowerCase())
  );
}
