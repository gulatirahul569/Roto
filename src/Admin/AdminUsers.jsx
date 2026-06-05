import React, { useEffect, useState } from "react";
import { useAuth } from "../Context/AuthContext";
import { getAllUsers } from "../api/userApi";

const AdminUsers = () => {
  const { token } = useAuth();
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

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

      {/* USERS TABLE */}
      <div className="bg-white shadow rounded overflow-x-auto">

        <table className="w-full">

          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Role</th>
              <th className="p-3 text-left">Orders</th>
              <th className="p-3 text-left">Status</th>
            </tr>
          </thead>

          <tbody>

            {filtered.map((user) => (
              <tr key={user._id} className="border-t">

                <td className="p-3 font-medium">
                  {user.name}
                </td>

                <td className="p-3 text-gray-600">
                  {user.email}
                </td>

                <td className="p-3">
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

                <td className="p-3 font-bold">
                  {user.orderCount}
                </td>

                <td className="p-3">
                  <span className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded">
                    Active
                  </span>
                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default AdminUsers;