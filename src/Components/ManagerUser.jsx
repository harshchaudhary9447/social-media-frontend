import React, { useState, useEffect, useCallback, useRef } from "react";
import API from "../api/axiosInstance"; // Centralized Axios instance
import { BsThreeDots } from "react-icons/bs";
import { useOutletContext, Navigate, useNavigate } from "react-router-dom";
import Bunny from "../assets/bunny.svg";
import "../styles/ManageUser.css";

const ManageUser = () => {
  const { isAdmin, allUserData, setnavinput } = useOutletContext();
  setnavinput(false);
  
  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user?.data?.first_name);

  if (!isAdmin) return <Navigate to="/" />;
  
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [menuOpen, setMenuOpen] = useState(null); // To track which user's menu is open
  const dropdownRef = useRef(null); // Reference for dropdown menu

  useEffect(() => {
    if (Array.isArray(allUserData)) {
      setUsers(allUserData);
    } else {
      console.error("Invalid user data received:", allUserData);
    }
  }, [allUserData]);

  // Close dropdown menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setMenuOpen(null);
      }
    };

    if (menuOpen !== null) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  // Toggle Activation Status
  const toggleUserStatus = useCallback(async (userId, currentStatus) => {
    try {
      const response = await API.patch(`/admin/users/${userId}/toggle_activation`, {
        user: { active: !currentStatus },
      });

      if (response.status === 200) {
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === userId ? { ...user, active: !currentStatus } : user
          )
        );
      }
    } catch (error) {
      console.error("Error updating user status:", error.response?.data || error.message);
    }
  }, []);

  // Delete User Function
  const deleteUser = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await API.delete(`/admin/users/${userId}`);
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
        alert("User deleted successfully!");
      } catch (error) {
        console.error("Error deleting user:", error.response?.data || error.message);
        alert("Failed to delete user.");
      }
    }
  };

  // Toggle menu visibility for a specific user
  const toggleMenu = (userId) => {
    setMenuOpen((prevUserId) => (prevUserId === userId ? null : userId));
  };

  return (
    <div className="maze_dashboard_container">
      <main className="maze_main_content">
        <header className="maze_header">
          <div className="maze_header_title">
            <h2>User Management</h2>
          </div>
          <div className="maze_admin_profile">
            <div className="maze_admin_info">
              <span className="maze_admin_name">{user?.data?.first_name}</span>
              <span className="maze_admin_role">(Admin)</span>
            </div>
          </div>
        </header>

        <section className="maze_users_section">
          <div className="maze_users_header">
            <h3>List of Users</h3>
            <div className="bulk-user-btn">
              <button className="maze_create_user_btn" onClick={() => navigate("/bulk-user")}>
                <span className="maze_btn_icon">+</span> Upload User
              </button>
              <button className="maze_create_user_btn" onClick={() => navigate("/create-user")}>
                <span className="maze_btn_icon">+</span> Create User
              </button>
            </div>
          </div>

          <div className="maze_users_table_wrapper">
            <table className="maze_users_table">
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
                {users.map((user) => (
                  <tr key={user.id} className="maze_table_row">
                    <td data-label="Name">
                      <div className="maze_user_info">
                        <div className="maze_user_name">
                          <span
                            className={`maze_status_dot ${
                              user.active ? "maze_status_active" : "maze_status_inactive"
                            }`}
                          ></span>
                          {user.first_name || user.last_name
                            ? `${user.first_name || ""} ${user.last_name || ""}`.trim()
                            : "N/A"}
                        </div>
                      </div>
                    </td>
                    <td data-label="Phone">{user.phone_number || "N/A"}</td>
                    <td data-label="Email">{user.email}</td>
                    <td data-label="Status">
                      <button
                        className={`maze_status_btn ${
                          user.active ? "maze_deactivate_btn" : "maze_activate_btn"
                        }`}
                        onClick={() => toggleUserStatus(user.id, user.active)}
                      >
                        {user.active ? "Deactivate" : "Activate"}
                      </button>
                    </td>
                    <td data-label="Actions" style={{ position: "relative" }}>
                      <button className="maze_more_options" onClick={() => toggleMenu(user.id)}>
                        <BsThreeDots />
                      </button>

                      {menuOpen === user.id && (
                        <div ref={dropdownRef} className="dropdown-menu">
                          <button onClick={() => deleteUser(user.id)} className="delete-btn">
                            Remove User
                          </button>
                        </div>
                      )}
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
};

export default ManageUser;
