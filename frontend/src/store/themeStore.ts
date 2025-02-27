import { create } from "zustand";

interface ThemeState {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const useThemeStore = create<ThemeState>((set) => ({
  darkMode: localStorage.getItem("darkMode") === "true", // Initialize from localStorage
  toggleDarkMode: () =>
    set((state) => {
      const newDarkMode = !state.darkMode;
      localStorage.setItem("darkMode", String(newDarkMode)); // Persist to localStorage
      if (newDarkMode) {
        document.documentElement.classList.add("dark"); // Add 'dark' class to <html>
      } else {
        document.documentElement.classList.remove("dark"); // Remove 'dark' class
      }
      return { darkMode: newDarkMode };
    }),
}));

export default useThemeStore;