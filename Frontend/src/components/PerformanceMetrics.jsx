import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "https://your-backend-api.com/performance"; // Replace with your actual API endpoint

const PerformanceMetrics = () => {
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const response = await axios.get(API_URL);
        setMetrics(response.data);
      } catch (error) {
        console.error("Error fetching performance metrics:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Performance Metrics</h2>
      {loading ? (
        <p className="text-center text-gray-500">Loading data...</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <tbody>
            <tr className="text-center">
              <td className="border p-3 font-semibold">Average Response Time</td>
              <td className="border p-3">{metrics.responseTime}</td>
            </tr>
            <tr className="text-center">
              <td className="border p-3 font-semibold">Downtime in Last 24 Hours</td>
              <td className="border p-3">{metrics.downtime}</td>
            </tr>
            <tr className="text-center">
              <td className="border p-3 font-semibold">Total Errors Logged</td>
              <td className="border p-3">{metrics.errors}</td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PerformanceMetrics;
