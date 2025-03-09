// src/components/AddWebsitePage.jsx
import React, { useState } from 'react';
import axios from 'axios';
import '../components/homePage.css'; // You can use the same styling

const AddWebsitePage = () => {
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [status, setStatus] = useState('inactive');

  const handleAddWebsite = (e) => {
    e.preventDefault();

    const newWebsite = {
      name,
      url,
      status,
    };

    axios
      .post('http://127.0.0.1:8000/websites', newWebsite)
      .then((response) => {
        console.log('Website added:', response.data);
        // Redirect or show success message
      })
      .catch((error) => {
        console.error('Error adding website:', error);
      });
  };

  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Add a New Website</h1>
        <p>Enter the details of the website you want to monitor</p>
      </header>

      <section className="home-content">
        <form onSubmit={handleAddWebsite}>
          <div>
            <label>Website Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Website URL:</label>
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Status:</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          <button type="submit">Add Website</button>
        </form>
      </section>

      <footer className="home-footer">
        <p>&copy; 2025 Website Monitoring System. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default AddWebsitePage;
