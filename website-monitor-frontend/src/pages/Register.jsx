import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import { useAuth } from '../contexts/AuthContext';
import instance from '../api/axios';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      await instance.get("/sanctum/csrf-cookie");
      
      const response = await instance.post('/api/register', { 
        name, 
        email, 
        password, 
        password_confirmation: confirmPassword 
      }, { 
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      });

      // Handle successful registration
      setSuccessMessage(response.data.message || 'Registration successful');
      setSuccess(true);
      
      // Clear input fields
      setName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');

      // Save user session
      if (response.data.user && response.data.token) {
        login(response.data.user, response.data.token);
      }

      alert('Registration successful!');
      navigate('/login');

    } catch (err) {
      console.error('Registration Error:', err);
      setError(err.response?.data?.message || err.response?.data || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold mb-6 text-gray-900">Create Account</h1>
        {success && <p className="text-green-500 mb-4">{successMessage}</p>}
        {error && <p className="text-red-500 mb-4">{error}</p>}
        
        <form onSubmit={handleSubmit}>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            placeholder="Name"
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-900"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <br />

          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email Address
          </label>
          <input
            type="email"
            placeholder="Email"
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-900"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <br />

          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            placeholder="Password"
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-900"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <br />

          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
            Confirm Password
          </label>
          <input
            type="password"
            placeholder="Confirm Password"
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-900"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <br />

          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
            Register
          </button>
        </form>

        <p className="mt-4 text-center">
          Already have an account? <Link to="/login" className="text-blue-500">Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
