// ResultsPage.tsx

import React, { useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import DogSearchComponent from './DogSearchComponent';
import LoginPage from '../components/Login'; // Import your login component

const Logout: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();
  const [redirectToLogin, setRedirectToLogin] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      setRedirectToLogin(true);
    }
  }, [isAuthenticated]);

  const handleLogout = () => {
    logout();
    setRedirectToLogin(true);
  };

  return (
    <div>
      {redirectToLogin ? (
        <LoginPage />
      ) : (
        <>
          <h2>Search Results</h2>
          <button onClick={handleLogout}>Logout</button>
          <DogSearchComponent />
        </>
      )}
    </div>
  );
};

export default Logout;
