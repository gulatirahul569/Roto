import React, { useEffect, useState } from "react";
import { useAuth } from "../Context/AuthContext";
import { getAdminStats } from "../api/adminApi";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const AdminDashboard = () => {
  const { token } = useAuth();
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getAdminStats(token);
        setData(res);
      } catch (err) {
        console.error(err);
      }
    };

    if (token) fetchData();
  }, [token]);

  if (!data) {
    return (
      <div className="p-4">
        <p className="text-lg md:text-xl font-bold">
          Loading Dashboard...
        </p>
      </div>
    );
  }

  const chartData = {
    labels: data.revenueChart?.map((d) => d.month) || [],
    datasets: [
      {
        label: "Revenue",
        data: data.revenueChart?.map((d) => d.revenue) || [],
        borderColor: "#000",
        backgroundColor: "#00000010",
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className="space-y-6 px-3 sm:px-4 md:px-0">

      {/* HEADER */}
      <div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-black">
          Admin Dashboard
        </h1>

        <p className="text-sm sm:text-base text-gray-500 mt-1">
          Overview of your store performance
        </p>
      </div>

      {/* KPI CARDS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">

        <Card
          title="Products"
          value={data.products}
          color="bg-blue-100"
        />

        <Card
          title="Orders"
          value={data.orders}
          color="bg-green-100"
        />

        <Card
          title="Users"
          value={data.users}
          color="bg-yellow-100"
        />

        <Card
          title="Revenue"
          value={`₹${data.revenue}`}
          color="bg-purple-100"
        />

      </div>

      {/* INSIGHTS + CHART */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

        <div className="bg-white p-4 md:p-5 rounded-xl shadow">
          <h3 className="font-bold mb-3">
            🔥 Quick Insights
          </h3>

          <div className="space-y-2 text-sm sm:text-base">
            <p>📦 Pending Orders: {data.pendingOrders || 0}</p>
            <p>🚚 Shipped Orders: {data.shippedOrders || 0}</p>
            <p>✅ Delivered: {data.deliveredOrders || 0}</p>
          </div>
        </div>

        <div className="bg-white p-4 md:p-5 rounded-xl shadow lg:col-span-2">

          <h3 className="font-bold mb-4">
            Revenue Chart
          </h3>

          <div className="h-62 sm:h-80">
            <Line
              data={chartData}
              options={chartOptions}
            />
          </div>

        </div>

      </div>

      {/* BOTTOM SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

        {/* TOP PRODUCTS */}
        <div className="bg-white p-4 md:p-5 rounded-xl shadow">

          <h3 className="font-bold mb-3">
            🔥 Top Products
          </h3>

          {data.topProducts?.length ? (
            data.topProducts.map((p, i) => (
              <div
                key={i}
                className="flex justify-between gap-3 border-b py-2 text-sm sm:text-base"
              >
                <span className="truncate">
                  {p.name}
                </span>

                <span className="font-bold whitespace-nowrap">
                  ₹{p.sales}
                </span>
              </div>
            ))
          ) : (
            <p className="text-gray-500">
              No data
            </p>
          )}
        </div>

        {/* RECENT ORDERS */}
        <div className="bg-white p-4 md:p-5 rounded-xl shadow">

          <h3 className="font-bold mb-3">
            🧾 Recent Orders
          </h3>

          {data.recentOrders?.length ? (
            data.recentOrders.map((o, i) => (
              <div
                key={i}
                className="flex justify-between gap-3 border-b py-2 text-sm sm:text-base"
              >
                <span className="truncate">
                  {o.shippingAddress?.fullName}
                </span>

                <span className="text-gray-500 whitespace-nowrap">
                  ₹{o.total}
                </span>
              </div>
            ))
          ) : (
            <p className="text-gray-500">
              No orders
            </p>
          )}
        </div>

      </div>

    </div>
  );
};

/* CARD COMPONENT */
const Card = ({ title, value, color }) => (
  <div
    className={`${color} p-4 md:p-5 rounded-xl shadow`}
  >
    <p className="text-xs sm:text-sm text-gray-600">
      {title}
    </p>

    <h2 className="text-xl sm:text-2xl md:text-3xl font-black wrap-break-words">
      {value}
    </h2>
  </div>
);

export default AdminDashboard;
