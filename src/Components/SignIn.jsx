import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/axiosInstance";
import "../styles/SignIn.css";
import Logo from '../assets/Group.png';

export default function SignIn({ onLogin }) {  // Added onLogin prop
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
      
      // Store token and update parent state
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data));
      if (onLogin) onLogin(response.data.token);  // This triggers App re-render

      navigate("/");
    } catch (err) {
      console.error("Login Error:", err.response?.data || err.message);
      setError(err.response?.data?.error || "Invalid email or password");
    }
  };

  // Rest of the component remains the same
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
          <img src={Logo} alt="Image"/>
        </div>
        <h1 className="logo-text">Maze</h1>
      </div>

      {/* Login Form */}
      <div className="login-form-container">
        <form className="login-form" onSubmit={handleSubmit}>
          <h2>Login</h2>

          {error && <p className="error-text">{error}</p>}

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