// App.js

import React from 'react';
import Login from './components/Login';
import { AuthProvider, useAuth } from './components/AuthContext';
import ResultsPage from './components/ResultsPage';

const App: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div>
      <h1>PawsFinder</h1>
      {isAuthenticated ? <ResultsPage /> : <Login />}
    </div>
  );
};

const AppWithAuthProvider: React.FC = () => {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
};

export default AppWithAuthProvider;
