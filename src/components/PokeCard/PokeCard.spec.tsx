import { fireEvent, render, screen } from "@testing-library/react";

import { FavoriteContext } from "~/contexts/FavoriteContext";
import { pokemonSample } from "~/lib/helpers";

import { PokeCard } from ".";

const mockedUseNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUseNavigate,
}));

describe("PokeCard component", () => {
  it("renders correctly", () => {
    render(
      <FavoriteContext.Provider
        value={
          {
            checkFavorite: jest.fn(() => ""),
            handleFavorite: jest.fn(),
          } as any
        }
      >
        <PokeCard loading={false} pokemon={pokemonSample} />
      </FavoriteContext.Provider>
    );
    const pokeName = screen.getByText(/fake-name/i);
    expect(pokeName).toBeInTheDocument();
  });

  it("calls the favorite function when button is clicked", () => {
    const handleFavMock = jest.fn();
    render(
      <FavoriteContext.Provider
        value={
          {
            checkFavorite: jest.fn(() => ""),
            handleFavorite: handleFavMock,
          } as any
        }
      >
        <PokeCard loading={false} pokemon={pokemonSample} />
      </FavoriteContext.Provider>
    );
    const starBtn = screen.getAllByRole("button", { name: /favorite/i });
    fireEvent.click(starBtn[1]);
    expect(handleFavMock).toHaveBeenCalled();
  });

  it("applys opacity if loading", () => {
    render(
      <FavoriteContext.Provider
        value={
          {
            checkFavorite: jest.fn(),
            handleFavorite: jest.fn(),
          } as any
        }
      >
        <PokeCard loading pokemon={pokemonSample} />
      </FavoriteContext.Provider>
    );
    const card = screen.getByTestId("card");
    expect(card).toHaveStyle("opacity: 0.6");
  });
});
