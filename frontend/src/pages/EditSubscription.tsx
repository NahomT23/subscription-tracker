
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

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
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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
    return <p>Loading subscription data...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4">Edit Subscription</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Subscription Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-md"
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-md"
          />
          <select
            name="currency"
            value={formData.currency}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
          >
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="BIRR">BIRR</option>
            {/* Add other currencies as needed */}
          </select>
          <select
            name="frequency"
            value={formData.frequency}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
          <input
            type="text"
            name="paymentMethod"
            placeholder="Payment Method"
            value={formData.paymentMethod}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-md"
          />

<input
  type="date"
  name="startDate"
  value={formData.startDate ? new Date(formData.startDate).toISOString().split("T")[0] : ""}
  onChange={handleChange}
  required
  className="w-full px-3 py-2 border rounded-md"
/>

          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition duration-300"
          >
            Update Subscription
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditSubscription;
