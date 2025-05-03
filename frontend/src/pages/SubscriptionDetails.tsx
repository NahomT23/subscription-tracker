import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";
import DarkModeToggle from "../components/DarkModeToggle";
import useThemeStore from "../store/themeStore";
import LoadingMessage from "../components/LoadingMessage";
import toast from "react-hot-toast";

const SubscriptionDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [subscription, setSubscription] = useState<any>(null);
  const [loadingDetail, setLoadingDetail] = useState(true);
  const [cancelling, setCancelling] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const navigate = useNavigate();
  const { darkMode } = useThemeStore();
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchSubscription = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No token");
        const res = await fetch(`${apiUrl}/api/v1/subscriptions/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Failed to fetch subscription");
        const json = await res.json();
        setSubscription(json.data);
      } catch (err) {
        console.error(err);
        toast.error("Could not load subscription");
      } finally {
        setLoadingDetail(false);
      }
    };
    fetchSubscription();
  }, [id]);

  if (loadingDetail) {
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
    setCancelling(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Please log in");
      const res = await fetch(`${apiUrl}/api/v1/subscriptions/${id}/cancel`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error("Failed to cancel subscription");
      const json = await res.json();
      setSubscription(json.data);
      toast.success("Subscription cancelled!");
    } catch (err) {
      console.error(err);
      toast.error((err as Error).message || "Error cancelling");
    } finally {
      setCancelling(false);
    }
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Please log in");
      const res = await fetch(`${apiUrl}/api/v1/subscriptions/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error("Failed to delete subscription");
      toast.success("Subscription deleted!");
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      toast.error((err as Error).message || "Error deleting");
    } finally {
      setDeleting(false);
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

        <div className="overflow-x-auto mb-6">
          <table className="w-full table-auto border-collapse">
            <tbody className={`${darkMode ? "divide-gray-700" : "divide-gray-200"} divide-y`}>
              {[
                ["Name", subscription.name],
                ["Price", `${subscription.price} ${subscription.currency}`],
                ["Frequency", subscription.frequency],
                ["Category", subscription.category],
                ["Payment Method", subscription.paymentMethod],
                [
                  "Start Date",
                  subscription.startDate
                    ? new Date(subscription.startDate).toLocaleDateString("en-GB")
                    : "Not set",
                ],
                [
                  "Renewal Date",
                  subscription.renewalDate
                    ? new Date(subscription.renewalDate).toLocaleDateString("en-GB")
                    : "Not set",
                ],
                ["Status", subscription.status],
              ].map(([label, value]) => (
                <tr
                  key={label}
                  className={`${darkMode ? "hover:bg-gray-700" : "hover:bg-gray-50"} transition duration-200`}
                >
                  <td className={`px-4 py-3 font-medium ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                    {label}
                  </td>
                  <td className={`px-4 py-3 ${darkMode ? "text-gray-100" : "text-gray-800"}`}>
                    {value}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex space-x-4">
          {subscription.status === "active" && (
            <button
              onClick={handleCancel}
              disabled={cancelling}
              className={`flex-1 px-4 py-2 rounded-lg font-medium transition duration-300 flex items-center justify-center focus:outline-none focus:ring-2 ${
                darkMode
                  ? "bg-red-600 hover:bg-red-700 focus:ring-red-200 text-white"
                  : "bg-red-500 hover:bg-red-600 focus:ring-red-100 text-white border border-nlue-500"
              } ${cancelling ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              {cancelling ? <FaSpinner className="animate-spin mr-2" /> : null}
              {cancelling ? "Cancelling..." : "Cancel Subscription"}
            </button>
          )}

          <button
            onClick={handleDelete}
            disabled={deleting}
            className={`flex-1 px-4 py-2 rounded-lg font-medium transition duration-300 flex items-center justify-center focus:outline-none focus:ring-2 ${
              darkMode
                ? "bg-red-800 hover:bg-red-900 focus:ring-red-200 text-white"
                : "bg-red-700 hover:bg-red-600 focus:ring-red-100 text-white border border-red-700"
            } ${deleting ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            {deleting ? <FaSpinner className="animate-spin mr-2" /> : null}
            {deleting ? "Deleting..." : "Delete Subscription"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionDetail;
