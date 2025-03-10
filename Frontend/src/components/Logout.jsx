import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../components/logout.css";

const Logout = () => {
  const navigate = useNavigate();

  const handleConfirmLogout = () => {
    // Perform logout actions (e.g., clear tokens, reset state)
    localStorage.removeItem("authToken"); // Example: Remove token from localStorage
    navigate("/login"); // Redirect to the login page
  };

  const handleCancel = () => {
    navigate(-1); // Go back to the previous page
  };

  useEffect(() => {
    // Optional: Add a timer to automatically log out after a few seconds
    const timer = setTimeout(() => {
      handleConfirmLogout();
    }, 5000); // Logout after 5 seconds

    return () => clearTimeout(timer); // Cleanup timer
  }, []);

  return (
    <div className="logout-container">
      <h1>Are you sure you want to log out?</h1>
      <p>You will be logged out in 5 seconds...</p>
      <div className="logout-buttons">
        <button onClick={handleConfirmLogout} className="btn-logout-confirm">
          Confirm Logout
        </button>
        <button onClick={handleCancel} className="btn-logout-cancel">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Logout;