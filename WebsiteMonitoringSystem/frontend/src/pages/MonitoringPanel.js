import React, { useEffect, useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";

function MonitoringPanel() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/websites")
      .then(response => setData(response.data))
      .catch(error => console.error("Error fetching data:", error));
  }, []);

  return (
    <div className="container">
      <h2>Website Monitoring</h2>
      <Line
        data={{
          labels: data.map(d => d.timestamp),
          datasets: [{ label: "Response Time", data: data.map(d => d.response_time) }],
        }}
      />
    </div>
  );
}

export default MonitoringPanel;

