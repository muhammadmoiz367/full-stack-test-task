import React, { createContext, useContext, useState } from 'react';
import { login, signup } from '../services/authService';

interface User {
  _id: string;
  email: string;
  name: string;
}

interface AuthContextProps {
  login: (data: { email: string; password: string }) => Promise<void>;
  signup: (data: {
    email: string;
    name: string;
    password: string;
  }) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
}

export const AuthContext = createContext<AuthContextProps | undefined>(
  undefined
);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const handleLogin = async (data: { email: string; password: string }) => {
    const response = await login(data);
    setUser(response.data.user);
    setToken(response.data.token);
    setIsAuthenticated(true);
  };

  const handleSignup = async (data: {
    email: string;
    name: string;
    password: string;
  }) => {
    const response = await signup(data);
    setUser(response.data.user);
    setToken(response.data.token);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setUser(null);
    setToken(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        login: handleLogin,
        signup: handleSignup,
        logout: handleLogout,
        isAuthenticated,
        user,
        token,
      }}
    >
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
