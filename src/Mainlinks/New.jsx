import React, { useState } from "react";
import { useCart } from "../Components/CartContext"; // ✅ IMPORTANT
import { Products } from "../Components/Products";


const NewFeatured = () => {
  const [filter, setFilter] = useState("All");

  const { addToCart } = useCart(); 

  const NewFeatured_products = Products.filter(
    (item)=> item.newCategory === "NF"
  )
  const filteredProducts =
    filter === "All"
      ? NewFeatured_products
      : NewFeatured_products.filter((item) => item.tag === filter);

  return (
    <div className="min-h-screen">

      {/* Heading */}
      <div className="bg-[rgb(241,241,241)]">

        <div className="flex justify-center">
          <h1 className="uppercase text-5xl md:text-7xl font-semibold border-b mb-8">
            New Deals
          </h1>
        </div>

        {/* Filter Buttons */}
        <div className="flex justify-center gap-4 mb-8 pb-8">
          {["All", "New", "Featured"].map((item) => (
            <button
              key={item}
              onClick={() => setFilter(item)}
              className="uppercase mr-10 ml-10 font-semibold border-b border-transparent hover:border-black cursor-pointer transition"
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

                {/* ✅ ADD TO CART */}
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