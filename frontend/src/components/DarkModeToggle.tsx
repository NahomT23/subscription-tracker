import React from "react";
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";
import useThemeStore from "../store/themeStore";

const DarkModeToggle: React.FC = () => {
  const { darkMode, toggleDarkMode } = useThemeStore();

  return (
    <button
      onClick={toggleDarkMode}
      className="fixed top-4 right-4 p-2 focus:outline-none z-50 rounded-full transition-all duration-300"
      style={{
        backgroundColor: darkMode ? '#2D3748' : '#F7FAFC', 
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',       }}
    >
      {darkMode ? (
        <SunIcon className="w-6 h-6 text-white" />
      ) : (
        <MoonIcon className="w-6 h-6 text-gray-700" />
      )}
    </button>
  );
};

export default DarkModeToggle;
