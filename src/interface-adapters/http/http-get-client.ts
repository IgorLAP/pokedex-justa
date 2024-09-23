import { HttpResponse } from "./http-response"

export type HttpParams = {
  url: string;
  requestParams?: any;
}

export interface HttpGetClient<R> {
  get: (params: HttpParams) => Promise<HttpResponse<R>>,
}