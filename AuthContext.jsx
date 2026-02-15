import React, { createContext, useContext, useState } from 'react';
import { apiClient } from '@/api/apiClient';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem('authToken'));
  const navigate = useNavigate();

  const login = async (username, password) => {
    const data = await apiClient.login({ username, password });
    localStorage.setItem('authToken', data.token);
    setToken(data.token);
    navigate('/admin');
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setToken(null);
    navigate('/login');
  };

  const value = { token, login, logout, isAuthenticated: !!token };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}