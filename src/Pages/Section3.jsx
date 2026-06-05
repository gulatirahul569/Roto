import React, { useRef, useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../Components/ProductCard";

const Section3 = () => {
  const sliderRef = useRef(null);

  const [products, setProducts] = useState([]);

  // FETCH PRODUCTS FROM BACKEND
  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/products");
        setProducts(res.data);
      } catch (err) {
        console.log("Error fetching products:", err);
      }
    };

    getProducts();
  }, []);

  // FILTER NEW DROPS
  const newDrops = products.filter(
  (p) => p.newCategory === "new"
);
  

  // SCROLL LEFT
  const scrollLeft = () => {
    sliderRef.current.scrollBy({
      left: -350,
      behavior: "smooth",
    });
  };

  // SCROLL RIGHT
  const scrollRight = () => {
    sliderRef.current.scrollBy({
      left: 350,
      behavior: "smooth",
    });
  };

  return (
    <div className="py-10 relative">

      {/* HEADING */}
      <div className="flex flex-col gap-2 mb-10">
        <h1 className="text-4xl md:text-5xl font-bold uppercase tracking-widest text-center">
          New Drops
        </h1>

        <h2 className="text-md flex justify-center text-gray-600">
          The latest gear, ready to ride.
        </h2>
      </div>

      {/* SLIDER */}
      <div className="relative">

        {/* LEFT BUTTON */}
        <button
          onClick={scrollLeft}
          className="absolute left-2 top-1/3 -translate-y-1/2 z-10
          bg-white shadow-lg px-4 py-3 rounded-full text-2xl
          hover:scale-110 transition"
        >
          ←
        </button>

        {/* RIGHT BUTTON */}
        <button
          onClick={scrollRight}
          className="absolute right-2 top-1/3 -translate-y-1/2 z-10
          bg-gray-300 shadow-lg px-4 py-3 rounded-full text-2xl
          hover:scale-105 transition"
        >
          →
        </button>

        {/* PRODUCTS SCROLLER */}
        <div
          ref={sliderRef}
          className="flex gap-6 overflow-x-auto scroll-smooth px-6 pb-6 items-stretch scrollbar-hide"
        >
          {newDrops.length > 0 ? (
            newDrops.map((product) => (
              <div
                key={product._id}
                className="min-w-70 max-w-80 shrink-0"
              >
                <ProductCard product={product} />
              </div>
            ))
          ) : (
            <p className="text-gray-500 px-6">
              Loading new drops...
            </p>
          )}
        </div>

      </div>
    </div>
  );
};

export default Section3;