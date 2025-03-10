import React, { useState, useEffect } from "react";
import axios from "axios";
import "../components/homePage.css";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Monitor Your Websites in Real-Time. Stay Ahead of Downtime.</h1>
          <p>Ensure optimal performance, uptime, and security for all your websites and applications.</p>
          <div className="hero-buttons">
            <button onClick={() => navigate("/register")} className="btn-primary">
              Register
            </button>
            <button onClick={() => navigate("/login")} className="btn-secondary">
              Login
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

export default HomePage;