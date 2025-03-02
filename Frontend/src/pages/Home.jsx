import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import WebsiteTable from "../components/WebsiteTable";
import UserManagement from "../components/UserManagement";
import Notifications from "../components/Notifications";
import WebsiteMonitoring from "../components/WebsiteMonitoring"; 
import PerformanceMetrics from "../components/PerformanceMetrics";
import UptimeGraph from "../components/UptimeGraph";


const Home = () => {
  const [currentUserRole, setCurrentUserRole] = useState("Admin"); // Change this dynamically if needed
  return (
    
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-600 text-white p-5">
        <h1 className="text-xl font-bold">Admin Dashboard</h1>
        <nav className="mt-5">
          <ul>
            <li className="py-2"><a href="#" className="hover:underline">Dashboard</a></li>
            <li className="py-2"><a href="#" className="hover:underline">Users</a></li>
            <li className="py-2"><a href="#" className="hover:underline">Websites</a></li>
            <li className="py-2"><a href="#" className="hover:underline">Settings</a></li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <h2 className="text-2xl font-bold text-gray-800">Website Monitoring</h2>
        <div className="mt-4 bg-white p-6 rounded-lg shadow-md">
          <p className="text-gray-600">Here, you can monitor your websites in real-time.</p>
          <button className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700">
            Add Website
          </button>
        </div>
      </main>
      
      <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-6">
      <h2 className="text-2xl font-bold">Welcome, {currentUserRole}!</h2>
        <WebsiteTable />
        <UserManagement currentUserRole={currentUserRole} />
        <Notifications />
        <WebsiteMonitoring />
        <PerformanceMetrics />
        <UptimeGraph />
      </main>
    </div>

    </div>
  );
};

export default Home;
