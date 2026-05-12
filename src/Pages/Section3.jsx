import React, { useRef } from "react";
import { useCart } from "../Components/CartContext";
import { Products } from "../Data/Products";
import ProductCard from "../Components/ProductCard";

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
        <h1 className="text-4xl md:text-6xl font-bold uppercase tracking-widest text-center">
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
        className="flex gap-6 overflow-x-auto scroll-smooth px-6 pb-10 items-stretch scrollbar-hide"
      >
        {newDrops.map((product) => (
          <div
            key={product.id}
            className="min-w-[320px] max-w-[320px] shrink-0"
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>

    </div>
  );
};

export default Section3;