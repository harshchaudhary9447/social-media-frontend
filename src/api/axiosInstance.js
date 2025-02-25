import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000", // Your Rails backend URL
});

// Automatically add JWT token to every request (if available)
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // Store token in localStorage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
