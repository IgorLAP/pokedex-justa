import { useContext, useEffect, useState } from "react";

import { Loading } from "~/presentation/components/Loading";
import { PokeCard } from "~/presentation/components/PokeCard";
import { SearchContext } from "~/presentation/contexts/SearchContext";

import { AxiosHttpClient } from "~/infra/http";
import { ReactToastifyAdapter } from "~/infra/notify";
import { ListPokemonAppl } from "~/core/application";

import styles from "./dashboard.module.scss";
import { Pokemon } from "~/core/use-cases";

const LIMIT = 100;
const API_URL = import.meta.env.VITE_API_URL;

export function Dashboard() {
  // Hooks
  const {
    search,
    resultList,
    loading: searchLoading,
  } = useContext(SearchContext);

  // States
  const [list, setList] = useState<Pokemon[]>([]);
  const [nextPage, setNextPage] = useState<string | null>("");
  const [previousPage, setPreviousPage] = useState<string | null>("");
  const [isLoading, setIsLoading] = useState(false);
  const [offset, setOffset] = useState(0);

  // Instâncias
  const { notify } = new ReactToastifyAdapter();
  const httpRequest = new AxiosHttpClient();
  const request = new ListPokemonAppl('pokemon', httpRequest);

  // Effects
  useEffect(() => {
    getList();
  }, [offset]);

  useEffect(() => {
    if (search) setIsLoading(true);
    if (!search) setIsLoading(false);
  }, [search]);

  useEffect(() => {
    if (!resultList.length) setIsLoading(false);
  }, [resultList]);

  // Functions
  function handlePagination(apiLimit: number | null) {
    const prev = `${API_URL}pokemon?offset=${offset - LIMIT}&limit=${apiLimit}`;
    const next = `${API_URL}pokemon?offset=${offset + LIMIT}&limit=${apiLimit}`;
    setPreviousPage(offset ? prev : null);
    setNextPage(apiLimit ? next : null);
  }

  async function getList() {
    setIsLoading(true);
    const list = await request.list({ limit: LIMIT, offset });
    
    if (list.isLeft()) {
      setIsLoading(false);
      notify({
        message: list.value.message,
        messageStatus: 'error',
      });
    }

    if (list.isRight()) {
      setList(list.value.data);
      setIsLoading(false);
      handlePagination(list.value.limit);
    }
  }

  return (
    <div className={styles.container}>
      {list.length > 0 && resultList.length === 0 && (
        <>
          <div className={styles.pagination}>
            <button
              disabled={!previousPage || isLoading}
              type="button"
              onClick={() => setOffset(prev => prev -= LIMIT)}
            >
              Previous
            </button>
            <button
              disabled={!nextPage || isLoading}
              type="button"
              onClick={() => setOffset(prev => prev += LIMIT)}
            >
              Next
            </button>
          </div>
          <div className={styles.gridArea}>
            {list.map((pokemon) => (
              <PokeCard
                key={pokemon.id}
                loading={isLoading || searchLoading}
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
