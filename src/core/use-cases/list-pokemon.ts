export type Pokemon = {
  image: string;
  name: string;
  types: string[];
  isFavorite: boolean;
}

export interface ListPokemonUseCase {
  list: () => Promise<Pokemon[]>;
}