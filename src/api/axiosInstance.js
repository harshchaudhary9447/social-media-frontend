import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json" // Explicitly request JSON response
  }
});

// Automatically add JWT token to every request (if available)
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // Get JWT token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
