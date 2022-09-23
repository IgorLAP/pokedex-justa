import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import mockAxios from "axios";

import { FavoriteContext } from "~/contexts/FavoriteContext";
import { SearchContext } from "~/contexts/SearchContext";
import { getPokemons } from "~/lib/getPokemons";
import { pokemonSample } from "~/lib/helpers";

import { Dashboard } from ".";

jest.mock("~/lib/getPokemons");
jest.mock("axios");
jest.mock("react-router-dom");

describe("Dashboard component", () => {
  beforeEach(() => {
    jest.spyOn(console, "error").mockImplementation();
  });

  it("renders gif when loading", () => {
    render(
      <SearchContext.Provider
        value={
          {
            resultList: [],
          } as any
        }
      >
        <Dashboard />
      </SearchContext.Provider>
    );
    expect(screen.getByAltText(/loading/i)).toBeInTheDocument();
  });

  it("displays buttons and handle pagination", async () => {
    (getPokemons as jest.Mock).mockResolvedValueOnce({
      next: "sampleurl.com/pokemon?offset=1&limit=1",
      previous: "sampleurl.com/pokemon?offset=1&limit=1",
      results: [{ name: "fake-name", url: "fake-url" }],
    });
    const loading = false;
    render(
      <SearchContext.Provider
        value={
          {
            search: "",
            resultList: [],
            loading,
          } as any
        }
      >
        <FavoriteContext.Provider
          value={
            {
              checkFavorite: jest.fn(),
              handleFavorite: jest.fn(),
            } as any
          }
        >
          <Dashboard />
        </FavoriteContext.Provider>
      </SearchContext.Provider>
    );
    (mockAxios.all as jest.Mock).mockResolvedValueOnce([
      { data: { ...pokemonSample } },
    ]);
    await waitFor(() => {
      const btn = screen.getByRole("button", { name: /next/i });
      fireEvent.click(btn);
      expect(btn).toBeInTheDocument();
      expect(screen.getByTestId("card")).toHaveStyle(
        "background-color: rgb(170, 187, 34); opacity: 0.6;"
      );
    });
  });
});
