import React, { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

const AdminLayout = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  const navItem = (to, label) => (
    <Link
      to={to}
      onClick={() => setSidebarOpen(false)}
      className={`block p-3 rounded-lg transition ${
        isActive(to)
          ? "bg-gray-800 text-white"
          : "text-gray-300 hover:bg-gray-800"
      }`}
    >
      {label}
    </Link>
  );

  return (
    <div className="min-h-screen bg-gray-100">

      {/* MOBILE HEADER */}
      <div className="md:hidden bg-black text-white flex items-center justify-between p-4 sticky top-0 z-50">

        <h2 className="font-bold text-lg">
          Admin Panel
        </h2>

        <button
          onClick={() => setSidebarOpen(true)}
          className="text-2xl"
        >
          ☰
        </button>

      </div>

      {/* MOBILE OVERLAY */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`
          fixed top-0 left-0 h-screen w-75 bg-black text-white p-4
          transform transition-transform duration-300 z-50

          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}

          md:translate-x-0 md:w-80
        `}
      >

        {/* CLOSE BUTTON MOBILE */}
        <div className="flex justify-between items-center mb-6 md:hidden">
          <h2 className="font-bold text-lg">
            Admin Panel
          </h2>

          <button
            onClick={() => setSidebarOpen(false)}
            className="text-xl"
          >
            ✕
          </button>
        </div>

        {/* DESKTOP TITLE */}
        <h2 className="hidden md:block text-lg font-bold mb-6">
          Admin Panel
        </h2>

        {/* NAVIGATION */}
        <nav className="space-y-2 flex-1">

          {navItem("/admin", "📊 Dashboard")}
          {navItem("/admin/products", "📦 Products")}
          {navItem("/admin/add-product", "➕ Add Product")}
          {navItem("/admin/orders", "🧾 Orders")}

          <div className="my-4 border-t border-gray-700"></div>

          {navItem("/admin/users", "👥 Users")}
          {navItem("/admin/settings", "⚙️ Settings")}

          <div className="my-4 border-t border-gray-700"></div>

          <Link
            to="/"
            onClick={() => setSidebarOpen(false)}
            className="block p-3 rounded-lg bg-white text-black font-semibold hover:bg-gray-200"
          >
            ← Back to Store
          </Link>

        </nav>

        {/* USER INFO */}
        <div className="absolute bottom-4 left-4 right-4 border-t border-gray-700 pt-4">

          <p className="text-gray-400 text-xs">
            Logged in as
          </p>

          <p className="font-semibold text-sm truncate">
            {user?.name}
          </p>

          <p className="text-sm truncate">
            {user?.email}
          </p>

          <button
            onClick={logout}
            className="mt-3 w-full bg-red-600 p-2 rounded-lg hover:bg-red-700"
          >
            Logout
          </button>

        </div>

      </aside>

      {/* MAIN CONTENT */}
      <main className="md:ml-80 p-3 sm:p-4 md:p-6">
        <Outlet />
      </main>

    </div>
  );
};

export default AdminLayout;
