import axios from "axios";

import { HttpGetClient, HttpParams, HttpResponse } from "~/interface-adapters/http";

export class AxiosHttpClient implements HttpGetClient<any> {
  async get (params: HttpParams): Promise<HttpResponse<any>> {
    const response = await axios.get(params.url, { params: params.requestParams })
    return {
      statusCode: response.status,
      data: response.data,
    }
  }
}