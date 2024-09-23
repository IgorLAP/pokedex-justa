import { HttpGetClient, HttpResponse } from "~/interface-adapters/http";
import { Pokemon, SearchPokemon } from "../use-cases";
import { right } from "../errors";

export class SearchPokemonAppl implements SearchPokemon {
  constructor(
    private readonly url: string,
    private readonly httpGetClient: HttpGetClient<Pokemon[]>,
  ) {}

  async search(query: string): Promise<HttpResponse<Pokemon[]>> {
    const httpResponse = await this.httpGetClient.get({ url: this.url, requestParams: query.toLowerCase() });

    if (httpResponse.isLeft()) {
      return httpResponse;
    }

    return right({
      data: httpResponse.value.data,
      limit: httpResponse.value.limit,
      statusCode: httpResponse.value.statusCode,
    })
  }
}