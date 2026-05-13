import React, { useState } from "react";
import { useCart } from "../Components/CartContext";

const Checkout = () => {
  const { cartItems, clearCart } = useCart();

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

  const handleChange = (e) => {
    setShipping({
      ...shipping,
      [e.target.name]: e.target.value,
    });
  };

  const handleOrder = () => {
    // simple validation
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

    console.log("Shipping Details:", shipping);
    console.log("Cart Items:", cartItems);

    clearCart();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10">

      <h1 className="text-4xl font-bold mb-8">
        Checkout
      </h1>

      <div className="bg-white p-6 rounded-xl shadow-md">

        {cartItems.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <>
            {/* CART ITEMS */}
            <div className="space-y-6">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 border-b pb-4"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded-lg"
                  />

                  <div className="flex-1">
                    <h2 className="font-semibold text-lg">
                      {item.name}
                    </h2>

                    <p className="text-gray-500">
                      {item.category}
                    </p>

                    <p>
                      Quantity: {item.quantity}
                    </p>
                  </div>

                  <h3 className="font-bold text-lg">
                    ₹{item.price * item.quantity}
                  </h3>
                </div>
              ))}
            </div>

            {/* TOTAL */}
            <div className="mt-8 flex justify-between items-center border-b pb-6">
              <h2 className="text-2xl font-bold">
                Total:
              </h2>

              <h2 className="text-2xl font-bold">
                ₹{subtotal}
              </h2>
            </div>

            {/* SHIPPING ADDRESS */}
            <div className="mt-8">

              <h2 className="text-2xl font-bold mb-6">
                Shipping Address
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                <input
                  type="text"
                  name="fullName"
                  placeholder="Full Name"
                  value={shipping.fullName}
                  onChange={handleChange}
                  className="border p-3 rounded-lg outline-none"
                />

                <input
                  type="text"
                  name="phone"
                  placeholder="Phone Number"
                  value={shipping.phone}
                  onChange={handleChange}
                  className="border p-3 rounded-lg outline-none"
                />

                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={shipping.city}
                  onChange={handleChange}
                  className="border p-3 rounded-lg outline-none"
                />

                <input
                  type="text"
                  name="state"
                  placeholder="State"
                  value={shipping.state}
                  onChange={handleChange}
                  className="border p-3 rounded-lg outline-none"
                />

                <input
                  type="text"
                  name="pincode"
                  placeholder="Pincode"
                  value={shipping.pincode}
                  onChange={handleChange}
                  className="border p-3 rounded-lg outline-none md:col-span-2"
                />

                <textarea
                  name="address"
                  placeholder="Full Address"
                  value={shipping.address}
                  onChange={handleChange}
                  rows="4"
                  className="border p-3 rounded-lg outline-none md:col-span-2"
                />

              </div>
            </div>

            {/* PLACE ORDER BUTTON */}
            <button
              onClick={handleOrder}
              className="w-full bg-black text-white py-4 mt-8 rounded-lg uppercase"
            >
              Place Order
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Checkout;