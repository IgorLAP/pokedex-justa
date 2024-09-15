import { BrowserRouter } from "react-router-dom";

import { Configuration } from "~/presentation/components/Configuration";
import { FavoriteProvider } from "~/presentation/contexts/FavoriteContext";
import { SearchProvider } from "~/presentation/contexts/SearchContext";

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
