import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../Context/CartContext";
import { useWishlist } from "../Context/WishlistContext";
import { useAuth } from "../Context/AuthContext";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { cartItems, addToCart, increaseQty, decreaseQty } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { user } = useAuth();

  const cartItem = cartItems.find((item) => item._id === product._id);

  const renderStars = (rating = 0) => {
    const fullStars = Math.floor(rating);
    return Array.from({ length: 5 }, (_, i) =>
      i < fullStars ? "⭐" : "☆"
    ).join("");
  };

  const handleWishlist = () => {
    if (!user) {
      alert("Please login to add items to wishlist");
      navigate("/login");
      return;
    }

    toggleWishlist(product);
  };

  return (
    <div className="group relative w-full bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">

      {/* IMAGE */}
      <div className="relative overflow-hidden h-64 bg-white flex items-center justify-center">

        <img
          src={product.image}
          alt={product.name}
          className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-105"
        />

        {/* overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition z-10" />

        {/* wishlist */}
        <button
          onClick={handleWishlist}
          className="absolute top-3 right-3 z-20 w-9 h-9 flex items-center justify-center rounded-full bg-white shadow-md hover:scale-110 transition"
        >
          {isInWishlist(product._id) ? "❤️" : "🤍"}
        </button>

        {/* quick view */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition z-10">
          <button
            onClick={() => navigate(`/product/${product._id}`)}
            className="bg-black/70 text-white text-xs px-4 py-2 rounded-full"
          >
            QUICK VIEW
          </button>
        </div>

      </div>

      {/* INFO */}
      <div className="p-3">
        <div className="flex justify-between items-start gap-2">
          <h2 className="font-semibold text-sm truncate flex-1">
            {product.name}
          </h2>

          <span className="text-xs text-gray-500 shrink-0 capitalize">
            {product.category}
          </span>
        </div>

        {/* rating */}
        <div className="mt-2 text-yellow-500 text-xs">
          {renderStars(product.rating || 0)}
          <span className="text-gray-500 ml-1">
            ({product.rating || 0})
          </span>
        </div>

        {/* price + cart */}
        <div className="mt-3 flex items-center justify-between">
          <p className="text-lg font-bold">₹{product.price}</p>

          {cartItem ? (
            <div className="flex items-center border rounded-md overflow-hidden">

              <button
                onClick={() => decreaseQty(product._id)}
                className="w-6 h-8 sm:w-8 sm:h-8 flex items-center justify-center text-xs hover:bg-gray-100"
              >
                -
              </button>

              <span className="w-4 sm:w-8 text-center text-xs sm:text-sm font-semibold">
                {cartItem.quantity}
              </span>

              <button
                onClick={() => increaseQty(product._id)}
                className="w-6 h-8 sm:w-8 sm:h-8 flex items-center justify-center text-xs hover:bg-gray-100"
              >
                +
              </button>

            </div>

          ) : (
            <button
              onClick={() => addToCart(product)}
              className="bg-black text-white text-sm px-4 py-2 rounded-lg hover:bg-gray-800 transition"
            >
              Add
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;