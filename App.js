import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AuthPanel from './components/AuthPanel';
import ProfileSetup from './components/ProfileSetup';
import { AuthProvider, useAuth } from './contexts/AuthContext';

// Import the actual Home component
import Home from './components/Home';

// Protected Route component
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) return null;
  
  if (!user) {
    return React.createElement(Navigate, { to: '/' });
  }
  
  return children;
};

// Public Route component (accessible only if NOT logged in)
const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) return null;
  
  if (user) {
    return React.createElement(Navigate, { to: '/home' });
  }
  
  return children;
};

function App() {
  return React.createElement(BrowserRouter, null,
    React.createElement(AuthProvider, null,
      React.createElement(Routes, null, [
      React.createElement(Route, {
        key: 'auth',
        path: '/',
        element: React.createElement(PublicRoute, null,
          React.createElement(AuthPanel)
        )
      }),
      React.createElement(Route, {
        key: 'profile-setup',
        path: '/setup',
        element: React.createElement(ProtectedRoute, null,
          React.createElement(ProfileSetup)
        )
      }),
      React.createElement(Route, {
        key: 'home',
        path: '/home',
        element: React.createElement(ProtectedRoute, null,
          React.createElement(Home)
        )
      }),
      React.createElement(Route, {
        key: 'catch-all',
        path: '*',
        element: React.createElement(Navigate, { to: '/' })
      })
    ]))
  );
}

export default App;