import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

const AdminLayout = () => {
    const { user, logout } = useAuth();
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    const navItem = (to, label) => (
        <Link
            to={to}
            className={`block p-2 rounded transition ${isActive(to)
                    ? "bg-gray-800 text-white"
                    : "hover:bg-gray-800 text-gray-300"
                }`}
        >
            {label}
        </Link>
    );

    return (
        <div className="min-h-screen bg-gray-100">

            {/* SIDEBAR */}
            <div className="w-64 bg-black text-white p-4 fixed left-0 top-0 h-screen flex flex-col">

                {/* HEADER */}
                <h2 className="text-lg font-bold mb-4">
                    Admin Panel
                </h2>

                {/* NAV */}
                <nav className="space-y-2 text-sm flex-1 overflow-hidden">

                    {navItem("/admin", "Dashboard")}
                    {navItem("/admin/products", "Products")}
                    {navItem("/admin/add-product", "Add Product")}
                    {navItem("/admin/orders", "Orders")}

                    <div className="my-3 border-t border-gray-700"></div>

                    {navItem("/admin/users", "Users")}
                    {navItem("/admin/settings", "Settings")}

                    <div className="my-6 border-t border-gray-700"></div>

                    {/* BACK TO STORE */}
                    <Link
                        to="/"
                        className="block p-2 rounded bg-white text-black font-semibold hover:bg-gray-200"
                    >
                        ← Back to Store
                    </Link>

                </nav>

                {/* USER INFO (COMPACT) */}
                <div className="mt-auto pt-3 border-t border-gray-700 text-xs">

                    <p className="text-gray-400">Logged in as:</p>
                    <p className="font-semibold text-sm">{user?.name}</p>
                    <p className="font-semibold text-sm">{user?.email}</p>

                    <button
                        onClick={logout}
                        className="mt-2 w-full bg-red-600 p-1 rounded hover:bg-red-700 text-sm"
                    >
                        Logout
                    </button>

                </div>

            </div>

            {/* MAIN CONTENT */}
            <div className="ml-64 p-6">
                <Outlet />
            </div>

        </div>
    );
};

export default AdminLayout; 