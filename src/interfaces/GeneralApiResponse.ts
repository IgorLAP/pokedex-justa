export interface Results {
  name: string;
  url: string;
}

export interface GeneralApiResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Results[];
}
