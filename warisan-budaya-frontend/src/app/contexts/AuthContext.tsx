import { createContext, useState, useEffect, ReactNode } from 'react';
import axios from '../lib/axios';

export interface User {
  id: number;
  name: string;
  email: string;
  role: 'dosen' | 'admin';
  lecturer_id?: number;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  role: 'public' | 'dosen' | 'admin';
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  canRead: boolean;
  canWrite: boolean;
  canDelete: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user from localStorage on mount
  useEffect(() => {
    const savedToken = localStorage.getItem('auth_token');
    const savedUser = localStorage.getItem('auth_user');

    if (savedToken && savedUser) {
      try {
        setToken(savedToken);
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Failed to parse saved user:', error);
        localStorage.removeItem('auth_token');
        localStorage.removeItem('auth_user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post('/login', { email, password });
      const { token: newToken, user: userData } = response.data;

      setToken(newToken);
      setUser(userData);

      localStorage.setItem('auth_token', newToken);
      localStorage.setItem('auth_user', JSON.stringify(userData));
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_user');
  };

  const isAuthenticated = !!user && !!token;
  const role = user?.role || 'public';
  const canRead = true; // Everyone can read
  const canWrite = isAuthenticated && (role === 'dosen' || role === 'admin');
  const canDelete = isAuthenticated && (role === 'dosen' || role === 'admin');

  const value: AuthContextType = {
    user,
    token,
    role,
    isAuthenticated,
    isLoading,
    login,
    logout,
    canRead,
    canWrite,
    canDelete,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
