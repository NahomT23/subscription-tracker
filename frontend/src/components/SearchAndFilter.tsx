
import React, { useState, useEffect, useRef } from "react";
import useThemeStore from "../store/themeStore";
import { SearchAndFilterProps } from "../types";
import { motion, AnimatePresence } from "framer-motion";

const SearchAndFilter: React.FC<SearchAndFilterProps> = ({ onSearch, onFilter }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const { darkMode } = useThemeStore();
  const modalRef = useRef<HTMLDivElement | null>(null);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value); 
  };

  const handleFilterClick = (filterBy: string) => {
    onFilter(filterBy); 
    setShowFilters(false); 
  };

  const handleOutsideClick = (e: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      setShowFilters(false);
    }
  };

  useEffect(() => {
    if (showFilters) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [showFilters]);

  return (
    <div className="relative mb-4">
    {/* Search and Filter Container */}
    <div className="flex gap-2 w-full">
      {/* Search Input */}
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearchChange}
        className={`flex-1 px-4 py-2 rounded-md border${
          darkMode 
            ? "bg-gray-800 text-white border-gray-700" 
            : "bg-white text-gray-800 border-gray-300"
        } focus:outline-none focus:ring-2 focus:ring-blue-500`}
      />

      {/* Filter Button */}
      <button
        onClick={() => setShowFilters(true)}
        style={{
          color: "#ffffff"
        }}
        className=' text-white bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2 rounded-md transition-colors hover:from-blue-700 hover:to-purple-700'
      >
        Filter
      </button>
    </div>

    {/* Popup Modal */}
    <AnimatePresence>
      {showFilters && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 backdrop-blur-sm"
          onClick={() => setShowFilters(false)}
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.9 }}
            ref={modalRef}
            className={`w-80 rounded-lg shadow-xl p-6 relative ${
              darkMode 
                ? "bg-gray-800 text-gray-100" 
                : "bg-white text-gray-800"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button (X) */}
            <button
                onClick={() => setShowFilters(false)}
                className={`absolute top-3 right-3 text-3xl p-2 transition-all ease-in-out duration-200`}
                style={ darkMode ? { background: "transparent", color: "white"} : { background: "transparent", color: "black" } }
              >
                &times;
              </button>


            {/* Modal Title */}
            <h2 className={`text-lg font-semibold mb-4 ${
              darkMode ? "text-gray-100" : "text-gray-800"
            }`}>
              Filter Options
            </h2>
            <hr />

            {/* Filter Options */}
            <ul className="space-y-2">
              {["created_at", "updated_at", "status", "renewal_date", "longest"].map((filter) => (
                <li
                  key={filter}
                  onClick={() => handleFilterClick(filter)}
                  className={`px-4 py-2 cursor-pointer rounded-md transition-all ${
                    darkMode 
                      ? "hover:bg-gray-700" 
                      : "hover:bg-gray-100"
                  } ${
                    darkMode 
                      ? "border-gray-700" 
                      : "border-gray-200"
                  }`}
                >
                  {filter.replace("_", " ").toUpperCase()}
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
  );
};

export default SearchAndFilter;