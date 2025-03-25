import { useState } from 'react';
import axios from '../api/axios';
import { useAuth } from '../contexts/AuthContext';
import instance from '../api/axios';

const AddWebsite = () => {
  const [url, setUrl] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    const token = localStorage.getItem('bearer_token');

    if (!token) {
      setError('Authentication failed. Please log in again.');
      setLoading(false);
      return;
    }

    try {
      await instance.get("/sanctum/csrf-cookie");
      const response = await instance.post(
        '/api/websites',
        { name, url, user_id: user.id },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json'
          }
        }
      );
      console.log("Website Add Response:", response.data);
      setSuccess('Website added successfully');
      setUrl('');
      setName('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add website');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-lg">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Add New Website</h2>
        
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        {success && <p className="text-green-500 mb-4 text-center">{success}</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-lg font-semibold text-gray-700">Website Name</label>
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded-lg placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter Website Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-lg font-semibold text-gray-700">Website URL</label>
            <input
              type="url"
              className="w-full p-3 border border-gray-300 rounded-lg placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="https://example.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 disabled:bg-gray-400 transition duration-200"
            disabled={loading}
          >
            {loading ? 'Adding...' : 'Add Website'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddWebsite;
