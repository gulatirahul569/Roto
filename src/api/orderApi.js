import axios from "axios";
const API = `${import.meta.env.VITE_API_URL}/orders`;

/* GET ALL ORDERS (ADMIN) */
export const getAllOrders = async (token) => {
  const res = await axios.get(API, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

/* UPDATE STATUS */
export const updateOrderStatus = async (id, status, token) => {
  const res = await axios.put(
    `${API}/${id}`,
    { status },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};