import { useContext, useEffect, useState } from "react";

import axios from "axios";

import { Loading } from "~/components/Loading";
import { PokeCard } from "~/components/PokeCard";
import { SearchContext } from "~/contexts/SearchContext";
import { useToast } from "~/hooks/useToast";
import { PokemonI } from "~/interfaces/Pokemon";
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

  async function getList(offset?: number) {
    try {
      const { next, previous, results } = await getPokemons(offset);
      setNextPage(next);
      setPreviousPage(previous);
      const endpoints: string[] = [];
      results.forEach((pokemon) => endpoints.push(pokemon.url));
      const responseList = await axios.all(
        endpoints.map((endpoint) => axios.get<PokemonI>(endpoint))
      );
      const pokemonList = responseList.map((i) => i.data);
      setList(pokemonList);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      toast("error", "Something went wrong");
    }
  }

  return (
    <div className={styles.container}>
      {list.length > 0 && resultList.length === 0 && (
        <>
          <div className={styles.pagination}>
            <button
              disabled={!previousPage || loading}
              type="button"
              onClick={() => handlePagination("previousPage")}
            >
              Previous
            </button>
            <button
              disabled={!nextPage || loading}
              type="button"
              onClick={() => handlePagination("nextPage")}
            >
              Next
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
      {list.length === 0 && resultList.length === 0 && <Loading />}
    </div>
  );
}
