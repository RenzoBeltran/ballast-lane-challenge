import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as authService from './authService';
import api from './api';

// Mock the api module
vi.mock('./api', () => ({
  default: {
    post: vi.fn(),
    delete: vi.fn(),
  },
}));

describe('authService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('login', () => {
    it('should call api.post with correct arguments and return data', async () => {
      const mockResponse = { data: { token: 'fake-token', user: { id: 1, email: 'test@example.com' } } };
      (api.post as any).mockResolvedValue(mockResponse);

      const credentials = { username: 'testuser', password: 'password' };
      const result = await authService.login(credentials);

      expect(api.post).toHaveBeenCalledWith('/pokemon/auth', credentials);
      expect(result).toEqual(mockResponse.data);
    });

    it('should throw error when api call fails', async () => {
      const error = new Error('Login failed');
      (api.post as any).mockRejectedValue(error);

      const credentials = { username: 'testuser', password: 'password' };
      
      await expect(authService.login(credentials)).rejects.toThrow('Login failed');
    });
  });

  describe('logout', () => {
    it('should call api.delete', async () => {
      (api.delete as any).mockResolvedValue({});

      await authService.logout();

      expect(api.delete).toHaveBeenCalledWith('/pokemon/logout');
    });
  });
});
