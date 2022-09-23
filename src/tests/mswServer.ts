import { rest } from "msw";
import { setupServer } from "msw/node";

import { pokemonSample, pokemonDetailSample } from "~/lib/helpers";

export const server = setupServer(
  rest.get("http://localhost/fake-url", (req, res, ctx) =>
    res(ctx.status(200), ctx.json([{ data: { ...pokemonSample } }]))
  ),
  rest.get("https://pokeapi.co/api/v2/pokemon/2", (req, res, ctx) =>
    res(ctx.status(200), ctx.json({ ...pokemonSample }))
  ),
  rest.get("https://pokeapi.co/api/v2/pokemon/1", (req, res, ctx) =>
    res(ctx.status(200), ctx.json({ ...pokemonDetailSample }))
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
