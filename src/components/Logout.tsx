import React, { useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import DogSearchComponent from './DogSearchComponent';
import LoginPage from '../components/Login'; 

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
                top: '10px',
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
                  height: '40px', 
                  width: '120px',
                }}
              >
                {'Profile'}
              </button>
              {/* Profile Dropdown */}
              {isDropdownOpen && (
                <div
                  style={{
                    position: 'absolute',
                    top: '50px', 
                    right: '0',
                    background: 'white',
                    boxShadow: '0px 8px 16px 0px rgba(0,0,0,0.2)',
                    borderRadius: '5px',
                    padding: '10px',
                    zIndex: 2,
                  }}
                >
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