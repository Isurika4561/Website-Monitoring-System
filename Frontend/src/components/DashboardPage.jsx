// src/components/DashboardPage.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import './DashboardPage.css';  // Create CSS for styling
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';
import { Link } from 'react-router-dom';

const DashboardPage = () => {
  const [websites, setWebsites] = useState([]);
  const [status, setStatus] = useState({});
  const [performanceData, setPerformanceData] = useState({});
  const [errorLogs, setErrorLogs] = useState([]);

  // Fetch websites and status
  const fetchWebsiteData = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/websites');
      setWebsites(response.data);
    } catch (error) {
      console.error('Error fetching websites:', error);
    }
  };

  // Fetch live status
  const fetchLiveStatus = async () => {
    try {
      const statusResponse = await axios.get('http://127.0.0.1:8000/api/websites/status');
      setStatus(statusResponse.data);
    } catch (error) {
      console.error('Error fetching status:', error);
    }
  };

  // Fetch performance metrics
  const fetchPerformanceData = async () => {
    try {
      const performanceResponse = await axios.get('http://127.0.0.1:8000/api/websites/performance');
      setPerformanceData(performanceResponse.data);
    } catch (error) {
      console.error('Error fetching performance data:', error);
    }
  };

  // Fetch error logs
  const fetchErrorLogs = async () => {
    try {
      const logsResponse = await axios.get('http://127.0.0.1:8000/api/websites/error-logs');
      setErrorLogs(logsResponse.data);
    } catch (error) {
      console.error('Error fetching logs:', error);
    }
  };

  useEffect(() => {
    fetchWebsiteData();
    fetchLiveStatus();
    fetchPerformanceData();
    fetchErrorLogs();
  }, []);

  // Sample chart data for uptime graph
  const uptimeData = {
    labels: ['January', 'February', 'March', 'April', 'May'],
    datasets: [
      {
        label: 'Uptime %',
        data: [98, 99, 97, 96, 99], // Sample data
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(75,192,192,0.2)',
        fill: true,
      },
    ],
  };

  return (
    <div className="dashboard-container">
      
      <h2>Website Monitoring Panel</h2>

      <div className="live-status">
        <h3>Live Status Updates</h3>
        {websites.map((website, index) => (
          <div key={index} className="website-status">
            <p>{website.name} - Status: {status[website.id] ? 'Online' : 'Offline'}</p>
          </div>
        ))}
      </div>

      <div className="performance-metrics">
        <h3>Performance Metrics</h3>
        <div>
          <p>Response Time: {performanceData.responseTime}ms</p>
          <p>Errors: {performanceData.errorCount}</p>
        </div>
      </div>

      <div className="uptime-graph">
        <h3>Uptime Statistics</h3>
        <Line data={uptimeData} />
      </div>
<br />
      <div className="error-logs">
        <h3>Error Logs</h3>
        <ul>
          {errorLogs.map((log, index) => (
            <li key={index}>{log}</li>
          ))}
        </ul>
      </div>
  
      <Link to="/settings">Go to Settings</Link>
    </div>
  );
};

export default DashboardPage;
