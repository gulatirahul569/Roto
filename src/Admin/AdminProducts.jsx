import React, { useEffect, useState } from "react";
import axios from "axios";
import { fetchProducts, updateProduct, deleteProduct } from "../api/productApi";
import { useAuth } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [search, setSearch] = useState("");
  const [uploading, setUploading] = useState(false);

  const navigate = useNavigate();
  const { token } = useAuth();

  /* FETCH */
  const loadProducts = async () => {
    try {
      const data = await fetchProducts();
      setProducts(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  /* UPDATE */
  const handleUpdate = async () => {
    try {
      await updateProduct(editingProduct._id, editingProduct, token);
      setEditingProduct(null);
      loadProducts();
    } catch (error) {
      console.log(error);
    }
  };

  /* DELETE */
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;

    try {
      await deleteProduct(id, token);
      loadProducts();
    } catch (error) {
      console.log(error);
    }
  };

  /* SEARCH */
  const filteredProducts = products.filter((p) =>
    (p.name || "").toLowerCase().includes(search.toLowerCase()),
  );

  /* IMAGE UPLOAD */
  const handleEditImageUpload = async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    try {
      setUploading(true);

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setEditingProduct((prev) => ({
        ...prev,
        image: res.data.imageUrl,
      }));
    } catch (error) {
      console.log(error);
      alert("Image upload failed");
    } finally {
      setUploading(false);
    }
  };
  return (
    <div className="space-y-6 bg-linear-to-br from-zinc-50 via-white to-blue-50/40 min-h-screen p-2">
      {/* HEADER */}
      <div className="bg-white/70 backdrop-blur-xl p-4 rounded-3xl shadow-lg border border-white/60">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black">Products Inventory</h1>
            <p className="text-sm text-zinc-500">
              Manage your store products easily
            </p>
          </div>

          <div className="flex gap-2 w-full lg:w-auto">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search product..."
              className="w-full sm:w-64 px-3 py-2 border rounded-xl text-sm"
            />

            <button
              onClick={() => navigate("/admin/add-product")}
              className="bg-black text-white px-4 py-2 rounded-xl"
            >
              ➕ Add
            </button>
          </div>
        </div>
      </div>

      {/* TABLE */}
      <div className="hidden md:block bg-white/70 backdrop-blur-xl rounded-3xl shadow-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-zinc-100 text-xs uppercase text-zinc-500">
            <tr>
              <th className="p-4 text-left">Product</th>
              <th className="p-4 text-left">Price</th>
              <th className="p-4 text-left">Category</th>
              <th className="p-4 text-left">Stock</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredProducts.map((p) => (
              <tr key={p._id} className="border-t hover:bg-blue-50/30">
                <td className="p-4 flex items-center gap-3">
                  <img
                    src={p.image}
                    className="w-12 h-12 rounded-xl object-cover border"
                  />
                  <div>
                    <p className="font-semibold">{p.name}</p>
                    <p className="text-xs text-zinc-400">
                      ID: {p._id.slice(-6)}
                    </p>
                  </div>
                </td>

                <td className="p-4 font-semibold">
                  ₹{Number(p.price).toLocaleString()}
                </td>

                <td className="p-4">
                  <span className="px-2 py-1 text-xs bg-zinc-100 rounded-full">
                    {p.category}
                  </span>
                </td>

                <td className="p-4">
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      p.stock > 10
                        ? "bg-green-100 text-green-700"
                        : p.stock > 0
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                    }`}
                  >
                    {p.stock > 0 ? `${p.stock} in stock` : "Out of stock"}
                  </span>
                </td>

                <td className="p-4 flex gap-2">
                  <button
                    onClick={() => setEditingProduct(p)}
                    className="px-3 py-1 text-xs bg-blue-500 text-white rounded-lg"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(p._id)}
                    className="px-3 py-1 text-xs bg-red-500 text-white rounded-lg"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MOBILE */}
      <div className="md:hidden space-y-4">
        {filteredProducts.map((p) => (
          <div key={p._id} className="bg-white p-4 rounded-xl shadow">
            <div className="flex gap-3">
              <img
                src={p.image}
                className="w-20 h-20 object-cover rounded-xl border"
              />

              <div>
                <h3 className="font-bold">{p.name}</h3>
                <p>₹{p.price}</p>
                <p className="text-sm text-zinc-500">{p.category}</p>
              </div>
            </div>

            <div className="flex gap-2 mt-3">
              <button
                onClick={() => setEditingProduct(p)}
                className="flex-1 bg-blue-500 text-white py-2 rounded-xl"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(p._id)}
                className="flex-1 bg-red-500 text-white py-2 rounded-xl"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ========================= EDIT MODAL ========================= */}
      {editingProduct && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white w-full max-w-md p-6 rounded-3xl space-y-4">
            <h2 className="text-xl font-bold">Edit Product</h2>

            {/* NAME */}
            <label className="text-sm font-semibold">Product Name</label>
            <input
              className="w-full p-3 border rounded-xl"
              value={editingProduct.name}
              onChange={(e) =>
                setEditingProduct({
                  ...editingProduct,
                  name: e.target.value,
                })
              }
            />
            {/* IMAGE */}
            <div className="space-y-2">
              <label className="text-sm font-semibold">Product Image</label>

              <div className="border-2 border-dashed p-4 rounded-xl text-center bg-zinc-50">
                <input
                  type="file"
                  id="editImg"
                  className="hidden"
                  accept="image/*"
                  onChange={(e) => handleEditImageUpload(e.target.files[0])}
                />

                <label htmlFor="editImg" className="cursor-pointer block">
                  {uploading ? (
                    <p className="text-blue-500 text-sm">Uploading...</p>
                  ) : editingProduct.image ? (
                    <img
                      src={editingProduct.image}
                      className="w-24 h-24 mx-auto object-cover rounded-xl"
                    />
                  ) : (
                    <p>Upload Image</p>
                  )}
                </label>
              </div>

              <label className="text-sm font-semibold">Or Image URL</label>

              <input
                className="w-full p-3 border rounded-xl"
                value={editingProduct.image}
                onChange={(e) =>
                  setEditingProduct({
                    ...editingProduct,
                    image: e.target.value,
                  })
                }
                placeholder="Paste image URL"
              />
            </div>

            {/* PRICE */}
            <label className="text-sm font-semibold">Price</label>
            <input
              className="w-full p-3 border rounded-xl"
              value={editingProduct.price}
              onChange={(e) =>
                setEditingProduct({
                  ...editingProduct,
                  price: e.target.value,
                })
              }
            />

            {/* STOCK */}
            <label className="text-sm font-semibold">Stock</label>
            <input
              className="w-full p-3 border rounded-xl"
              value={editingProduct.stock}
              onChange={(e) =>
                setEditingProduct({
                  ...editingProduct,
                  stock: e.target.value,
                })
              }
            />

            {/* BUTTONS */}
            <div className="flex gap-2">
              <button
                onClick={handleUpdate}
                className="flex-1 bg-black text-white py-3 rounded-xl"
              >
                Save
              </button>

              <button
                onClick={() => setEditingProduct(null)}
                className="flex-1 bg-zinc-200 py-3 rounded-xl"
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
