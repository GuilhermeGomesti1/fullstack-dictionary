import axios from "axios";

const API_URL = "http://localhost:5000";

export const registerUser = async (email: string, password: string) => {
  const response = await axios.post(`${API_URL}/auth/register`, {
    email,
    password,
  });
  return response.data;
};

export const loginUser = async (email: string, password: string) => {
  const response = await axios.post(`${API_URL}/auth/login`, {
    email,
    password,
  });
  return response.data;
};

export const getUserFavorites = async (token: string) => {
  const response = await axios.get(`${API_URL}/user/me/favorites`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const getUserHistory = async (token: string) => {
  const response = await axios.get(`${API_URL}/user/me/history`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
