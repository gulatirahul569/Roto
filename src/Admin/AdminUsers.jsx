import React, { useEffect, useState } from "react";
import { useAuth } from "../Context/AuthContext";
import { getAllUsers } from "../api/userApi";

const AdminUsers = () => {
  const { token } = useAuth();
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  // 👇 modal state
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      const data = await getAllUsers(token);
      setUsers(data);
    };

    if (token) fetchUsers();
  }, [token]);

  const filtered = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-black">Users Management</h1>
        <p className="text-gray-500">Manage all registered users</p>
      </div>

      {/* SEARCH */}
      <input
        type="text"
        placeholder="Search users..."
        className="w-full p-3 border rounded"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* TABLE */}
      <div className="bg-white shadow rounded overflow-hidden">
        <table className="w-full table-fixed">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 md:p-3 text-left">Name</th>
              <th className="p-2 md:p-3 text-left">Email</th>
              <th className="p-2 md:p-3 text-left">Role</th>
              <th className="p-2 md:p-3 text-left">Orders</th>
              <th className="p-2 md:p-3 text-left">Status</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((user) => (
              <tr
                key={user._id}
                className="border-t cursor-pointer hover:bg-gray-50"
                onClick={() => setSelectedUser(user)} // 👈 open modal
              >
                <td className="p-2 md:p-3 font-medium truncate">
                  {user.name}
                </td>

                <td className="p-2 md:p-3 text-gray-600 truncate">
                  {user.email}
                </td>

                <td className="p-2 md:p-3">
                  <span
                    className={`px-2 py-1 text-xs rounded ${
                      user.role === "admin"
                        ? "bg-purple-100 text-purple-700"
                        : "bg-gray-100"
                    }`}
                  >
                    {user.role}
                  </span>
                </td>

                <td className="p-2 md:p-3 font-bold">
                  {user.orderCount}
                </td>

                <td className="p-2 md:p-3">
                  <span className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded">
                    Active
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ================= MODAL ================= */}
      {selectedUser && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={() => setSelectedUser(null)} // close on outside click
        >
          <div
            className="bg-white w-[90%] max-w-md rounded-lg p-6 shadow-lg"
            onClick={(e) => e.stopPropagation()} // prevent close on card click
          >
            <h2 className="text-xl font-bold mb-4">User Details</h2>

            <div className="space-y-2 text-sm">
              <p>
                <span className="font-semibold">Name:</span>{" "}
                {selectedUser.name}
              </p>

              <p>
                <span className="font-semibold">Email:</span>{" "}
                {selectedUser.email}
              </p>

              <p>
                <span className="font-semibold">Role:</span>{" "}
                {selectedUser.role}
              </p>

              <p>
                <span className="font-semibold">Orders:</span>{" "}
                {selectedUser.orderCount}
              </p>

              <p>
                <span className="font-semibold">Status:</span> Active
              </p>
            </div>

            <button
              className="mt-5 w-full bg-black text-white py-2 rounded"
              onClick={() => setSelectedUser(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUsers;