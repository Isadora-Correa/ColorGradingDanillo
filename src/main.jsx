import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from '@/App.jsx';
import { AuthProvider } from '@/contexts/AuthContext';
import AppErrorBoundary from '@/components/common/AppErrorBoundary';
import '@/index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppErrorBoundary>
      <Router
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      >
        <AuthProvider>
          <App />
        </AuthProvider>
      </Router>
    </AppErrorBoundary>
  </React.StrictMode>
);
