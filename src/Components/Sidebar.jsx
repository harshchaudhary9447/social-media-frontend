import { useState } from "react";
import { Layout, User, LogOut, Users, Flag, Menu } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/axiosInstance";
import "../styles/Sidebar.css";

export default function Sidebar({ isAdmin, onLogout }) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await API.delete("/users/sign_out");
    } catch (error) {
      console.error("Error logging out:", error.response?.data || error.message);
    } finally {
      localStorage.removeItem("token");
      onLogout();
      navigate("/login");
    }
  };

  console.log(isAdmin);

  return (
    <>
      <button className="hamburger" onClick={() => setIsOpen(!isOpen)}>
        <Menu />
      </button>

      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        <nav className="nav-menu">
          <Link to="/" className="nav-item">
            <Layout />
            <span>Feed</span>
          </Link>

          <Link to="/profile" className="nav-item">
            <User />
            <span>Profile</span>
          </Link>

          {isAdmin && (
            <>
              <Link to="/manage-user" className="nav-item">
                <Users />
                <span>Manage Users</span>
              </Link>

              <Link to="/user-report" className="nav-item">
                <Flag />
                <span>Reports</span>
              </Link>
            </>
          )}

          <button onClick={handleLogout} className="nav-item">
            <LogOut />
            <span>Logout</span>
          </button>
        </nav>
      </div>
    </>
  );
}
