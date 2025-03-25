import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import DarkModeToggle from "../components/DarkModeToggle";
import useThemeStore from "../store/themeStore";
import LoadingMessage from "../components/LoadingMessage";
import { toast } from "react-toastify";


const SubscriptionDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [subscription, setSubscription] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); 
  const { darkMode } = useThemeStore();
  const apiUrl = import.meta.env.VITE_API_URL;
  
  useEffect(() => {
    const fetchSubscription = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const response = await fetch(`${apiUrl}/api/v1/subscriptions/${id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch subscription");
        }
        const data = await response.json();
        setSubscription(data.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubscription();
  }, [id]);

  if (loading) {
    return <LoadingMessage message="Loading subscription details..." />;
  }

  if (!subscription) {
    return (
      <div className={`min-h-screen ${darkMode ? "bg-gray-900" : "bg-gray-100"} flex items-center justify-center`}>
        <p className={`${darkMode ? "text-gray-300" : "text-gray-600"}`}>Subscription not found.</p>
      </div>
    );
  }


  
  const handleCancel = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found. Please log in.");
        toast.error("No token found. Please log in.");
        return;
      }
      const response = await fetch(
        `${apiUrl}/api/v1/subscriptions/${id}/cancel`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to cancel subscription");
      }
      const data = await response.json();
      setSubscription(data.data); // Update the subscription state to reflect the cancelled status
      toast.success("Subscription cancelled successfully!");
    } catch (error) {
      console.error("Error cancelling subscription:", error);
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unexpected error occurred while cancelling subscription");
      }
    }
  };
  
  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found. Please log in.");
        toast.error("No token found. Please log in.");
        return;
      }
      const response = await fetch(
        `${apiUrl}/api/v1/subscriptions/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete subscription");
      }
      toast.success("Subscription deleted successfully!");
      // After successful deletion, navigate back to the dashboard or other page
      navigate("/dashboard");
    } catch (error) {
      console.error("Error deleting subscription:", error);
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unexpected error occurred while deleting subscription");
      }
    }
  };
  

  return (
    <div className={`min-h-screen ${darkMode ? "bg-gray-900" : "bg-gray-100"} p-8`}>
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
        className={`max-w-2xl mx-auto rounded-lg shadow-md p-6 transition-colors duration-300 ${
          darkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-800"
        }`}
      >
        <h2 className={`text-2xl font-bold mb-6 ${darkMode ? "text-blue-400" : "text-blue-600"}`}>
          Subscription Details
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse">
            <tbody className={`${darkMode ? "divide-gray-700" : "divide-gray-200"} divide-y`}>
              {Object.entries({
                Name: subscription.name,
                Price: `${subscription.price} ${subscription.currency}`,
                Frequency: subscription.frequency,
                Category: subscription.category,
                "Payment Method": subscription.paymentMethod,
"Start Date": subscription.startDate 
  ? new Date(subscription.startDate).toLocaleDateString('en-GB') 
  : "Not set",

"Renewal Date": subscription.renewalDate 
  ? new Date(subscription.renewalDate).toLocaleDateString('en-GB') 
  : "Not set",

                Status: subscription.status,
              }).map(([label, value]) => (
                <tr
                  key={label}
                  className={`${darkMode ? "hover:bg-gray-700" : "hover:bg-gray-50"} transition duration-200`}
                >
                  <td className={`px-4 py-3 font-medium ${darkMode ? "text-gray-300" : "text-gray-600"}`}>{label}</td>
                  <td className={`px-4 py-3 ${darkMode ? "text-gray-100" : "text-gray-800"}`}>{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Cancel Subscription */}
       {/* Cancel Subscription (only show if active) */}
{subscription.status === "active" && (
  <button
    onClick={handleCancel}
    className={`px-4 py-2 rounded-lg font-medium transition duration-300 ${
      darkMode
        ? "bg-red-600 hover:bg-red-700 focus:ring-red-200"
        : "bg-red-500 hover:bg-red-600 focus:ring-red-100"
    } text-white focus:ring-2 focus:outline-none`}
  >
    Cancel Subscription
  </button>
)}

{/* Delete Subscription (always show) */}
<button
  onClick={handleDelete}
  className={`px-4 py-2 rounded-lg font-medium transition duration-300 ${
    darkMode
      ? "bg-red-800 hover:bg-red-900 focus:ring-red-200"
      : "bg-red-700 hover:bg-red-600 focus:ring-red-100"
  } text-white focus:ring-2 focus:outline-none`}
>
  Delete Subscription
</button>

      </div>
    </div>
  );
};

export default SubscriptionDetail;
