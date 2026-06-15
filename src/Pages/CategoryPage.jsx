import React, { useState, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import { fetchProducts } from "../api/productApi";
import { categoryData } from "../Data/categoryData";
import ProductCard from "../Components/ProductCard";

const CategoryPage = () => {
  const { type } = useParams();
  const data = categoryData[type];

  const [products, setProducts] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [sortOption, setSortOption] = useState("Newest");
  const [selectedPrice, setSelectedPrice] = useState("All");
  const [showFilters, setShowFilters] = useState(false);

  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("Newest");

  const options = [
    "Newest",
    "Price: Low to High",
    "Price: High to Low",
    "Top Rated",
  ];

  // FETCH PRODUCTS
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const res = await fetchProducts();

        const list = res?.products || res || [];

        const normalized = list.map((p) => ({
          ...p,
          category: (p.category || "").toLowerCase().trim(),
          newCategory: (p.newCategory || "").toLowerCase().trim(),
        }));

        setProducts(normalized);
      } catch (error) {
        console.log("Error fetching products:", error);
      }
    };

    loadProducts();
  }, []);

  // RESET ON CATEGORY CHANGE
  useEffect(() => {
    setSelectedFilter("All");
    setSortOption("Newest");
    setSelectedPrice("All");
    setShowFilters(false);
    setSelected("Newest");
  }, [type]);

  if (!data) {
    return (
      <div className="h-screen flex items-center justify-center">
        <h1 className="text-3xl md:text-4xl font-bold">Category Not Found</h1>
      </div>
    );
  }

  useEffect(() => {
    if (showFilters) {
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
    } else {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
    }

    return () => {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
    };
  }, [showFilters]);

  // CATEGORY FILTER
  const categoryProducts = products.filter(
    (item) =>
      (item.newCategory || "").toLowerCase().trim() ===
      (data?.productType || "").toLowerCase().trim(),
  );

  // SUB FILTER
  let filteredProducts =
    selectedFilter === "All"
      ? [...categoryProducts]
      : categoryProducts.filter(
        (item) =>
          (item.category || "").toLowerCase() ===
          selectedFilter.toLowerCase(),
      );

  // PRICE FILTER
  if (selectedPrice === "Under ₹3000") {
    filteredProducts = filteredProducts.filter((p) => p.price < 3000);
  } else if (selectedPrice === "₹3000 - ₹6000") {
    filteredProducts = filteredProducts.filter(
      (p) => p.price >= 3000 && p.price <= 6000,
    );
  } else if (selectedPrice === "₹6000 - ₹9000") {
    filteredProducts = filteredProducts.filter(
      (p) => p.price >= 6000 && p.price <= 9000,
    );
  } else if (selectedPrice === "Above ₹9000") {
    filteredProducts = filteredProducts.filter((p) => p.price > 9000);
  }

  // SORT
  const finalProducts = useMemo(() => {
    const sorted = [...filteredProducts];

    switch (sortOption) {
      case "Price: Low to High":
        return sorted.sort((a, b) => a.price - b.price);

      case "Price: High to Low":
        return sorted.sort((a, b) => b.price - a.price);

      case "Top Rated":
        return sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0));

      default:
        return sorted;
    }
  }, [filteredProducts, sortOption]);

  return (
    <div className="bg-[#f5f5f5] min-h-screen">
      {/* HERO */}
      <div className="relative h-[45vh] md:h-[70vh] w-full">
        <motion.img
          src={data.banner}
          alt={data.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
          <p className="uppercase tracking-[4px] text-xs text-zinc-300">
            Premium Collection
          </p>
          <h1 className="text-4xl md:text-7xl font-black uppercase mt-3">
            {data.title}
          </h1>
          <p className="mt-3 text-sm md:text-base text-zinc-200 max-w-2xl">
            {data.subtitle}
          </p>
        </div>
      </div>

      {/* MOBILE BUTTON */}
      <div className="lg:hidden px-4 pt-4">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="w-full bg-black text-white py-3 uppercase text-sm"
        >
          Apply Filters
        </button>
      </div>
      {/* MOBILE FILTERS - PREMIUM FLOATING SHEET */}
      <AnimatePresence>
        {showFilters && (
          <div className="lg:hidden fixed inset-0 z-50">

            {/* BACKDROP */}
            <motion.div
              className="absolute inset-0 bg-black/40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowFilters(false)}
            />

            {/* SHEET */}
            <motion.div
              className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[92%] max-h-[75vh] bg-white rounded-t-3xl shadow-[0_-10px_30px_rgba(0,0,0,0.15)] z-60"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 260, damping: 25 }}
              drag="y"
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={0.2}
              onDragEnd={(event, info) => {
                if (info?.offset?.y > 120) {
                  setShowFilters(false);
                }
              }}
            >

              {/* HANDLE */}
              <div className="flex justify-center pt-3 pb-2">
                <div className="w-12 h-1.5 bg-gray-300 rounded-full"></div>
              </div>

              {/* HEADER */}
              <div className="px-4 pb-3 flex justify-between items-center border-b">
                <h2 className="text-sm font-bold uppercase tracking-wider">
                  Filters
                </h2>

                <button
                  onClick={() => {
                    setShowFilters(!showFilters);
                    setOpen(false); // close sort dropdown
                  }}
                  className="text-xs px-3 py-1 rounded-full bg-black text-white"
                >
                  Done
                </button>
              </div>

              {/* CONTENT */}
              <div className="overflow-y-auto px-4 py-4 space-y-6 pb-10">

                {/* CATEGORY */}
                <div>
                  <h3 className="text-[11px] uppercase text-gray-800 mb-3 tracking-wider">
                    Categories
                  </h3>

                  <div className="flex flex-col gap-2">
                    {data.filters.map((filter) => (
                      <button
                        key={filter}
                        onClick={() => setSelectedFilter(filter)}
                        className={`px-4 py-3 text-xs rounded-full border transition-all ${selectedFilter === filter
                          ? "bg-black text-white shadow-md"
                          : "bg-gray-50 hover:bg-gray-100"
                          }`}
                      >
                        {filter}
                      </button>
                    ))}
                  </div>
                </div>

                {/* PRICE */}
                <div>
                  <h3 className="text-[11px] uppercase text-gray-800 mb-3 tracking-wider">
                    Price Range
                  </h3>

                  <div className="flex flex-col gap-2">
                    {[
                      "All",
                      "Under ₹3000",
                      "₹3000 - ₹6000",
                      "₹6000 - ₹9000",
                      "Above ₹9000",
                    ].map((price) => (
                      <button
                        key={price}
                        onClick={() => setSelectedPrice(price)}
                        className={`px-4 py-3 text-xs rounded-full border  transition-all ${selectedPrice === price
                          ? "bg-black text-white shadow-md"
                          : "bg-gray-50 hover:bg-gray-100"
                          }`}
                      >
                        {price}
                      </button>
                    ))}
                  </div>
                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="flex flex-col lg:flex-row">
        {/* DESKTOP SIDEBAR */}
        <div className="hidden lg:block lg:w-80 lg:sticky lg:top-16 self-start">
          <div className="bg-white px-5 py-6 h-screen overflow-y-auto">
            <h2 className="text-3xl font-bold uppercase">Filters</h2>

            <h3 className="text-xs uppercase text-zinc-400 mt-6 mb-4">
              Categories
            </h3>

            <div className="flex flex-col gap-1">
              {data.filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setSelectedFilter(filter)}
                  className={`px-4 py-3 text-xs border ${selectedFilter === filter
                    ? "bg-black text-white"
                    : "bg-white hover:bg-zinc-100"
                    }`}
                >
                  {filter}
                </button>
              ))}
            </div>

            <h3 className="text-xs uppercase text-zinc-400 mt-6 mb-4">
              Price Range
            </h3>

            {[
              "All",
              "Under ₹3000",
              "₹3000 - ₹6000",
              "₹6000 - ₹9000",
              "Above ₹9000",
            ].map((price) => (
              <button
                key={price}
                onClick={() => setSelectedPrice(price)}
                className={`w-full px-4 py-3 text-xs border ${selectedPrice === price
                  ? "bg-black text-white"
                  : "bg-white hover:bg-zinc-100"
                  }`}
              >
                {price}
              </button>
            ))}
          </div>
        </div>

        {/* PRODUCTS */}
        <div className="flex-1 px-4 md:px-8 py-6">
          {/* TOP BAR */}
          <div className="flex justify-between items-center gap-3 mb-6">
            <div className="flex-1 min-w-0">
              <h2 className="text-3xl font-bold uppercase">Products</h2>
              <p className="text-gray-500">
                Showing {finalProducts.length} products
              </p>
            </div>

            <div className="relative shrink-0 w-32 sm:w-40 md:w-56">
              <button
                onClick={() => setOpen(!open)}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-white text-left flex justify-between items-center "
              >
                <span className="truncate">{selected}</span>
                <span>▼</span>
              </button>

              {open && (
                <div className="absolute top-full right-0 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-40 overflow-hidden">
                  {options.map((option) => (
                    <button
                      key={option}
                      onClick={() => {
                        setSelected(option);
                        setSortOption(option);
                        setOpen(false);
                      }}
                      className="block w-full text-left px-4 py-3 hover:bg-gray-100"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* GRID */}
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {finalProducts.map((product) => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
