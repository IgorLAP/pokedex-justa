import { Either } from "~/core/errors";

export enum HttpStatusCode {
  ok = 200,
  noContent = 204,
  unauthorized = 401,
  badRequest = 400,
  notFound = 404,
  internalServerError = 500,
}

export type SuccessHttpResponse<T> = {
  statusCode: HttpStatusCode,
  data: T,
  limit: number | null;
}

export type HttpResponse<R> = Either<Error, SuccessHttpResponse<R>>;
