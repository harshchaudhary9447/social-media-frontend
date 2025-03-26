import { useState } from "react";
import API from "../api/axiosInstance"; // Import axios instance
import { useNavigate } from "react-router-dom";
import '../styles/SignUp.css';
import Logo from '../assets/Group.png';

const SignUp = ({onLogin}) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState(""); // Handle errors

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      const response = await API.post("/users", {
        user: {
          email: formData.email,
          password: formData.password,
          first_name: formData.firstName,
          last_name: formData.lastName,
          phone_number: formData.phone,
        },
        
      }
     
    );
    console.log(formData);

     const token = response.headers["authorization"];

     if (token) {
      let cleanToken = token;
    
      if (token.startsWith("Bearer ")) {
        cleanToken = token.replace("Bearer ", ""); // Remove "Bearer "
      }
    
      console.log("Stored token:", cleanToken); // Check output before saving
    
      localStorage.setItem("token", cleanToken);
      localStorage.setItem("user", JSON.stringify(response.data)); // Store user data
    
      if (onLogin) onLogin(cleanToken);
    } else {
      alert("Registration successful, but no token received.");
    }
    } catch (error) {
      console.error("Registration failed:", error.response?.data || error.message);
      alert("Registration failed! Please try again.");
    }
  };

  return (
    <div className="app">
       <div className="logo-container">
              <div className="logo">
                <img src={Logo} alt="Image"/>
              </div>
              <h1 className="logo-text">Maze</h1>
            </div>

      <main className="main-content">
        <div className="form-container">
          <h1>Create account</h1>
          <p className="subtitle">For business, band or celebrity.</p>

          {error && <p style={{ color: "red" }}>{error}</p>} {/* Show errors */}

          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="firstName">First name</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="lastName">Last name</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>

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
                <label htmlFor="phone">Phone number</label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  value={formData.phone}
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

              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <button type="submit" className="submit-button">
              Sign Up
            </button>

            <p className="login-link">
              Already have an account? <a href="/signin">Log in</a>
            </p>
          </form>
        </div>
      </main>
    </div>
  );
};

export default SignUp;
