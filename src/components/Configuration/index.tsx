import { useEffect, useState } from "react";

import { Route, Routes, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { Dashboard } from "~/components/Dashboard";
import { Favorites } from "~/components/Favorites";
import { Footer } from "~/components/Footer";
import { GoUpBtn } from "~/components/GoUpBtn";
import { Header } from "~/components/Header";
import { PokeDetails } from "~/components/PokeDetails";

import "react-toastify/dist/ReactToastify.min.css";

export function Configuration() {
  const [hasScroll, setHasScroll] = useState(false);
  const [intervalId, setIntervalId] = useState<NodeJS.Timer>();

  const location = useLocation();

  useEffect(() => {
    const detailsPage = location.pathname.includes("/details");
    if (!detailsPage) {
      setIntervalId(
        setInterval(() => {
          if (window.scrollY >= 300) setHasScroll(true);
          if (window.scrollY <= 300) setHasScroll(false);
        }, 250)
      );
    }
    return () => {
      if (intervalId) clearTimeout(intervalId);
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
