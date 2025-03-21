import { useAuth } from '../contexts/AuthContext';
import { Link, Navigate } from 'react-router-dom';

const Home = () => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">
        Welcome {user ? user.name : 'Guest'}
      </h1>

      {user ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-3xl font-bold text-blue-500">Monitored Websites</h3>
              <p className="text-3xl font-bold text-blue-500">5</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-3xl font-bold text-blue-500">Active Websites</h3>
              <p className="text-3xl font-bold text-green-500">4</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-3xl font-bold text-blue-500">Down Websites</h3>
              <p className="text-3xl font-bold text-red-500">1</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-3xl font-bold text-blue-500">Quick Actions</h2>
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
        </>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-3xl font-bold text-blue-500 mb-4">Get Started</h2>
          <div className="space-y-4">
            <Link to="/login">
              <button className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                Login
              </button>
            </Link>
            <Link to="/register">
              <button className="w-full p-2 bg-green-500 text-white rounded hover:bg-green-600">
                Register
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;