import React from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import '../styles/Navbar.css';
import Logo from '../assets/Group.png';

const Navbar = ({ navinput }) => {
  const navigate = useNavigate();  // Initialize navigation

  return (
    <nav className="navbar">
      <div className="navbar-left" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
        <img src={Logo} alt="Image" />
        <h1>Maze</h1>
      </div>
      {navinput && (
        <div className="navbar-right">
          <input type="text" className="image-input" placeholder="Search for something here..." />
        </div>
      )}
    </nav>
  );
};

export default Navbar;
