import { useEffect, useState } from "react";

import axios from "axios";

import { PokeCard } from "~/components/PokeCard";
import { PokemonI } from "~/interfaces/PokemonI";
import { getPokemons } from "~/lib/getPokemons";

import styles from "./dashboard.module.scss";

export function Dashboard() {
  const [list, setList] = useState<PokemonI[]>([]);
  const [nextPage, setNextPage] = useState<string | null>("");
  const [previousPage, setPreviousPage] = useState<string | null>("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getList();
  }, []);

  function getList(offset?: number) {
    getPokemons(offset).then(async (response) => {
      setLoading(true);
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
    });
  }

  function handlePagination(direction: "previousPage" | "nextPage") {
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

  return (
    <div className={styles.container}>
      {list.length > 0 && (
        <>
          <div className={styles.gridArea}>
            {list.map((pokemon) => (
              <PokeCard key={pokemon.id} loading={loading} pokemon={pokemon} />
            ))}
          </div>
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
        </>
      )}
      {list.length <= 0 && <p>Carregando...</p>}
    </div>
  );
}
