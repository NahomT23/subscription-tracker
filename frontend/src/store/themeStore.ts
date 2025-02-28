import { create } from "zustand";

interface ThemeState {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const useThemeStore = create<ThemeState>((set) => {
  const storedDarkMode = localStorage.getItem("darkMode");
  const defaultDarkMode = storedDarkMode !== null ? storedDarkMode === "true" : true; // Default to true

  if (defaultDarkMode) {
    document.documentElement.classList.add("dark"); 
  } else {
    document.documentElement.classList.remove("dark");
  }

  return {
    darkMode: defaultDarkMode,
    toggleDarkMode: () =>
      set((state) => {
        const newDarkMode = !state.darkMode;
        localStorage.setItem("darkMode", String(newDarkMode));
        if (newDarkMode) {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
        return { darkMode: newDarkMode };
      }),
  };
});

export default useThemeStore;
