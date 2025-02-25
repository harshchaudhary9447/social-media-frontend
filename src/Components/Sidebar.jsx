import { Search, Layout, User, LogOut } from "lucide-react"
import { Link } from "react-router-dom";
import "../styles/Sidebar.css"

export default function Sidebar() {
  return (
    <div className="sidebar">
      {/* Logo */}
      {/* <div className="logo-container">
        <div className="logo">
          <span>M</span>
        </div>
        <span className="logo-text">Maze</span>
      </div>

      {/* Search */}
      {/* <div className="search-container">
        <Search className="search-icon" />
        <input type="text" placeholder="Search for something here..." className="search-input" />
      </div>  */}

      {/* Navigation */}
      <nav className="nav-menu">
        <Link href="/feed" className="nav-item active">
          <Layout />
          <span>Feed</span>
        </Link>

        <Link href="/profile" className="nav-item">
          <User />
          <span>Profile</span>
        </Link>

        <button
          onClick={() => {
            /* Add logout logic */
          }}
          className="nav-item"
        >
          <LogOut />
          <span>Logout</span>
        </button>
      </nav>
    </div>
  )
}

