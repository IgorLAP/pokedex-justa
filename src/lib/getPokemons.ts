import { GeneralApiResponseI } from "~/interfaces/GeneralApiResponse";
import { api } from "~/services/api";

export async function getPokemons(offset?: number) {
  const { data } = await api.get<GeneralApiResponseI>("/pokemon", {
    params: {
      limit: 100,
      offset,
    },
  });
  return data;
}
