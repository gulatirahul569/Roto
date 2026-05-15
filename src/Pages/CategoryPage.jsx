import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";

import { Products } from "../Data/Products";
import { categoryData } from "../Data/categoryData";
import ProductCard from "../Components/ProductCard";

const CategoryPage = () => {

    const { type } = useParams();

    const data = categoryData[type];

    // ================= STATES =================
    const [selectedFilter, setSelectedFilter] =
        useState("All");

    const [sortOption, setSortOption] =
        useState("Newest");

    const [selectedPrice, setSelectedPrice] =
        useState("All");

    // ================= RESET =================
    useEffect(() => {

        setSelectedFilter("All");
        setSortOption("Newest");
        setSelectedPrice("All");

    }, [type]);

    // ================= INVALID PAGE =================
    if (!data) {

        return (

            <div className="h-screen flex items-center justify-center">

                <h1 className="text-4xl font-bold">
                    Category Not Found
                </h1>

            </div>

        );

    }

    // ================= PRODUCTS =================
    const categoryProducts = Products.filter(
        (item) => item.newCategory === data.productType
    );

    // ================= CATEGORY FILTER =================
    let filteredProducts =
        selectedFilter === "All"
            ? [...categoryProducts]
            : categoryProducts.filter(
                (item) =>
                    item.category === selectedFilter
            );

    // ================= PRICE FILTER =================
    if (selectedPrice === "Under ₹3000") {

        filteredProducts = filteredProducts.filter(
            (item) => item.price < 3000
        );

    }

    if (selectedPrice === "₹3000 - ₹6000") {

        filteredProducts = filteredProducts.filter(
            (item) =>
                item.price >= 3000 &&
                item.price <= 6000
        );

    }

    if (selectedPrice === "₹6000 - ₹9000") {

        filteredProducts = filteredProducts.filter(
            (item) =>
                item.price >= 6000 &&
                item.price <= 9000
        );

    }

    if (selectedPrice === "Above ₹9000") {

        filteredProducts = filteredProducts.filter(
            (item) => item.price > 9000
        );

    }

    // ================= SORTING =================
    const finalProducts = [...filteredProducts].sort(
        (a, b) => {

            if (sortOption === "Price: Low to High") {
                return a.price - b.price;
            }

            if (sortOption === "Price: High to Low") {
                return b.price - a.price;
            }

            if (sortOption === "Top Rated") {
                return (
                    (b.rating || 0) -
                    (a.rating || 0)
                );
            }

            return 0;

        }
    );

    return (

        <div className="bg-[#f5f5f5] min-h-screen">

            {/* ================= HERO BANNER ================= */}
            <div className="relative h-90 w-full">

                <motion.img
                    key={data.banner}
                    src={data.banner}
                    alt={data.title}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="w-full h-full object-cover"
                />

                {/* OVERLAY */}
                <div className="absolute inset-0 bg-black/40"></div>

                {/* TEXT */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-5">

                    <p className="uppercase tracking-[6px] text-xs text-zinc-300">
                        Premium Collection
                    </p>

                    <h1 className="text-5xl md:text-7xl font-black uppercase mt-4">
                        {data.title}
                    </h1>

                    <p className="mt-4 text-sm md:text-base text-zinc-200 max-w-2xl">
                        {data.subtitle}
                    </p>

                </div>

            </div>

            {/* ================= MAIN SECTION ================= */}
            <div className="flex relative">

                {/* ================= SIDEBAR ================= */}
                <div className="hidden lg:block w-70 shrink-0 relative">

                    <div
                        className="
                            sticky
                            top-16
                            left-0
                            bg-white
                            border-r
                            border-zinc-200
                            px-5
                            py-6
                        "
                    >

                        {/* TITLE */}
                        <div className="mb-1">

                            <h2 className="text-3xl font-bold uppercase">
                                Filters
                            </h2>

                            <p className="text-sm text-zinc-500 mt-">
                                Refine Products
                            </p>

                        </div>

                        {/* CATEGORY */}
                        <div>

                            <h3 className="text-[11px] uppercase tracking-[3px] text-zinc-400 mb-1">
                                Categories
                            </h3>

                            <div className="flex flex-col gap-1">

                                {data.filters.map((filter) => (

                                    <button
                                        key={filter}
                                        onClick={() =>
                                            setSelectedFilter(filter)
                                        }
                                        className={`
                                            w-full
                                            flex
                                            justify-between
                                            items-center
                                            px-4
                                            py-3
                                            text-xs
                                            border
                                            transition-all
                                            cursor-pointer

                                            ${
                                                selectedFilter === filter
                                                    ? "bg-black text-white border-black"
                                                    : "bg-white border-zinc-200 hover:bg-zinc-200"
                                            }
                                        `}
                                    >

                                        <span>{filter}</span>

                                        <span className="text-xs opacity-70">

                                            {
                                                filter === "All"
                                                    ? categoryProducts.length
                                                    : categoryProducts.filter(
                                                        (item) =>
                                                            item.category === filter
                                                    ).length
                                            }

                                        </span>

                                    </button>

                                ))}

                            </div>

                        </div>

                        {/* DIVIDER */}
                        <div className="border-t border-zinc-200 my-3"></div>

                        {/* PRICE */}
                        <div>

                            <h3 className="text-[11px] uppercase tracking-[3px] text-zinc-400 mb-1 ">
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
                                        onClick={() =>
                                            setSelectedPrice(price)
                                        }
                                        className={`
                                            w-full
                                            px-4
                                            py-3
                                            text-left
                                            text-xs
                                            border
                                            transition-all

                                            ${
                                                selectedPrice === price
                                                    ? "bg-black text-white border-black"
                                                    : "bg-white border-zinc-200 hover:bg-zinc-100"
                                            }
                                        `}
                                    >

                                        {price}

                                    </button>

                                ))}

                            </div>

                        </div>

                    </div>

                </div>

                {/* ================= PRODUCTS ================= */}
                <div className="flex-1 px-6 py-8">

                    {/* TOP BAR */}
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">

                        <div>

                            <h2 className="text-3xl font-bold uppercase">
                                {selectedFilter}
                            </h2>

                            <p className="text-sm text-zinc-500 mt-1">
                                Showing {finalProducts.length} products
                            </p>

                        </div>

                        {/* SORT */}
                        <select
                            value={sortOption}
                            onChange={(e) =>
                                setSortOption(e.target.value)
                            }
                            className="
                                bg-white
                                border
                                border-zinc-300
                                px-5
                                py-3
                                text-sm
                                outline-none
                            "
                        >

                            <option>
                                Newest
                            </option>

                            <option>
                                Price: Low to High
                            </option>

                            <option>
                                Price: High to Low
                            </option>

                            <option>
                                Top Rated
                            </option>

                        </select>

                    </div>

                    {/* PRODUCTS GRID */}
                    <div
                        className="
                            grid
                            grid-cols-1
                            sm:grid-cols-2
                            xl:grid-cols-3
                            gap-8
                        "
                    >

                        {finalProducts.map((product, index) => (

                            <motion.div
                                key={product.id}
                                initial={{
                                    opacity: 0,
                                    y: 40,
                                }}
                                animate={{
                                    opacity: 1,
                                    y: 0,
                                }}
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