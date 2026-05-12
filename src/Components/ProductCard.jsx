import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../Components/CartContext";
import { useWishlist } from "../Components/WishlistContext";

const ProductCard = ({ product }) => {
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const { toggleWishlist, isInWishlist } = useWishlist();

    // ⭐ STAR RENDER FUNCTION
    const renderStars = (rating = 0) => {
        const fullStars = Math.floor(rating);

        const stars = [];

        for (let i = 1; i <= 5; i++) {
            if (i <= fullStars) {
                stars.push("⭐");
            } else {
                stars.push("☆");
            }
        }

        return stars.join("");
    };

    return (
        <div className="group relative bg-white/80 backdrop-blur-md border border-white/20 rounded-3xl overflow-hidden shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">

            {/* IMAGE SECTION */}
            <div className="relative overflow-hidden">

                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-70 object-cover group-hover:scale-110 transition duration-500"
                />

                {/* DARK OVERLAY */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition"></div>

                {/* ❤️ WISHLIST BUTTON (TOP RIGHT) */}
                <button
                    onClick={() => toggleWishlist(product)}
                    className="absolute top-3 right-3 bg-white/80 backdrop-blur-md rounded-full w-10 h-10 flex items-center justify-center text-xl shadow-md hover:scale-110 transition"
                >
                    {isInWishlist(product.id) ? "❤️" : "🤍"}
                </button>

                {/* QUICK VIEW */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition pointer-events-none">

                    <button
                        onClick={() => navigate(`/main/product/${product.id}`)}
                        className="pointer-events-auto text-white text-sm tracking-widest bg-black/40 px-4 py-2 rounded-full cursor-pointer"
                    >
                        QUICK VIEW
                    </button>

                </div>

            </div>

            {/* PRODUCT INFO */}
            <div className="p-5">

                <div className="flex justify-between items-center">

                    <h2 className="text-xl font-bold uppercase">
                        {product.name}
                    </h2>

                    <span className="text-sm text-gray-500">
                        {product.category}
                    </span>

                </div>

                {/* ⭐ RATING */}
                <div className="mt-2 text-yellow-500 text-sm">
                    {renderStars(product.rating || 0)}{" "}
                    <span className="text-gray-500 ml-2">
                        ({product.rating || 0})
                    </span>
                </div>

                <div className="mt-5 flex justify-between items-center">

                    <p className="text-2xl font-black">
                        ${product.price}
                    </p>

                    <button
                        onClick={() => addToCart(product)}
                        className="bg-black text-white px-5 py-2 rounded-full hover:bg-gray-800 transition"
                    >
                        Add
                    </button>

                </div>

            </div>

        </div>
    );
};

export default ProductCard;