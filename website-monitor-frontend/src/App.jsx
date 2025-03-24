import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Outlet } from 'react-router-dom';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import AddWebsite from './pages/AddWebsite';
import WebsiteList from './pages/WebsiteList';
import Settings from './pages/Settings';
import AdminPanel from './pages/AdminPanel';

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<WithNavbar />}>
            <Route path="/" element={<Home />} />
            <Route path="/add-website" element={<AddWebsite />} />
            <Route path="/websites" element={<WebsiteList />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/admin" element={<AdminPanel />} />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
};

const WithNavbar = () => (
  <>
    <Navbar />
    <main className="container mx-auto p-4">
      <Outlet />
    </main>
  </>
);



export default App
