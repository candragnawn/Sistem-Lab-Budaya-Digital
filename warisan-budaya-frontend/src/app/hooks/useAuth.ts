import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}

export function useRole() {
  const { role, isAuthenticated, canRead, canWrite, canDelete } = useAuth();

  return {
    isPublic: !isAuthenticated,
    isDosen: isAuthenticated && role === 'dosen',
    isAdmin: isAuthenticated && role === 'admin',
    canRead,
    canWrite,
    canDelete,
  };
}
