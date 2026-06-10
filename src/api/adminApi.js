import axios from "axios";

export const getAdminStats = async (token) => {
  const res = await axios.get(
  `${import.meta.env.VITE_API_URL}/admin/stats`,
  {
    headers: { Authorization: `Bearer ${token}` },
  }
);
  return res.data;
};


