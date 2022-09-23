import {
  PokemonDetailsI,
  PokemonI,
  PokemonTypeNameI,
} from "~/interfaces/Pokemon";

export const pokemonSample: PokemonI = {
  id: 1,
  name: "fake-name",
  sprites: {
    front_default: "/pokeball.png",
    versions: {
      "generation-v": {
        "black-white": { animated: { front_default: "/pokeball.png" } },
      },
    },
  },
  types: [
    {
      type: { name: "bug", url: "/pokeball.png" },
    },
  ],
};

export const pokemonDetailSample: PokemonDetailsI = {
  id: 1,
  name: "fake-name",
  sprites: {
    other: {
      "official-artwork": {
        front_default: "fake-url",
      },
    },
  },
  stats: [
    {
      base_stat: 45,
      effort: 0,
      stat: {
        name: "hp",
      },
    },
  ],
  types: [
    {
      type: { name: "bug", url: "/pokeball.png" },
    },
  ],
};

export const typesColors: Record<PokemonTypeNameI, string> = {
  grass: "#77cc55",
  fire: "#fd4422",
  ground: "#ddbb55",
  poison: "#aa5599",
  electric: "#ffcc32",
  water: "#3399ff",
  fairy: "#ee99ee",
  rock: "#bbaa66",
  normal: "#aaaa99",
  ice: "#66ccff",
  psychic: "#fc549a",
  dark: "#775544",
  dragon: "#7766ee",
  fighting: "#bb5545",
  steel: "#aeaebe",
  bug: "#aabb22",
  flying: "#8899ff",
  ghost: "#6566bb",
};

export const typesList = Object.keys(typesColors);
