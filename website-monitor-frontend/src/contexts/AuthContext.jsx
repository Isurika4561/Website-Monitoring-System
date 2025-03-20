import { createContext, useContext, useState, useEffect } from 'react';
import instance from '../api/axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
    const storedToken = localStorage.getItem('bearer_token');
    const storedUser = localStorage.getItem('user');

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      instance.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
      console.log("Authorization Header Restored:", storedToken);
    } else {
      instance.defaults.headers.common['Authorization'] = '';
    }
  }, []);

  const login = (userData, token) => {
    localStorage.setItem('bearer_token', token);
    localStorage.setItem('user', JSON.stringify(userData));
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
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
