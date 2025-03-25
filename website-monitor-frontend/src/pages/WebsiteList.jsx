import { useState, useEffect } from 'react';
import instance from '../api/axios';
import { useAuth } from '../contexts/AuthContext';

const WebsiteList = () => {
  const [websites, setWebsites] = useState([]);
  const { user, isAdmin } = useAuth();

  useEffect(() => {
    fetchWebsites();
  }, [isAdmin, user]);

  const fetchWebsites = async () => {
    try {
      await instance.get("/sanctum/csrf-cookie");
      const endpoint = isAdmin ? '/api/websites' : `/api/user/${user.id}/websites`;
      const response = await instance.get(endpoint);
      const websiteData = Array.isArray(response.data) ? response.data : response.data.websites;

      console.log("Fetched Websites:", websiteData);
      
      setWebsites(websiteData || []);
    } catch (err) {
      console.error("Error fetching websites:", err);
    }
  };

  const handleDelete = async (websiteId) => {
    if (!window.confirm('Are you sure you want to delete this website?')) return;
    try {
      const token = localStorage.getItem('bearer_token');
      await instance.delete(`/api/websites/${websiteId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      fetchWebsites(); // Refresh list after deletion
    } catch (err) {
      console.error("Failed to delete website:", err);
    }
  };

  // Format the checked time
  const formatCheckedTime = (timestamp) => {
    if (!timestamp) return 'N/A';
    const date = new Date(timestamp);
    return date.toLocaleString(); // Example: 3/26/2025, 10:30:15 AM
  };

  
  

  return (
    <div className="h-screen w-screen flex flex-col bg-white">
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

                  <p>Last Checked: <span className="text-gray-700">{formatCheckedTime(website.checked_at)}</span></p>
                  
                  <button
                    onClick={() => handleDelete(website.id)}
                    className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
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
