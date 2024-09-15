import { useEffect, useState } from "react";

import { Route, Routes, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { Dashboard } from "~/presentation/components/Dashboard";
import { Favorites } from "~/presentation/components/Favorites";
import { Footer } from "~/presentation/components/Footer";
import { GoUpBtn } from "~/presentation/components/GoUpBtn";
import { Header } from "~/presentation/components/Header";
import { PokeDetails } from "~/presentation/components/PokeDetails";

import "react-toastify/dist/ReactToastify.min.css";

export function Configuration() {
  const [hasScroll, setHasScroll] = useState(false);
  const [intervalId, setIntervalId] = useState<NodeJS.Timer | undefined>(
    undefined
  );

  const location = useLocation();

  useEffect(() => {
    const detailsPage = location.pathname.includes("/details");
    if (!detailsPage) {
      setIntervalId(
        setInterval(() => {
          if (window.scrollY >= 650) setHasScroll(true);
          if (window.scrollY < 649) setHasScroll(false);
        }, 250)
      );
    }

    if (detailsPage) {
      setHasScroll(false);
      clearInterval(intervalId);
      setIntervalId(undefined);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [location.pathname]);

  return (
    <>
      <Header isHeaderFix={hasScroll} />
      <main>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/details/:id" element={<PokeDetails />} />
        </Routes>
      </main>
      <Footer />
      <GoUpBtn show={hasScroll} />
      <ToastContainer />
    </>
  );
}
