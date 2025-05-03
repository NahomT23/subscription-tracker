
import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import useThemeStore from "../store/themeStore";
import { Line, Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { useQuery } from "@tanstack/react-query";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  BarElement,
  Tooltip,
  Legend
);

interface Subscription {
  name: string;
  price: number;
  currency: string;
  frequency: "daily" | "weekly" | "monthly" | "yearly";
  category: string;
  status: "active" | "cancelled" | "expired";
  startDate: string;
  renewalDate: string;
}

const Analytics: React.FC = () => {
  const { darkMode } = useThemeStore();
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });






  const { data: subscriptions, isLoading, isError } = useQuery({
    queryKey: ["subscriptions"], 
    queryFn: async () => {
      const token = localStorage.getItem("token");
      const apiUrl = import.meta.env.VITE_API_URL;
      const response = await fetch(`${apiUrl}/api/v1/subscriptions`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!response.ok) throw new Error("Failed to fetch subscriptions");
      return (await response.json()).data as Subscription[];
    },
    enabled: !!localStorage.getItem("token") 
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching data</div>;
  if (!subscriptions) return <div>No subscriptions found</div>; // Add null check

  
  // Helper: Convert subscription price to monthly cost
  const getMonthlyCost = (sub: Subscription): number => {
    switch (sub.frequency) {
      case "daily":
        return sub.price * 30;
      case "weekly":
        return sub.price * 4;
      case "monthly":
        return sub.price;
      case "yearly":
        return sub.price / 12;
      default:
        return sub.price;
    }
  };

  // Compute analytics data
  const monthlySpendingMap: { [month: string]: number } = {};
  const categoryMap: { [category: string]: number } = {};
  let activeCount = 0;
  let cancelledCount = 0;
  let totalMonthlyCost = 0;

  subscriptions.forEach((sub) => {
    const monthlyCost = getMonthlyCost(sub);
    totalMonthlyCost += monthlyCost;

    // Group spending by renewal month (e.g., "Jan 2023")
    const date = new Date(sub.renewalDate);
    const monthYear = date.toLocaleString("default", { month: "short", year: "numeric" });
    monthlySpendingMap[monthYear] = (monthlySpendingMap[monthYear] || 0) + monthlyCost;

    // Sum costs by category
    categoryMap[sub.category] = (categoryMap[sub.category] || 0) + monthlyCost;

    // Count statuses (only active and cancelled)
    if (sub.status === "active") activeCount++;
    else if (sub.status === "cancelled") cancelledCount++;
  });

  // Sort the month labels chronologically
  const sortedMonths = Object.keys(monthlySpendingMap).sort(
    (a, b) => new Date(a).getTime() - new Date(b).getTime()
  );

  // 1. Monthly/Yearly Spending Trends (Line Chart)
  const spendingTrendData = {
    labels: sortedMonths,
    datasets: [
      {
        label: "Monthly Spending",
        data: sortedMonths.map((month) => monthlySpendingMap[month]),
        borderColor: darkMode ? "#90cdf4" : "#3182ce",
        backgroundColor: darkMode
          ? "rgba(144,205,244,0.2)"
          : "rgba(49,130,206,0.2)",
        fill: true,
      },
    ],
  };

  const spendingTrendOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: { color: darkMode ? "#f7fafc" : "#1a202c" },
      },
    },
    scales: {
      x: {
        ticks: { color: darkMode ? "#f7fafc" : "#1a202c" },
        grid: { color: darkMode ? "#4a5568" : "#e2e8f0" },
      },
      y: {
        ticks: { color: darkMode ? "#f7fafc" : "#1a202c" },
        grid: { color: darkMode ? "#4a5568" : "#e2e8f0" },
      },
    },
  };

  // 2. Category Breakdown (Pie Chart)
  const categoryLabels = Object.keys(categoryMap);
  const categoryValues = categoryLabels.map((cat) => categoryMap[cat]);
  const categoryData = {
    labels: categoryLabels,
    datasets: [
      {
        label: "Category Spending",
        data: categoryValues,
        backgroundColor: categoryLabels.map((_, i) => {
          const lightColors = ["#ed8936", "#48bb78", "#4299e1", "#9f7aea", "#ed64a6"];
          const darkColors = ["#f6ad55", "#68d391", "#63b3ed", "#d53f8c", "#ed64a6"];
          return darkMode ? darkColors[i % darkColors.length] : lightColors[i % lightColors.length];
        }),
        borderWidth: 1,
      },
    ],
  };

  const categoryOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: { color: darkMode ? "#f7fafc" : "#1a202c" },
      },
    },
  };

  // 3. Active vs Cancelled Subscriptions (Stacked Bar Chart)
  const activeCancelledData = {
    labels: ["Subscriptions"],
    datasets: [
      {
        label: "Active",
        data: [activeCount],
        backgroundColor: darkMode ? "#68d391" : "#48bb78",
      },
      {
        label: "Cancelled",
        data: [cancelledCount],
        backgroundColor: darkMode ? "#f56565" : "#e53e3e",
      },
    ],
  };

  const activeCancelledOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: { color: darkMode ? "#f7fafc" : "#1a202c" },
      },
    },
    scales: {
      x: {
        stacked: true,
        ticks: { color: darkMode ? "#f7fafc" : "#1a202c" },
        grid: { color: darkMode ? "#4a5568" : "#e2e8f0" },
      },
      y: {
        stacked: true,
        ticks: { color: darkMode ? "#f7fafc" : "#1a202c" },
        grid: { color: darkMode ? "#4a5568" : "#e2e8f0" },
      },
    },
  };

  // 4. Cost Per Day/Week/Month (Line Chart)
  const avgMonthlyCost = subscriptions.length > 0 ? totalMonthlyCost / subscriptions.length : 0;
  const avgWeeklyCost = avgMonthlyCost / 4;
  const avgDailyCost = avgMonthlyCost / 30;

  const costData = {
    labels: ["Daily", "Weekly", "Monthly"],
    datasets: [
      {
        label: "Average Cost",
        data: [
          parseFloat(avgDailyCost.toFixed(2)),
          parseFloat(avgWeeklyCost.toFixed(2)),
          parseFloat(avgMonthlyCost.toFixed(2)),
        ],
        borderColor: darkMode ? "#90cdf4" : "#3182ce",
        backgroundColor: darkMode
          ? "rgba(144,205,244,0.2)"
          : "rgba(49,130,206,0.2)",
        fill: true,
      },
    ],
  };

  const costOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: { color: darkMode ? "#f7fafc" : "#1a202c" },
      },
    },
    scales: {
      x: {
        ticks: { color: darkMode ? "#f7fafc" : "#1a202c" },
        grid: { color: darkMode ? "#4a5568" : "#e2e8f0" },
      },
      y: {
        ticks: { color: darkMode ? "#f7fafc" : "#1a202c" },
        grid: { color: darkMode ? "#4a5568" : "#e2e8f0" },
      },
    },
  };


  return (
<div ref={ref} className="mt-8">
  <h3 className="text-2xl font-semibold mb-4" style={{ color: darkMode ? "#cbd5e0" : "#2d3748" }}>
    Analytics
  </h3>
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={inView ? { opacity: 1, y: 0 } : {}}
    transition={{ duration: 0.5 }}
    className="grid grid-cols-1 md:grid-cols-2 gap-4"
  >
    {/* Monthly/Yearly Spending Trends */}
    <div className={`p-4 rounded-lg shadow ${darkMode ? "bg-gray-800" : "bg-white"}`}>
      <h4 className="text-lg font-medium mb-2" style={{ color: darkMode ? "#cbd5e0" : "#2d3748" }}>
        Monthly/Yearly Spending Trends
      </h4>
      <div className="relative h-64">
        <Line data={spendingTrendData} options={spendingTrendOptions} />
      </div>
    </div>

    {/* Category Breakdown */}
    <div className={`p-4 rounded-lg shadow ${darkMode ? "bg-gray-800" : "bg-white"}`}>
      <h4 className="text-lg font-medium mb-2" style={{ color: darkMode ? "#cbd5e0" : "#2d3748" }}>
        Category Breakdown
      </h4>
      <div className="relative h-64">
        <Pie data={categoryData} options={categoryOptions} />
      </div>
    </div>

    {/* Active vs Cancelled Subscriptions */}
    <div className={`p-4 rounded-lg shadow ${darkMode ? "bg-gray-800" : "bg-white"}`}>
      <h4 className="text-lg font-medium mb-2" style={{ color: darkMode ? "#cbd5e0" : "#2d3748" }}>
        Active vs Cancelled
      </h4>
      <div className="relative h-48">
        <Bar data={activeCancelledData} options={activeCancelledOptions} />
      </div>
    </div>

    {/* Cost Per Day/Week/Month */}
    <div className={`p-4 rounded-lg shadow ${darkMode ? "bg-gray-800" : "bg-white"}`}>
      <h4 className="text-lg font-medium mb-2" style={{ color: darkMode ? "#cbd5e0" : "#2d3748" }}>
        Cost Per Period
      </h4>
      <div className="relative h-48">
        <Line data={costData} options={costOptions} />
      </div>
    </div>
  </motion.div>
</div>
  );
};

export default Analytics;
