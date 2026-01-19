import api from './api';
import type { PokemonConfig, PokemonDetail } from '../models/Pokemon';

export const getPokemonList = async (limit: number = 20, offset: number = 0, search: string = ''): Promise<PokemonConfig> => {
  // Note: The backend endpoint is just /pokemon. 
  // Depending on backend implementation, search might be a query param.
  // The requirements say "Search bar (filter by name)".
  // Assuming query params 'limit', 'offset', and maybe 'name' or 'search' for filtering.
  const params: Record<string, string | number> = { limit, offset };
  if (search) {
      params.name = search; 
  }
  
  const response = await api.get<PokemonConfig>('/pokemon', { params });
  return response.data;
};

export const getPokemonDetail = async (id: number | string): Promise<PokemonDetail> => {
  const response = await api.get<PokemonDetail>(`/pokemon/${id}`);
  return response.data;
};
