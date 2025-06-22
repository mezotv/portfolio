import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export function ModeToggle(): React.JSX.Element {
  const [theme, setTheme] = useState<"dark" | "light">(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("theme");
      if (stored) return stored as "dark" | "light";
      return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }
    return "light";
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  function toggleTheme() {
    setTheme(theme === "dark" ? "light" : "dark");
  }

  return (
    <button
      onClick={toggleTheme}
      className="rounded-md w-9 h-9 p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <Sun className="h-full w-full scale-100 rotate-0 transition-all" />
      ) : (
        <Moon className="h-full w-full scale-100 rotate-0 transition-all" />
      )}
    </button>
  );
}
