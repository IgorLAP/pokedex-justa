import { useEffect, useState } from "react";

import { Route, Routes, BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { Dashboard } from "~/components/Dashboard";
import { Favorites } from "~/components/Favorites";
import { Footer } from "~/components/Footer";
import { GoUpBtn } from "~/components/GoUpBtn";
import { Header } from "~/components/Header";
import { PokeDetails } from "~/components/PokeDetails";
import { FavoriteProvider } from "~/contexts/FavoriteContext";
import { SearchProvider } from "~/contexts/SearchContext";

import "./styles/App.scss";
import "react-toastify/dist/ReactToastify.min.css";

function App() {
  const [hasScroll, setHasScroll] = useState(false);
  const [intervalId, setIntervalId] = useState<NodeJS.Timer>();

  useEffect(() => {
    const detailsPage = window.location.pathname.includes("/details");
    setIntervalId(
      setInterval(() => {
        if (window.scrollY >= 300) {
          if (!detailsPage) setHasScroll(true);
        }
        if (window.scrollY <= 300) setHasScroll(false);
      }, 250)
    );
    return () => clearInterval(intervalId as NodeJS.Timer);
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
              <Route path="/details/:id" element={<PokeDetails />} />
            </Routes>
          </main>
          <Footer />
        </BrowserRouter>
        <GoUpBtn show={hasScroll} />
        <ToastContainer />
      </FavoriteProvider>
    </SearchProvider>
  );
}

export default App;
