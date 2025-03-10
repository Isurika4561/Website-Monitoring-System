import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import axios from 'axios';
import './App.css';

// Import Components
import LoginPage from './components/LoginPage';
import RegisterPage from "./components/RegisterPage";
import HomePage from './components/HomePage';
import AddWebsitePage from './components/AddWebsitePage';
import SettingsPage from './components/SettingsPage';
import DashboardPage from './components/DashboardPage';
import WebsiteMonitoringPage from './components/WebsiteMonitoringPage';
import WebsiteListPage from './components/WebsiteListPage';
import Navbar from "./components/Navbar";
import axiosInstance from './services/api';
import Logout from "./components/Logout";
import NewHome from './components/NewHome';


const App = () => {
  const [user, setUser] = useState({
    id: 0,
    name: "",
    email: "",
    role_id: 2
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await axiosInstance.get('/sanctum/csrf-cookie');
        const token = localStorage.getItem("bearer_token");
        if (token) {
          const response = await axiosInstance.get('/api/user', {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUser(response.data);
        }
      } catch (error) {
        console.error("Authentication error:", error);
      } finally {
        setLoading(false);
      }
    };
  
    checkAuth();
  }, []);
  

  const RequireAuth = ({ children }) => {
    return user?.id ? children : <Navigate to="/login" replace />;
  };

  if (loading) {
    return <div>Loading...</div>;  // Can be a loader component here
  }

  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/" element={<HomePage />} />

        {/* Protected Routes */}
        <Route path="/home" element={<RequireAuth><NewHome /></RequireAuth>} />
        <Route path="/dashboard" element={<RequireAuth><DashboardPage /></RequireAuth>} />
        <Route path="/settings" element={<RequireAuth><SettingsPage /></RequireAuth>} />
        <Route path="/add-website" element={<RequireAuth><AddWebsitePage /></RequireAuth>} />
        <Route path="/monitor/:websiteId" element={<RequireAuth><WebsiteMonitoringPage /></RequireAuth>} />
        <Route path="/website-list" element={<RequireAuth><WebsiteListPage /></RequireAuth>} />
        <Route path="/logout" element={<RequireAuth><Logout /></RequireAuth>} />
      </Routes>
    </Router>
  );
};

export default App;
