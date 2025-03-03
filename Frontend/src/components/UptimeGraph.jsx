import React, { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import axios from "axios";

const API_URL = "https://your-backend-api.com/uptime"; // Replace with actual API

const UptimeGraph = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchUptimeStats = async () => {
      try {
        const response = await axios.get(API_URL);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching uptime data:", error);
      }
    };

    fetchUptimeStats();
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Uptime Statistics</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis domain={[98, 100]} />
          <Tooltip />
          <Line type="monotone" dataKey="uptime" stroke="#4CAF50" strokeWidth={3} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default UptimeGraph;
