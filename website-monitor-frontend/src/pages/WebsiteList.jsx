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
    <div className="h-screen w-screen flex flex-col bg-gray-100">
      <header className="bg-white shadow-md p-6 text-center">
        <h2 className="text-3xl font-bold text-blue-700">Monitored Websites</h2>
      </header>

      <div className="flex-grow flex justify-center">
        <div className="w-full max-w-7xl p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {websites.length === 0 ? (
              <p className="text-center text-gray-500 col-span-full">No websites monitored yet.</p>
            ) : (
              websites.map((website) => (
                <div key={website.id} className="border p-6 rounded-lg bg-white shadow-md text-blue-700">
                  <h3 className="font-semibold text-lg">
                    <a href={website.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                      {website.url}
                    </a>
                  </h3>
                  <p>Status: 
                    <span className={website.status === "up" ? "text-green-600" : "text-red-600"}> {website.status}</span>
                  </p>
                  <p>Last checked: {website.last_checked ? new Date(website.last_checked).toLocaleString() : 'N/A'}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebsiteList;