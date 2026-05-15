import React, { useState } from "react";
import { useCart } from "../Components/CartContext";
import { useAuth } from "../Components/AuthContext";
import {
  FaLock,
  FaTruck,
  FaCreditCard,
  FaMapMarkerAlt,
} from "react-icons/fa";

const Checkout = () => {
  const { cartItems, clearCart } = useCart();

  const { user } = useAuth();

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

  const handleOrder = () => {

    // CHECK LOGIN
    if (!user) {
      alert("Please login first");
      return;
    }

    // SHIPPING VALIDATION
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

    alert("Order Placed Successfully!");

    console.log("User:", user);
    console.log("Shipping Details:", shipping);
    console.log("Cart Items:", cartItems);

    clearCart();
  };

  return (
    <div className="min-h-screen bg-[#f4f4f4] px-4 md:px-10 py-10">

      {/* TOP HEADER */}
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
          <FaLock className="text-black" />
          <p className="text-sm font-medium">
            100% Secure Payments
          </p>
        </div>

      </div>

      {cartItems.length === 0 ? (

        <div className="bg-white border border-zinc-200 p-16 text-center">

          <h2 className="text-3xl font-bold mb-3">
            Your Cart is Empty
          </h2>

          <p className="text-zinc-500">
            Add products to continue checkout.
          </p>

        </div>

      ) : (

        <div className="grid grid-cols-1 xl:grid-cols-[1.2fr_0.8fr] gap-8">

          {/* LEFT SIDE */}
          <div className="space-y-8">

            {/* SHIPPING */}
            <div className="bg-white border border-zinc-200 shadow-sm p-8">

              <div className="flex items-center gap-3 mb-8">

                <div className="w-12 h-12 bg-black text-white flex items-center justify-center text-lg">
                  <FaMapMarkerAlt />
                </div>

                <div>
                  <h2 className="text-2xl font-bold">
                    Shipping Details
                  </h2>

                  <p className="text-sm text-zinc-500">
                    Enter your delivery information
                  </p>
                </div>

              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                <input
                  type="text"
                  name="fullName"
                  placeholder="Full Name"
                  value={shipping.fullName}
                  onChange={handleChange}
                  className="border border-zinc-300 bg-zinc-50 px-5 py-4 outline-none focus:border-black transition"
                />

                <input
                  type="text"
                  name="phone"
                  placeholder="Phone Number"
                  value={shipping.phone}
                  onChange={handleChange}
                  className="border border-zinc-300 bg-zinc-50 px-5 py-4 outline-none focus:border-black transition"
                />

                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={shipping.city}
                  onChange={handleChange}
                  className="border border-zinc-300 bg-zinc-50 px-5 py-4 outline-none focus:border-black transition"
                />

                <input
                  type="text"
                  name="state"
                  placeholder="State"
                  value={shipping.state}
                  onChange={handleChange}
                  className="border border-zinc-300 bg-zinc-50 px-5 py-4 outline-none focus:border-black transition"
                />

                <input
                  type="text"
                  name="pincode"
                  placeholder="Pincode"
                  value={shipping.pincode}
                  onChange={handleChange}
                  className="border border-zinc-300 bg-zinc-50 px-5 py-4 outline-none focus:border-black transition md:col-span-2"
                />

                <textarea
                  name="address"
                  placeholder="Full Address"
                  value={shipping.address}
                  onChange={handleChange}
                  rows="5"
                  className="border border-zinc-300 bg-zinc-50 px-5 py-4 outline-none focus:border-black transition md:col-span-2 resize-none"
                />

              </div>

            </div>

            {/* PAYMENT */}
            <div className="bg-white border border-zinc-200 shadow-sm p-8">

              <div className="flex items-center gap-3 mb-6">

                <div className="w-12 h-12 bg-black text-white flex items-center justify-center text-lg">
                  <FaCreditCard />
                </div>

                <div>
                  <h2 className="text-2xl font-bold">
                    Payment Method
                  </h2>

                  <p className="text-sm text-zinc-500">
                    Cash on Delivery Available
                  </p>
                </div>

              </div>

              <div className="border border-black p-5 flex items-center justify-between">

                <div>
                  <h3 className="font-semibold">
                    Cash on Delivery
                  </h3>

                  <p className="text-sm text-zinc-500 mt-1">
                    Pay when your order arrives
                  </p>
                </div>

                <div className="bg-black text-white px-4 py-2 text-xs uppercase tracking-widest">
                  Active
                </div>

              </div>

            </div>

          </div>

          {/* RIGHT SIDE */}
          <div>

            <div className="bg-white border border-zinc-200 shadow-sm sticky top-24">

              {/* HEADER */}
              <div className="p-7 border-b border-zinc-200">

                <h2 className="text-3xl font-black">
                  Order Summary
                </h2>

                <p className="text-sm text-zinc-500 mt-2">
                  {cartItems.length} Products Added
                </p>

              </div>

              {/* PRODUCTS */}
              <div className="max-h-105 overflow-y-auto">

                {cartItems.map((item) => (

                  <div
                    key={item.id}
                    className="flex gap-4 p-6 border-b border-zinc-100"
                  >

                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-24 object-cover border border-zinc-200"
                    />

                    <div className="flex-1">

                      <h3 className="font-bold text-lg">
                        {item.name}
                      </h3>

                      <p className="text-sm text-zinc-500 mt-1">
                        {item.category}
                      </p>

                      <div className="flex items-center justify-between mt-4">

                        <p className="text-sm">
                          Qty: {item.quantity}
                        </p>

                        <p className="font-bold text-lg">
                          ₹{item.price * item.quantity}
                        </p>

                      </div>

                    </div>

                  </div>

                ))}

              </div>

              {/* TOTAL */}
              <div className="p-7 space-y-5 border-t border-zinc-200">

                <div className="flex justify-between text-zinc-600">
                  <span>Subtotal</span>
                  <span>₹{subtotal}</span>
                </div>

                <div className="flex justify-between text-zinc-600">
                  <span>Shipping</span>

                  <span>
                    {shippingCharge === 0
                      ? "FREE"
                      : `₹${shippingCharge}`}
                  </span>
                </div>

                <div className="border-t border-zinc-200 pt-5 flex justify-between text-2xl font-black">
                  <span>Total</span>
                  <span>₹{total}</span>
                </div>

                {/* DELIVERY */}
                <div className="bg-zinc-100 p-4 flex items-center gap-3 mt-4">

                  <FaTruck className="text-lg" />

                  <div>
                    <p className="text-sm font-semibold">
                      Fast Delivery
                    </p>

                    <p className="text-xs text-zinc-500">
                      Estimated delivery in 3-5 days
                    </p>
                  </div>

                </div>

                {/* BUTTON */}
                <button
                  onClick={handleOrder}
                  className="
                    w-full
                    bg-black
                    text-white
                    py-5
                    uppercase
                    tracking-[3px]
                    text-sm
                    font-semibold
                    hover:bg-zinc-800
                    transition
                    mt-3
                  "
                >
                  Place Order
                </button>

              </div>

            </div>

          </div>

        </div>

      )}

    </div>
  );
};

export default Checkout;