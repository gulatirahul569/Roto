import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Products } from "../Data/Products";
import { useCart } from "../Components/CartContext";
import { useWishlist } from "../Components/WishlistContext";

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const { addToCart } = useCart();
    const { toggleWishlist, isInWishlist } = useWishlist();

    const [liked, setLiked] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);

    // find product
    const product = Products.find((item) => item.id === id);

    // index for navigation
    const productIndex = Products.findIndex((item) => item.id === id);

    const prevProduct =
        Products[(productIndex - 1 + Products.length) % Products.length];

    const nextProduct =
        Products[(productIndex + 1) % Products.length];

    // ⭐ STARS
    const renderStars = (rating = 0) => {
        const fullStars = Math.floor(rating);
        const stars = [];

        for (let i = 1; i <= 5; i++) {
            stars.push(i <= fullStars ? "★" : "☆");
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

    // thumbnails
    const gallery = product.images || [product.image];

    return (
        <div className="min-h-screen bg-[#f5f5f5] px-4 md:px-10 py-6">

            {/* MAIN CARD */}
            <div className="max-w-7xl mx-auto bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">

                {/* TOP NAV */}
                <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">

                    <h1 className="text-lg font-semibold tracking-wide">
                        ROTO
                    </h1>

                    <div className="flex items-center gap-8">

                        <button className="text-sm font-medium hover:text-black text-gray-500 transition">
                            Finance Offers
                        </button>

                        {/* ✅ ONLY CHANGE HERE */}
                        <button
                            onClick={() =>
                                navigate(
                                    `/main/category/${product.newCategory}`
                                )
                            }
                            className="bg-black text-white px-5 py-2 rounded-full text-sm hover:bg-gray-800 transition"
                        >
                            Explore
                        </button>

                    </div>
                </div>

                {/* CONTENT */}
                <div className="grid lg:grid-cols-2">

                    {/* LEFT SIDE */}
                    <div className="relative bg-[#efefef] p-5 flex flex-col justify-between">

                        {/* LEFT ARROW */}
                        <button
                            onClick={() =>
                                navigate(`/main/product/${prevProduct.id}`)
                            }
                            className="absolute left-5 top-1/2 -translate-y-1/2 bg-white shadow-lg w-12 h-12 rounded-full text-2xl hover:scale-110 transition z-20"
                        >
                            ←
                        </button>

                        {/* RIGHT ARROW */}
                        <button
                            onClick={() =>
                                navigate(`/main/product/${nextProduct.id}`)
                            }
                            className="absolute right-5 top-1/2 -translate-y-1/2 bg-white shadow-lg w-12 h-12 rounded-full text-2xl hover:scale-110 transition z-20"
                        >
                            →
                        </button>

                        {/* MAIN IMAGE */}
                        <div className="flex items-center justify-center max-h-130 ">

                            <img
                                src={selectedImage ?? product.image}
                                alt={product.name}
                                className="w-full max-w-120 max-h-100 object-contain drop-shadow-2xl"
                            />

                            {/* ❤️ WISHLIST */}
                            <button
                                onClick={() => {
                                    const alreadyIn = isInWishlist(product.id);

                                    toggleWishlist(product);

                                    setLiked(alreadyIn ? "removed" : "added");

                                    setTimeout(() => setLiked(null), 800);
                                }}
                                className="absolute top-5 right-5 bg-white rounded-full w-12 h-12 flex items-center justify-center text-2xl shadow-lg hover:scale-110 transition z-20"
                            >
                                {isInWishlist(product.id) ? "❤️" : "🤍"}
                            </button>

                        </div>

                        {/* THUMBNAILS */}
                        <div className="flex gap-3 mt-6 overflow-x-auto justify-center">

                            {gallery.map((img, index) => (
                                <div
                                    key={index}
                                    onClick={() => setSelectedImage(img)}
                                    className={`w-20 h-20 rounded-lg overflow-hidden cursor-pointer border-2 transition 
                                    ${
                                        (selectedImage || product.image) === img
                                            ? "border-black"
                                            : "border-gray-200"
                                    }`}
                                >
                                    <img
                                        src={img}
                                        alt=""
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* RIGHT SIDE */}
                    <div className="px-8 lg:px-12 py-10 flex flex-col justify-center relative">

                        {/* BREADCRUMB */}
                        <p className="text-xs uppercase tracking-widest text-gray-400 mb-4">
                            Home / {product.category}
                        </p>

                        {/* RATING */}
                        <div className="flex items-center gap-3 mb-5">
                            <div className="text-yellow-400 text-lg">
                                {renderStars(product.rating || 4)}
                            </div>

                            <span className="text-sm text-gray-500">
                                Rated 5 star by 2,000+ people
                            </span>
                        </div>

                        {/* TITLE */}
                        <h1 className="text-5xl lg:text-6xl font-black tracking-tight leading-none">
                            {product.name}
                        </h1>

                        {/* DESCRIPTION */}
                        <p className="text-gray-500 leading-7 mt-6 max-w-xl">
                            {product.description}
                        </p>

                        {/* PRICE */}
                        <div className="mt-8 flex items-center gap-4">
                            <h2 className="text-3xl font-bold">
                                ₹{product.price}
                            </h2>
                        </div>

                        {/* BUTTON */}
                        <button
                            onClick={() => addToCart(product)}
                            className="mt-10 w-full bg-black text-white py-4 rounded-md font-medium hover:bg-gray-800 transition"
                        >
                            Add to Cart+
                        </button>

                        {/* EMI */}
                        <p className="text-sm text-gray-500 mt-5 text-center">
                            EMI starts from ₹999{" "}
                            <span className="font-semibold text-black cursor-pointer">
                                View Finance Offers
                            </span>
                        </p>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;