import { useContext, useEffect, useState } from "react";

import { Loading } from "~/presentation/components/Loading";
import { PokeCard } from "~/presentation/components/PokeCard";
import { SearchContext } from "~/presentation/contexts/SearchContext";

import { AxiosHttpClient } from "~/infra/http";
import { ReactToastifyAdapter } from "~/infra/notify";
import { ListPokemonAppl } from "~/core/application";

import styles from "./dashboard.module.scss";
import { Pokemon } from "~/core/use-cases";

export function Dashboard() {
  const {
    search,
    resultList,
    loading: searchLoading,
  } = useContext(SearchContext);

  const [list, setList] = useState<Pokemon[]>([]);
  const [nextPage, setNextPage] = useState<string | null>("");
  const [previousPage, setPreviousPage] = useState<string | null>("");
  const [loading, setLoading] = useState(false);

  const { notify } = new ReactToastifyAdapter();
  const httpRequest = new AxiosHttpClient();
  const request = new ListPokemonAppl('pokemon', httpRequest);

  useEffect(() => {
    getList();
  }, []);

  useEffect(() => {
    if (search) setLoading(true);
    if (!search) setLoading(false);
  }, [search]);

  useEffect(() => {
    if (!resultList.length) setLoading(false);
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
      const data = await request.list({ limit: 100 })
      setList(data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      notify({ 
        message: 'Alguma coisa de errado aconteceu', 
        messageStatus: 'error' 
      })
    }


    // try {
    //   const { next, previous, results } = await getPokemons(offset);
    //   setNextPage(next);
    //   setPreviousPage(previous);
    //   const endpoints: string[] = [];
    //   results.forEach((pokemon) => endpoints.push(pokemon.url));
    //   const responseList = await axios.all(
    //     endpoints.map((endpoint) => axios.get<PokemonI>(endpoint))
    //   );
    //   const pokemonList = responseList.map((i) => i.data);
    //   setList(pokemonList);
    //   setLoading(false);
    // } catch (err) {
    //   setLoading(false);
    //   toast("error", "Something went wrong");
    // }
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
