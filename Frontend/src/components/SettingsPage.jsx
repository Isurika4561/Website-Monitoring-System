
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const SettingsPage = () => {
  const [settings, setSettings] = useState({
    notifications: {
      email: false,
      sms: false,
      dashboard_alerts: false,
    },
    monitoring_interval: 5, // Default interval is 5 minutes
  });

  // Fetch the current settings when the component mounts
  useEffect(() => {
    axios
      .get('http://127.0.0.1:8000/api/settings')
      .then((response) => {
        setSettings(response.data);
      })
      .catch((error) => {
        console.error('Error fetching settings:', error);
      });
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setSettings((prevSettings) => ({
        ...prevSettings,
        notifications: {
          ...prevSettings.notifications,
          [name]: checked,
        },
      }));
    } else {
      setSettings((prevSettings) => ({
        ...prevSettings,
        [name]: value,
      }));
    }
  };

  // Handle form submission to update settings
  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post('http://127.0.0.1:8000/api/settings', settings)
      .then((response) => {
        alert(response.data.message);  // Show success message
      })
      .catch((error) => {
        console.error('Error updating settings:', error);
      });
  };

  return (
    <div className="settings-container">
      <h2>Manage Settings</h2>

      <form onSubmit={handleSubmit}>
        <div className="section">
          <h3>Notifications</h3>
          <label>
            <input
              type="checkbox"
              name="email"
              checked={settings.notifications.email}
              onChange={handleChange}
            />
            Email Notifications
          </label>
          <label>
            <input
              type="checkbox"
              name="sms"
              checked={settings.notifications.sms}
              onChange={handleChange}
            />
            SMS Notifications
          </label>
          <label>
            <input
              type="checkbox"
              name="dashboard_alerts"
              checked={settings.notifications.dashboard_alerts}
              onChange={handleChange}
            />
            Dashboard Alerts
          </label>
        </div>

        <div className="section">
          <h3>Monitoring Interval</h3>
          <label>
            Set Interval (in minutes):
            <input
              type="number"
              name="monitoring_interval"
              value={settings.monitoring_interval}
              onChange={handleChange}
              min="1"
            />
          </label>
        </div>

        <button type="submit">Save Settings</button>
      </form>
      <Link to="/dashboard">Back to Dashboard</Link>
    </div>
  );
};

export default SettingsPage;
