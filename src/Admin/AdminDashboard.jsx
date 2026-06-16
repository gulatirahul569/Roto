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
  Filler,
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

/* ── STATUS BADGE ─────────────────────────────────────────── */
const StatusDot = ({ color }) => (
  <span
    className={`inline-block w-2 h-2 rounded-full mr-2 ${color}`}
  />
);

/* ── KPI CARD ─────────────────────────────────────────────── */
const KpiCard = ({ title, value, icon, gradient, change }) => (
  <div
    className={`relative overflow-hidden rounded-2xl p-5 text-white shadow-lg ${gradient}`}
  >
    {/* Background decorative circle */}
    <div className="absolute -right-4 -top-4 w-24 h-24 rounded-full bg-white/10" />
    <div className="absolute -right-1 -bottom-6 w-16 h-16 rounded-full bg-white/10" />

    <div className="relative z-10">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-semibold uppercase tracking-widest text-white/70">
          {title}
        </span>
        <span className="text-2xl">{icon}</span>
      </div>

      <p className="text-3xl font-black tracking-tight leading-none">
        {value}
      </p>

      {change && (
        <p className="mt-2 text-xs text-white/70">{change}</p>
      )}
    </div>
  </div>
);

/* ── STATUS ROW ───────────────────────────────────────────── */
const StatusRow = ({ icon, label, value, dotColor }) => (
  <div className="flex items-center justify-between py-2.5 border-b border-gray-100 last:border-0">
    <div className="flex items-center text-sm text-gray-600">
      <StatusDot color={dotColor} />
      <span>{label}</span>
    </div>
    <span className="text-sm font-bold text-gray-800">{value}</span>
  </div>
);

