import { useEffect, useState } from "react";
import styles from "./ThemeToggle.module.scss";
import { ThemeModeT } from "./ThemeToggle.types";

const ThemeToggle = () => {
  const [theme, setTheme] = useState<ThemeModeT>(() =>
    window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "light"
      : "light"
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <button
      onClick={() => setTheme((prev) => (prev === "dark" ? "light" : "dark"))}
      style={{
        background: theme === "dark" ? "#333" : "#eee",
        color: theme === "dark" ? "#f0f0f0" : "#111",
      }}
      className={styles.toggle_button}
    >
      Switch to {theme === "dark" ? "Light" : "Dark"} Mode
    </button>
  );
};

export default ThemeToggle;
