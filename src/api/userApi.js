import axios from "axios";

export const getAllUsers = async (token) => {
  const res = await axios.get(`${import.meta.env.VITE_API_URL}/users`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};
