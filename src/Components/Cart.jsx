import React from "react";
import { IoCloseOutline } from "react-icons/io5";
import { useCart } from "../Components/CartContext";

const Cart = ({ cartOpen, setCartOpen }) => {
  const {
    cartItems,
    increaseQty,
    decreaseQty,
    removeFromCart,
  } = useCart();

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <>
      {/* Overlay */}
      <div
        onClick={() => setCartOpen(false)}
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 ${
          cartOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      />

      {/* Drawer */}
      <div
        className={`fixed top-2 right-0 rounded-3xl h-screen w-96 bg-gray-200  z-50 shadow-2xl flex flex-col transition-transform duration-300 ${
          cartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-semibold uppercase">
            Shopping Cart
          </h2>

          <button onClick={() => setCartOpen(false)}>
            <IoCloseOutline size={30} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {cartItems.length === 0 ? (
            <p className="text-center text-gray-500 mt-20">
              Your cart is empty
            </p>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 border-b pb-4"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-lg"
                />

                <div className="flex-1">
                  <h3 className="font-semibold">{item.name}</h3>

                  <p className="text-gray-500 text-sm">
                    {item.category}
                  </p>

                  <p className="font-bold mt-1">
                    ${item.price}
                  </p>

                  {/* Controls */}
                  <div className="flex items-center gap-3 mt-2">

                    {/* minus */}
                    <button
                      onClick={() => decreaseQty(item.id)}
                      className="px-2 border"
                    >
                      -
                    </button>

                    <span>{item.quantity}</span>

                    {/* plus */}
                    <button
                      onClick={() => increaseQty(item.id)}
                      className="px-2 border"
                    >
                      +
                    </button>

                    {/* remove */}
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 ml-4 text-sm"
                    >
                      Remove
                    </button>

                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="border-t p-6 space-y-4">
          <div className="flex justify-between text-lg font-semibold">
            <span>Subtotal</span>
            <span>${subtotal}</span>
          </div>

          <button className="w-full bg-black text-white py-4 uppercase">
            Checkout
          </button>
        </div>
      </div>
    </>
  );
};

export default Cart;