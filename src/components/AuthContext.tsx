import React, { createContext, useContext, useState, ReactNode } from 'react';
import api from '../api';

// Define the structure of the user object
interface User {
  name: string;
  email: string;
}

// Define the properties of the authentication context
interface AuthContextProps {
  isAuthenticated: boolean;
  user: User | null;
  login: (name: string, email: string) => Promise<void>;
  logout: () => void;
}

// Create the authentication context
const AuthContext = createContext<AuthContextProps | undefined>(undefined);

// Authentication provider component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // State to manage authentication status and user information
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  // Function to handle user login
  const login = async (name: string, email: string) => {
    try {
      // Make a login request to the API
      const response = await api.post('/auth/login', { name, email });
      
      // Extract and set the authentication token
      const authToken = response.headers['fetch-access-token'];
      api.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;
      
      // Update state to indicate successful authentication
      setIsAuthenticated(true);
      console.log('Login response:', response);
    } catch (error) {
      // Handle login failure
      console.error('Login failed:', error);
    }
  };

  // Function to handle user logout
  const logout = () => {
    // Reset authentication status and user information
    setIsAuthenticated(false);
    setUser(null);
  };

  // Provide the authentication context value to the children components
  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to conveniently access the authentication context
export const useAuth = () => {
  // Retrieve the authentication context
  const context = useContext(AuthContext);
  
  // Throw an error if the hook is used outside of the AuthProvider
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  // Return the authentication context
  return context;
};
