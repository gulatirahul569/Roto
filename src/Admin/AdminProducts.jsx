import React, { useEffect, useState } from "react";
import axios from "axios";
import { updateProduct, deleteProduct } from "../api/productApi";
import { useAuth } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";

const AdminProducts = () => {
    const [products, setProducts] = useState([]);
    const [editingProduct, setEditingProduct] = useState(null);
    const [search, setSearch] = useState("");
    const navigate = useNavigate();

    const { token } = useAuth();

    const fetchProducts = async () => {
        try {
            const res = await axios.get("http://localhost:5000/api/products");
            setProducts(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleUpdate = async () => {
        try {
            await updateProduct(editingProduct._id, editingProduct, token);
            setEditingProduct(null);
            fetchProducts();
        } catch (error) {
            console.log(error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteProduct(id, token);
            fetchProducts();
        } catch (error) {
            console.log(error);
        }
    };

    const filteredProducts = products.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="space-y-6">

            {/* HEADER */}
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 bg-white p-4 rounded-xl shadow">

                <div>
                    <h1 className="text-2xl font-black">Products Inventory</h1>
                    <p className="text-sm text-gray-500">
                        Manage your store products easily
                    </p>
                </div>

                <div className="flex gap-2">

                    <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search product..."
                        className="px-3 py-2 border rounded-lg text-sm"
                    />

                    <button
                        onClick={() => navigate("/admin/add-product")}
                        className="bg-black text-white px-4 py-2 rounded-lg text-sm hover:bg-gray-800"
                    >
                        ➕ Add Product
                    </button>

                </div>

            </div>

            {/* TABLE */}
            <div className="bg-white rounded-2xl shadow overflow-hidden">

                <table className="w-full text-sm">

                    <thead className="bg-gray-100 text-xs uppercase text-gray-600">
                        <tr>
                            <th className="p-4 text-left">Product</th>
                            <th className="p-4 text-left">Price</th>
                            <th className="p-4 text-left">Category</th>
                            <th className="p-4 text-left">Stock</th>
                            <th className="p-4 text-left">Actions</th>
                        </tr>
                    </thead>

                    <tbody>

                        {filteredProducts.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="p-10 text-center text-gray-500">
                                    No products found
                                </td>
                            </tr>
                        ) : (
                            filteredProducts.map((p) => (
                                <tr
                                    key={p._id}
                                    className="border-t hover:bg-gray-50 transition"
                                >

                                    {/* PRODUCT */}
                                    <td className="p-4 flex items-center gap-3">
                                        <img
                                            src={p.image}
                                            className="w-12 h-12 rounded-lg object-cover border shadow-sm"
                                        />

                                        <div>
                                            <p className="font-semibold">{p.name}</p>
                                            <p className="text-xs text-gray-400">
                                                ID: {p._id.slice(-6)}
                                            </p>
                                        </div>
                                    </td>

                                    {/* PRICE */}
                                    <td className="p-4 font-bold">
                                        ₹{Number(p.price).toLocaleString()}
                                    </td>

                                    {/* CATEGORY */}
                                    <td className="p-4">
                                        <span className="px-2 py-1 text-xs bg-gray-100 rounded-full">
                                            {p.category}
                                        </span>
                                    </td>

                                    {/* STOCK */}
                                    <td className="p-4">
                                        <span
                                            className={`px-2 py-1 text-xs rounded-full font-semibold ${p.stock > 10
                                                    ? "bg-green-100 text-green-700"
                                                    : p.stock > 0
                                                        ? "bg-yellow-100 text-yellow-700"
                                                        : "bg-red-100 text-red-700"
                                                }`}
                                        >
                                            {p.stock > 0 ? `${p.stock} in stock` : "Out of stock"}
                                        </span>
                                    </td>

                                    {/* ACTIONS */}
                                    <td className="p-4 flex gap-2">

                                        <button
                                            onClick={() => setEditingProduct(p)}
                                            className="px-3 py-1 text-xs bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                                        >
                                            Edit
                                        </button>

                                        <button
                                            onClick={() => handleDelete(p._id)}
                                            className="px-3 py-1 text-xs bg-red-500 text-white rounded-lg hover:bg-red-600"
                                        >
                                            Delete
                                        </button>

                                    </td>

                                </tr>
                            ))
                        )}

                    </tbody>
                </table>
            </div>

            {/* MODAL */}
            {editingProduct && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center">

                    <div className="bg-white w-full max-w-md p-6 rounded-2xl shadow-xl space-y-4">

                        <h2 className="text-xl font-bold">Edit Product</h2>

                        <input
                            className="w-full p-2 border rounded"
                            value={editingProduct.name}
                            onChange={(e) =>
                                setEditingProduct({ ...editingProduct, name: e.target.value })
                            }
                        />

                        <input
                            className="w-full p-2 border rounded"
                            value={editingProduct.price}
                            onChange={(e) =>
                                setEditingProduct({ ...editingProduct, price: e.target.value })
                            }
                        />

                        <input
                            className="w-full p-2 border rounded"
                            value={editingProduct.image}
                            onChange={(e) =>
                                setEditingProduct({ ...editingProduct, image: e.target.value })
                            }
                        />

                        <input
                            className="w-full p-2 border rounded"
                            value={editingProduct.stock}
                            onChange={(e) =>
                                setEditingProduct({ ...editingProduct, stock: e.target.value })
                            }
                        />

                        <div className="flex gap-2 pt-2">

                            <button
                                onClick={handleUpdate}
                                className="flex-1 bg-green-600 text-white py-2 rounded hover:bg-green-700"
                            >
                                Save Changes
                            </button>

                            <button
                                onClick={() => setEditingProduct(null)}
                                className="flex-1 bg-gray-400 text-white py-2 rounded hover:bg-gray-500"
                            >
                                Cancel
                            </button>

                        </div>

                    </div>

                </div>
            )}

        </div>
    );
};

export default AdminProducts;