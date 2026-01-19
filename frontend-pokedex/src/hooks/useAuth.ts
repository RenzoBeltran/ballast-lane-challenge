import { useAuthStore } from '../stores/useAuthStore';

export const useAuth = () => {
  const { user, isAuthenticated, isLoading, error, login, logout } = useAuthStore();
  
  // Example of logic in hook if needed, for now just passing through
  return {
    user,
    isAuthenticated,
    isLoading,
    error,
    login,
    logout
  };
};
