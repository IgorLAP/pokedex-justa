import { useEffect, useState } from "react";

import { toast } from "react-toastify";

export function useToast() {
  const [intervalId, setIntervalId] = useState<NodeJS.Timer>();
  const [inResponsiveMode, setInResponsiveMode] = useState(false);

  useEffect(() => {
    setIntervalId(
      setInterval(() => {
        if (window.innerWidth <= 860) setInResponsiveMode(true);
        if (window.innerWidth > 860) setInResponsiveMode(false);
      }, 250)
    );
    return () => clearInterval(intervalId);
  }, []);

  function showToast(type: "error" | "success" | "warn", message: string) {
    return toast[type](message, {
      theme: "colored",
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: true,
      rtl: false,
      pauseOnHover: true,
      pauseOnFocusLoss: true,
      draggable: true,
      style: {
        background: type === "warn" ? "#D69E2E" : "",
        fontSize: inResponsiveMode ? ".8rem" : "",
        width: inResponsiveMode ? "240px" : "",
        height: inResponsiveMode ? "65px" : "",
        margin: inResponsiveMode ? ".5rem" : "",
      },
    });
  }

  return showToast;
}
