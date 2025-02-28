import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import useThemeStore from "../store/themeStore";
import SearchAndFilter from "./SearchAndFilter";
import { Subscription } from "../types";

const SubscriptionList: React.FC = () => {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [filteredSubscriptions, setFilteredSubscriptions] = useState<Subscription[]>([]);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const { darkMode } = useThemeStore();

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;
        const response = await fetch("http://localhost:5000/api/v1/subscriptions", {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch subscriptions");
        }
        const data = await response.json();
        setSubscriptions(data.data);
        setFilteredSubscriptions(data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchSubscriptions();
  }, []);

  const handleSearch = (term: string) => {
    const filtered = subscriptions.filter((sub) =>
      sub.name.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredSubscriptions(filtered);
  };


  const handleFilter = (filterBy: string) => {
    let sorted = [...filteredSubscriptions];
    switch (filterBy) {
      case "created_at":
        sorted.sort((a, b) => {
          const dateA = new Date(a.createdAt).getTime();
          const dateB = new Date(b.createdAt).getTime();
          return dateA - dateB;
        });
        break;
  
      case "updated_at":
        sorted.sort((a, b) => {
          const dateA = new Date(a.updatedAt).getTime();
          const dateB = new Date(b.updatedAt).getTime();
          return dateA - dateB;
        });
        break;
  
      case "status":
        sorted.sort((a, b) => a.status.localeCompare(b.status));
        break;
  
      case "renewal_date":
        sorted.sort((a, b) => {
          const dateA = new Date(a.renewalDate).getTime();
          const dateB = new Date(b.renewalDate).getTime();
          return dateA - dateB;
        });
        break;
  
      case "longest":
        sorted.sort((a, b) => {
          const dateA = new Date(a.renewalDate).getTime();
          const dateB = new Date(b.renewalDate).getTime();
          return dateB - dateA;
        });
        break;
  
      default:
        break;
    }
    setFilteredSubscriptions(sorted);
  };

  return (
    <div ref={ref} className="overflow-hidden"> 
  <h3 style={{ 
    fontSize: "1.125rem",
    fontWeight: 600,
    marginBottom: "1rem",
    color: darkMode ? "#cbd5e0" : "#2d3748"
  }}>
  </h3>
  <SearchAndFilter onSearch={handleSearch} onFilter={handleFilter} />
  {filteredSubscriptions.length > 0 ? (
    <motion.table
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`min-w-full shadow-lg rounded-lg overflow-hidden ${
        darkMode ? 'bg-gray-800' : 'bg-white'
      }`}
      style={{ tableLayout: 'fixed' }} 
    >
          <thead className={`bg-gradient-to-r ${
            darkMode 
              ? 'from-blue-600 to-purple-600' 
              : 'from-blue-500 to-purple-500'
          } text-white`}>
            <tr>
              <th className="py-3 px-4 md:px-5 text-left">Subscription</th>
              <th className="py-3 px-4 md:px-5 text-left">Price</th>
              <th className="py-3 px-4 md:px-5 text-left">Status</th>
              <th className="py-3 px-4 md:px-5 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className={darkMode ? "text-gray-300" : "text-gray-700"}>
            {filteredSubscriptions.map((subscription) => (
              <motion.tr
                key={subscription._id}
                className={`border-b transition duration-300 ${
                  darkMode 
                    ? 'hover:bg-gray-700 border-gray-700' 
                    : 'hover:bg-gray-100 border-gray-200'
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <td className="py-3 px-4 md:px-5">
                  <Link
                    to={`/subscriptions/details/${subscription._id}`}
                    className={`font-semibold hover:underline ${
                      darkMode ? 'text-blue-400' : 'text-blue-600'
                    }`}
                  >
                    {subscription.name}
                  </Link>
                </td>
                <td className="py-3 px-4 md:px-5">
                  {subscription.price} {subscription.currency}
                </td>
                <td className="py-3 px-4 md:px-5">{subscription.status}</td>
                <td className="py-3 px-4 md:px-5 text-center space-x-2">
                  <Link
                    to={`/subscriptions/edit/${subscription._id}`}
                    className={`inline-block px-3 py-1 rounded transition duration-300 bg-gradient-to-r from-[#FF6B6B] to-[#FF8E53] text-white`}
                  >
                    Edit
                  </Link>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </motion.table>
      ) : (
        <p className={`text-center py-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          No subscriptions found.
        </p>
      )}
    </div>
  );
};

export default SubscriptionList