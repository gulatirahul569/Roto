import React, { useState } from "react";
import { useAuth } from "../Context/AuthContext";
import { createProduct } from "../api/productApi";
import { categoryData } from "../data/categoryData";
import { useNavigate } from "react-router-dom";

const Admin = () => {
    const { token } = useAuth();

    const navigate = useNavigate();

    const [selectedCategory, setSelectedCategory] = useState("bags");

    const [form, setForm] = useState({
        name: "",
        price: "",
        image: "",
        newCategory: "bags",
        category: "",
        subCategory: "",
        description: "",
        stock: "",
    });

    /* CATEGORY CHANGE */
    const handleCategoryChange = (key) => {
        setSelectedCategory(key);

        setForm({
            ...form,
            newCategory: key,
            category: categoryData[key].filters[0], // AUTO FIX
            subCategory: "general",
        });
    };

    /* INPUT CHANGE */
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    /* SUBMIT */
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const cleanedData = {
                ...form,
                price: Number(form.price),
                stock: Number(form.stock),
            };

            await createProduct(cleanedData, token);

            alert("Product Added Successfully ✅");

            setForm({
                name: "",
                price: "",
                image: "",
                newCategory: selectedCategory,
                category: "",
                subCategory: "",
                description: "",
                stock: "",
            });
        } catch (error) {
            console.log(error.response?.data || error.message);
            alert(error.response?.data?.message || "Error adding product");
        }
    };

    const currentCategory = categoryData[selectedCategory];

    return (


        <div className="min-h-screen bg-gray-100 p-6">
           

            <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6">

                {/* FORM */}
                <div className="md:col-span-2 bg-white p-6 rounded-xl shadow">

                    <h2 className="text-2xl font-bold mb-4">
                        Add Product
                    </h2>

                    {/* CATEGORY BUTTONS */}
                    <div className="grid grid-cols-2 gap-2 mb-4">
                        {Object.keys(categoryData).map((key) => (
                            <button
                                key={key}
                                onClick={() => handleCategoryChange(key)}
                                className={`p-2 rounded border capitalize ${selectedCategory === key
                                        ? "bg-black text-white"
                                        : "bg-gray-100"
                                    }`}
                            >
                                {key}
                            </button>
                        ))}
                    </div>

                    {/* FORM */}
                    <form onSubmit={handleSubmit} className="space-y-3">

                        <input
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            placeholder="Product Name"
                            className="w-full p-2 border rounded"
                        />

                        <div className="grid grid-cols-2 gap-3">
                            <input
                                name="price"
                                value={form.price}
                                onChange={handleChange}
                                placeholder="Price"
                                className="p-2 border rounded"
                            />

                            <input
                                name="stock"
                                value={form.stock}
                                onChange={handleChange}
                                placeholder="Stock"
                                className="p-2 border rounded"
                            />
                        </div>

                        <input
                            name="image"
                            value={form.image}
                            onChange={handleChange}
                            placeholder="Image URL"
                            className="w-full p-2 border rounded"
                        />

                        {/* SUB CATEGORY */}
                        <select
                            name="category"
                            value={form.category}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                        >
                            <option value="">Select Category</option>
                            {currentCategory.filters.map((f) => (
                                <option key={f} value={f}>
                                    {f}
                                </option>
                            ))}
                        </select>

                        <textarea
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            placeholder="Description"
                            className="w-full p-2 border rounded"
                        />

                        <button className="w-full bg-black text-white p-3 rounded">
                            Add Product
                        </button>

                    </form>
                </div>

                {/* PREVIEW */}
                <div className="bg-white p-4 rounded-xl shadow">

                    <img
                        src={currentCategory.banner}
                        className="rounded mb-3"
                    />

                    <h3 className="font-bold">
                        {currentCategory.title}
                    </h3>

                    <p className="text-sm text-gray-500">
                        {currentCategory.subtitle}
                    </p>

                </div>

            </div>
        </div>
    );
};

export default Admin;