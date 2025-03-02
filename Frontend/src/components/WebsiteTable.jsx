import React from "react";

const websites = [
  { id: 1, name: "Google", status: "Up", uptime: "99.99%", downtime: "0.01%" },
  { id: 2, name: "Facebook", status: "Down", uptime: "98.50%", downtime: "1.50%" },
  { id: 3, name: "Twitter", status: "Up", uptime: "99.80%", downtime: "0.20%" }
];

const WebsiteTable = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Monitored Websites</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-3">Website</th>
            <th className="border p-3">Status</th>
            <th className="border p-3">Uptime</th>
            <th className="border p-3">Downtime</th>
          </tr>
        </thead>
        <tbody>
          {websites.map((site) => (
            <tr key={site.id} className="text-center">
              <td className="border p-3">{site.name}</td>
              <td className={`border p-3 ${site.status === "Up" ? "text-green-600" : "text-red-600"}`}>
                {site.status}
              </td>
              <td className="border p-3">{site.uptime}</td>
              <td className="border p-3">{site.downtime}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WebsiteTable;
