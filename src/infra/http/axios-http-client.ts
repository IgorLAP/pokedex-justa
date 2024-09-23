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

    const limit = response.data.next ? Number(response.data.next.split('limit=')[1]) : null;
    const statusCode = response.status;

    return right({
      data: response.data,
      statusCode,
      limit,
    });
  }
}