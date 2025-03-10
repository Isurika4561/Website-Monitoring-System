import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../services/api';
import './WebsiteListPage.css';

const WebsiteListPage = () => {
  const [websites, setWebsites] = useState([]);
  const navigate = useNavigate();

  // Function to fetch the list of websites
  const fetchWebsites = async () => {
    try {
      const response = await axiosInstance.get('/api/websites', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('bearer_token') || ''}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });

      setWebsites(response.data.websites || []);
      
    } catch (error) {
      console.error('Failed to fetch websites', error);
    }
  };

  // Polling mechanism for live monitoring
  useEffect(() => {
    fetchWebsites(); // Initial fetch

    const intervalId = setInterval(() => {
      fetchWebsites(); // Fetch data every 5 seconds
    }, 5000);

    return () => clearInterval(intervalId); // Cleanup function to clear interval
  }, []);

  // Function to navigate to the monitoring page for a specific website
  const handleMonitorClick = (websiteId) => {
    navigate(`/monitor/${websiteId}`);
  };

  return (
    <div className="website-list-container">
        
      <h1>Website List (Live Monitoring)</h1>
      {websites.length === 0 ? (
        <p>No websites found.</p>
      ) : (
        <table className="website-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>URL</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {websites.map((website) => (
              <tr key={website.id}>
                <td>{website.name}</td>
                <td>
                  <a href={website.url} target="_blank" rel="noopener noreferrer">
                    {website.url}
                  </a>
                </td>
                <td>
                  <button
                    className="monitor-button"
                    onClick={() => handleMonitorClick(website.id)}
                  >
                    Monitor
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default WebsiteListPage;
