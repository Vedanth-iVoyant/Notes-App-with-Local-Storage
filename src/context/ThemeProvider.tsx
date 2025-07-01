import { useEffect, useState, type ReactNode } from "react";
import type { Theme } from "../types";
import { ThemeContext } from "./ThemeContext";

const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    const storedTheme = localStorage.getItem("user-theme");
    return storedTheme === "light" ? "light" : "dark";
  });

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem("user-theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme}>{children}</div>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
