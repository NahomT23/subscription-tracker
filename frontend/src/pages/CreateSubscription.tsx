import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import DarkModeToggle from "../components/DarkModeToggle";
import useThemeStore from "../store/themeStore";

const CreateSubscription: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    price: 0,
    currency: "USD",
    frequency: "monthly",
    category: "other",
    paymentMethod: "",
    startDate: "",
  });
  const navigate = useNavigate();
  const { darkMode } = useThemeStore();

  const apiUrl = import.meta.env.VITE_API_URL;
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const response = await fetch(`${apiUrl}/api/v1/subscriptions`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to create subscription");
      }

      navigate("/dashboard");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={`min-h-screen ${darkMode ? "bg-gray-900" : "bg-gray-100"} p-8`}>
      {/* Logo */}
      <Link
        to="/dashboard"
        className={`fixed top-4 left-4 text-xl font-bold ${
          darkMode ? "text-blue-400 hover:text-blue-300" : "text-blue-600 hover:text-blue-700"
        } transition duration-300 z-50`}
      >
        SubLog
      </Link>

      {/* Dark Mode Toggle */}
      <div className="fixed top-4 right-4 z-50">
        <DarkModeToggle />
      </div>

      <div
        className={`max-w-md mx-auto rounded-lg shadow-md p-6 transition-colors duration-300 ${
          darkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-800"
        }`}
      >
        <h2 className={`text-2xl font-bold mb-6 ${darkMode ? "text-blue-400" : "text-blue-600"}`}>
          Create New Subscription
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
              Subscription Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className={`w-full px-4 py-2 rounded-lg border ${
                darkMode ? "bg-gray-700 border-gray-600 focus:border-blue-400" : "border-gray-300 focus:border-blue-500"
              } transition duration-300 focus:ring-2 focus:ring-blue-200 outline-none`}
            />
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
              Price
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              className={`w-full px-4 py-2 rounded-lg border ${
                darkMode ? "bg-gray-700 border-gray-600 focus:border-blue-400" : "border-gray-300 focus:border-blue-500"
              } transition duration-300 focus:ring-2 focus:ring-blue-200 outline-none`}
            />
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
              Currency
            </label>
            <select
              name="currency"
              value={formData.currency}
              onChange={handleChange}
              className={`w-full px-4 py-2 rounded-lg border ${
                darkMode ? "bg-gray-700 border-gray-600 focus:border-blue-400" : "border-gray-300 focus:border-blue-500"
              } transition duration-300 focus:ring-2 focus:ring-blue-200 outline-none`}
            >
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="BIRR">BIRR</option>
            </select>
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
              Billing Frequency
            </label>
            <select
              name="frequency"
              value={formData.frequency}
              onChange={handleChange}
              className={`w-full px-4 py-2 rounded-lg border ${
                darkMode ? "bg-gray-700 border-gray-600 focus:border-blue-400" : "border-gray-300 focus:border-blue-500"
              } transition duration-300 focus:ring-2 focus:ring-blue-200 outline-none`}
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
            </select>
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
              Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className={`w-full px-4 py-2 rounded-lg border ${
                darkMode ? "bg-gray-700 border-gray-600 focus:border-blue-400" : "border-gray-300 focus:border-blue-500"
              } transition duration-300 focus:ring-2 focus:ring-blue-200 outline-none`}
            >
              <option value="sports">Sports</option>
              <option value="news">News</option>
              <option value="entertainment">Entertainment</option>
              <option value="education">Education</option>
              <option value="music">Music</option>
              <option value="technology">Technology</option>
              <option value="business">Business</option>
              <option value="health">Health</option>
              <option value="lifestyle">Lifestyle</option>
              <option value="gaming">Gaming</option>
              <option value="movies">Movies</option>
              <option value="fashion">Fashion</option>
              <option value="finance">Finance</option>
              <option value="food">Food</option>
              <option value="travel">Travel</option>
              <option value="parenting">Parenting</option>
              <option value="culture">Culture</option>
              <option value="politics">Politics</option>
              <option value="history">History</option>
              <option value="religion">Religion</option>
              <option value="television">Television</option>
              <option value="grocery">Grocery</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
              Payment Method
            </label>
            <input
              type="text"
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleChange}
              required
              className={`w-full px-4 py-2 rounded-lg border ${
                darkMode ? "bg-gray-700 border-gray-600 focus:border-blue-400" : "border-gray-300 focus:border-blue-500"
              } transition duration-300 focus:ring-2 focus:ring-blue-200 outline-none`}
            />
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
              Start Date
            </label>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              required
              className={`w-full px-4 py-2 rounded-lg border ${
                darkMode ? "bg-gray-700 border-gray-600 focus:border-blue-400" : "border-gray-300 focus:border-blue-500"
              } transition duration-300 focus:ring-2 focus:ring-blue-200 outline-none`}
            />
          </div>

          <button
            type="submit"
            className={`w-full py-2 px-4 rounded-lg font-medium transition duration-300 ${
              darkMode ? "bg-blue-600 hover:bg-blue-700 focus:ring-blue-200" : "bg-blue-700 hover:bg-blue-600 focus:ring-blue-100"
            } text-white focus:ring-2 focus:outline-none`}
          >
            Create Subscription
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateSubscription;
