import api from './api';
import type { AuthRequest, AuthResponse } from '../models/Auth';

export const login = async (credentials: AuthRequest): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>('/pokemon/auth', credentials);
  return response.data;
};

export const logout = async (): Promise<void> => {
  await api.delete('/pokemon/logout');
};
