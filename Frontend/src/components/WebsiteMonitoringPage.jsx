import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams to get the website ID from the URL
import axiosInstance from '../services/api';

const WebsiteMonitoringPage = () => {
  const { websiteId } = useParams(); // Get the website ID from the URL
  const [websiteData, setWebsiteData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch monitoring data for the specific website
  useEffect(() => {
    const fetchWebsiteData = async () => {
      try {
        const response = await axiosInstance.get(`/api/websites/${websiteId}/monitor`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('bearer_token') || ''}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          withCredentials: true,
        });
        setWebsiteData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch website data', error);
        setError('Failed to fetch website data');
        setLoading(false);
      }
    };

    fetchWebsiteData();
  }, [websiteId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="monitoring-container">
      <h2>Monitoring Website: {websiteData?.name}</h2>
      <p>URL: {websiteData?.url}</p>
      {/* Add monitoring charts, logs, or other data here */}
      <div>
        <h3>Uptime Statistics</h3>
        {/* Example: Add a chart or table for uptime data */}
      </div>
      <div>
        <h3>Error Logs</h3>
        {/* Example: Display error logs */}
      </div>
    </div>
  );
};

export default WebsiteMonitoringPage;