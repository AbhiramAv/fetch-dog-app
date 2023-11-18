// App.js

import React from 'react';
import Login from './Login';
import { AuthProvider, useAuth } from './AuthContext';
import ResultsPage from './ResultsPage';

const App: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div>
      <h1>Fetch Dogs</h1>
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
