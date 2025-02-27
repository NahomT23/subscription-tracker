import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import SubscriptionList from "../components/SubscriptionList";
import UpcomingRenewals from "../components/UpcomingRenewals";

const Dashboard: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/signin"); // Redirect to sign in if no token
          return;
        }

        const response = await fetch("http://localhost:5000/api/v1/users/me", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user");
        }

        const data = await response.json();
        setUser(data.data);
      } catch (error) {
        console.error(error);
        navigate("/signin");
      }
    };

    fetchUser();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/signin");
  };

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4">Welcome, {user.name}!</h2>
        <p className="text-gray-700 mb-4">Email: {user.email}</p>

        {/* Navigation Links */}
        <div className="flex justify-between mb-6">
          <Link
            to="/subscriptions/create"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
          >
            Create Subscription
          </Link>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300"
          >
            Logout
          </button>
        </div>

        {/* Subscriptions List */}
        <h3 className="text-xl font-semibold mt-6 mb-4">Your Subscriptions</h3>
        <SubscriptionList />

        {/* Upcoming Renewals */}
        <h3 className="text-xl font-semibold mt-6 mb-4">Upcoming Renewals</h3>
        <UpcomingRenewals />
      </div>
    </div>
  );
};

export default Dashboard;