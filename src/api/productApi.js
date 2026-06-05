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
// create new product
export const createProduct = async (
  productData,
  token
) => {
  const res = await axios.post(
    `${API}/create`,
    productData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};
//update
export const updateProduct = async (id, data, token) => {
  const res = await axios.put(
    `http://localhost:5000/api/products/${id}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};
//delete
export const deleteProduct = async (id, token) => {
  const res = await axios.delete(
    `http://localhost:5000/api/products/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};