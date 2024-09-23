import { HttpResponse } from "~/interface-adapters/http";
import { Pokemon } from "./list-pokemon";

export interface SearchPokemon {
  search: (query: string) => Promise<HttpResponse<Pokemon[]>>;
}