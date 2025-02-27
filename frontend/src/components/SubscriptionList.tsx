import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const SubscriptionList: React.FC = () => {
  const [subscriptions, setSubscriptions] = useState<any[]>([]);

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const response = await fetch("http://localhost:5000/api/v1/subscriptions", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch subscriptions");
        }

        const data = await response.json();
        setSubscriptions(data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchSubscriptions();
  }, []);

  return (
    <div>
      {subscriptions.length > 0 ? (
        <ul>
          {subscriptions.map((subscription) => (
            <li key={subscription._id} className="border-b py-2">
              <p>{subscription.name}</p>
              <p>
                Price: {subscription.price} {subscription.currency}
              </p>
              <p>Status: {subscription.status}</p>
              <Link
                to={`/subscriptions/edit/${subscription._id}`}
                className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600 transition duration-300"
              >
                Edit Subscription
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No subscriptions found.</p>
      )}
    </div>
  );
};

export default SubscriptionList;
