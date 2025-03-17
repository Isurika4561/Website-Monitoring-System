import { useState } from 'react';
import axios from '../api/axios';
import { useAuth } from '../contexts/AuthContext';
import instance from '../api/axios';

const AddWebsite = () => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { user } = useAuth();
  const [name, setName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    setName('');
  
    const token = localStorage.getItem('bearer_token'); // Retrieve token from localStorage
  
    if (!token) {
      setError('Authentication failed. Please log in again.');
      setLoading(false);
      return;
    }
  
    try {
      await instance.get("/sanctum/csrf-cookie");
      const response = await instance.post('/api/websites', 
        { name, url, user_id: user.id }, 
        {
          headers: {
            'Authorization': `Bearer ${token}`, // Attach token
            'Accept': 'application/json'
          }
        }
      );
      console.log("Website Add Response:", response.data);
      setSuccess('Website added successfully');
      setUrl('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add website');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-bold mb-4text-3xl font-bold text-gray-900">Add New Website</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && <p className="text-green-500 mb-4">{success}</p>}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="text-3xl font-bold text-black">Website Name</label>
          <input
            type="name"
            className="w-full p-2 border border-black rounded placeholder-gray-500 text-black"
            placeholder="Enter Website Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="text-3xl font-bold text-black">Website URL</label>
          <input
            type="url"
            className="w-full p-2 border border-black rounded placeholder-gray-500 text-black"
            placeholder="https://example.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
          />
        </div>
        
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
          disabled={loading}
        >
          {loading ? 'Adding...' : 'Add Website'}
        </button>
      </form>
    </div>
  );
};

export default AddWebsite;