import React from 'react'
import { useState } from "react";
import API from "../api/axiosInstance"; // Import axios instance
import { useNavigate } from "react-router-dom";
import '../styles/CreateUser.css';
const CreateUser = () => {
    const [showError, setShowError] = useState(true)
    const [formData, setFormData] = useState({
      first_name: '',
      last_name:'',
      mobile: '',
      email: '',
      role: ''
    })
    const navigate = useNavigate();
  
    const handleSubmit = async (e) => {
        e.preventDefault();
      
        try {
          const response = await API.post(
            "/admin/users",  // API endpoint
            { 
              user: { 
                first_name: formData.first_name,
                last_name: formData.last_name,
                phone_number: formData.mobile, 
                email: formData.email,
                password:"1234567",
                role: "normal"  // Convert role format
              } 
            },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
              }
            }
          );
      
          if (response.status === 201) {
            alert("User created successfully!");
            navigate("/");
          }
        } catch (error) {
          console.error("Error creating user:", error);
          alert(error.response?.data?.message || "Failed to create user.");
        }
      };
      
  
    return (
      <div className="maze_adduser_container">
        {/* <aside className="maze_adduser_sidebar">
          <div className="maze_adduser_logo">
            <span className="maze_adduser_logo_icon">M</span>
            <h1 className="maze_adduser_logo_text">Maze</h1>
          </div>
  
          <nav className="maze_adduser_nav">
            <a href="#" className="maze_adduser_nav_item">
              <span className="maze_adduser_nav_icon">⊞</span>
              Feed
            </a>
            <a href="#" className="maze_adduser_nav_item">
              <span className="maze_adduser_nav_icon">👤</span>
              Profile
            </a>
            <a href="#" className="maze_adduser_nav_item maze_adduser_nav_active">
              <span className="maze_adduser_nav_icon">👥</span>
              Manage Users
            </a>
            <a href="#" className="maze_adduser_nav_item maze_adduser_nav_logout">
              <span className="maze_adduser_nav_icon">↪</span>
              Logout
            </a>
          </nav>
        </aside> */}
  
        <main className="maze_adduser_main">
          {/* <header className="maze_adduser_header">
            <h2 className="maze_adduser_title">User Management</h2>
            <div className="maze_adduser_profile">
              <img 
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Posts%20%283%29-oYAdizYhNhdCWtXoIKYYhBRkRFlZ7L.png" 
                alt="Admin" 
                className="maze_adduser_avatar"
              />
              <div className="maze_adduser_profile_info">
                <span className="maze_adduser_profile_name">Abhinandan Gupta</span>
                <span className="maze_adduser_profile_role">Admin</span>
              </div>
            </div>
          </header> */}
  
          <section className="maze_adduser_form_section">
            <h3 className="maze_adduser_form_title">Add Users</h3>
            
            <form onSubmit={handleSubmit} className="maze_adduser_form">
              <div className="maze_adduser_form_grid">
                <div className="maze_adduser_form_group">
                  <label className="maze_adduser_label">First Name</label>
                  <input 
                    type="text"
                    className="maze_adduser_input"
                    value={formData.first_name}
                    onChange={(e) => setFormData({...formData, first_name: e.target.value})}
                  />
                </div>
                <div className="maze_adduser_form_group">
                  <label className="maze_adduser_label">Last Name</label>
                  <input 
                    type="text"
                    className="maze_adduser_input"
                    value={formData.last_name}
                    onChange={(e) => setFormData({...formData, last_name: e.target.value})}
                  />
                </div>
  
                <div className="maze_adduser_form_group">
                  <label className="maze_adduser_label">Mobile No.</label>
                  <input 
                    type="tel"
                    className="maze_adduser_input"
                    value={formData.mobile}
                    onChange={(e) => setFormData({...formData, mobile: e.target.value})}
                  />
                </div>
                <div className="maze_adduser_form_group">
                <label className="maze_adduser_label">Email No.</label>
                <input 
                  type="email"
                  className="maze_adduser_input"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
              </div>
  
             
  
              <div className="maze_adduser_form_group maze_adduser_full_width">
                <label className="maze_adduser_label">Assign Role</label>
                <div className="maze_adduser_roles_grid">
                  {['Admin', 'Normal'].map((role) => (
                    <label key={role} className="maze_adduser_role_option">
                      <input
                        type="radio"
                        name="role"
                        value={role}
                        checked={formData.role === role}
                        onChange={(e) => setFormData({...formData, role: e.target.value})}
                        className="maze_adduser_role_input"
                      />
                      <span className="maze_adduser_role_text">{role}</span>
                    </label>
                  ))}
                </div>
              </div>
  
              <div className="maze_adduser_form_actions">
                <button type="submit" className="maze_adduser_submit">
                  Create User
                </button>
              </div>
            </form>
          </section>
  
          {/* {showError && (
            <div className="maze_adduser_error">
              <span className="maze_adduser_error_text">
                Note- This Phone number already exists!
              </span>
              <div className="maze_adduser_error_actions">
                <button 
                  className="maze_adduser_error_continue"
                  onClick={() => setShowError(false)}
                >
                  Continue
                </button>
                <button 
                  className="maze_adduser_error_cancel"
                  onClick={() => setShowError(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          )} */}
        </main>
      </div>
    );
  };


export default CreateUser