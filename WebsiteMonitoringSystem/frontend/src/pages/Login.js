import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/login", { email, password });
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", response.data.is_admin ? "admin" : "user");
      navigate(response.data.is_admin ? "/admin" : "/monitoring");
    } catch (error) {
      alert("Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-6">Website Monitoring System</h2>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input 
              type="email" 
              className="w-full p-2 border border-gray-300 rounded mt-1" 
              placeholder="Enter your email"
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input 
              type="password" 
              className="w-full p-2 border border-gray-300 rounded mt-1" 
              placeholder="Enter your password"
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
            />
          </div>
          <button 
            type="submit" 
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
            Login
          </button>
        </form>
        <div className="mt-4 text-center">
          <a href="#" className="text-blue-500 text-sm">Forgot Password?</a>
        </div>
      </div>
    </div>
  );
}

export default Login;
