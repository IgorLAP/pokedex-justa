import { useContext } from "react";

import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { toast } from "react-toastify";

import { SearchContext, SearchProvider } from "~/contexts/SearchContext";
import { searchPokemon } from "~/lib/searchPokemon";
import { pokemon, startMswServer } from "~/tests/mswServer";

startMswServer();

jest.mock("~/lib/searchPokemon");
jest.mock("react-toastify");

describe("Search Context", () => {
  beforeEach(() => {
    (searchPokemon as jest.Mock).mockImplementation(
      jest.requireActual("~/lib/searchPokemon").searchPokemon
    );
    jest.spyOn(console, "error").mockImplementation();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("reflects setSearch in search", () => {
    function TestComponent() {
      const { setSearch, search } = useContext(SearchContext);
      return (
        <>
          <input onChange={(e) => setSearch(e.target.value)} />
          <p>{search}</p>
        </>
      );
    }
    render(
      <SearchProvider>
        <TestComponent />
      </SearchProvider>
    );
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "pokemon" } });
    expect(screen.getByText("pokemon")).toBeInTheDocument();
  });

  it("shows 'something went wrong' in request error", async () => {
    function TestComponent() {
      const { setSearch } = useContext(SearchContext);
      return (
        <button type="button" onClick={() => setSearch("pokemon")}>
          Click Me
        </button>
      );
    }
    render(
      <SearchProvider>
        <TestComponent />
      </SearchProvider>
    );
    (searchPokemon as jest.Mock).mockRejectedValueOnce(
      new Error("Wrong request")
    );
    fireEvent.click(screen.getByRole("button"));
    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledTimes(1);
    });
  });

  it("shows 'Pokemon or type not found' error if search doesnt match", async () => {
    function TestComponent() {
      const { setSearch } = useContext(SearchContext);
      return <input type="text" onChange={(e) => setSearch(e.target.value)} />;
    }
    render(
      <SearchProvider>
        <TestComponent />
      </SearchProvider>
    );
    (searchPokemon as jest.Mock).mockResolvedValueOnce([]);
    const input = screen.getByRole("textbox");
    await waitFor(() => {
      fireEvent.change(input, { target: { value: "naruto" } });
      expect(toast.error).toHaveBeenCalledTimes(1);
    });
  });

  it("correctly takes if statement if returned type Pokemon", async () => {
    function TestComponent() {
      const { setSearch, resultList } = useContext(SearchContext);
      return (
        <>
          <input type="text" onChange={(e) => setSearch(e.target.value)} />
          {resultList &&
            resultList.map((result) => (
              <p key={result.id}>{result.types[0].type.name}</p>
            ))}
        </>
      );
    }
    render(
      <SearchProvider>
        <TestComponent />
      </SearchProvider>
    );
    (searchPokemon as jest.Mock).mockResolvedValueOnce([pokemon]);
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "bug" } });
    await waitFor(() => expect(screen.getByText(/bug/i)).toBeInTheDocument());
  });

  it("makes other request if search by name", async () => {
    function TestComponent() {
      const { setSearch, resultList } = useContext(SearchContext);
      return (
        <>
          <input type="text" onChange={(e) => setSearch(e.target.value)} />
          {resultList && <p>{JSON.stringify(resultList, null, 2)}</p>}
        </>
      );
    }
    render(
      <SearchProvider>
        <TestComponent />
      </SearchProvider>
    );
    (searchPokemon as jest.Mock).mockResolvedValueOnce([
      { name: "fake-name", url: "fake-url" },
    ]);
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "fake-name" } });
    await waitFor(() => expect(screen.getByText(/fake-name/i)));
  });
});
