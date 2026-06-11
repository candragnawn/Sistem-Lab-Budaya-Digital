import { useContext } from 'react';
import { DosenContext } from '../contexts/DosenContext';

export function useDosen() {
  const context = useContext(DosenContext);
  if (!context) {
    throw new Error('useDosen must be used within DosenProvider');
  }
  return context;
}
