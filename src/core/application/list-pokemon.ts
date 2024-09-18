import { ListPokemonUseCase, Pokemon } from "../use-cases";
import { HttpGetClient, HttpResponse } from "~/interface-adapters/http";
import { right } from "../errors";

export class ListPokemonAppl implements ListPokemonUseCase {  
  constructor(
    private readonly url: string,
    private readonly HttpGetClient: HttpGetClient<Pokemon[]>
  ) {}

  async list(params?: any): Promise<HttpResponse<Pokemon[]>> {
    const httpResponse = await this.HttpGetClient.get({ url: this.url, requestParams: params });

    
    if (httpResponse.isLeft()) {
      return httpResponse;
    }

    return right({
      data: httpResponse.value.data,
      statusCode: httpResponse.value.statusCode,
      limit: httpResponse.value.limit,
    });
  }
}