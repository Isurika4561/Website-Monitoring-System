// src/components/AdminDashboard.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

const AdminDashboard = () => {
  const [websites, setWebsites] = useState([]);

  useEffect(() => {
    // Fetch websites from backend
    axios.get('http://127.0.0.1:8000/websites')
      .then((response) => setWebsites(response.data))
      .catch((error) => console.log(error));

    // Listen for real-time updates from the server
    const echo = new Echo({
      broadcaster: 'pusher',
      key: 'your-pusher-key',
      cluster: 'your-pusher-cluster',
      forceTLS: true,
    });

    echo.channel('websites')
      .listen('.statusUpdated', (event) => {
        setWebsites((prevState) =>
          prevState.map((website) =>
            website.id === event.website.id ? event.website : website
          )
        );
      });

    return () => echo.disconnect();
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://127.0.0.1:8000/websites/${id}`)
      .then(() => {
        setWebsites(websites.filter(website => website.id !== id));
      })
      .catch(error => console.log(error));
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>URL</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {websites.map(website => (
            <tr key={website.id}>
              <td>{website.name}</td>
              <td>{website.url}</td>
              <td>{website.status}</td>
              <td>
                <button onClick={() => handleDelete(website.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
