import { createContext, useContext, useState, useEffect } from 'react';
import instance from '../api/axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('bearer_token');
  
    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      instance.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`; // Ensure auth header persists
      console.log("Authorization Header Set:", storedToken);
    }
  }, []);

  const login = (userData, token) => {
    localStorage.setItem('bearer_token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    instance.defaults.headers.common['Authorization'] = `Bearer ${token}`; // Set auth header globally
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('bearer_token');
    localStorage.removeItem('user');
    instance.defaults.headers.common['Authorization'] = '';
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);