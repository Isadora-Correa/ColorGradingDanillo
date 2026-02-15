import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom';
import App from '@/App.jsx'
import '@/index.css'

// Removi o import do AuthProvider que não existe

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      {/* Removi a tag <AuthProvider> que estava em volta do App */}
      <App />
    </Router>
  </React.StrictMode>
)