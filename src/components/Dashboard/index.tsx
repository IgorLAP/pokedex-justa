import { useContext, useEffect, useState } from "react";

import axios from "axios";

import { PokeCard } from "~/components/PokeCard";
import { SearchContext } from "~/contexts/SearchContext";
import { useToast } from "~/hooks/useToast";
import { PokemonI } from "~/interfaces/PokemonI";
import { getPokemons } from "~/lib/getPokemons";

import styles from "./dashboard.module.scss";

export function Dashboard() {
  const {
    search,
    resultList,
    loading: searchLoading,
  } = useContext(SearchContext);

  const [list, setList] = useState<PokemonI[]>([]);
  const [nextPage, setNextPage] = useState<string | null>("");
  const [previousPage, setPreviousPage] = useState<string | null>("");
  const [loading, setLoading] = useState(false);

  const toast = useToast();

  useEffect(() => {
    getList();
  }, []);

  useEffect(() => {
    if (search) setLoading(true);
    if (!search) setLoading(false);
  }, [search]);

  useEffect(() => {
    if (resultList.length === 0) setLoading(false);
  }, [resultList]);

  function handlePagination(direction: "previousPage" | "nextPage") {
    setLoading(true);
    if (nextPage && direction === "nextPage") {
      const query = nextPage.split("offset")[1].split("&")[0];
      const offset = query.substring(1, query?.length);
      getList(Number(offset));
      return;
    }

    if (previousPage && direction === "previousPage") {
      const query = previousPage.split("offset")[1].split("&")[0];
      const offset = query.substring(1, query?.length);
      getList(Number(offset));
    }
  }

  function getList(offset?: number) {
    getPokemons(offset)
      .then(async (response) => {
        setNextPage(response.next);
        setPreviousPage(response.previous);
        const endpoints: string[] = [];
        response.results.forEach((pokemon) => endpoints.push(pokemon.url));
        const responseList = await axios.all(
          endpoints.map((endpoint) => axios.get<PokemonI>(endpoint))
        );
        const pokemonList = responseList.map((i) => i.data);
        setList(pokemonList);
        setLoading(false);
      })
      .catch(() => toast("error", "Something went wrong"));
  }

  return (
    <div className={styles.container}>
      {list.length > 0 && resultList.length === 0 && (
        <>
          <div className={styles.pagination}>
            <button
              disabled={!previousPage}
              type="button"
              onClick={() => handlePagination("previousPage")}
            >
              Voltar
            </button>
            <button
              disabled={!nextPage}
              type="button"
              onClick={() => handlePagination("nextPage")}
            >
              Avançar
            </button>
          </div>
          <div className={styles.gridArea}>
            {list.map((pokemon) => (
              <PokeCard
                key={pokemon.id}
                loading={loading || searchLoading}
                pokemon={pokemon}
              />
            ))}
          </div>
        </>
      )}
      {resultList && resultList.length > 0 && (
        <div className={styles.gridArea}>
          {resultList.map((pokemon) => (
            <PokeCard
              key={pokemon.id}
              loading={searchLoading}
              pokemon={pokemon}
            />
          ))}
        </div>
      )}
      {list.length <= 0 && <p>Carregando...</p>}
    </div>
  );
}
