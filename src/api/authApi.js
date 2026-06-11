import axios from "axios";

const API = `${import.meta.env.VITE_API_URL}/auth`;

// REGISTER
export const registerUser = (data) => {
  return axios.post(`${API}/register`, data);
};

// LOGIN
export const loginUser = (data) => {
  return axios.post(`${API}/login`, data);
};