import { useAuth } from '../contexts/AuthContext';
import { Link, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import instance from '../api/axios';

const Home = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({ monitored: 0, active: 0, down: 0 });
  const [downWebsites, setDownWebsites] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        await instance.get('/sanctum/csrf-cookie');
        const response = await instance.get('/api/website-stats');
        setStats(response.data);

        const downResponse = await instance.get('/api/websites/down');
        setDownWebsites(downResponse.data);
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
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-10 text-center">
          <h1 className="text-4xl font-extrabold text-gray-900">
            Welcome, {user.name}
          </h1>
        </header>

        <div className="grid grid-cols-2 lg:grid-cols-2 gap-8">
          {/* Website Statistics */}
          <div className="lg:col-span-2 grid grid-cols-3 md:grid-cols-3 gap-4">
            {[
              { 
                title: 'Monitored Websites', 
                value: stats.monitored, 
                color: 'text-blue-600' 
              },
              { 
                title: 'Active Websites', 
                value: stats.active, 
                color: 'text-green-600' 
              },
              { 
                title: 'Down Websites', 
                value: stats.down, 
                color: 'text-red-600' 
              }
            ].map((stat, index) => (
              <div 
                key={index} 
                className="bg-white rounded-xl shadow-md p-6 text-center transition-all hover:shadow-lg"
              >
                <h3 className="text-lg font-semibold text-gray-600 mb-2">
                  {stat.title}
                </h3>
                <p className={`text-4xl font-bold ${stat.color}`}>
                  {stat.value}
                </p>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-md p-6 space-y-4">
            <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">
              Quick Actions
            </h2>
            <Link to="/add-website">
              <button className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Add New Website
              </button>
            </Link>
            <Link to="/websites">
              <button className="w-full py-3 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition-colors">
                View My Websites
              </button>
            </Link>
          </div>
          
          {/* Down Websites Section */}
        <section className=" bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-bold text-red-600 text-center mb-6">
            Down Websites
          </h2>
          {downWebsites.length === 0 ? (
            <p className="text-center text-gray-500">
              No websites are currently down.
            </p>
          ) : (
            <div className="space-y-4">
              {downWebsites.map((website) => (
                <div 
                  key={website.id} 
                  className="border border-red-100 rounded-lg p-4 bg-red-50 hover:bg-red-100 transition-colors"
                >
                  <a
                    href={website.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-700 font-semibold hover:underline"
                  >
                    {website.url}
                  </a>
                  <div className="mt-2 text-sm text-gray-600">
                    <p className="text-red-600 font-medium">Status: Down</p>
                    <p>Last Checked: {new Date(website.checked_at).toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
        </div>
      </div>
    </div>
  );
};

export default Home;