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

interface PokemonType {
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
  types: PokemonType[];
}
