import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchProductById } from "../api/productApi";
import { useCart } from "../Context/CartContext";
import { useWishlist } from "../Context/WishlistContext";

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const { addToCart } = useCart();
    const { toggleWishlist, isInWishlist } = useWishlist();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [liked, setLiked] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        const loadProduct = async () => {
            try {
                const data = await fetchProductById(id);
                setProduct(data);
            } catch (error) {
                console.log("Error fetching product:", error);
            } finally {
                setLoading(false);
            }
        };

        loadProduct();
    }, [id]);

    const renderStars = (rating = 0) => {
        const fullStars = Math.floor(rating);
        const stars = [];

        for (let i = 1; i <= 5; i++) {
            stars.push(i <= fullStars ? "★" : "☆");
        }

        return stars.join("");
    };

    if (loading) {
        return (
            <div className="h-screen flex items-center justify-center">
                <h1 className="text-2xl font-semibold">Loading...</h1>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="h-screen flex items-center justify-center">
                <h1 className="text-3xl font-bold">
                    Product Not Found
                </h1>
            </div>
        );
    }

    const gallery = product.images?.length
        ? product.images
        : [product.image];

    return (
        <div className="min-h-screen bg-[#f5f5f5] px-4 md:px-10 py-6">

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

                        <button
                            onClick={() =>
                                navigate(`/category/${product.newCategory}`)
                            }
                            className="bg-black text-white px-5 py-2 rounded-full text-sm hover:bg-gray-800 transition"
                        >
                            Explore
                        </button>

                    </div>
                </div>

                {/* CONTENT */}
                <div className="grid lg:grid-cols-2">

                    {/* IMAGE SECTION */}
                    <div className="relative bg-[#efefef] p-5 flex flex-col justify-between">

                        <div className="flex items-center justify-center max-h-130">

                            <img
                                src={selectedImage || product.image}
                                alt={product.name}
                                className="w-full max-w-125 max-h-112 object-contain drop-shadow-2xl"
                            />

                            <button
                                onClick={() => {
                                    const alreadyIn =
                                        isInWishlist(product._id);

                                    toggleWishlist(product);

                                    setLiked(
                                        alreadyIn
                                            ? "removed"
                                            : "added"
                                    );

                                    setTimeout(
                                        () => setLiked(null),
                                        800
                                    );
                                }}
                                className="absolute top-5 right-5 bg-white rounded-full w-12 h-12 flex items-center justify-center text-2xl shadow-lg hover:scale-110 transition z-20"
                            >
                                {isInWishlist(product._id)
                                    ? "❤️"
                                    : "🤍"}
                            </button>

                        </div>

                        {/* THUMBNAILS */}
                        <div className="flex gap-3 mt-6 overflow-x-auto justify-center">

                            {gallery.map((img, index) => (
                                <div
                                    key={index}
                                    onClick={() =>
                                        setSelectedImage(img)
                                    }
                                    className={`w-20 h-20 rounded-lg overflow-hidden cursor-pointer border-2 transition ${
                                        (selectedImage ||
                                            product.image) === img
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

                    {/* INFO SECTION */}
                    <div className="px-8 lg:px-12 py-10 flex flex-col justify-center">

                        <p className="text-xs uppercase tracking-widest text-gray-400 mb-4">
                            Home / {product.category}
                        </p>

                        <div className="flex items-center gap-3 mb-5">

                            <div className="text-yellow-400 text-lg">
                                {renderStars(product.rating)}
                            </div>

                            <span className="text-sm text-gray-500">
                                Rating: {product.rating}
                            </span>

                        </div>

                        <h1 className="text-5xl lg:text-6xl font-black tracking-tight leading-none">
                            {product.name}
                        </h1>

                        <p className="text-gray-500 leading-7 mt-6 max-w-xl">
                            {product.description}
                        </p>

                        <div className="mt-8 flex items-center gap-4">

                            <h2 className="text-3xl font-bold">
                                ₹{product.price}
                            </h2>

                        </div>

                        <div className="mt-4">
                            <span
                                className={`font-medium ${
                                    product.stock > 0
                                        ? "text-green-600"
                                        : "text-red-600"
                                }`}
                            >
                                {product.stock > 0
                                    ? `In Stock (${product.stock})`
                                    : "Out of Stock"}
                            </span>
                        </div>

                        <button
                            onClick={() => addToCart(product)}
                            className="mt-10 w-full bg-black text-white py-4 rounded-md font-medium hover:bg-gray-800 transition"
                        >
                            Add To Cart
                        </button>

                        <p className="text-sm text-gray-500 mt-5 text-center">
                            EMI starts from ₹999{" "}
                            <span className="font-semibold text-black cursor-pointer">
                                View Finance Offers
                            </span>
                        </p>

                        {liked && (
                            <p className="text-center mt-4 text-sm font-medium">
                                Product {liked} wishlist
                            </p>
                        )}

                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;