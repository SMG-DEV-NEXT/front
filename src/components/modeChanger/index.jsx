"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []); // чтобы избежать ошибки на сервере

  if (!mounted) return null;

  return (
    <button
      onClick={() => {
        localStorage.setItem("theme", theme === "dark" ? "light" : "dark");
        setTheme(theme === "dark" ? "light" : "dark");
      }}
      className="p-2 rounded-lg border bg-gray-800 dark:bg-gray-200 transition"
    >
      {theme !== "dark" ? "🌙" : "☀️"}
    </button>
  );
}
