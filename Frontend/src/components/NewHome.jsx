import React from "react";
import "../components/homePage.css";
import { useNavigate } from "react-router-dom";

const NewHome = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/logout"); // Navigate to the logout page
  };

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Welcome Back! Monitor Your Websites in Real-Time.</h1>
          <p>Ensure optimal performance, uptime, and security for all your websites and applications.</p>
          <div className="hero-buttons">
            <button onClick={() => navigate("/add-website")} className="btn-primary">
              Add Website to monitor
            </button>
            <button onClick={() => navigate("/settings")} className="btn-secondary">
              Settings
            </button>
            <button onClick={handleLogout} className="btn-logout">
              Logout
            </button>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="main-footer">
        <div className="footer-content">
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="/about">About Us</a></li>
              <li><a href="/docs">Documentation</a></li>
              <li><a href="/contact">Contact</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Stay Updated</h4>
            <div className="newsletter">
              <input type="email" placeholder="Enter your email" />
              <button className="btn-primary">Subscribe</button>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 Website Monitoring System. All Rights Reserved.</p>
          <div className="legal-links">
            <a href="/terms">Terms of Service</a> | <a href="/privacy">Privacy Policy</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default NewHome; // Updated export name