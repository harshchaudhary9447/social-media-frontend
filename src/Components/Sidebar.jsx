import { Layout, User, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import axios from "axios";
import "../styles/Sidebar.css";

export default function Sidebar() {
  const navigate = useNavigate(); // Hook for navigation

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found, user must log in.");
        return;
      }

      // Send DELETE request to logout route
      await axios.delete("http://localhost:3000/users/sign_out", {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Remove token from localStorage
      localStorage.removeItem("token");

      // Redirect to login page
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error.response?.data || error.message);
    }
  };

  return (
    <div className="sidebar">
      <nav className="nav-menu">
        <Link to="/feed" className="nav-item active">
          <Layout />
          <span>Feed</span>
        </Link>

        <Link to="/profile" className="nav-item">
          <User />
          <span>Profile</span>
        </Link>

        {/* Logout Button */}
        <button onClick={handleLogout} className="nav-item">
          <LogOut />
          <span>Logout</span>
        </button>
      </nav>
    </div>
  );
}
