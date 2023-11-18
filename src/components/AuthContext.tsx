import { createContext, useContext, ReactNode, useState } from 'react';
import api from '../api';

interface AuthContextProps {
  children: ReactNode;
}

interface AuthState {
  isAuthenticated: boolean;
  login: (name: string, email: string) => Promise<void>;
}

const AuthContext = createContext<AuthState | undefined>(undefined);

export const AuthProvider: React.FC<AuthContextProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

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

  return (
    <AuthContext.Provider value={{ isAuthenticated, login }}>
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
