import { ListPokemonParams, ListPokemonUseCase, Pokemon } from "../use-cases";
import { HttpGetClient, HttpResponse } from "~/interface-adapters/http";
import { right } from "../errors";

export class ListPokemonAppl implements ListPokemonUseCase {  
  constructor(
    private readonly url: string,
    private readonly HttpGetClient: HttpGetClient<Pokemon[]>
  ) {}

  async list(params: ListPokemonParams): Promise<HttpResponse<Pokemon[]>> {
    const httpResponse = await this.HttpGetClient.get({ url: this.url, requestParams: params?.request });

    
    if (httpResponse.isLeft()) {
      return httpResponse;
    }

    if (params?.callback) {
      const callbackResponse = await params.callback(httpResponse.value);

      if (callbackResponse.isLeft()) {
        return callbackResponse;
      }

      return right({
        data: callbackResponse.value.data,
        statusCode: callbackResponse.value.statusCode,
        limit: callbackResponse.value.limit,
      });
    }

    return right({
      data: httpResponse.value.data,
      statusCode: httpResponse.value.statusCode,
      limit: httpResponse.value.limit,
    });
  }
}