import React, { useRef, useEffect, useState } from "react";
import { fetchProducts } from "../api/productApi";
import ProductCard from "../Components/ProductCard";

const Section3 = () => {
  const sliderRef = useRef(null);
  const [products, setProducts] = useState([]);

  // FETCH PRODUCTS
  useEffect(() => {
    const getProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data?.products || data || []);
      } catch (err) {
        console.log("Error fetching products:", err);
      }
    };

    getProducts();
  }, []);

  // FILTER NEW DROPS
  const newDrops = products.filter(
    (p) => (p.newCategory || "").toLowerCase() === "new"
  );

  // SCROLL LEFT
  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: -300,
        behavior: "smooth",
      });
    }
  };

  // SCROLL RIGHT
  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: 300,
        behavior: "smooth",
      });
    }
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
          className="absolute left-2 top-1/2 -translate-y-1/2 z-20
          bg-white shadow-lg px-3 py-2 rounded-full text-xl
          hover:scale-105 transition active:scale-95"
        >
          ←
        </button>

        {/* RIGHT BUTTON */}
        <button
          onClick={scrollRight}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-20
          bg-white shadow-lg px-3 py-2 rounded-full text-xl
          hover:scale-105 transition active:scale-95"
        >
          →
        </button>

        {/* PRODUCTS SCROLLER */}
        <div
          ref={sliderRef}
          className="flex gap-4 overflow-x-auto scroll-smooth px-4 pb-6 items-stretch scrollbar-hide"
        >
          {newDrops.length > 0 ? (
            newDrops.map((product) => (
              <div
                key={product._id}
                className="min-w-50 max-w-50 sm:min-w-50 md:min-w-50 lg:min-w-68 shrink-0"
              >
                <ProductCard product={product} />
              </div>
            ))
          ) : (
            <p className="text-gray-500 px-6">Loading new drops...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Section3;