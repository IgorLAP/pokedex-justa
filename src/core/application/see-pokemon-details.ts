import { HttpGetClient, HttpResponse } from "~/interface-adapters/http";
import { PokemonDetails, SeePokemonDetailsUseCase } from "../use-cases/see-details";
import { right } from "../errors";

export class SeePokemonDetailsAppl implements SeePokemonDetailsUseCase {
  
  constructor(
    private readonly url: string,
    private readonly httpGetClient: HttpGetClient<PokemonDetails>,
  ) {}

  async seeDetails (pokemonId: number): Promise<HttpResponse<PokemonDetails>> {
    const httpResponse = await this.httpGetClient.get({ url: this.url, requestParams: pokemonId });

    if (httpResponse.isLeft()) {
      return httpResponse;
    }

    return right({
      statusCode: httpResponse.value.statusCode,
      limit: httpResponse.value.limit,
      data: httpResponse.value.data,
    })
  }
}