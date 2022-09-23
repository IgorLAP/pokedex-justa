export type PokemonTypeNameI =
  | "grass"
  | "fire"
  | "ground"
  | "poison"
  | "electric"
  | "water"
  | "fairy"
  | "rock"
  | "normal"
  | "ice"
  | "psychic"
  | "dark"
  | "dragon"
  | "fighting"
  | "steel"
  | "bug"
  | "flying"
  | "ghost";

interface PokemonTypeI {
  type: {
    name: PokemonTypeNameI;
    url: string;
  };
}

export interface PokemonI {
  id: number;
  name: string;
  sprites: {
    front_default: string | null;
    versions: {
      "generation-v": {
        "black-white": {
          animated: {
            front_default: string | null;
          };
        };
      };
    };
  };
  types: PokemonTypeI[];
}

type StatNameI =
  | "hp"
  | "attack"
  | "defense"
  | "special-attack"
  | "special-defense"
  | "speed";

export interface PokemonDetailsI extends Omit<PokemonI, "sprites"> {
  sprites: {
    other: {
      "official-artwork": {
        front_default: string;
      };
    };
  };
  stats: {
    base_stat: number;
    effort: 0 | 1;
    stat: {
      name: StatNameI;
    };
  }[];
}
