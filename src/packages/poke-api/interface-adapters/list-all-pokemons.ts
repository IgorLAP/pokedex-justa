import { Pokemon } from "~/core/use-cases";
import { HttpResponse } from "~/interface-adapters/http";

export interface ListAllPokemonsAdapter {
  listAll: (response: any) => Promise<HttpResponse<Pokemon[]>>;
}