import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import App from './App';
import { AuthProvider } from '@/contexts/SupabaseAuthContext';
import '@/i18n';
import '@/index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <Suspense fallback={<div></div>}>
        <Router>
          <AuthProvider>
            <App />
          </AuthProvider>
        </Router>
      </Suspense>
    </HelmetProvider>
  </React.StrictMode>
);