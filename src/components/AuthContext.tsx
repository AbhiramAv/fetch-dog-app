import React, { createContext, useContext, useState, ReactNode } from 'react';
import api from '../api';

interface User {
  name: string;
  email: string;
}

interface AuthContextProps {
  isAuthenticated: boolean;
  user: User | null;
  login: (name: string, email: string) => Promise<void>;
  logout: () => void;
}

// Remove AuthState interface if not used

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const login = async (name: string, email: string) => {
    try {
      const response = await api.post('/auth/login', { name, email });
      const authToken = response.headers['fetch-access-token'];
      api.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;
      setIsAuthenticated(true);
      console.log('Login response:', response);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
