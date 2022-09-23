import React, { createContext, useEffect, useState } from "react";

import axios from "axios";

import { useToast } from "~/hooks/useToast";
import { NameAndUrlI } from "~/interfaces/GeneralApiResponse";
import { PokemonI } from "~/interfaces/Pokemon";
import { typesList } from "~/lib/helpers";
import { searchPokemon } from "~/lib/searchPokemon";

interface SearchInitialValue {
  search: string;
  loading: boolean;
  isTypeSearch: boolean;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  resultList: PokemonI[] | [];
}

const initialValue = {} as SearchInitialValue;

export const SearchContext = createContext<SearchInitialValue>(initialValue);

type NameAndUrlIOrPokemonI = NameAndUrlI[] | PokemonI[];

export function SearchProvider({ children }: { children: React.ReactNode }) {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [isTypeSearch, setIsTypeSearch] = useState(false);
  const [resultList, setResultList] = useState<PokemonI[] | []>([]);

  const toast = useToast();

  useEffect(() => {
    const timerId = setTimeout(() => {
      if (search) handleSearch();
      if (!search) setResultList([]);
      if (!search && resultList.length === 0) setLoading(false);
      if (isType(search)) setIsTypeSearch(true);
    }, 500);

    return () => clearTimeout(timerId);
  }, [search]);

  useEffect(() => {
    if (isTypeSearch && !loading) setIsTypeSearch(false);
  }, [loading]);

  async function handleSearch() {
    setLoading(true);
    try {
      const result: NameAndUrlIOrPokemonI = await searchPokemon(
        search.trim(),
        isType(search) ? "type" : "name"
      );
      if (result.length === 0) {
        toast("error", "Pokemon or type not found");
        finishSearch([]);
        return;
      }
      if (result.length > 0) {
        if (isPokemon(result)) {
          finishSearch(result);
          return;
        }
        const endpoints: string[] = [];
        result.forEach((pokemon) => endpoints.push(pokemon.url));
        const responseList = await axios.all(
          endpoints.map((endpoint) => axios.get<PokemonI>(endpoint))
        );
        const pokemonList = responseList.map((i) => i.data);
        finishSearch(pokemonList);
      }
    } catch (err) {
      finishSearch([]);
      toast("error", "Error in your search");
    }
  }

  function finishSearch(newList: PokemonI[] | []) {
    setResultList(newList);
    setLoading(false);
  }

  function isPokemon(result: NameAndUrlIOrPokemonI): result is PokemonI[] {
    if ((result as PokemonI[])[0]?.id) {
      return true;
    }
    return false;
  }

  function isType(query: string) {
    for (const i of typesList) {
      if (query.trim().toLowerCase() === i) return true;
    }
    return false;
  }

  return (
    <SearchContext.Provider
      value={{ search, loading, isTypeSearch, resultList, setSearch }}
    >
      {children}
    </SearchContext.Provider>
  );
}
