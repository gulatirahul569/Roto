import React, { useState } from "react";
import { useCart } from "../Components/CartContext";
import { Products } from "../Components/Products";

const Bags = () => {
  const { addToCart } = useCart();

  const [selectedCategory, setSelectedCategory] = useState("All");

  // FILTER ONLY BAGS
  const bagProducts = Products.filter(
    (item) => item.newCategory === "Bag"
  );

  const filteredProducts =
    selectedCategory === "All"
      ? bagProducts
      : bagProducts.filter(
          (item) => item.category === selectedCategory
        );

  return (
    <div className="min-h-screen">

      {/* Heading */}
      <div className="bg-[rgb(241,241,241)]">

        <div className="flex justify-center">
          <h1 className="uppercase text-5xl md:text-7xl font-semibold border-b mb-8">
            Bags
          </h1>
        </div>

        {/* Filter Buttons */}
        <div className="flex justify-center gap-4 mb-12 pb-8">
          {["All", "Travel", "Laptop", "Casual"].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className="mr-10 ml-10 uppercase font-semibold border-b border-transparent hover:border-black cursor-pointer transition"
            >
              {cat}
            </button>
          ))}
        </div>

      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-6 py-10">

        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition duration-500"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-70 object-cover group-hover:scale-105 transition duration-500"
            />

            <div className="p-5">

              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold uppercase">
                  {product.name}
                </h2>

                <span className="text-sm text-gray-500">
                  {product.category}
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
        ))}

      </div>
    </div>
  );
};

export default Bags;