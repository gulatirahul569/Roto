import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Products } from "../Data/Products";
import { useCart } from "../Components/CartContext";
import { useWishlist } from "../Components/WishlistContext";

const ProductDetails = () => {
    const { id } = useParams();
    const { addToCart } = useCart();

    const { toggleWishlist, isInWishlist } = useWishlist();

    // ✅ FIXED STATE
    const [liked, setLiked] = useState(null); 
    // null | "added" | "removed"

    const product = Products.find((item) => item.id === id);

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

    if (!product) {
        return (
            <div className="h-screen flex items-center justify-center">
                <h1 className="text-3xl font-bold">Product Not Found</h1>
            </div>
        );
    }

    return (
        <div className="min-h-screen px-6 md:px-20 py-10 bg-white relative">

            {/* ❤️ GLOBAL TOP RIGHT BUTTON */}
            <button
                onClick={() => {
                    const alreadyIn = isInWishlist(product.id);

                    toggleWishlist(product);

                    setLiked(alreadyIn ? "removed" : "added");

                    setTimeout(() => setLiked(null), 800);
                }}
                className="fixed top-24 right-6 bg-white/80 backdrop-blur-md rounded-full w-12 h-12 flex items-center justify-center text-2xl shadow-lg hover:scale-110 transition z-50"
            >
                {isInWishlist(product.id) ? "❤️" : "🤍"}
            </button>

            {/* ❤️ TOAST MESSAGE */}
            {liked === "added" && (
                <div className="fixed top-44 right-6 text-red-500 animate-bounce z-50">
                    ♥ Added to Wishlist
                </div>
            )}

            {liked === "removed" && (
                <div className="fixed top-44 right-6 text-gray-600 animate-bounce z-50">
                    💔 Removed from Wishlist
                </div>
            )}

            <div className="grid md:grid-cols-2 gap-10 items-center">

                {/* IMAGE */}
                <div>
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-2/3 rounded-3xl shadow-lg"
                    />
                </div>

                {/* DETAILS */}
                <div>

                    <p className="uppercase text-sm text-gray-400 tracking-widest">
                        {product.category}
                    </p>

                    <h1 className="text-5xl font-bold mt-2">
                        {product.name}
                    </h1>

                    {/* ⭐ RATING */}
                    <div className="mt-3 text-lg text-yellow-500">
                        {renderStars(product.rating || 4)}{" "}
                        <span className="text-gray-600 text-sm ml-2">
                            ({product.rating || 4})
                        </span>
                    </div>

                    <p className="text-3xl font-black mt-6">
                        ${product.price}
                    </p>

                    <p className="text-gray-500 mt-6 leading-relaxed">
                        {product.description}
                    </p>

                    <button
                        onClick={() => addToCart(product)}
                        className="mt-8 bg-black text-white px-8 py-4 rounded-full hover:bg-gray-800 transition"
                    >
                        Add To Cart
                    </button>

                </div>

            </div>

        </div>
    );
};

export default ProductDetails;