import { HttpGetClient, HttpStatusCode } from "~/interface-adapters/http";
import { PokemonDetails, SeePokemonDetailsUseCase } from "../use-cases/see-details";
import { ServiceUnavailableError, UnexpectedError } from "../errors";

export class SeePokemonDetailsAppl implements SeePokemonDetailsUseCase {
  
  constructor(
    private readonly url: string,
    private readonly httpGetClient: HttpGetClient<PokemonDetails>,
  ) {}

  async seeDetails (pokemonId: number): Promise<PokemonDetails> {
    const httpResponse = await this.httpGetClient.get({ url: this.url, requestParams: pokemonId });

    switch(httpResponse.statusCode) {
      case HttpStatusCode.ok: return httpResponse.data
      case HttpStatusCode.internalServerError: throw new ServiceUnavailableError();
      default: throw new UnexpectedError();
    }
  }
}