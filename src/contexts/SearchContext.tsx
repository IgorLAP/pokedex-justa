import React, { createContext, useEffect, useState } from "react";

import axios from "axios";

import { useToast } from "~/hooks/useToast";
import { Results } from "~/interfaces/GeneralApiResponse";
import { PokemonI, PokemonTypeName } from "~/interfaces/PokemonI";
import { searchPokemon } from "~/lib/searchPokemon";

interface SearchInitialValue {
  search: string;
  loading: boolean;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  resultList: PokemonI[] | [];
}

const initialValue = {} as SearchInitialValue;

export const SearchContext = createContext<SearchInitialValue>(initialValue);

type ResultsOrPokemon = Results[] | PokemonI[];

const types: Record<PokemonTypeName, string> = {
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

const typeList = Object.keys(types);

export function SearchProvider({ children }: { children: React.ReactNode }) {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [resultList, setResultList] = useState<PokemonI[] | []>([]);

  const toast = useToast();

  useEffect(() => {
    const timerId = setTimeout(() => {
      if (search) handleSearch();
      if (!search) setResultList([]);
      if (!search && resultList.length === 0) setLoading(false);
    }, 500);

    async function handleSearch() {
      setLoading(true);
      try {
        const result: ResultsOrPokemon = await searchPokemon(
          search,
          isType(search) ? "type" : "name"
        );
        if (result.length === 0) {
          toast("error", "Pokemon or type not found");
          setResultList([]);
        }
        if (!isPokemon(result)) {
          const endpoints: string[] = [];
          result.forEach((pokemon) => endpoints.push(pokemon.url));
          const responseList = await axios.all(
            endpoints.map((endpoint) => axios.get<PokemonI>(endpoint))
          );
          const pokemonList = responseList.map((i) => i.data);
          setResultList(pokemonList);
        }
        if (isPokemon(result)) {
          setResultList(result);
        }
      } catch (err) {
        setResultList([]);
        toast("error", "Something went wrong");
      }
      setLoading(false);
    }

    return () => clearTimeout(timerId);
  }, [search]);

  function isPokemon(result: ResultsOrPokemon): result is PokemonI[] {
    if ((result as PokemonI[])[0]?.id) {
      return true;
    }
    return false;
  }

  function isType(query: string) {
    for (const i of typeList) {
      if (query === i) return true;
    }
    return false;
  }

  return (
    <SearchContext.Provider value={{ search, loading, resultList, setSearch }}>
      {children}
    </SearchContext.Provider>
  );
}
