import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../components/navbar.css";

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <nav className="navbar">
      

      {/* Navigation Links */}
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/add-website">Add Website</Link></li>
        <li><Link to="/website-list">Website List</Link></li>
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/settings">Settings</Link></li>
      </ul>

      {/* Search Bar */}
      <div className="nav-search">
        <input type="text" placeholder="Search websites or monitors..." />
        <button>🔍</button>
      </div>

      {/* User Profile Dropdown */}
      <div className="nav-profile" onClick={() => setShowDropdown(!showDropdown)}>
        <img src="/user-avatar.png" alt="User Profile" className="profile-avatar" />
        {showDropdown && (
          <div className="dropdown-menu">
            <Link to="/profile">Profile</Link>
            <Link to="/settings">Settings</Link>
            <Link to="/logout">Logout</Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
