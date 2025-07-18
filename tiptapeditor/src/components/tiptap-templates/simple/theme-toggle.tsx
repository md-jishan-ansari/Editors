"use client"
import React from "react";

export const ThemeToggle = () => {
  const [dark, setDark] = React.useState(false);
  React.useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);
  return (
    <button
      className="px-2 py-1 rounded border bg-white dark:bg-gray-800 dark:text-white"
      onClick={() => setDark(d => !d)}
      type="button"
    >
      {dark ? "Light Mode" : "Dark Mode"}
    </button>
  );
};
