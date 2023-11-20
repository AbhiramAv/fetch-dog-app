// ResultsPage.tsx

import React, { useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import DogSearchComponent from './DogSearchComponent';
import LoginPage from '../components/Login'; // Import your login component

const Logout: React.FC = () => {
    const { isAuthenticated, logout, user } = useAuth();
    const [redirectToLogin, setRedirectToLogin] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
    useEffect(() => {
      if (!isAuthenticated) {
        setRedirectToLogin(true);
      }
    }, [isAuthenticated]);
  
    const handleLogout = () => {
      logout();
      setRedirectToLogin(true);
    };
  
    const toggleDropdown = () => {
      setIsDropdownOpen(!isDropdownOpen);
    };
  
    return (
      <div style={{ position: 'relative' }}>
        {redirectToLogin ? (
          <LoginPage />
        ) : (
          <>
            <div
              style={{
                position: 'absolute',
                top: '10px', // Adjusted top position
                right: '10px',
                zIndex: 1,
              }}
            >
              {/* Profile Toggle Button */}
              <button
                onClick={toggleDropdown}
                style={{
                  background: '#4caf50',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  height: '40px', // Adjusted height
                  width: '120px', // Adjusted width
                }}
              >
                {'Profile'}
              </button>
              {/* Profile Dropdown */}
              {isDropdownOpen && (
                <div
                  style={{
                    position: 'absolute',
                    top: '50px', // Adjusted top position
                    right: '0',
                    background: 'white',
                    boxShadow: '0px 8px 16px 0px rgba(0,0,0,0.2)',
                    borderRadius: '5px',
                    padding: '10px',
                    zIndex: 2,
                  }}
                >
                  {/* User Information */}
                  <p>Name: {user?.name}</p>
                  <p>Email: {user?.email}</p>
                  {/* ... other user information */}
                  {/* Logout Button */}
                  <button
                    onClick={handleLogout}
                    style={{
                      background: '#f44336',
                      color: 'white',
                      border: 'none',
                      borderRadius: '5px',
                      cursor: 'pointer',
                      marginTop: '10px',
                    }}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
            <DogSearchComponent />
          </>
        )}
      </div>
    );
  };
  
  export default Logout;