import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

import { FavoriteContext } from "~/contexts/FavoriteContext";
import { SearchContext } from "~/contexts/SearchContext";

import { Header } from ".";

describe("Header component", () => {
  it("increments fav count", () => {
    render(
      <FavoriteContext.Provider
        value={{
          checkFavorite: jest.fn(),
          favList: Array(3),
          handleFavorite: jest.fn(),
          setFavList: jest.fn(),
        }}
      >
        <BrowserRouter>
          <Header isHeaderFix />
        </BrowserRouter>
      </FavoriteContext.Provider>
    );
    const favCount = screen.getByRole("link", { name: /⭐3 Favorites/i });
    expect(favCount).toBeInTheDocument();
  });

  it("setSearch modifies on input change", () => {
    const mockSetSearch = jest.fn();
    render(
      <SearchContext.Provider
        value={
          {
            setSearch: mockSetSearch,
            search: "",
            isTypeSearch: false,
          } as any
        }
      >
        <FavoriteContext.Provider
          value={
            {
              favList: Array(3),
            } as any
          }
        >
          <BrowserRouter>
            <Header isHeaderFix />
          </BrowserRouter>
        </FavoriteContext.Provider>
      </SearchContext.Provider>
    );
    const input = screen.getByRole("textbox") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "input-search" } });
    expect(mockSetSearch).toHaveBeenCalledWith("input-search");
  });

  it("if isTypeSearch is true input is disabled", () => {
    const mockSetSearch = jest.fn();
    render(
      <SearchContext.Provider
        value={
          {
            setSearch: mockSetSearch,
            search: "",
            isTypeSearch: true,
          } as any
        }
      >
        <FavoriteContext.Provider
          value={
            {
              favList: Array(3),
            } as any
          }
        >
          <BrowserRouter>
            <Header isHeaderFix />
          </BrowserRouter>
        </FavoriteContext.Provider>
      </SearchContext.Provider>
    );
    const input = screen.getByRole("textbox") as HTMLInputElement;
    expect(input).toBeDisabled();
  });
});
