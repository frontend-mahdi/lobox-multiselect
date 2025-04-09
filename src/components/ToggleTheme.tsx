import { useEffect, useState } from "react";

const ThemeToggle = () => {
  const [theme, setTheme] = useState<"light" | "dark">(() =>
    window.matchMedia("(prefers-color-scheme: dark)").matches ? "light" : "light"
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <button
      onClick={() => setTheme((prev) => (prev === "dark" ? "light" : "dark"))}
      style={{
        marginBottom: 16,
        padding: "6px 12px",
        borderRadius: 6,
        border: "1px solid #ccc",
        cursor: "pointer",
        background: theme === "dark" ? "#333" : "#eee",
        color: theme === "dark" ? "#f0f0f0" : "#111",
        fontSize: 14,
      }}
    >
      Switch to {theme === "dark" ? "Light" : "Dark"} Mode
    </button>
  );
};

export default ThemeToggle;
