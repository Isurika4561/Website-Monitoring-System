// components/GuestRoute.jsx
import { useAuth } from '../contexts/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';

const GuestRoute = () => {
  const { user } = useAuth();
  return !user ? <Outlet /> : <Navigate to="/" />;
};

export default GuestRoute;