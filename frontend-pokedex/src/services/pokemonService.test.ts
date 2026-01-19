import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as pokemonService from './pokemonService';
import api from './api';

// Mock the api module
vi.mock('./api', () => ({
  default: {
    get: vi.fn(),
  },
}));

describe('pokemonService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getPokemonList', () => {
    it('should call api.get with default parameters', async () => {
      const mockResponse = { data: { config: [], total: 0 } };
      (api.get as any).mockResolvedValue(mockResponse);

      await pokemonService.getPokemonList();

      expect(api.get).toHaveBeenCalledWith('/pokemon', { params: { limit: 20, offset: 0 } });
    });

    it('should call api.get with search parameter', async () => {
      const mockResponse = { data: { config: [], total: 0 } };
      (api.get as any).mockResolvedValue(mockResponse);

      await pokemonService.getPokemonList(10, 10, 'pikachu');

      expect(api.get).toHaveBeenCalledWith('/pokemon', { params: { limit: 10, offset: 10, name: 'pikachu' } });
    });
  });

  describe('getPokemonDetail', () => {
    it('should call api.get with correct id', async () => {
      const mockResponse = { data: { id: 1, name: 'bulbasaur' } };
      (api.get as any).mockResolvedValue(mockResponse);

      const result = await pokemonService.getPokemonDetail(1);

      expect(api.get).toHaveBeenCalledWith('/pokemon/1');
      expect(result).toEqual(mockResponse.data);
    });
  });
});
