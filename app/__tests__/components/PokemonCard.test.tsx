import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import PokemonCard from '@/components/PokemonCard';
import { getPokemonByName } from '@/lib/api';

// Mock the API library
vi.mock('@/lib/api', () => ({
  getPokemonByName: vi.fn(),
}));

describe('PokemonCard Component', () => {
  const mockPokemon = {
    id: 1,
    name: 'bulbasaur',
    sprites: {
      other: {
        'official-artwork': { front_default: 'https://test.com/bulba.png' }
      }
    },
    types: [{ type: { name: 'grass' } }, { type: { name: 'poison' } }]
  };

  it('renders pokemon details correctly', async () => {
    (getPokemonByName as any).mockResolvedValue(mockPokemon);

    // Resolve the async component
    const Card = await PokemonCard({ name: 'bulbasaur', index: 0 });
    render(Card);

    // Check name and ID
    expect(screen.getByText(/bulbasaur/i)).toBeInTheDocument();
    expect(screen.getByText(/#001/)).toBeInTheDocument();

    // Check types
    expect(screen.getByText(/grass/i)).toBeInTheDocument();
    expect(screen.getByText(/poison/i)).toBeInTheDocument();

    // Check image alt text
    const img = screen.getByAltText(/bulbasaur/i);
    expect(img).toBeInTheDocument();
  });

  it('returns null and renders nothing if pokemon data is not found', async () => {
    (getPokemonByName as any).mockResolvedValue(null);

    const Card = await PokemonCard({ name: 'unknown', index: 0 });
    const { container } = render(Card);

    expect(container).toBeEmptyDOMElement();
  });
});