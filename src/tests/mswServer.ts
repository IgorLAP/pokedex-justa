import { rest } from "msw";
import { setupServer } from "msw/node";

import { PokemonI } from "~/interfaces/PokemonI";

export const pokemon: PokemonI = {
  id: 1,
  name: "fake-name",
  sprites: {
    front_default: "/pokeball.png",
    versions: {
      "generation-v": {
        "black-white": { animated: { front_default: "/pokeball.png" } },
      },
    },
  },
  types: [
    {
      type: { name: "bug", url: "/pokeball.png" },
    },
  ],
};

export const server = setupServer(
  rest.get("http://localhost/fake-url", (req, res, ctx) =>
    res(ctx.status(200), ctx.json([{ data: { ...pokemon } }]))
  ),
  rest.get("https://pokeapi.co/api/v2/pokemon/2", (req, res, ctx) =>
    res(ctx.status(200), ctx.json({ ...pokemon }))
  ),
  rest.get("*", (req, res, ctx) =>
    res(ctx.status(500), ctx.json({ error: "Request not registered" }))
  )
);

export const startMswServer = () => {
  beforeAll(() => server.listen());
  afterAll(() => server.close());
  afterEach(() => server.resetHandlers());
};
