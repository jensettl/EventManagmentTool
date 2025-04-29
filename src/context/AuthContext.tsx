import React, { createContext, useState, useEffect, useContext } from 'react';
import { AuthContextType, User, AuthUser } from '../types';
import { users } from '../data/mockData';

// Create the AuthContext
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Custom hook for using the AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Check for stored user on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setCurrentUser(parsedUser);
        setIsAuthenticated(true);
      } catch (err) {
        console.error('Failed to parse stored user:', err);
        localStorage.removeItem('currentUser');
      }
    }
    setLoading(false);
  }, []);

  // Handle user login
  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 800));
      
      // Find user in mock data
      const user = users.find(user => 
        user.email === email && user.password === password
      );
      
      if (user) {
        // Create a user object without the password
        const { password: _, ...secureUser } = user;
        setCurrentUser(secureUser);
        setIsAuthenticated(true);
        localStorage.setItem('currentUser', JSON.stringify(secureUser));
        setLoading(false);
        return;
      }
      
      throw new Error('Invalid email or password');
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred');
      }
      setLoading(false);
    }
  };

  // Handle user registration
  const register = async (name: string, email: string, password: string) => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 800));
      
      // Check if user already exists
      if (users.some(user => user.email === email)) {
        throw new Error('Email already in use');
      }
      
      // Create new user with random avatar
      const newUser: AuthUser = {
        id: (users.length + 1).toString(),
        name,
        email,
        password,
        avatar: `https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=200`,
        createdAt: new Date()
      };
      
      // In a real app, this would be an API call to create the user
      users.push(newUser);
      
      // Create a user object without the password
      const { password: _, ...secureUser } = newUser;
      setCurrentUser(secureUser);
      setIsAuthenticated(true);
      localStorage.setItem('currentUser', JSON.stringify(secureUser));
      setLoading(false);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred');
      }
      setLoading(false);
    }
  };

  // Handle user logout
  const logout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('currentUser');
  };

  const contextValue: AuthContextType = {
    currentUser,
    isAuthenticated,
    login,
    register,
    logout,
    loading,
    error
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};