import React, { useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import DogSearchComponent from './DogSearchComponent';
import LoginPage from '../components/Login';

// Logout component definition
const Logout: React.FC = () => {
  // Use authentication context for user authentication and logout
  const { isAuthenticated, logout } = useAuth();

  // State to manage redirection to login page
  const [redirectToLogin, setRedirectToLogin] = useState(false);

  // State to manage the visibility of the dropdown
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Effect to redirect to login page when not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      setRedirectToLogin(true);
    }
  }, [isAuthenticated]);

  // Handle logout action
  const handleLogout = () => {
    logout();
    setRedirectToLogin(true);
  };

  // Toggle the visibility of the profile dropdown
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Render the Logout component
  return (
    <div style={{ position: 'relative' }}>
      {redirectToLogin ? (
        // Redirect to the login page if not authenticated
        <LoginPage />
      ) : (
        <>
          <div
            style={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              zIndex: 1,
            }}
          >
            {/* Hamburger or Settings Button */}
            <button
              onClick={toggleDropdown}
              style={{
                background: 'transparent',
                color: '#333',
                border: 'none',
                borderRadius: '50%',
                cursor: 'pointer',
                height: '50px',
                width: '50px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '24px',
              }}
            >
              ☰ {/* Hamburger icon or any other minimal icon */}
            </button>
            {/* Profile Dropdown */}
            {isDropdownOpen && (
              <div
                style={{
                  position: 'absolute',
                  top: '70px',
                  right: '10px',
                  background: 'white',
                  boxShadow: '0px 8px 16px 0px rgba(0,0,0,0.2)',
                  borderRadius: '8px',
                  padding: '10px',
                  zIndex: 2,
                }}
              >
                {/* Logout Button */}
                <button
                  onClick={handleLogout}
                  style={{
                    background: '#4CAF50',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    marginTop: '10px',
                    padding: '8px 16px',
                    fontSize: '16px',
                  }}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
          {/* Render the DogSearchComponent when authenticated */}
          <DogSearchComponent />
        </>
      )}
    </div>
  );
};

export default Logout;
