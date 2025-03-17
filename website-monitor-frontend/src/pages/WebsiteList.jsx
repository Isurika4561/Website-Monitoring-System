import { useState, useEffect } from 'react';
import axios from '../api/axios';
import instance from '../api/axios';

const WebsiteList = () => {
  const [websites, setWebsites] = useState([]);

  useEffect(() => {
    const fetchWebsites = async () => {
      try {
        await instance.get("/sanctum/csrf-cookie");
        const response = await instance.get('/api/websites');

        // Check response format and extract data correctly
        const websiteData = Array.isArray(response.data) ? response.data : response.data.websites;

        //setWebsites(response.data);
        setWebsites(websiteData || []); // Ensure it's always an array
      } catch (err) {
        console.error("Error fetching websites:", err);
        setWebsites([]); // Prevent map() from breaking if the request fails
      }
    };
    fetchWebsites();
  }, []);

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-bold mb-4 text-blue-700">Monitored Websites</h2>
      <div className="grid gap-4">
        {websites.map((website) => (
          <div key={website.id} className="border p-4 rounded text-blue-700">
            <h3 className="font-semibold ">{website.url}</h3>
            <p>Status: {website.status}</p>
            <p>Last checked: {new Date(website.last_checked).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WebsiteList;