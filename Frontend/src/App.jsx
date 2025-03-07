import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import LoginPage from './components/LoginPage';
import RegisterPage from "./components/RegisterPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from './components/HomePage';
import AddWebsitePage from './components/AddWebsitePage';
import SettingsPage from './components/SettingsPage';
import DashboardPage from './components/DashboardPage';


const App = () => {
  return (
    <Router> {/* Wrap everything inside Router */}
      
        <Routes> 
          <Route path="/" element={<HomePage />} />
          <Route path="/add-website" element={<AddWebsitePage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          
        </Routes>
  
    </Router>


      
      
      


  );
};


export default App
