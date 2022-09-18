import { useEffect, useState } from "react";

import { ToastContainer } from "react-toastify";

import { Dashboard } from "~/components/Dashboard";
import { GoUpBtn } from "~/components/GoUpBtn";
import { Header } from "~/components/Header";

import { FavoriteProvider } from "./contexts/FavoriteContext";
import { SearchProvider } from "./contexts/SearchContext";

import "./styles/App.scss";
import "react-toastify/dist/ReactToastify.min.css";

function App() {
  const [hasScroll, setHasScroll] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (window.scrollY >= 300) setHasScroll(true);
      if (window.scrollY <= 300) setHasScroll(false);
    }, 250);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <SearchProvider>
      <FavoriteProvider>
        <Header isHeaderFix={hasScroll} />
        <main>
          <Dashboard />
        </main>
        <GoUpBtn show={hasScroll} />
        <ToastContainer />
      </FavoriteProvider>
    </SearchProvider>
  );
}

export default App;
