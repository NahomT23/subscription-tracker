import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import useThemeStore from "../store/themeStore";
import DarkModeToggle from "../components/DarkModeToggle";
import LoadingMessage from "../components/LoadingMessage";

const EditSubscription: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [formData, setFormData] = useState({
    name: "",
    price: 0,
    currency: "USD",
    frequency: "monthly",
    category: "other",
    paymentMethod: "",
    startDate: "",
    status: "active",
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { darkMode } = useThemeStore();

  useEffect(() => {
    const fetchSubscription = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const response = await fetch(`http://localhost:5000/api/v1/subscriptions/${id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch subscription");
        }

        const data = await response.json();
        setFormData(data.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchSubscription();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const response = await fetch(`http://localhost:5000/api/v1/subscriptions/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to update subscription");
      }

      navigate("/dashboard");
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return <LoadingMessage message="Loading subscription data..." />;
  }

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

      {/* Dark Mode Toggle (Positioned similarly to Dashboard) */}
      <div className="fixed top-4 right-4 z-50">
        <DarkModeToggle />
      </div>

      <div
        className={`max-w-md mx-auto rounded-lg shadow-md p-6 transition-colors duration-300 ${
          darkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-800"
        }`}
      >
        <h2 className={`text-2xl font-bold mb-6 ${darkMode ? "text-blue-400" : "text-blue-600"}`}>
          Edit Subscription
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
                darkMode
                  ? "bg-gray-700 border-gray-600 focus:border-blue-400"
                  : "border-gray-300 focus:border-blue-500"
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
                darkMode
                  ? "bg-gray-700 border-gray-600 focus:border-blue-400"
                  : "border-gray-300 focus:border-blue-500"
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
                darkMode
                  ? "bg-gray-700 border-gray-600 focus:border-blue-400"
                  : "border-gray-300 focus:border-blue-500"
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
                darkMode
                  ? "bg-gray-700 border-gray-600 focus:border-blue-400"
                  : "border-gray-300 focus:border-blue-500"
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
              Payment Method
            </label>
            <input
              type="text"
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleChange}
              required
              className={`w-full px-4 py-2 rounded-lg border ${
                darkMode
                  ? "bg-gray-700 border-gray-600 focus:border-blue-400"
                  : "border-gray-300 focus:border-blue-500"
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
              value={formData.startDate ? new Date(formData.startDate).toISOString().split("T")[0] : ""}
              onChange={handleChange}
              required
              className={`w-full px-4 py-2 rounded-lg border ${
                darkMode
                  ? "bg-gray-700 border-gray-600 focus:border-blue-400"
                  : "border-gray-300 focus:border-blue-500"
              } transition duration-300 focus:ring-2 focus:ring-blue-200 outline-none`}
            />
          </div>

          
          <div>
            <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
              Subscription Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className={`w-full px-4 py-2 rounded-lg border ${
                darkMode
                  ? "bg-gray-700 border-gray-600 focus:border-blue-400"
                  : "border-gray-300 focus:border-blue-500"
              } transition duration-300 focus:ring-2 focus:ring-blue-200 outline-none`}
            >
              <option value="active">Active</option>
              <option value="cancelled">Cancel</option>
            </select>
          </div>

          <button
            type="submit"
            className={`w-full py-2 px-4 rounded-lg font-medium transition duration-300 ${
              darkMode
                ? "bg-green-600 hover:bg-green-700 focus:ring-green-200"
                : "bg-green-500 hover:bg-green-600 focus:ring-green-100"
            } text-white focus:ring-2 focus:outline-none`}
          >
            Update Subscription
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditSubscription;