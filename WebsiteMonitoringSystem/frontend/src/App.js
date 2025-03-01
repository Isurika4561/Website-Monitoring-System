// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import UserManagement from "./pages/UserManagement";
import WebsiteMonitoring from "./pages/WebsiteMonitoring";
import Settings from "./pages/Settings";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <Router>
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<PrivateRoute roles={["admin"]} component={AdminDashboard} />} />
        <Route path="/users" element={<PrivateRoute roles={["admin"]} component={UserManagement} />}/>
        <Route path="/monitoring" element={<PrivateRoute roles={["admin", "user"]} component={WebsiteMonitoring} />}/>
        <Route path="/settings" element={<PrivateRoute roles={["admin", "user"]} component={Settings} />}/>

        <Route path="/monitoring" element={<WebsiteMonitoring />} />
        <Route path="/protected" element={<PrivateRoute />}>
        <Route path="/dashboard" element={<h1>Admin Dashboard</h1>} />
        </Route>
        
      </Routes>
    </Router>
  );
}

export default App;