/* ── MAIN COMPONENT ───────────────────────────────────────── */
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
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-gray-500 text-sm font-medium">
            Loading dashboard…
          </p>
        </div>
      </div>
    );
  }

  const chartData = {
    labels: data.revenueChart?.map((d) => d.month) || [],
    datasets: [
      {
        label: "Revenue (₹)",
        data: data.revenueChart?.map((d) => d.revenue) || [],
        borderColor: "#6366f1",
        backgroundColor: "rgba(99,102,241,0.08)",
        borderWidth: 2.5,
        pointBackgroundColor: "#6366f1",
        pointRadius: 4,
        pointHoverRadius: 6,
        tension: 0.45,
        fill: true,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "#1e1b4b",
        titleColor: "#a5b4fc",
        bodyColor: "#fff",
        padding: 10,
        cornerRadius: 8,
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: "#9ca3af", font: { size: 11 } },
      },
      y: {
        grid: { color: "#f3f4f6" },
        ticks: { color: "#9ca3af", font: { size: 11 } },
      },
    },
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 md:p-8 space-y-6 max-w-7xl mx-auto">

      {/* ── HEADER ── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-indigo-500 mb-0.5">
            Control Centre
          </p>
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
            Admin Dashboard
          </h1>
          <p className="text-sm text-gray-400 mt-0.5">
            Store performance at a glance
          </p>
        </div>

        <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-4 py-2 shadow-sm self-start sm:self-auto">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-medium text-gray-500">Live data</span>
        </div>
      </div>

      {/* ── KPI CARDS ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        <KpiCard
          title="Products"
          value={data.products}
          icon="📦"
          gradient="bg-gradient-to-br from-indigo-500 to-indigo-700"
        />
        <KpiCard
          title="Orders"
          value={data.orders}
          icon="🛒"
          gradient="bg-gradient-to-br from-emerald-500 to-emerald-700"
        />
        <KpiCard
          title="Users"
          value={data.users}
          icon="👤"
          gradient="bg-gradient-to-br from-amber-400 to-orange-500"
        />
        <KpiCard
          title="Revenue"
          value={`₹${data.revenue?.toLocaleString("en-IN")}`}
          icon="💰"
          gradient="bg-gradient-to-br from-purple-500 to-purple-800"
        />
      </div>

      {/* ── INSIGHTS + CHART ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

        {/* Quick Insights */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-lg">⚡</span>
            <h3 className="font-bold text-gray-800 text-sm uppercase tracking-wide">
              Order Status
            </h3>
          </div>

          <div className="space-y-1">
            <StatusRow
              label="Pending"
              value={data.pendingOrders || 0}
              dotColor="bg-amber-400"
            />
            <StatusRow
              label="Shipped"
              value={data.shippedOrders || 0}
              dotColor="bg-blue-400"
            />
            <StatusRow
              label="Delivered"
              value={data.deliveredOrders || 0}
              dotColor="bg-emerald-400"
            />
          </div>

          {/* Mini progress bars */}
          {(() => {
            const total =
              (data.pendingOrders || 0) +
              (data.shippedOrders || 0) +
              (data.deliveredOrders || 0);
            const pct = (n) =>
              total ? Math.round((n / total) * 100) : 0;
            return (
              <div className="mt-4 space-y-2">
                {[
                  {
                    label: "Pending",
                    pct: pct(data.pendingOrders),
                    color: "bg-amber-400",
                  },
                  {
                    label: "Shipped",
                    pct: pct(data.shippedOrders),
                    color: "bg-blue-400",
                  },
                  {
                    label: "Delivered",
                    pct: pct(data.deliveredOrders),
                    color: "bg-emerald-400",
                  },
                ].map(({ label, pct, color }) => (
                  <div key={label}>
                    <div className="flex justify-between text-xs text-gray-400 mb-0.5">
                      <span>{label}</span>
                      <span>{pct}%</span>
                    </div>
                    <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${color} transition-all duration-700`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            );
          })()}
        </div>

        {/* Revenue Chart */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-gray-800 text-sm uppercase tracking-wide">
                Revenue Trend
              </h3>
              <p className="text-xs text-gray-400 mt-0.5">
                Monthly overview
              </p>
            </div>
            <span className="text-xs bg-indigo-50 text-indigo-600 font-semibold px-3 py-1 rounded-full">
              This Year
            </span>
          </div>

          <div className="h-56 sm:h-72">
            <Line data={chartData} options={chartOptions} />
          </div>
        </div>

      </div>

      {/* ── BOTTOM SECTION ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

        {/* Top Products */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-lg">🔥</span>
            <h3 className="font-bold text-gray-800 text-sm uppercase tracking-wide">
              Top Products
            </h3>
          </div>

          {data.topProducts?.length ? (
            <div className="space-y-1">
              {data.topProducts.map((p, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between py-2.5 border-b border-gray-100 last:border-0 group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="text-xs font-black text-gray-300 w-5 shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-sm text-gray-700 truncate group-hover:text-indigo-600 transition-colors">
                      {p.name}
                    </span>
                  </div>
                  <span className="text-sm font-bold text-gray-800 whitespace-nowrap ml-3">
                    ₹{p.sales?.toLocaleString("en-IN")}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-8 text-gray-300">
              <span className="text-4xl mb-2">📭</span>
              <p className="text-sm">No product data yet</p>
            </div>
          )}
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-lg">🧾</span>
            <h3 className="font-bold text-gray-800 text-sm uppercase tracking-wide">
              Recent Orders
            </h3>
          </div>

          {data.recentOrders?.length ? (
            <div className="space-y-1">
              {data.recentOrders.map((o, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between py-2.5 border-b border-gray-100 last:border-0"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    {/* Avatar */}
                    <div className="w-7 h-7 rounded-full bg-indigo-100 flex items-center justify-center shrink-0">
                      <span className="text-xs font-bold text-indigo-600">
                        {o.shippingAddress?.fullName?.[0]?.toUpperCase() || "?"}
                      </span>
                    </div>
                    <span className="text-sm text-gray-700 truncate">
                      {o.shippingAddress?.fullName || "—"}
                    </span>
                  </div>
                  <span className="text-sm font-bold text-gray-800 whitespace-nowrap ml-3">
                    ₹{o.total?.toLocaleString("en-IN")}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-8 text-gray-300">
              <span className="text-4xl mb-2">📭</span>
              <p className="text-sm">No recent orders</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;