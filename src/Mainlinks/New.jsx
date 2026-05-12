import React, { useState } from "react";
import { useCart } from "../Components/CartContext";
import { Products } from "../Components/Products";
import { useNavigate } from "react-router-dom";

const NewFeatured = () => {
  const [filter, setFilter] = useState("All");
  const { addToCart } = useCart();
  const navigate = useNavigate();

  // Filter only "New Featured" products
  const newFeaturedProducts = Products.filter((item) => item.newCategory === "NF");

  const filteredProducts =
    filter === "All"
      ? newFeaturedProducts
      : newFeaturedProducts.filter((item) => item.tag === filter);

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white">

      {/* Heading Section */}
      <div className="bg-linear-to-b from-white to-gray-100 py-10">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold uppercase tracking-widest border-b inline-block mb-6">
            New Deals
          </h1>
          <p className="text-gray-400 mt-0 text-sm">
            New • Featured • Exclusive
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex justify-center gap-4 mt-4">
          {["All", "New", "Featured"].map((item) => (
            <button
              key={item}
              onClick={() => setFilter(item)}
              className="px-4 py-2 rounded-full text-sm uppercase font-semibold bg-white/70 hover:bg-black hover:text-white transition border border-gray-200"
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-6 py-10">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="group relative bg-white/80 backdrop-blur-md border border-white/20 rounded-3xl overflow-hidden shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
          >
            {/* Product Image with hover overlay */}
            <div className="relative overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-70 object-cover group-hover:scale-110 transition duration-500"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition"></div>

              {/* Quick View Hover Text */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                <button
                  onClick={() => navigate(`/main/product/${product.id}`)}
                  className="text-white text-sm tracking-widest bg-black/40 px-4 py-2 rounded-full cursor-pointer"
                >
                  QUICK VIEW
                </button>
              </div>
            </div>

            {/* Product Info */}
            <div className="p-5">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold uppercase">{product.name}</h2>
                <span className="text-sm text-gray-500">{product.category}</span>
              </div>

              <div className="mt-5 flex justify-between items-center">
                <p className="text-2xl font-black">${product.price}</p>
                <button
                  onClick={() => addToCart(product)}
                  className="bg-black text-white px-5 py-2 rounded-full hover:bg-gray-800 transition"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default NewFeatured;