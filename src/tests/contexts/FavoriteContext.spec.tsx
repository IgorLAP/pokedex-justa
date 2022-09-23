import { useContext } from "react";

import { fireEvent, render, screen } from "@testing-library/react";

import { FavoriteContext, FavoriteProvider } from "~/contexts/FavoriteContext";

const initialValue = [1, 2, 3, 4];

describe("Favorite Context", () => {
  beforeEach(() =>
    window.localStorage.setItem("favorites", JSON.stringify(initialValue))
  );
  it("gets favorites in the storage", () => {
    function TestComponent() {
      const { favList } = useContext(FavoriteContext);
      return <h1>{favList.length}</h1>;
    }
    render(
      <FavoriteProvider>
        <TestComponent />
      </FavoriteProvider>
    );
    expect(screen.getByText(/4/i)).toBeInTheDocument();
  });

  it("removes item if already in favorites", () => {
    function TestComponent() {
      const { handleFavorite } = useContext(FavoriteContext);
      return (
        <button type="button" onClick={() => handleFavorite(1)}>
          Click Me
        </button>
      );
    }
    render(
      <FavoriteProvider>
        <TestComponent />
      </FavoriteProvider>
    );
    fireEvent.click(screen.getByRole("button"));
    const favorites: number[] = JSON.parse(
      window.localStorage.getItem("favorites") as string
    );
    expect(favorites.length).toBe(3);
  });

  it("adds to favorites", () => {
    function TestComponent() {
      const { handleFavorite } = useContext(FavoriteContext);
      return (
        <button type="button" onClick={() => handleFavorite(5)}>
          Click Me
        </button>
      );
    }
    render(
      <FavoriteProvider>
        <TestComponent />
      </FavoriteProvider>
    );
    fireEvent.click(screen.getByRole("button"));
    const favorites: number[] = JSON.parse(
      window.localStorage.getItem("favorites") as string
    );
    expect(favorites.length).toBe(5);
  });

  it("adds the first if no favorite yet", () => {
    window.localStorage.removeItem("favorites");
    function TestComponent() {
      const { handleFavorite } = useContext(FavoriteContext);
      return (
        <button type="button" onClick={() => handleFavorite(1)}>
          Click Me
        </button>
      );
    }
    render(
      <FavoriteProvider>
        <TestComponent />
      </FavoriteProvider>
    );
    fireEvent.click(screen.getByRole("button"));
    const favorites: number[] = JSON.parse(
      window.localStorage.getItem("favorites") as string
    );
    expect(favorites.length).toBe(1);
  });

  it("returns filter elements if id is in favorites", () => {
    function TestComponent() {
      const { checkFavorite } = useContext(FavoriteContext);
      return <p>{checkFavorite(1)}</p>;
    }
    render(
      <FavoriteProvider>
        <TestComponent />
      </FavoriteProvider>
    );
    expect(
      screen.getByText(
        "invert(100%) sepia(72%) saturate(5098%) brightness(100%)"
      )
    ).toBeInTheDocument();
  });

  it("returns empty string if there's no id in favorites", () => {
    window.localStorage.removeItem("favorites");
    function TestComponent() {
      const { checkFavorite } = useContext(FavoriteContext);
      return (
        <p>{`returns: ${
          !checkFavorite(1) ? "empty string" : checkFavorite(1)
        }`}</p>
      );
    }
    render(
      <FavoriteProvider>
        <TestComponent />
      </FavoriteProvider>
    );
    expect(screen.getByText("returns: empty string")).toBeInTheDocument();
  });
});
