import axios from "axios";

export const getAdminStats = async (token) => {
  const res = await axios.get("http://localhost:5000/api/admin/stats", {
    headers: { Authorization: `Bearer ${token}` },
  });

  return res.data;
};


