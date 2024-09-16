import axios from "axios";

import { Pokemon } from "~/core/use-cases";

import { HttpGetClient, HttpParams, HttpResponse } from "~/interface-adapters/http";


export class AxiosHttpClient implements HttpGetClient<Pokemon[]> {
  API_URL = import.meta.env.VITE_API_URL;
  
  async get(params: HttpParams): Promise<HttpResponse<Pokemon[]>> {
    const response = await axios.get(
      `${this.API_URL}/${params.url}`, 
      { params: params.requestParams }
    );
     
    const endpoints: string[] = [];
    response.data.results.forEach((pokemon: any) => endpoints.push(pokemon.url));
    const responseList = await axios.all(
      endpoints.map((endpoint) => axios.get(endpoint))
    );

    const data: Pokemon[] = responseList.map((response) => {
      return {
        id: response.data.id,
        image: response.data.sprites.versions["generation-v"]["black-white"].animated
        .front_default || response.data.pokemon.sprites.front_default,
        isFavorite: false,
        name: response.data.name,
        types: response.data.types.map((type: any) => type.type.name),
      }
    });

    return {
      statusCode: response.status,
      data,
    }
  }
}