import React, { useState, createContext } from "react";

import { useToast } from "~/hooks/useToast";

interface FavoriteInitialValue {
  favList: number[];
  setFavList: React.Dispatch<React.SetStateAction<number[]>>;
  handleFavorite: (pokeId: number) => void;
  checkFavorite: (pokeId: number) => string;
}

const initialValue = {} as FavoriteInitialValue;

export const FavoriteContext =
  createContext<FavoriteInitialValue>(initialValue);

export function FavoriteProvider({ children }: { children: React.ReactNode }) {
  const [favList, setFavList] = useState<number[]>([]);

  const toast = useToast();

  function handleFavorite(pokeId: number) {
    const hasFavorites = localStorage.getItem("favorites");
    if (hasFavorites) {
      const favorites: number[] = JSON.parse(hasFavorites);
      const alreadyHas = favorites.filter((id) => id === pokeId);
      if (alreadyHas.length > 0) {
        const removedList = favorites.filter((id) => id !== pokeId);
        setFavList(removedList);
        localStorage.setItem("favorites", JSON.stringify(removedList));
        return;
      }
      favorites.push(pokeId);
      setFavList((prev) => [...prev, pokeId]);
      localStorage.setItem("favorites", JSON.stringify(favorites));
    } else {
      setFavList([pokeId]);
      localStorage.setItem("favorites", JSON.stringify([pokeId]));
    }
    toast("success", "Added to your favorites");
  }

  function checkFavorite(pokeId: number): string {
    const hasFavorites = localStorage.getItem("favorites");
    if (!hasFavorites) return "";
    const favorites: number[] = JSON.parse(hasFavorites);
    for (const i of favorites) {
      if (i === pokeId)
        return "invert(100%) sepia(72%) saturate(5098%) brightness(100%)";
    }
    return "";
  }

  return (
    <FavoriteContext.Provider
      value={{ favList, setFavList, handleFavorite, checkFavorite }}
    >
      {children}
    </FavoriteContext.Provider>
  );
}
