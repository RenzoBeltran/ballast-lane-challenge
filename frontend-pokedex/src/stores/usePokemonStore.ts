import { create } from 'zustand';
import { getPokemonList } from '../services/pokemonService';
import type { PokemonListItem, PokemonConfig } from '../models/Pokemon';

interface PokemonState {
  pokemons: PokemonListItem[];
  count: number;
  isLoading: boolean;
  error: string | null;
  limit: number;
  offset: number;
  search: string;
  sortBy: 'id' | 'name';
  
  fetchPokemons: () => Promise<void>;
  setSearch: (search: string) => void;
  setPage: (page: number) => void;
  setSortBy: (sortBy: 'id' | 'name') => void;
}

export const usePokemonStore = create<PokemonState>((set, get) => ({
  pokemons: [],
  count: 0,
  isLoading: false,
  error: null,
  limit: 20,
  offset: 0,
  search: '',
  sortBy: 'id',

  fetchPokemons: async () => {
    const { limit, offset, search, sortBy } = get();
    set({ isLoading: true, error: null });
    try {
      const data: PokemonConfig = await getPokemonList(limit, offset, search);
      
      let sortedResults = [...data.results];
      if (sortBy === 'name') {
          sortedResults.sort((a, b) => a.name.localeCompare(b.name));
      } else {
          // Default sort by ID (assuming ID is derivable or backend returns in ID order usually)
          // Since results from list only contain name and url, we might need to extract ID to sort reliably if the list isn't ordered.
          // The API 'url' usually contains the ID.
          // Let's assume the API returns them in ID order by default, but if we need to enforce:
           sortedResults.sort((a, b) => {
              const idA = parseInt(a.url.split('/').filter(Boolean).pop( ) || '0');
              const idB = parseInt(b.url.split('/').filter(Boolean).pop() || '0');
              return idA - idB;
           });
      }

      // Map to PokemonListItem including ID and ImageUrl (assuming standard PokeAPI format or similar)
      const mappedPokemons = sortedResults.map((p) => {
          const id = parseInt(p.url.split('/').filter(Boolean).pop() || '0');
          // Using official artwork or default sprite
          const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
          return {
              id,
              name: p.name,
              image
          };
      });

      set({ 
          pokemons: mappedPokemons, 
          count: data.count, 
          isLoading: false 
      });
    } catch (err: any) {
      set({ error: 'Failed to fetch pokemons', isLoading: false });
    }
  },

  setSearch: (search: string) => {
    set({ search, offset: 0 }); // Reset to first page on search
    get().fetchPokemons();
  },

  setPage: (page: number) => {
    const { limit } = get();
    const newOffset = (page - 1) * limit;
    set({ offset: newOffset });
    get().fetchPokemons();
  },

  setSortBy: (sortBy: 'id' | 'name') => {
      set({ sortBy });
      // We can re-sort client side without refetching if we want, OR refetch. Refetching ensures consistency if we had backend sort.
      // But since we implemented client side sort in fetchPokemons, we should just call it.
      get().fetchPokemons();
  }
}));
