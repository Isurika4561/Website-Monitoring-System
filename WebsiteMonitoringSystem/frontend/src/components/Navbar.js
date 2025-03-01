import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/monitoring">Monitoring</Link>
      <Link to="/settings">Settings</Link>
      <button onClick={handleLogout}>Logout</button>
    </nav>
  );
}

export default Navbar;
