import { useEffect, useState } from "react";

import { Route, Routes, BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { Dashboard } from "~/components/Dashboard";
import { Favorites } from "~/components/Favorites";
import { GoUpBtn } from "~/components/GoUpBtn";
import { Header } from "~/components/Header";
import { FavoriteProvider } from "~/contexts/FavoriteContext";
import { SearchProvider } from "~/contexts/SearchContext";

import "./styles/App.scss";
import "react-toastify/dist/ReactToastify.min.css";

function App() {
  const [hasScroll, setHasScroll] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (window.scrollY >= 250) setHasScroll(true);
      if (window.scrollY <= 250) setHasScroll(false);
    }, 250);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <SearchProvider>
      <FavoriteProvider>
        <BrowserRouter>
          <Header isHeaderFix={hasScroll} />
          <main>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/favorites" element={<Favorites />} />
            </Routes>
          </main>
        </BrowserRouter>
        <GoUpBtn show={hasScroll} />
        <ToastContainer />
      </FavoriteProvider>
    </SearchProvider>
  );
}

export default App;
