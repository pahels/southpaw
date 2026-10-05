"use client";

import { createContext, useContext, useEffect, useState } from "react";

type ThemeContextType = {
  isDay: boolean;
  toggle: () => void;
};

const ThemeContext = createContext<ThemeContextType>({ isDay: false, toggle: () => {} });

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isDay, setIsDay] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    if (stored === "day") setIsDay(true);
  }, []);

  const toggle = () => {
    setIsDay((prev) => {
      const next = !prev;
      localStorage.setItem("theme", next ? "day" : "nite");
      return next;
    });
  };

  return (
    <ThemeContext.Provider value={{ isDay, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
