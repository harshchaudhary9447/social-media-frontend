import React, { useState, useCallback } from 'react';
import axios from 'axios';
import '../styles/ManageUser.css';
import { BsThreeDots } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

function ManageUser({ alluserdata }) {  
  const navigate = useNavigate();
  const [users, setUsers] = useState(alluserdata); // Store users in state

  // Function to toggle user activation status (Optimized)
const toggleUserStatus = useCallback(async (userId, currentStatus) => {
  try {
   
    const response = await axios.patch(
      `http://localhost:3000/admin/users/${userId}/toggle_activation`,
      { user: { active: !currentStatus } },  // ✅ Ensure correct nesting
      { 
        headers: { 
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'  // ✅ Explicitly set JSON format
        } 
      }
    );
    

    if (response.status === 200) {
      // Update user state optimally
      setUsers(prevUsers =>
        prevUsers.map(user =>
          user.id === userId ? { ...user, active: !currentStatus } : user
        )
      );
    }
  } catch (error) {
    console.error('Error updating user status:', error.response?.data || error.message);
  }
}, [setUsers]); // Ensure dependencies are correct


  return (
    <div className="maze_dashboard_container">
      <main className="maze_main_content">
        <header className="maze_header">
          <div className="maze_header_title">
            <h2>User Management</h2>
          </div>
          <div className="maze_admin_profile">
            <img 
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Posts%20%282%29-TMZW6C0N3tgbsZdJgnHO8bETXVjjSa.png" 
              alt="Admin" 
              className="maze_admin_avatar"
            />
            <div className="maze_admin_info">
              <span className="maze_admin_name">Abhinandan Gupta</span>
              <span className="maze_admin_role">Admin</span>
            </div>
          </div>
        </header>

        <section className="maze_users_section">
          <div className="maze_users_header">
            <h3>List of Users</h3>
            <button 
              className="maze_create_user_btn"
              onClick={() => navigate('/create-user')}>
              <span className="maze_btn_icon">+</span>
              Create User
            </button>

          </div>

          <div className="maze_users_table_wrapper ">
            
            
            <table className="maze_users_table ">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Phone Number</th>
                  <th>Email</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user.id} className="maze_table_row ">
                    <td>
                      <div className="maze_user_info">
                        <span className="maze_user_avatar">M</span>
                        <div className="maze_user_name">
                          <span className={`maze_status_dot ${user.active ? 'maze_status_active' : 'maze_status_inactive'}`}></span>
                          {user.first_name || user.last_name ? `${user.first_name || ''} ${user.last_name || ''}`.trim() : 'N/A'}
                        </div>
                      </div>
                    </td>
                    <td>{user.phone_number || 'N/A'}</td>
                    <td>{user.email}</td>
                    <td>
                      <button 
                        className={`maze_status_btn ${user.active ? 'maze_deactivate_btn' : 'maze_activate_btn'}`}
                        onClick={() => toggleUserStatus(user.id, user.active)}
                      >
                        {user.active ? 'Deactivate' : 'Activate'}
                      </button>
                    </td>
                    <td>
                      <button className="maze_more_options"><BsThreeDots /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}

export default ManageUser;
