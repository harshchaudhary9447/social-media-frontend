import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/axiosInstance"; // Import axios instance
import "../styles/SignIn.css";

export default function SignIn() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await API.post("/users/sign_in", {
        user: {
          email: formData.email,
          password: formData.password,
        },
      });

      console.log("Login Successful:", response.data);
      localStorage.setItem("token", response.data.token); // Store JWT token

      navigate("/"); // Redirect after successful login
    } catch (err) {
      console.error("Login Error:", err.response?.data || err.message);
      setError(err.response?.data?.error || "Invalid email or password");
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <div className="login-container">
      {/* Logo */}
      <div className="logo-container">
        <div className="logo">
          <span>M</span>
        </div>
        <h1 className="logo-text">Maze</h1>
      </div>

      {/* Login Form */}
      <div className="login-form-container">
        <form className="login-form" onSubmit={handleSubmit}>
          <h2>Login</h2>

          {error && <p className="error-text">{error}</p>} {/* Display errors */}

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group checkbox">
            <label>
              <input
                type="checkbox"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
              />
              <span>Remember me</span>
            </label>
          </div>

          <button type="submit" className="login-button">
            Login
          </button>

          <p className="signup-text">
            Don't have an account?{" "}
            <Link to="/signup" className="signup-link">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
