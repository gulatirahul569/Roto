import axios from "axios";

const API = "http://localhost:5000/api/products";

// GET ALL PRODUCTS
export const fetchProducts = async () => {
  const res = await axios.get(API);
  return res.data;
};

// ✅ NEW: SEARCH PRODUCTS
export const searchProducts = async (query) => {
  const res = await axios.get(`${API}?search=${query}`);
  return res.data;
};

// GET SINGLE PRODUCT
export const fetchProductById = async (id) => {
  const res = await axios.get(`${API}/${id}`);
  return res.data;
};