import { MakeItFavoritePersister } from "~/interface-adapters/persister";

const KEY = 'favorites';

export class LocalStoragePersister implements MakeItFavoritePersister {
  
  constructor() {}

  persist (id: number) {
    const persistData = localStorage.getItem(KEY);
    if (persistData) {
      const newPersistedData = [...JSON.parse(persistData), id];
      localStorage.setItem(KEY, JSON.stringify(newPersistedData));
      return;
    }

    localStorage.setItem(KEY, JSON.stringify([id]));
  };
}