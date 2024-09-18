import axios from "axios";

import { left, right, ServiceUnavailableError, UnexpectedError } from "~/core/errors";
import { Pokemon } from "~/core/use-cases";
import { HttpGetClient, HttpParams, HttpResponse, HttpStatusCode } from "~/interface-adapters/http";

export class AxiosHttpClient implements HttpGetClient<Pokemon[]> {
  API_URL = import.meta.env.VITE_API_URL;
  
  async get(params: HttpParams): Promise<HttpResponse<Pokemon[]>> {
    const response = await axios.get(
      `${this.API_URL}/${params.url}`, 
      { params: params.requestParams }
    );

    if (!response.data.results) {
      return left(
        response.status === HttpStatusCode.internalServerError ? 
          new ServiceUnavailableError : 
          new UnexpectedError()
        );
    }
      
    const endpoints: string[] = [];
    response.data.results.forEach((pokemon: any) => endpoints.push(pokemon.url));
    const responseList = await axios.all(
      endpoints.map((endpoint) => axios.get(endpoint))
    );

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
      statusCode: response.status,
      data,
      limit: response.data.next ? Number(response.data.next.split('limit=')[1]) : null,
    })
  }
}