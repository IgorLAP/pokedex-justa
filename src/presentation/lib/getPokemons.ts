import { GeneralApiResponseI } from "~/presentation/interfaces/GeneralApiResponse";
import { api } from "~/presentation/services/api";

export async function getPokemons(offset?: number) {
  const { data } = await api.get<GeneralApiResponseI>("/pokemon", {
    params: {
      limit: 100,
      offset,
    },
  });
  return data;
}
