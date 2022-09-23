import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { rest } from "msw";
import { toast } from "react-toastify";

import { FavoriteContext } from "~/contexts/FavoriteContext";
import { server, startMswServer } from "~/tests/mswServer";

import { PokeDetails } from ".";

startMswServer();

const mockedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedNavigate,
  useParams: () => ({
    id: 1,
  }),
}));
jest.mock("react-toastify");

describe("PokeDetails component", () => {
  it("intercepts the id params and show pokedetails", async () => {
    render(
      <FavoriteContext.Provider
        value={
          {
            checkFavorite: jest.fn(),
            handleFavorite: jest.fn(),
          } as any
        }
      >
        <PokeDetails />
      </FavoriteContext.Provider>
    );
    await waitFor(() => {
      expect(screen.getByText(/fake-name/i)).toBeInTheDocument();
      expect(screen.getByText(/hp/i)).toBeInTheDocument();
    });
  });

  it("adds to favorite", async () => {
    const handleFavoriteMock = jest.fn();
    render(
      <FavoriteContext.Provider
        value={
          {
            checkFavorite: jest.fn(),
            handleFavorite: handleFavoriteMock,
          } as any
        }
      >
        <PokeDetails />
      </FavoriteContext.Provider>
    );
    await waitFor(() => {
      const btn = screen.getByRole("button");
      fireEvent.click(btn);
      expect(handleFavoriteMock).toHaveBeenCalledWith(1);
    });
  });

  it("shows toast on request error", async () => {
    server.use(
      rest.get("https://pokeapi.co/api/v2/pokemon/1", (req, res, ctx) =>
        res(ctx.status(404), ctx.json({ error: "error message" }))
      )
    );
    render(
      <FavoriteContext.Provider
        value={
          {
            checkFavorite: jest.fn(),
            handleFavorite: jest.fn(),
          } as any
        }
      >
        <PokeDetails />
      </FavoriteContext.Provider>
    );
    await waitFor(() => expect(toast.error).toHaveBeenCalledTimes(1));
  });

  // it("redirects user if incorrect id is passed to route", async () => {
  //   render(
  //     <FavoriteContext.Provider
  //       value={
  //         {
  //           checkFavorite: jest.fn(),
  //           handleFavorite: jest.fn(),
  //         } as any
  //       }
  //     >
  //       <PokeDetails />
  //     </FavoriteContext.Provider>
  //   );
  //   await waitFor(() => expect(mockedNavigate).toHaveBeenCalledWith("/"));
  // });
});
