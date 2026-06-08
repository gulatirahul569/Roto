import React, { useState } from "react";
import { useCart } from "../Context/CartContext";
import { useAuth } from "../Context/AuthContext";

import {
  FaLock,
  FaTruck,
  FaCreditCard,
  FaMapMarkerAlt,
} from "react-icons/fa";

const Checkout = () => {
  const { cartItems, clearCart } = useCart();
  const { user } = useAuth();

  const [loading, setLoading] = useState(false);

  const [shipping, setShipping] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const shippingCharge = subtotal > 5000 ? 0 : 199;
  const total = subtotal + shippingCharge;

  const handleChange = (e) => {
    setShipping({
      ...shipping,
      [e.target.name]: e.target.value,
    });
  };

  // ✅ PLACE ORDER (BACKEND CONNECTED)
  const handleOrder = async () => {
    if (!user) {
      alert("Please login first");
      return;
    }

    if (cartItems.length === 0) {
      alert("Cart is empty");
      return;
    }

    if (
      !shipping.fullName ||
      !shipping.phone ||
      !shipping.address ||
      !shipping.city ||
      !shipping.state ||
      !shipping.pincode
    ) {
      alert("Please fill all shipping details");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
           Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          userId: user._id,
          items: cartItems,
          shippingAddress: shipping,
          subtotal,
          shippingCharge,
          total,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Order placed successfully!");
        clearCart();

        setShipping({
          fullName: "",
          phone: "",
          address: "",
          city: "",
          state: "",
          pincode: "",
        });
      } else {
        alert(data.message || "Order failed");
      }
    } catch (error) {
      console.log(error);
      alert("Server error while placing order");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f4f4] px-4 md:px-10 py-10">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10 gap-5">

        <div>
          <p className="uppercase tracking-[4px] text-sm text-zinc-500">
            Secure Checkout
          </p>

          <h1 className="text-4xl md:text-5xl font-black mt-2">
            Complete Your Order
          </h1>
        </div>

        <div className="flex items-center gap-3 bg-white px-5 py-3 border border-zinc-200 shadow-sm">
          <FaLock />
          <p className="text-sm font-medium">100% Secure Payments</p>
        </div>

      </div>

      {/* EMPTY CART */}
      {cartItems.length === 0 ? (
        <div className="bg-white border border-zinc-200 p-16 text-center">
          <h2 className="text-3xl font-bold mb-3">Your Cart is Empty</h2>
          <p className="text-zinc-500">
            Add products to continue checkout.
          </p>
        </div>
      ) : (

        <div className="grid grid-cols-1 xl:grid-cols-[1.2fr_0.8fr] gap-8">

          {/* LEFT */}
          <div className="space-y-8">

            {/* SHIPPING */}
            <div className="bg-white border border-zinc-200 shadow-sm p-8">

              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-black text-white flex items-center justify-center">
                  <FaMapMarkerAlt />
                </div>

                <div>
                  <h2 className="text-2xl font-bold">Shipping Details</h2>
                  <p className="text-sm text-zinc-500">
                    Enter delivery information
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                <input name="fullName" placeholder="Full Name"
                  value={shipping.fullName} onChange={handleChange}
                  className="border px-4 py-3 bg-zinc-50"
                />

                <input name="phone" placeholder="Phone"
                  value={shipping.phone} onChange={handleChange}
                  className="border px-4 py-3 bg-zinc-50"
                />

                <input name="city" placeholder="City"
                  value={shipping.city} onChange={handleChange}
                  className="border px-4 py-3 bg-zinc-50"
                />

                <input name="state" placeholder="State"
                  value={shipping.state} onChange={handleChange}
                  className="border px-4 py-3 bg-zinc-50"
                />

                <input name="pincode" placeholder="Pincode"
                  value={shipping.pincode} onChange={handleChange}
                  className="border px-4 py-3 bg-zinc-50 md:col-span-2"
                />

                <textarea name="address" placeholder="Full Address"
                  value={shipping.address} onChange={handleChange}
                  className="border px-4 py-3 bg-zinc-50 md:col-span-2"
                  rows="4"
                />

              </div>

            </div>

            {/* PAYMENT */}
            <div className="bg-white border border-zinc-200 shadow-sm p-8">

              <div className="flex items-center gap-3 mb-6">
                <FaCreditCard />
                <h2 className="text-2xl font-bold">Payment</h2>
              </div>

              <div className="border p-5 flex justify-between">
                <div>
                  <h3 className="font-semibold">Cash on Delivery</h3>
                  <p className="text-sm text-zinc-500">
                    Pay when you receive
                  </p>
                </div>

                <span className="text-xs flex items-center  bg-black text-white px-3 py-1">
                  ACTIVE
                </span>
              </div>

            </div>

          </div>

          {/* RIGHT */}
          <div className="bg-white border sticky top-24">

            <div className="p-6 border-b">
              <h2 className="text-2xl font-black">Order Summary</h2>
              <p className="text-sm text-zinc-500">
                {cartItems.length} items
              </p>
            </div>

            <div className="max-h-96 overflow-y-auto">

              {cartItems.map((item) => (
                <div key={item.id} className="flex gap-4 p-4 border-b">

                  <img src={item.image}
                    className="w-20 h-20 object-cover border"
                  />

                  <div className="flex-1">
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-sm text-zinc-500">
                      Qty: {item.quantity}
                    </p>
                    <p className="font-bold">
                      ₹{item.price * item.quantity}
                    </p>
                  </div>

                </div>
              ))}

            </div>

            <div className="p-6 space-y-3">

              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>

              <div className="flex justify-between">
                <span>Shipping</span>
                <span>{shippingCharge === 0 ? "FREE" : `₹${shippingCharge}`}</span>
              </div>

              <div className="flex justify-between text-xl font-bold border-t pt-3">
                <span>Total</span>
                <span>₹{total}</span>
              </div>

              <button
                onClick={handleOrder}
                disabled={loading}
                className="w-full bg-black text-white py-4 mt-4"
              >
                {loading ? "Placing Order..." : "Place Order"}
              </button>

              <div className="flex items-center gap-2 text-sm text-zinc-500 mt-3">
                <FaTruck />
                Delivery in 3–5 days
              </div>

            </div>

          </div>

        </div>
      )}

    </div>
  );
};

export default Checkout;