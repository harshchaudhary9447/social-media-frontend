import { Layout, User, LogOut, Users, Flag } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Sidebar.css";

export default function Sidebar({ isAdmin, setActiveSection, onLogout }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      await axios.delete("http://localhost:3000/users/sign_out", {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Clear authentication
      localStorage.removeItem("token");
      onLogout();
      navigate("/login");
       // Notify parent component
      
    } catch (error) {
      console.error("Error logging out:", error.response?.data || error.message);
    }
  };

  return (
    <div className="sidebar">
      <nav className="nav-menu">
        <button className="nav-item" onClick={() => setActiveSection("feed")}>
          <Layout />
          <span>Feed</span>
        </button>

        <Link to="/profile" className="nav-item">
          <User />
          <span>Profile</span>
        </Link>

        {isAdmin && (
          <>
            <button className="nav-item" onClick={() => setActiveSection("manageUser")}>
              <Users />
              <span>Manage Users</span>
            </button>

            <button className="nav-item" onClick={() => setActiveSection("reports")}>
              <Flag />
              <span>Reports</span>
            </button>
          </>
        )}

        <button onClick={handleLogout} className="nav-item">
          <LogOut />
          <span>Logout</span>
        </button>
      </nav>
    </div>
  );
};