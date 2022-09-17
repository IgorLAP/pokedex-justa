import { useEffect, useState } from "react";

import { Dashboard } from "~/components/Dashboard";
import { GoUpBtn } from "~/components/GoUpBtn";
import { Header } from "~/components/Header";

import "./styles/App.scss";

function App() {
  const [showGoUp, setShowGoUp] = useState(false);

  useEffect(() => {
    const timerId = setInterval(() => {
      if (window.scrollY >= 300) setShowGoUp(true);
      if (window.scrollY <= 300) setShowGoUp(false);
    }, 250);

    return () => clearInterval(timerId);
  }, []);

  return (
    <>
      <Header />
      <main>
        <Dashboard />
      </main>
      <GoUpBtn show={showGoUp} />
    </>
  );
}

export default App;
