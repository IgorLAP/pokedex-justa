import { MakeItFavoritePersister } from "~/interface-adapters/persister";
import { MakeItFavoriteUseCase } from "../use-cases";

export class MakeItFavoriteAppl implements MakeItFavoriteUseCase {
  
  constructor(
    private readonly makeItFavoritePersister: MakeItFavoritePersister,
  ) {}

  makeItFavorite (pokemonId: number) {
    this.makeItFavoritePersister.persist(pokemonId);
  }
}