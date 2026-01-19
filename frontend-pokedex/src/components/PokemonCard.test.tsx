import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { PokemonCard } from './PokemonCard';

const mockPokemon = {
  id: 25,
  name: 'pikachu',
  image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png',
  types: ['electric'],
  weight: 60,
  height: 4,
  stats: []
};

describe('PokemonCard', () => {
  it('renders pokemon information correctly', () => {
    render(
      <MemoryRouter>
        <PokemonCard pokemon={mockPokemon} />
      </MemoryRouter>
    );

    expect(screen.getByText('pikachu')).toBeInTheDocument();
    expect(screen.getByText('#025')).toBeInTheDocument();
    
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', mockPokemon.image);
    expect(img).toHaveAttribute('alt', 'pikachu');
  });

  it('contains link to detail page', () => {
     render(
      <MemoryRouter>
        <PokemonCard pokemon={mockPokemon} />
      </MemoryRouter>
    );
    
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/pokemon/25');
  });
});
