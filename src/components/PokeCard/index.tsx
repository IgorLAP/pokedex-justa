import { useContext } from "react";

import { FavoriteContext } from "~/contexts/FavoriteContext";
import { PokemonI, PokemonTypeNameI } from "~/interfaces/PokemonI";

import styles from "./pokecard.module.scss";

interface PokeCardProps {
  pokemon: PokemonI;
  loading: boolean;
}

const types: Record<PokemonTypeNameI, string> = {
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

export function PokeCard({ pokemon, loading }: PokeCardProps) {
  const { checkFavorite, handleFavorite } = useContext(FavoriteContext);

  function putColor(type: PokemonTypeNameI): string {
    const pokemonTypes = Object.keys(types);
    for (const pokeType of pokemonTypes) {
      if (pokeType === type) {
        return types[type];
      }
    }
    return "";
  }

  const typeName = pokemon.types[0].type.name;

  return (
    <div
      style={{
        backgroundColor: putColor(typeName),
        border: typeName === "ghost" ? "1px solid rgba(0, 0, 0, .2)" : "",
        opacity: loading ? ".6" : "1",
      }}
      className={styles.card}
      data-testid="card"
    >
      <button
        type="button"
        className={styles.starBtn}
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
      {pokemon.sprites.versions["generation-v"]["black-white"].animated
        .front_default || pokemon.sprites.front_default ? (
        <img
          className={styles.pokeImg}
          alt={pokemon.name}
          src={
            pokemon.sprites.versions["generation-v"]["black-white"].animated
              .front_default ?? (pokemon.sprites.front_default as string)
          }
        />
      ) : (
        <div className={styles.unknownPokemon}>
          <img
            className={styles.pokeImg}
            alt={pokemon.name}
            src="pokeball.png"
          />
        </div>
      )}
      <p className={styles.pokemonName}>
        {pokemon.name.charAt(0).toUpperCase()}
        {pokemon.name.substring(1, pokemon.name.length)}
      </p>
      <div className={styles.pokeTypes}>
        {pokemon.types.map((type) => (
          <div key={type.type.name} className={styles.info}>
            <img
              className={styles.type}
              alt={type.type.name}
              src={`type/${type.type.name}.webp`}
            />
            <div className={styles.tooltip}>
              <span className={styles.tooltipText}>{type.type.name}</span>
            </div>
            <div className={styles.mobileDesc}>{type.type.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
