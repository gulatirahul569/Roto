import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Products } from "../Data/Products";
import { useCart } from "../Components/CartContext";
import { categoryData } from "../Data/categoryData";
import ProductCard from "../Components/ProductCard";
import { useEffect } from "react";

const CategoryPage = () => {
    const { type } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();

    const data = categoryData[type];

    const [selectedFilter, setSelectedFilter] = useState("All");

    useEffect(() => {
        setSelectedFilter("All");
    }, [type]);

    // If invalid route
    if (!data) {
        return (
            <div className="h-screen flex items-center justify-center">
                <h1 className="text-3xl font-bold">Category Not Found</h1>
            </div>
        );
    }

    // Filter products by category type (Bag, Shoe, Sling etc.)
    const categoryProducts = Products.filter(
        (item) => item.newCategory === data.productType
    );

    // Apply sub-filter (Travel, Casual, Premium etc.)
    const finalProducts =
        selectedFilter === "All"
            ? categoryProducts
            : categoryProducts.filter(
                (item) => item.category === selectedFilter
            );

    return (
        <div className="min-h-screen bg-gray-50">

            {/* HEADER */}
            <div className="text-center py-10">

                <h1 className="text-5xl font-bold uppercase">
                    {data.title}
                </h1>

                <p className="text-gray-500 mt-2">
                    {data.subtitle}
                </p>

                {/* FILTERS */}
                <div className="flex justify-center gap-3 mt-6 flex-wrap">

                    {data.filters.map((filter) => (
                        <button
                            key={filter}
                            onClick={() => setSelectedFilter(filter)}
                            className={`px-4 py-2 rounded-full text-sm border transition ${selectedFilter === filter
                                ? "bg-black text-white"
                                : "bg-white hover:bg-black hover:text-white"
                                }`}
                        >
                            {filter}
                        </button>
                    ))}

                </div>
            </div>

            {/* PRODUCTS GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 px-6 pb-10">

                {finalProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}

            </div>
        </div >
    );
};

export default CategoryPage;