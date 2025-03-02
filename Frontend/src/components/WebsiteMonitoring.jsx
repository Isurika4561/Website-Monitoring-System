import React, { useState, useEffect } from "react";
import { fetchWebsiteStatus } from "../utils/api";

const WebsiteMonitoring = () => {
  const [websites, setWebsites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await fetchWebsiteStatus();
      setWebsites(data);
      setLoading(false);
    };

    fetchData();
    const interval = setInterval(fetchData, 5000); // Auto-refresh every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Live Website Monitoring</h2>

      {loading ? (
        <p className="text-center text-gray-500">Loading data...</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-3">Website</th>
              <th className="border p-3">Status</th>
              <th className="border p-3">Response Time</th>
              <th className="border p-3">Errors</th>
            </tr>
          </thead>
          <tbody>
            {websites.map((site) => (
              <tr key={site.id} className="text-center">
                <td className="border p-3">{site.name}</td>
                <td
                  className={`border p-3 font-bold ${
                    site.status === "Online" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {site.status}
                </td>
                <td className="border p-3">{site.responseTime}</td>
                <td className="border p-3">{site.errors}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default WebsiteMonitoring;
