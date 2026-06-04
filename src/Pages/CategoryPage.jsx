import React, { useState, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";

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
  }, [type]);

  if (!data) {
    return (
      <div className="h-screen flex items-center justify-center">
        <h1 className="text-3xl md:text-4xl font-bold">Category Not Found</h1>
      </div>
    );
  }

  // CATEGORY FILTER
  const categoryProducts = products.filter(
    (item) =>
      (item.newCategory || "").toLowerCase().trim() ===
      (data?.productType || "").toLowerCase().trim()
  );

  // SUB FILTER
  let filteredProducts =
    selectedFilter === "All"
      ? [...categoryProducts]
      : categoryProducts.filter(
          (item) =>
            (item.category || "").toLowerCase() ===
            selectedFilter.toLowerCase()
        );

  // PRICE FILTER
  if (selectedPrice === "Under ₹3000") {
    filteredProducts = filteredProducts.filter((p) => p.price < 3000);
  } else if (selectedPrice === "₹3000 - ₹6000") {
    filteredProducts = filteredProducts.filter(
      (p) => p.price >= 3000 && p.price <= 6000
    );
  } else if (selectedPrice === "₹6000 - ₹9000") {
    filteredProducts = filteredProducts.filter(
      (p) => p.price >= 6000 && p.price <= 9000
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

      {/* MOBILE FILTERS (DOWNWARD) */}
      <div
        className={`lg:hidden px-4 overflow-hidden transition-all duration-300 ${
          showFilters ? "max-h-150 opacity-100 mt-4" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-white p-4 rounded-lg shadow-md">

          <h3 className="text-xs uppercase text-zinc-400 mb-3">
            Categories
          </h3>

          <div className="flex flex-col gap-2">
            {data.filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`px-4 py-2 text-xs border ${
                  selectedFilter === filter
                    ? "bg-black text-white"
                    : "bg-white hover:bg-zinc-100"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          <h3 className="text-xs uppercase text-zinc-400 mt-5 mb-3">
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
                className={`px-4 py-2 text-xs border ${
                  selectedPrice === price
                    ? "bg-black text-white"
                    : "bg-white hover:bg-zinc-100"
                }`}
              >
                {price}
              </button>
            ))}
          </div>

        </div>
      </div>

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
                  className={`px-4 py-3 text-xs border ${
                    selectedFilter === filter
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
                className={`w-full px-4 py-3 text-xs border ${
                  selectedPrice === price
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
          <div className="flex justify-between mb-6 gap-2">
            <div>
              <h2 className="text-2xl font-bold uppercase">
                {selectedFilter}
              </h2>
              <p className="text-sm text-zinc-500">
                Showing {finalProducts.length} products
              </p>
            </div>

            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="border px-2 py-2 max-w-40 truncate"
            >
              <option>Newest</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Top Rated</option>
            </select>
          </div>

          {/* GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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