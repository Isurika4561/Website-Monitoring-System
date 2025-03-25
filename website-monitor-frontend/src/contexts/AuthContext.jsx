import { createContext, useContext, useState, useEffect } from 'react';
import instance from '../api/axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // Role check - true if user role is 'admin'
  const isAdmin = user?.role === 'admin';

  useEffect(() => {
    const storedToken = localStorage.getItem('bearer_token');
    const storedUser = localStorage.getItem('user');

    if (storedUser && storedToken) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      instance.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
      console.log("Authorization Header Restored:", storedToken);
    } else {
      instance.defaults.headers.common['Authorization'] = '';
    }
  }, []);

  const login = (userData, token) => {
    localStorage.setItem('bearer_token', token);
    localStorage.setItem('user', JSON.stringify(userData)); // Ensure 'role' comes in userData
    instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('bearer_token');
    localStorage.removeItem('user');
    instance.defaults.headers.common['Authorization'] = '';
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
