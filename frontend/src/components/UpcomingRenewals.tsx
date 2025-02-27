import React, { useEffect, useState } from "react";

const UpcomingRenewals: React.FC = () => {
  const [renewals, setRenewals] = useState<any[]>([]);

  useEffect(() => {
    const fetchRenewals = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const response = await fetch("http://localhost:5000/api/v1/subscriptions/upcoming-renewals", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch renewals");
        }

        const data = await response.json();
        setRenewals(data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchRenewals();
  }, []);

  return (
    <div>
      {renewals.length > 0 ? (
        <ul>
          {renewals.map((renewal) => (
            <li key={renewal._id} className="border-b py-2">
              <p>{renewal.name}</p>
              {/* <p>Renewal Date: {new Date(renewal.renewalDate).toLocaleDateString()}</p> */}
              <p>Renewal Date: {new Date(renewal.renewalDate).toLocaleDateString('en-GB')}</p>

            </li>
          ))}
        </ul>
      ) : (
        <p>No upcoming renewals.</p>
      )}
    </div>
  );
};

export default UpcomingRenewals;