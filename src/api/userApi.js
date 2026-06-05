import axios from "axios";

export const getAllUsers = async (token) => {
  const res = await axios.get("http://localhost:5000/api/users", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};