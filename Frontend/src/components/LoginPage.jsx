import React, { useState } from 'react';
import axios from 'axios';
import './LoginPage.css'; 
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();


  const handleLogin = async (e) => {
    e.preventDefault();

    // Reset error message
    setError('');

    // Axios POST request to backend (Laravel)
    try {
      const response = await axios.post('http://127.0.0.1:8000/login', {
        email,
        password,
      });

      if (response.data.success) {
        alert('Login successful!');
        navigate('/dashboard'); 
      } else {
        setError('Invalid email or password.');
      }
    } catch (err) {
      setError('Login failed. Please try again later.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Login</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn-login">
            Login
          </button>
        </form>
        <div className="forgot-password">
          <button onClick={() => alert('Forgot password functionality')}>
            Forgot Password?
          </button>
        </div>
  
      <p>
          Don't have an account?{' '}
          <Link to="/register">Register here</Link>
        </p>

      </div>
    </div>
  );
};

export default LoginPage;
