import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        
        <Link to="/" className="text-white text-xl font-bold">Website Monitor</Link>
        <div className="space-x-4">
          {user && ( // Only show links if user is logged in
            <>
              <Link to="/" className="text-white">Home</Link>
              <Link to="/websites" className="text-white">Websites</Link>
              <Link to="/settings" className="text-white">Settings</Link>
              <button onClick={handleLogout} className="text-white">Logout</button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
