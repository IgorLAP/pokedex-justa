import { useContext, useEffect, useState } from "react";

import axios from "axios";

import { PokeCard } from "~/components/PokeCard";
import { FavoriteContext } from "~/contexts/FavoriteContext";
import { useToast } from "~/hooks/useToast";
import { PokemonI } from "~/interfaces/PokemonI";

import styles from "./favorites.module.scss";

export function Favorites() {
  const { favList } = useContext(FavoriteContext);
  const [favorites, setFavorites] = useState<PokemonI[]>([]);
  const [loading, setLoading] = useState(false);

  const toast = useToast();

  useEffect(() => {
    handle();
  }, []);

  useEffect(() => {
    const clone = [...favorites];
    for (const index in favorites) {
      if (favorites[index].id !== favList[index]) {
        clone.splice(Number(index), 1);
        break;
      }
    }
    setFavorites(clone);
  }, [favList]);

  async function handle() {
    if (favList.length === 0) return;
    setLoading(true);
    try {
      const responseList = await axios.all(
        favList.map((pokeId) =>
          axios.get<PokemonI>(`https://pokeapi.co/api/v2/pokemon/${pokeId}`)
        )
      );
      setFavorites(responseList.map((res) => res.data));
      setLoading(false);
    } catch (err) {
      setLoading(false);
      toast("error", "Error loading favorites");
    }
  }

  return (
    <>
      {favorites.length > 0 && (
        <div className={styles.container}>
          {favorites.map((pokemon) => (
            <PokeCard key={pokemon.id} pokemon={pokemon} loading={false} />
          ))}
        </div>
      )}
      {favList.length === 0 && !loading && (
        <h1 className={styles.emptyList}>Lista vazia</h1>
      )}
      {favorites.length === 0 && loading && (
        <div className={styles.loading}>
          <img alt="loading" src="/pikachu-gif.gif" />
        </div>
      )}
    </>
  );
}
