import { ListPokemonUseCase, Pokemon } from "../use-cases";
import { HttpStatusCode, HttpGetClient } from "~/interface-adapters/http";
import { ServiceUnavailableError, UnexpectedError } from "../errors";

export class ListPokemonAppl implements ListPokemonUseCase {
  
  constructor(
    private readonly url: string,
    private readonly HttpGetClient: HttpGetClient<Pokemon[]>
  ) {}

  async list(): Promise<Pokemon[]> {
    const httpResponse = await this.HttpGetClient.get({ url: this.url });

    switch(httpResponse.statusCode) {
      case HttpStatusCode.ok: return httpResponse.data
      case HttpStatusCode.internalServerError: throw new ServiceUnavailableError()
      default: throw new UnexpectedError()
    }
  }
}