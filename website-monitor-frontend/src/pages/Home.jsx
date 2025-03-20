import { useAuth } from '../contexts/AuthContext';
import { Link, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from '../api/axios';

const Home = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({ monitored: 0, active: 0, down: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get('/api/website-stats'); // Fetch stats from backend
        setStats(response.data);
      } catch (error) {
        console.error('Error fetching website stats:', error);
      }
    };
    
    fetchStats();
  }, []);

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-blue-500">
        Welcome {user ? user.name : 'Guest'}
      </h1>

      <div className="w-full max-w-4xl space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-6 rounded-lg shadow text-center">
            <h3 className="text-3xl font-bold text-blue-500">Monitored Websites</h3>
            <p className="text-3xl font-bold text-blue-500">{stats.monitored}</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow text-center">
            <h3 className="text-3xl font-bold text-blue-500">Active Websites</h3>
            <p className="text-3xl font-bold text-green-500">{stats.active}</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow text-center">
            <h3 className="text-3xl font-bold text-blue-500">Down Websites</h3>
            <p className="text-3xl font-bold text-red-500">{stats.down}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow w-full">
          <h2 className="text-3xl font-bold text-blue-500 mb-4">Quick Actions</h2>
          <div className="space-y-2">
            <Link to="/add-website">
              <button className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                Add New Website
              </button>
            </Link>
            <Link to="/websites">
              <button className="w-full p-2 bg-gray-200 rounded hover:bg-gray-300">
                View All Websites
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
