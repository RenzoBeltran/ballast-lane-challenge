import { create } from 'zustand';
import * as authService from '../services/authService';
import type { AuthRequest } from '../models/Auth';
import type { User as UserModel } from '../models/User';

interface AuthState {
  user: UserModel | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (credentials: AuthRequest) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => void;
}

// Initial state from storage to avoid FOUC (Flash of Unauthenticated Content)
const getInitialState = () => {
  const token = localStorage.getItem('token');
  const userStr = localStorage.getItem('user');
  if (token && userStr) {
    try {
      const user = JSON.parse(userStr);
      return { 
          user: { username: user.username, isLoggedIn: true }, 
          isAuthenticated: true 
      };
    } catch {
      return { user: null, isAuthenticated: false };
    }
  }
  return { user: null, isAuthenticated: false };
};

const { user: initialUser, isAuthenticated: initialIsAuthenticated } = getInitialState();

export const useAuthStore = create<AuthState>((set) => ({
  user: initialUser,
  isAuthenticated: initialIsAuthenticated,
  isLoading: false,
  error: null,

  login: async (credentials: AuthRequest) => {
    set({ isLoading: true, error: null });
    try {
      const response = await authService.login(credentials);
      // Validates against the endpoint.
      // Persistence: Save session/token in localStorage.
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
      
      const user: UserModel = {
        username: response.user.username,
        isLoggedIn: true,
      };

      set({ user, isAuthenticated: true, isLoading: false });
    } catch (err: any) {
      set({ error: 'Invalid credentials', isLoading: false });
      throw err;
    }
  },

  logout: async () => {
    try {
        await authService.logout();
    } catch (e) {
        console.error('Logout failed', e);
    } finally {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        set({ user: null, isAuthenticated: false });
    }
  },

  checkAuth: () => {
    const token = localStorage.getItem('token');
    const userStr = localStorage.getItem('user');
    if (token && userStr) {
      try {
        const user = JSON.parse(userStr);
        set({ 
            user: { username: user.username, isLoggedIn: true }, 
            isAuthenticated: true 
        });
      } catch (e) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        set({ user: null, isAuthenticated: false });
      }
    }
  },
}));
