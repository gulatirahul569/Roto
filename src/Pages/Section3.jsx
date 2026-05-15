import React, { useRef } from "react";
import { Products } from "../Data/Products";
import ProductCard from "../Components/ProductCard";

const Section3 = () => {
  const sliderRef = useRef(null);

  const newDrops = Products.filter(
    (item) => item.newCategory === "new"
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
    <div className="py-10 relative">

      {/* Heading */}
      <div className="flex flex-col gap-2 mb-10">
        <h1 className="text-4xl md:text-6xl font-bold uppercase tracking-widest text-center">
          New Drops
        </h1>

        <h2 className="text-md flex justify-center text-gray-600">
          The latest gear, ready to ride.
        </h2>
      </div>

      {/* SLIDER WRAPPER */}
      <div className="relative">

        {/* LEFT ARROW (CENTERED ON LEFT SIDE) */}
        <button
          onClick={scrollLeft}
          className="absolute left-2 top-1/3 -translate-y-1/2 z-10
          bg-white shadow-lg px-4 py-3 rounded-full text-2xl
          hover:scale-110 transition"
        >
          ←
        </button>

        {/* RIGHT ARROW (CENTERED ON RIGHT SIDE) */}
        <button
          onClick={scrollRight}
          className="absolute right-2 top-1/3 -translate-y-1/2 z-10
          bg-gray-300 shadow-lg px-4 py-3 rounded-full text-2xl
          hover:scale-105 transition"
        >
          →
        </button>

        {/* SCROLLABLE PRODUCTS */}
        <div
          ref={sliderRef}
          className="flex gap-6 overflow-x-auto scroll-smooth px-6 pb-6 items-stretch scrollbar-hide"
        >
          {newDrops.map((product) => (
            <div
              key={product.id}
              className="min-w-55 max-w-70  shrink-0"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Section3;