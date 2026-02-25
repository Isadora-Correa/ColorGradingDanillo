import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiClient } from '@/api/apiClient';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem('authToken'));
  const navigate = useNavigate();

  useEffect(() => {
    const onExpired = () => {
      localStorage.removeItem('authToken');
      setToken(null);
      navigate('/adm', { replace: true });
    };
    window.addEventListener('auth:expired', onExpired);
    return () => window.removeEventListener('auth:expired', onExpired);
  }, [navigate]);

  const login = async (username, password, redirectTo = '/adm/painel') => {
    const data = await apiClient.login({ username, password });
    localStorage.setItem('authToken', data.token);
    setToken(data.token);
    navigate(redirectTo, { replace: true });
  };

  const logout = (redirectTo = '/adm') => {
    localStorage.removeItem('authToken');
    setToken(null);
    navigate(redirectTo, { replace: true });
  };

  const value = useMemo(
    () => ({ token, login, logout, isAuthenticated: Boolean(token) }),
    [token]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
