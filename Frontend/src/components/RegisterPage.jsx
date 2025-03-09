import React, { useState } from 'react';
import axios from 'axios';
import './RegisterPage.css'; 
import { Link } from 'react-router-dom';

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

    // Axios POST request to backend (Laravel)
    try {
      const response = await axios.post('http://127.0.0.1:8000/register', {
        name,
        email,
        password,
        password_confirmation: confirmPassword, // Send the password_confirmation field
      });

      // Handle successful registration
      setSuccessMessage(response.data.message); // Set the success message
    } catch (err) {
      if (err.response && err.response.data.errors) {
        setError('Registration failed. Please try again.');
      }
    }
  };
  
  return (
    <div className="register-container">
      <div className="register-form">
        <h2>Register</h2>
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">Registration successful! Please log in.</p>}
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
