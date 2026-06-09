import React, { useState } from "react";
import { useCart } from "../Context/CartContext";
import { useAuth } from "../Context/AuthContext";

import { FaLock, FaTruck, FaCreditCard, FaMapMarkerAlt } from "react-icons/fa";

const Checkout = () => {
  const { cartItems, clearCart } = useCart();
  const { user } = useAuth();

  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("cod");

  // ✅ ONLY NEW STATE (payment modal)
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const [card, setCard] = useState({
    number: "",
    name: "",
    expiry: "",
    cvv: "",
  });

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

  // ---------------- ORDER API ----------------
  const placeOrder = async (paymentMethod, paymentStatus, paymentId = "") => {
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
          paymentMethod,
          paymentStatus,
          paymentId,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        clearCart();

        alert(
          paymentMethod === "online"
            ? "Payment Successful & Order Placed!"
            : "Order Placed Successfully!"
        );

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
      alert("Server error");
    } finally {
      setLoading(false);
    }
  };

  // ---------------- PAYMENT FLOW ----------------
  const fakePayment = () => {
    setShowPaymentModal(true);
  };

  const handlePaymentSuccess = async () => {
    setLoading(true);

    setTimeout(async () => {
      const paymentId =
        "PAY_" + Date.now() + Math.floor(Math.random() * 1000);

      setShowPaymentModal(false);

      await placeOrder("online", "Paid", paymentId);

      setLoading(false);
    }, 1500);
  };

  // ---------------- ORDER HANDLER ----------------
  const handleOrder = async () => {
    if (!user) return alert("Please login first");
    if (cartItems.length === 0) return alert("Cart is empty");

    if (
      !shipping.fullName ||
      !shipping.phone ||
      !shipping.address ||
      !shipping.city ||
      !shipping.state ||
      !shipping.pincode
    ) {
      return alert("Please fill all shipping details");
    }

    if (paymentMethod === "online") {
      fakePayment();
      return;
    }

    await placeOrder("cod", "Pending");
  };

  const [step, setStep] = useState(1);
