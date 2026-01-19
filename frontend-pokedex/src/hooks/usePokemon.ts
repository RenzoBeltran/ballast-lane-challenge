import { usePokemonStore } from '../stores/usePokemonStore';

export const usePokemon = () => {
    const store = usePokemonStore();
    return store; // Exposing the whole store state and actions
};
