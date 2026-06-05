import React, { useEffect, useState } from "react";
import { getAllOrders, updateOrderStatus } from "../api/orderApi";
import { useAuth } from "../Context/AuthContext";

const statusColors = {
  Pending: "bg-yellow-100 text-yellow-700",
  Processing: "bg-blue-100 text-blue-700",
  Shipped: "bg-purple-100 text-purple-700",
  Delivered: "bg-green-100 text-green-700",
  Cancelled: "bg-red-100 text-red-700",
};

const AdminOrders = () => {
  const { token } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const data = await getAllOrders(token);
      setOrders(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (id, status) => {
    await updateOrderStatus(id, status, token);
    fetchOrders();
  };

  if (loading) {
    return (
      <div className="p-10 text-center text-gray-500">
        Loading orders...
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">

      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-3xl font-black">Orders Dashboard</h1>
        <p className="text-gray-500">Manage all customer orders</p>
      </div>

      {/* ORDERS GRID */}
      <div className="space-y-6">

        {orders.map((order) => (
          <div
            key={order._id}
            className="bg-white border shadow-sm rounded-xl p-5"
          >

            {/* TOP SECTION */}
            <div className="flex flex-col md:flex-row md:justify-between gap-4">

              <div>
                <p className="font-semibold">
                  Order ID: {order._id}
                </p>

                <p className="text-sm text-gray-500">
                  User: {order.userId?.name} ({order.userId?.email})
                </p>

                <p className="text-sm text-gray-500">
                  Date: {new Date(order.createdAt).toLocaleString()}
                </p>
              </div>

              {/* STATUS */}
              <div className="flex flex-col gap-2">

                <span
                  className={`px-3 py-1 text-sm font-semibold rounded-full w-fit ${
                    statusColors[order.status]
                  }`}
                >
                  {order.status}
                </span>

                <select
                  value={order.status}
                  onChange={(e) =>
                    handleStatusChange(order._id, e.target.value)
                  }
                  className="border p-2 rounded"
                >
                  <option>Pending</option>
                  <option>Processing</option>
                  <option>Shipped</option>
                  <option>Delivered</option>
                  <option>Cancelled</option>
                </select>

              </div>

            </div>

            {/* ITEMS */}
            <div className="mt-5 border-t pt-4">

              <h3 className="font-semibold mb-3">Items</h3>

              <div className="grid md:grid-cols-2 gap-3">

                {order.items.map((item, index) => (
                  <div
                    key={index}
                    className="flex gap-3 items-center border p-2 rounded"
                  >
                    <img
                      src={item.image}
                      className="w-14 h-14 object-cover rounded"
                    />

                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-500">
                        Qty: {item.quantity}
                      </p>
                      <p className="font-semibold">
                        ₹{item.price * item.quantity}
                      </p>
                    </div>

                  </div>
                ))}

              </div>

            </div>

            {/* FOOTER */}
            <div className="mt-5 flex justify-between border-t pt-4">

              <div className="text-sm text-gray-500">
                Shipping to: {order.shippingAddress?.city},{" "}
                {order.shippingAddress?.state}
              </div>

              <div className="text-xl font-bold">
                Total: ₹{order.total}
              </div>

            </div>

          </div>
        ))}

      </div>
    </div>
  );
};

export default AdminOrders;