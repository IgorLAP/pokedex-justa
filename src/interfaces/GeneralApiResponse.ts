export interface NameAndUrlI {
  name: string;
  url: string;
}

export interface GeneralApiResponseI {
  count: number;
  next: string | null;
  previous: string | null;
  results: NameAndUrlI[];
}
