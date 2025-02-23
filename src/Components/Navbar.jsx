import React from 'react';
import '../styles/Navbar.css';
import Logo from '../assets/Group.png';
const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
      <img src={Logo} alt="Image"/>
      <h1>Maze</h1>
      </div>
      <div className="navbar-right">
        <input type="text" class="image-input" placeholder="Search for something here..." />
      </div>
    </nav>
  );
};

export default Navbar;