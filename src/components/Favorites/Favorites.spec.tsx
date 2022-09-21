import { render, screen, waitFor } from "@testing-library/react";
import { rest } from "msw";
import { toast } from "react-toastify";

import { FavoriteContext } from "~/contexts/FavoriteContext";
import { server, startMswServer } from "~/tests/mswServer";

import { Favorites } from ".";

startMswServer();

jest.mock("react-toastify");

describe("Favorites component", () => {
  beforeEach(() => {
    jest.spyOn(console, "error").mockImplementation();
  });

  it("loads gif while handles list", () => {
    render(
      <FavoriteContext.Provider
        value={{
          checkFavorite: jest.fn(),
          favList: [2],
          handleFavorite: jest.fn(),
          setFavList: jest.fn(),
        }}
      >
        <Favorites />
      </FavoriteContext.Provider>
    );
    expect(screen.getByAltText(/loading/i)).toBeInTheDocument();
  });

  it("shows toast if error on request", async () => {
    server.use(
      rest.get("https://pokeapi.co/api/v2/pokemon/2", (req, res, ctx) =>
        res(ctx.status(404), ctx.json({ error: "fake-error" }))
      )
    );
    render(
      <FavoriteContext.Provider
        value={{
          checkFavorite: jest.fn(),
          favList: [2],
          handleFavorite: jest.fn(),
          setFavList: jest.fn(),
        }}
      >
        <Favorites />
      </FavoriteContext.Provider>
    );
    await waitFor(() => expect(toast.error).toHaveBeenCalledTimes(1));
  });

  it("shows empty list message if no items", async () => {
    render(
      <FavoriteContext.Provider
        value={{
          checkFavorite: jest.fn(),
          favList: [],
          handleFavorite: jest.fn(),
          setFavList: jest.fn(),
        }}
      >
        <Favorites />
      </FavoriteContext.Provider>
    );
    await waitFor(() =>
      expect(screen.getByText(/lista vazia/i)).toBeInTheDocument()
    );
  });

  it("corectly display the favorites pokemons", async () => {
    render(
      <FavoriteContext.Provider
        value={{
          checkFavorite: jest.fn(),
          favList: [2],
          handleFavorite: jest.fn(),
          setFavList: jest.fn(),
        }}
      >
        <Favorites />
      </FavoriteContext.Provider>
    );
    await waitFor(() => {
      expect(screen.getByText(/fake-name/i)).toBeInTheDocument();
      expect(screen.getByRole("img", { name: /bug/i })).toBeInTheDocument();
    });
  });
});
