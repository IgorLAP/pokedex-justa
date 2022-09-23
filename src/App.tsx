import { BrowserRouter } from "react-router-dom";

import { Configuration } from "~/components/Configuration";
import { FavoriteProvider } from "~/contexts/FavoriteContext";
import { SearchProvider } from "~/contexts/SearchContext";

import "./styles/App.scss";

function App() {
  return (
    <SearchProvider>
      <FavoriteProvider>
        <BrowserRouter>
          <Configuration />
        </BrowserRouter>
      </FavoriteProvider>
    </SearchProvider>
  );
}

export default App;
