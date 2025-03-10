import React, { useState } from 'react';
import axios from 'axios';
import '../components/addWebsite.css';
import { useNavigate, Link } from 'react-router-dom';

const AddWebsitePage = () => {
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add your submission logic here
    navigate('/website-list');
  };

  return (
    
    <div className="form-container">
      
      <main className="form-main">
        <h1>Add New Website</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Website Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Enter website name"
            />
          </div>
          <div className="form-group">
            <label>Website URL</label>
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
              placeholder="https://example.com"
            />
          </div>
          <button type="submit" className="btn-primary">
            Add Website
          </button>
        </form>
        <div className="form-footer">
          <Link to="/website-list">View Website List →</Link>
        </div>
      </main>
    </div>
  );
};

export default AddWebsitePage;