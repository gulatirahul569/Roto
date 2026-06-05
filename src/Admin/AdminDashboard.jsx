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
    const fetch = async () => {
      const res = await getAdminStats(token);
      setData(res);
    };

    if (token) fetch();
  }, [token]);

  if (!data) {
    return (
      <div className="space-y-4">
        <p className="text-xl font-bold">Loading Dashboard...</p>
      </div>
    );
  }

  const chartData = {
    labels: data.revenueChart.map((d) => d.month),
    datasets: [
      {
        label: "Revenue",
        data: data.revenueChart.map((d) => d.revenue),
        borderColor: "#000",
        backgroundColor: "#00000010",
        tension: 0.4,
      },
    ],
  };

  return (
    <div className="space-y-8">

      {/* HEADER */}
      <div>
        <h1 className="text-4xl font-black">Admin Dashboard</h1>
        <p className="text-gray-500">
          Overview of your store performance
        </p>
      </div>

      {/* KPI CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

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

      {/* SECOND ROW INSIGHTS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        <div className="bg-white p-5 rounded shadow">
          <h3 className="font-bold mb-2">🔥 Quick Insights</h3>

          <p>📦 Pending Orders: {data.pendingOrders || 0}</p>
          <p>🚚 Shipped Orders: {data.shippedOrders || 0}</p>
          <p>✅ Delivered: {data.deliveredOrders || 0}</p>
        </div>

        <div className="bg-white p-5 rounded shadow col-span-2">
          <h3 className="font-bold mb-3">Revenue Chart</h3>
          <Line data={chartData} />
        </div>

      </div>

      {/* BOTTOM SECTION */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {/* TOP PRODUCTS */}
        <div className="bg-white p-5 rounded shadow">
          <h3 className="font-bold mb-3">🔥 Top Products</h3>

          {data.topProducts?.length ? (
            data.topProducts.map((p, i) => (
              <div
                key={i}
                className="flex justify-between border-b py-2"
              >
                <span>{p.name}</span>
                <span className="font-bold">₹{p.sales}</span>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No data</p>
          )}
        </div>

        {/* RECENT ORDERS */}
        <div className="bg-white p-5 rounded shadow">
          <h3 className="font-bold mb-3">🧾 Recent Orders</h3>

          {data.recentOrders?.length ? (
            data.recentOrders.map((o, i) => (
              <div
                key={i}
                className="flex justify-between border-b py-2"
              >
                <span>{o.shippingAddress?.fullName}</span>
                <span className="text-sm text-gray-500">
                  ₹{o.total}
                </span>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No orders</p>
          )}
        </div>

      </div>

    </div>
  );
};

/* CARD COMPONENT */
const Card = ({ title, value, color }) => (
  <div className={`${color} p-5 rounded shadow`}>
    <p className="text-gray-600">{title}</p>
    <h2 className="text-3xl font-black">{value}</h2>
  </div>
);

export default AdminDashboard;