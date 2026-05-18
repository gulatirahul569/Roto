import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";

import { Products } from "../Data/Products";
import { categoryData } from "../Data/categoryData";
import ProductCard from "../Components/ProductCard";

const CategoryPage = () => {
    const { type } = useParams();
    const data = categoryData[type];

    // STATES
    const [selectedFilter, setSelectedFilter] = useState("All");
    const [sortOption, setSortOption] = useState("Newest");
    const [selectedPrice, setSelectedPrice] = useState("All");

    // MOBILE FILTER TOGGLE
    const [showFilters, setShowFilters] = useState(false);

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
                <h1 className="text-3xl md:text-4xl font-bold">
                    Category Not Found
                </h1>
            </div>
        );
    }

    // PRODUCTS FILTER
    const categoryProducts = Products.filter(
        (item) => item.newCategory === data.productType
    );

    let filteredProducts =
        selectedFilter === "All"
            ? [...categoryProducts]
            : categoryProducts.filter(
                  (item) => item.category === selectedFilter
              );

    // PRICE FILTER
    if (selectedPrice === "Under ₹3000") {
        filteredProducts = filteredProducts.filter(
            (item) => item.price < 3000
        );
    }

    if (selectedPrice === "₹3000 - ₹6000") {
        filteredProducts = filteredProducts.filter(
            (item) => item.price >= 3000 && item.price <= 6000
        );
    }

    if (selectedPrice === "₹6000 - ₹9000") {
        filteredProducts = filteredProducts.filter(
            (item) => item.price >= 6000 && item.price <= 9000
        );
    }

    if (selectedPrice === "Above ₹9000") {
        filteredProducts = filteredProducts.filter(
            (item) => item.price > 9000
        );
    }

    // SORT
    const finalProducts = [...filteredProducts].sort((a, b) => {
        if (sortOption === "Price: Low to High") return a.price - b.price;
        if (sortOption === "Price: High to Low") return b.price - a.price;
        if (sortOption === "Top Rated")
            return (b.rating || 0) - (a.rating || 0);
        return 0;
    });

    return (
        <div className="bg-[#f5f5f5] min-h-screen">

            {/* HERO */}
            <div className="relative h-[45vh] md:h-[70vh] w-full">
                <motion.img
                    key={data.banner}
                    src={data.banner}
                    alt={data.title}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-black/40"></div>

                <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">

                    <p className="uppercase tracking-[4px] md:tracking-[6px] text-[10px] md:text-xs text-zinc-300">
                        Premium Collection
                    </p>

                    <h1 className="text-3xl sm:text-5xl md:text-7xl font-black uppercase mt-3 md:mt-4">
                        {data.title}
                    </h1>

                    <p className="mt-3 md:mt-4 text-xs sm:text-sm md:text-base text-zinc-200 max-w-2xl leading-relaxed">
                        {data.subtitle}
                    </p>

                </div>
            </div>

            {/* MOBILE FILTER BUTTON */}
            <div className="lg:hidden px-4 pt-4">
                <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="w-full bg-black text-white py-3 uppercase text-sm tracking-wider"
                >
                    {showFilters ? "Close Filters" : "Open Filters"}
                </button>
            </div>

            {/* MAIN SECTION */}
            <div className="flex flex-col lg:flex-row relative">

                {/* SIDEBAR */}
                <div
                    className={`
                        ${showFilters ? "block" : "hidden"}
                        lg:block
                        w-full lg:w-70
                        shrink-0
                        relative
                    `}
                >
                    <div className="lg:sticky lg:top-16 bg-white border-r border-zinc-200 px-5 py-6">

                        {/* TITLE */}
                        <div className="mb-4">
                            <h2 className="text-2xl md:text-3xl font-bold uppercase">
                                Filters
                            </h2>
                            <p className="text-sm text-zinc-500">
                                Refine Products
                            </p>
                        </div>

                        {/* CATEGORY FILTER */}
                        <h3 className="text-[11px] uppercase tracking-[3px] text-zinc-400 mb-2">
                            Categories
                        </h3>

                        <div className="flex flex-col gap-1">
                            {data.filters.map((filter) => (
                                <button
                                    key={filter}
                                    onClick={() => setSelectedFilter(filter)}
                                    className={`w-full flex justify-between items-center px-4 py-3 text-xs border transition-all ${
                                        selectedFilter === filter
                                            ? "bg-black text-white border-black"
                                            : "bg-white border-zinc-200 hover:bg-zinc-100"
                                    }`}
                                >
                                    <span>{filter}</span>
                                    <span className="opacity-70">
                                        {filter === "All"
                                            ? categoryProducts.length
                                            : categoryProducts.filter(
                                                  (item) =>
                                                      item.category === filter
                                              ).length}
                                    </span>
                                </button>
                            ))}
                        </div>

                        <div className="border-t border-zinc-200 my-4"></div>

                        {/* PRICE FILTER */}
                        <h3 className="text-[11px] uppercase tracking-[3px] text-zinc-400 mb-2">
                            Price Range
                        </h3>

                        <div className="flex flex-col gap-1">
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
                                    className={`w-full px-4 py-3 text-left text-xs border transition-all ${
                                        selectedPrice === price
                                            ? "bg-black text-white border-black"
                                            : "bg-white border-zinc-200 hover:bg-zinc-100"
                                    }`}
                                >
                                    {price}
                                </button>
                            ))}
                        </div>

                    </div>
                </div>

                {/* PRODUCTS */}
                <div className="flex-1 px-4 sm:px-6 md:px-8 py-6 md:py-8">

                    {/* TOP BAR */}
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6 md:mb-8">

                        <div>
                            <h2 className="text-2xl md:text-3xl font-bold uppercase">
                                {selectedFilter}
                            </h2>
                            <p className="text-sm text-zinc-500 mt-1">
                                Showing {finalProducts.length} products
                            </p>
                        </div>

                        <select
                            value={sortOption}
                            onChange={(e) => setSortOption(e.target.value)}
                            className="bg-white border border-zinc-300 px-4 py-3 text-sm outline-none"
                        >
                            <option>Newest</option>
                            <option>Price: Low to High</option>
                            <option>Price: High to Low</option>
                            <option>Top Rated</option>
                        </select>

                    </div>

                    {/* GRID */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-5 md:gap-8">

                        {finalProducts.map((product, index) => (
                            <motion.div
                                key={product.id}
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    duration: 0.4,
                                    delay: index * 0.04,
                                }}
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