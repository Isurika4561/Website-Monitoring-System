// src/components/HomePage.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../components/homePage.css';

const HomePage = () => {
  const [websites, setWebsites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch websites from backend
  useEffect(() => {
    axios.get('http://127.0.0.1:8000/websites')
      .then((response) => {
        setWebsites(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching websites:', error);
        setError('Failed to load websites.');
        setLoading(false);
      });
  }, []);

  return (
    <div className="home-container">
      {/* Header Section */}
      <header className="home-header">
        <h1>Website Monitoring System</h1>
        <p>Monitor your websites' status in real-time</p>
      </header>

      {/* Main Content Section */}
      <section className="home-content">
        {loading ? (
          <p>Loading websites...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <div className="website-list">
            {websites.map((website) => (
              <div key={website.id} className="website-item">
                <h3>{website.name}</h3>
                <p>Status: <span className={`status ${website.status}`}>{website.status}</span></p>
                <p>URL: <a href={website.url} target="_blank" rel="noopener noreferrer">{website.url}</a></p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Footer Section */}
      <footer className="home-footer">
        <p>&copy; 2025 Website Monitoring System. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
