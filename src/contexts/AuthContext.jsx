import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiClient } from '@/api/apiClient';

const AuthContext = createContext(null);

const getStoredToken = () => {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    return window.localStorage.getItem('authToken');
  } catch {
    return null;
  }
};

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => getStoredToken());
  const navigate = useNavigate();

  useEffect(() => {
    const onExpired = () => {
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem('authToken');
      }
      setToken(null);
      navigate('/adm', { replace: true });
    };

    if (typeof window === 'undefined') {
      return undefined;
    }

    window.addEventListener('auth:expired', onExpired);
    return () => window.removeEventListener('auth:expired', onExpired);
  }, [navigate]);

  const login = async (username, password, redirectTo = '/adm/painel') => {
    const data = await apiClient.login({ username, password });
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('authToken', data.token);
    }
    setToken(data.token);
    navigate(redirectTo, { replace: true });
  };

  const logout = (redirectTo = '/adm') => {
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem('authToken');
    }
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
