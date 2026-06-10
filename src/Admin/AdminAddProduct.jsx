import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../Context/AuthContext";
import { createProduct } from "../api/productApi";
import { categoryData } from "../Data/categoryData";

const Admin = () => {
  const { token } = useAuth();

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

  /* ======================
       CATEGORY CHANGE
    ====================== */
  const handleCategoryChange = (key) => {
    setSelectedCategory(key);

    setForm({
      ...form,
      newCategory: key,
      category: categoryData[key].filters[0],
      subCategory: "general",
    });
  };

  /* ======================
       INPUT CHANGE
    ====================== */
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  /* ======================
       IMAGE UPLOAD
    ====================== */
  const handleImageUpload = async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setForm((prev) => ({
        ...prev,
        image: res.data.imageUrl,
      }));
    } catch (error) {
      console.log(error);
      alert("Image upload failed");
    }
  };

  /* ======================
       SUBMIT PRODUCT
    ====================== */
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
      console.log(error);
      alert("Error adding product");
    }
  };

  const currentCategory = categoryData[selectedCategory];

  /* ======================
       UI
    ====================== */
  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* LEFT FORM */}
        <div className="md:col-span-2 bg-white p-4 sm:p-6 rounded-2xl shadow">
          <h2 className="text-2xl font-bold mb-5">Add Product</h2>

          {/* CATEGORY BUTTONS */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-5">
            {Object.keys(categoryData).map((key) => (
              <button
                key={key}
                onClick={() => handleCategoryChange(key)}
                className={`p-2 rounded-lg border capitalize text-sm transition ${
                  selectedCategory === key
                    ? "bg-black text-white"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
              >
                {key}
              </button>
            ))}
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Product Name"
              className="w-full p-3 border rounded-lg"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                name="price"
                value={form.price}
                onChange={handleChange}
                placeholder="Price"
                className="p-3 border rounded-lg"
              />

              <input
                name="stock"
                value={form.stock}
                onChange={handleChange}
                placeholder="Stock"
                className="p-3 border rounded-lg"
              />
            </div>

            {/* 🔥 IMAGE UPLOAD SECTION (FIXED UI) */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">
                Product Image
              </label>

              <div className="border-2 border-dashed border-gray-300 rounded-xl p-5 text-center bg-gray-50 hover:bg-gray-100 transition">
                <input
                  type="file"
                  accept="image/*"
                  id="uploadImg"
                  className="hidden"
                  onChange={(e) => handleImageUpload(e.target.files[0])}
                />

                <label htmlFor="uploadImg" className="cursor-pointer block">
                  {form.image ? (
                    <div className="flex flex-col items-center gap-3">
                      <img
                        src={form.image}
                        className="w-28 h-28 object-cover rounded-lg border"
                      />

                      <p className="text-green-600 text-sm font-medium">
                        Click to change image
                      </p>
                    </div>
                  ) : (
                    <div className="py-6">
                      <div className="text-4xl">📤</div>

                      <p className="font-medium text-gray-700">
                        Click to upload image
                      </p>

                      <p className="text-xs text-gray-400 mt-1">
                        JPG, PNG, WEBP (max 5MB)
                      </p>
                    </div>
                  )}
                </label>
              </div>

              {/* optional URL input */}
              <input
                name="image"
                value={form.image}
                onChange={handleChange}
                placeholder="Or paste image URL"
                className="w-full p-2 border rounded-lg text-sm"
              />
            </div>

            {/* CATEGORY SELECT */}
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg"
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
              rows={3}
              className="w-full p-3 border rounded-lg"
            />

            <button className="w-full bg-black text-white p-3 rounded-lg hover:bg-gray-800">
              Add Product
            </button>
          </form>
        </div>

        {/* RIGHT PREVIEW */}
        <div className="bg-white p-4 rounded-2xl shadow">
          <img
            src={currentCategory.banner}
            className="rounded-lg mb-4 w-full object-cover"
          />

          <h3 className="font-bold text-lg">{currentCategory.title}</h3>

          <p className="text-sm text-gray-500">{currentCategory.subtitle}</p>
        </div>
      </div>
    </div>
  );
};

export default Admin;
