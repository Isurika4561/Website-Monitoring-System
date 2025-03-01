import React from "react";
import { Link } from "react-router-dom";

function AdminDashboard() {
  return (
    <div className="container">
      <h2>Admin Dashboard</h2>
      <Link to="/users">Manage Users</Link>
      <Link to="/monitoring">Monitor Websites</Link>
      <Link to="/settings">Settings</Link>
    </div>
  );
}

export default AdminDashboard;
