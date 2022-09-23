import { useContext, useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import { Loading } from "~/components/Loading";
import { FavoriteContext } from "~/contexts/FavoriteContext";
import { useToast } from "~/hooks/useToast";
import { PokemonDetailsI } from "~/interfaces/Pokemon";
import { getPokemonDetails } from "~/lib/getPokemonDetails";
import { typesColors } from "~/lib/helpers";

import styles from "./pokedetails.module.scss";

export function PokeDetails() {
  const { checkFavorite, handleFavorite } = useContext(FavoriteContext);

  const [pokemon, setPokemon] = useState<PokemonDetailsI>();

  const params = useParams();
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    const { id } = params;
    if (!id || !isNumber(id)) navigate("/");
    if (id)
      getPokemonDetails(Number(id))
        .then((result) => setPokemon(result))
        .catch(() => toast("error", "Error getting your pokemon details"));
  }, []);

  function isNumber(id: string) {
    return !Number.isNaN(Number(id));
  }

  return (
    <>
      {isNumber(params.id as string) && !!pokemon && (
        <div className={styles.container}>
          <h1 style={{ color: typesColors[pokemon.types[0].type.name] }}>
            {pokemon.name.charAt(0).toUpperCase()}
            {pokemon.name.substring(1, pokemon.name.length)}
          </h1>
          <button
            type="button"
            className={styles.starBtn}
            style={{
              padding: "20",
              backgroundColor: typesColors[pokemon.types[0].type.name],
            }}
            onClick={() => handleFavorite(pokemon.id)}
          >
            <img
              alt="favorite"
              className={styles.starIcon}
              src="/src/assets/starIcon.svg"
              style={{
                filter: checkFavorite(pokemon.id),
              }}
            />
          </button>
          <div className={styles.content}>
            <div className={styles.leftSide}>
              <img
                alt={pokemon?.name}
                src={pokemon?.sprites.other["official-artwork"].front_default}
              />
            </div>
            <div className={styles.rightSide}>
              {pokemon.stats.map((stat) => (
                <div className={styles.stats} key={stat.stat.name}>
                  <p className={styles.nameStat}>
                    {stat.stat.name.charAt(0).toUpperCase()}
                    {stat.stat.name.substring(1, pokemon.name.length)}
                  </p>
                  <div className={styles.barStat}>
                    <div
                      className={styles.bar}
                      style={{
                        background: typesColors[pokemon.types[0].type.name],
                        width: `${
                          stat.base_stat > 100 ? 100 : stat.base_stat
                        }%`,
                      }}
                    >
                      {stat.base_stat}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      {isNumber(params.id as string) && !pokemon && <Loading />}
    </>
  );
}