return (
  <div className="min-h-screen bg-linear-to-b from-zinc-100 to-zinc-200 px-4 md:px-10 py-10">
    
    {/* HEADER */}
    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10 gap-5">
      <div>
        <p className="uppercase tracking-[5px] text-xs text-zinc-500">
          Secure Checkout
        </p>

        <h1 className="text-4xl md:text-5xl font-black mt-2 text-zinc-900">
          Complete Your Order
        </h1>
      </div>

      <div className="flex items-center gap-3 bg-white px-5 py-3 rounded-xl shadow-sm border border-zinc-200">
        <FaLock className="text-zinc-600" />
        <p className="text-sm font-medium text-zinc-700">
          100% Secure Payments
        </p>
      </div>
    </div>

    {/* EMPTY CART */}
    {cartItems.length === 0 ? (
      <div className="bg-white rounded-2xl border border-zinc-200 p-16 text-center shadow-sm">
        <h2 className="text-3xl font-bold mb-3">Your Cart is Empty</h2>
        <p className="text-zinc-500">Add products to continue checkout.</p>
      </div>
    ) : (
      <div className="grid grid-cols-1 xl:grid-cols-[1.3fr_0.7fr] gap-8">

        {/* LEFT SIDE */}
        <div className="space-y-8">

          {/* SHIPPING */}
          <div className="bg-white rounded-2xl border border-zinc-200 shadow-sm p-8">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-xl bg-black text-white flex items-center justify-center">
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
              {[
                ["fullName", "Full Name"],
                ["phone", "Phone"],
                ["city", "City"],
                ["state", "State"],
              ].map(([name, placeholder]) => (
                <input
                  key={name}
                  name={name}
                  placeholder={placeholder}
                  value={shipping[name]}
                  onChange={handleChange}
                  className="border border-zinc-200 px-4 py-3 rounded-xl bg-zinc-50 focus:bg-white focus:ring-2 focus:ring-black outline-none transition"
                />
              ))}

              <input
                name="pincode"
                placeholder="Pincode"
                value={shipping.pincode}
                onChange={handleChange}
                className="border border-zinc-200 px-4 py-3 rounded-xl bg-zinc-50 md:col-span-2 focus:bg-white focus:ring-2 focus:ring-black outline-none transition"
              />

              <textarea
                name="address"
                placeholder="Full Address"
                value={shipping.address}
                onChange={handleChange}
                rows="4"
                className="border border-zinc-200 px-4 py-3 rounded-xl bg-zinc-50 md:col-span-2 focus:bg-white focus:ring-2 focus:ring-black outline-none transition"
              />
            </div>
          </div>

          {/* PAYMENT */}
          <div className="bg-white rounded-2xl border border-zinc-200 shadow-sm p-8">
            <div className="flex items-center gap-3 mb-6">
              <FaCreditCard className="text-zinc-700" />
              <h2 className="text-2xl font-bold">Payment Method</h2>
            </div>

            <div className="space-y-4">

              {/* COD */}
              <label className={`flex items-center justify-between p-5 rounded-xl border cursor-pointer transition
                ${paymentMethod === "cod" ? "border-black bg-zinc-50" : "border-zinc-200"}`}>
                <div>
                  <h3 className="font-semibold">Cash On Delivery</h3>
                  <p className="text-sm text-zinc-500">
                    Pay when product arrives
                  </p>
                </div>

                <input
                  type="radio"
                  checked={paymentMethod === "cod"}
                  onChange={() => setPaymentMethod("cod")}
                />
              </label>

              {/* ONLINE */}
              <label className={`flex items-center justify-between p-5 rounded-xl border cursor-pointer transition
                ${paymentMethod === "online" ? "border-black bg-zinc-50" : "border-zinc-200"}`}>
                <div>
                  <h3 className="font-semibold">Online Payment</h3>
                  <p className="text-sm text-zinc-500">
                    Simulated card payment
                  </p>
                </div>

                <input
                  type="radio"
                  checked={paymentMethod === "online"}
                  onChange={() => setPaymentMethod("online")}
                />
              </label>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="bg-white rounded-2xl border border-zinc-200 shadow-sm sticky top-24 h-fit">

          <div className="p-6 border-b">
            <h2 className="text-2xl font-black">Order Summary</h2>
            <p className="text-sm text-zinc-500">
              {cartItems.length} items
            </p>
          </div>

          <div className="max-h-80 overflow-y-auto">
            {cartItems.map((item) => (
              <div key={item.id} className="flex gap-4 p-4 border-b">
                <img
                  src={item.image}
                  className="w-16 h-16 object-cover rounded-lg border"
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

            <div className="flex justify-between text-sm">
              <span className="text-zinc-600">Subtotal</span>
              <span>₹{subtotal}</span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-zinc-600">Shipping</span>
              <span>
                {shippingCharge === 0 ? "FREE" : `₹${shippingCharge}`}
              </span>
            </div>

            <div className="flex justify-between text-xl font-bold border-t pt-3">
              <span>Total</span>
              <span>₹{total}</span>
            </div>

            <button
              onClick={handleOrder}
              disabled={loading}
              className="w-full bg-black hover:bg-zinc-800 transition text-white py-4 mt-4 rounded-xl disabled:opacity-60"
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

    {/* PAYMENT MODAL */}
    {showPaymentModal && (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 px-4">
        
        <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-6">

          <div className="text-center mb-6">
            <h2 className="text-xl font-bold">Secure Payment</h2>
            <p className="text-sm text-zinc-500">
              Complete your transaction
            </p>
          </div>

          <div className="bg-zinc-100 p-4 rounded-xl text-center mb-5">
            <p className="text-sm text-zinc-500">Amount</p>
            <h1 className="text-3xl font-black">₹{total}</h1>
          </div>

          <div className="space-y-3">

            <input
              placeholder="Card Number"
              className="w-full border p-3 rounded-xl"
              value={card.number}
              onChange={(e) =>
                setCard({ ...card, number: e.target.value })
              }
            />

            <input
              placeholder="Card Holder Name"
              className="w-full border p-3 rounded-xl"
              value={card.name}
              onChange={(e) =>
                setCard({ ...card, name: e.target.value })
              }
            />

            <div className="flex gap-3">
              <input
                placeholder="MM/YY"
                className="w-1/2 border p-3 rounded-xl"
                value={card.expiry}
                onChange={(e) =>
                  setCard({ ...card, expiry: e.target.value })
                }
              />

              <input
                placeholder="CVV"
                className="w-1/2 border p-3 rounded-xl"
                value={card.cvv}
                onChange={(e) =>
                  setCard({ ...card, cvv: e.target.value })
                }
              />
            </div>
          </div>

          <button
            onClick={handlePaymentSuccess}
            className="w-full bg-black hover:bg-zinc-800 text-white py-3 rounded-xl mt-5"
          >
            Pay ₹{total}
          </button>

          <button
            onClick={() => setShowPaymentModal(false)}
            className="w-full border py-3 rounded-xl mt-2"
          >
            Cancel
          </button>

          <p className="text-xs text-center text-zinc-400 mt-3">
            payment gateway
          </p>
        </div>
      </div>
    )}
  </div>
)}

export default Checkout;