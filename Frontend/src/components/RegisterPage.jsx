import React, { useState } from 'react';
import axios from 'axios';
import './RegisterPage.css'; 
import { Link, Navigate } from 'react-router-dom';
import axiosInstance from '../services/api';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();

    // Reset error message
    setError('');
    setSuccess(false);

    // Check if passwords match
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    const formData = {
      name: name,
      email: email,
      password: password,
      password_confirmation: confirmPassword, // Ensure this is passed correctly
    };

    // Axios POST request to backend (Laravel)
    try {
      
      await axiosInstance.get("/sanctum/csrf-cookie");
      const response = await axiosInstance.post('/api/register', formData, {  // Send the formData here
        headers: {
          "Content-Type": "application/json",
        },
      });
      

      //Handle successful registration
      setSuccessMessage(response.data.message); // Set the success message
      setSuccess(true); // Mark success as true for success message
      setName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      
    
    } catch (err) {
      // Log the error to understand the structure of the response
      console.error("Error:", err.response);
      if (err.response && err.response.data.errors) {
        // Show specific validation errors
        setError('Registration failed. Please try again.');
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    }
  };

  return (
    <div className="register-container">
      <div className="register-form">
        <h2>Register</h2>
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{successMessage}</p>}
        <form onSubmit={handleRegister}>
          {/* Name Input */}
          <div className="input-group">
            <label className="block text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              id="name"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* Email Input */}
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password Input */}
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Confirm Password Input */}
          <div className="input-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              placeholder="Confirm your Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          {/* Register Button */}
          <button type="submit" className="btn-register">
            Register
          </button>
        </form>
        <p>
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
