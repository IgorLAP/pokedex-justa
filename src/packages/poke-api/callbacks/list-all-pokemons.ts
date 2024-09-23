import axios from "axios";

import { left, right, UnexpectedError } from "~/core/errors";
import { Pokemon } from "~/core/use-cases";
import { HttpResponse } from "~/interface-adapters/http";
import { ListAllPokemonsAdapter } from "../interface-adapters";

export class listAllPokemons implements ListAllPokemonsAdapter {
  async listAll(response: any): Promise<HttpResponse<Pokemon[]>> {
    const endpoints: string[] = [];
  
    response.data.results.forEach((pokemon: any) => endpoints.push(pokemon.url));
    const responseList = await axios.all(
      endpoints.map((endpoint) => axios.get(endpoint))
    );

    const isSuccess = responseList.every(response => response.status === 200)

    if (!isSuccess) {
      return left(new UnexpectedError())
    }

    const data: Pokemon[] = responseList.map((response) => {
      return {
        id: response.data.id,
        image: response.data.sprites.versions["generation-v"]["black-white"]?.animated
        .front_default || response.data.sprites.front_default || response.data.sprites.front_shiny,
        isFavorite: false,
        name: response.data.name,
        types: response.data.types.map((type: any) => type.type.name),
      }
    });

    return right({
      data,
      limit: response.data.next ? Number(response.data.next.split('limit=')[1]) : null,
      statusCode: isSuccess ? 200 : 500,
    });
  }
} 