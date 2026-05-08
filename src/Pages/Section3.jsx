import React, { useRef } from "react";
import { useCart } from "../Components/CartContext";
import { Products } from "../Components/Products";


const Section3 = () => {
const { addToCart } = useCart(); 
  const sliderRef = useRef(null);


  const newDrops = Products.filter(
    (item) => item.newCategory === "NF"
  );

  const scrollLeft = () => {
    sliderRef.current.scrollBy({
      left: -350,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    sliderRef.current.scrollBy({
      left: 350,
      behavior: "smooth",
    });
  };

  return (
    <div className="py-20">

      {/* Heading */}
      <div className="flex flex-col gap-2 mb-10">
        <h1 className="text-5xl md:text-6xl font-semibold uppercase flex justify-center">
          New Drops
        </h1>
        <h2 className="text-md flex justify-center text-gray-600">
          The latest gear, ready to ride.
        </h2>
      </div>

      {/* Arrows */}
      <div className="flex justify-end gap-4 px-6 mb-4">
        <button
          onClick={scrollLeft}
          className="px-4 py-2 border rounded-full hover:bg-black hover:text-white transition"
        >
          ←
        </button>

        <button
          onClick={scrollRight}
          className="px-4 py-2 border rounded-full hover:bg-black hover:text-white transition"
        >
          →
        </button>
      </div>

      {/* Slider */}
      <div
        ref={sliderRef}
        className="flex gap-6 overflow-x-auto scroll-smooth px-6 pb-6 scrollbar-hide"
      >
        {newDrops.map((product) => (
          <div
            key={product.id}
            className="min-w-[320px] max-w-[320px] shrink-0 bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition duration-300"
          >
            <img
              src={product.image}
              alt={product.name}
              className="h-72 w-full object-cover hover:scale-105 transition duration-300"
            />

            <div className="p-4">
              <h2 className="text-lg font-bold uppercase flex items-center gap-5">
                {product.name}
                <span className="text-sm text-gray-500">
                  {product.category}
                </span>
              </h2>
               

              <div className="flex justify-between mt-3">
                <p className="font-black text-xl">
                  ${product.price}
                </p>
                <button
                  onClick={() => addToCart(product)}
                  className="bg-black text-white px-5 py-2 rounded-full hover:bg-gray-800 transition"
                >
                 Quick Cart +
                </button>

               
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default Section3;