import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import SubscriptionList from "../components/SubscriptionList";
import UpcomingRenewals from "../components/UpcomingRenewals";
import DarkModeToggle from "../components/DarkModeToggle";
import useThemeStore from "../store/themeStore";
import LoadingMessage from "../components/LoadingMessage";


const Dashboard: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();
  const { darkMode } = useThemeStore();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/signin");
          return;
        }
        const response = await fetch("http://localhost:5000/api/v1/users/me", {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
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
    return <LoadingMessage message="Loading your dashboard..." />;
  }


  return (
    <div className={darkMode ? "dark" : ""}>
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{
        minHeight: "100vh",
        background: darkMode ? "#1a202c" : "#f7fafc",
        color: darkMode ? "#f7fafc" : "#1a202c",
        padding: "1rem",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          maxWidth: "1280px",
          width: "100%",
          margin: "0 auto",
          background: darkMode ? "#2d3748" : "#ffffff",
          borderRadius: "0.5rem",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          padding: "1.5rem",
          flex: 1,
        }}
      >
        {/* Header Section */}
        <div style={{ marginBottom: "2rem" }}>
          <h2 style={{ 
            fontSize: "clamp(1.25rem, 4vw, 1.5rem)", 
            fontWeight: 600, 
            marginBottom: "0.5rem" 
          }}>
            Welcome, {user.name}!
          </h2>
          <p style={{ 
            fontSize: "0.875rem",
            color: darkMode ? "#cbd5e0" : "#4a5568" 
          }}>
            {user.email}
          </p>
        </div>

        {/* Actions Bar */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "1rem",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "2rem",
          }}
        >
          <DarkModeToggle />
          
          <div style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "1rem",
            marginLeft: "auto",
          }}>
            <Link
            className="bg-gradient-to-r from-blue-600 to-purple-600"
              to="/subscriptions/create"
              style={{
                color: "#ffffff",
                padding: "0.5rem 1rem",
                borderRadius: "0.25rem",
                textDecoration: "none",
                fontSize: "0.875rem",
                whiteSpace: "nowrap",
              }}
            >
              Create Subscription
            </Link>
            <button
              onClick={handleLogout}
              style={{
                background: "#e53e3e",
                color: "#ffffff",
                padding: "0.5rem 1rem",
                borderRadius: "0.25rem",
                border: "none",
                cursor: "pointer",
                fontSize: "0.875rem",
                whiteSpace: "nowrap",
              }}
            >
              Logout
            </button>
          </div>
        </div>

        {/* Content Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "1.5rem",
        }}>
          <div>
            <h3 style={{ 
              fontSize: "1.125rem",
              fontWeight: 600,
              marginBottom: "1rem",
              color: darkMode ? "#cbd5e0" : "#2d3748"
            }}>
              Your Subscriptions
            </h3>
            <SubscriptionList />
          </div>
          
          <div>
            <h3 style={{ 
              fontSize: "1.125rem",
              fontWeight: 600,
              marginBottom: "1rem",
              color: darkMode ? "#cbd5e0" : "#2d3748"
            }}>
              Upcoming Renewals
            </h3>
            <UpcomingRenewals />
          </div>
        </div>
      </div>
    </motion.div>
  </div>

  );
};

export default Dashboard;


