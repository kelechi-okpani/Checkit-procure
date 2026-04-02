import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { getPokemonListWithDetails } from '@/lib/api';
import HomePage from '@/page';

vi.mock('@/lib/api', () => ({
  getPokemonListWithDetails: vi.fn(),
}));

describe('HomePage Server Component', () => {
  it('renders the explorer title and filtered results', async () => {
    (getPokemonListWithDetails as any).mockResolvedValue([
      { name: 'bulbasaur', types: [{ type: { name: 'grass' } }], sprites: { other: { 'official-artwork': { front_default: '' } } }, id: 1 }
    ]);

    const searchParams = Promise.resolve({ search: 'bulba' });
    const Page = await HomePage({ searchParams });
    render(Page);

    expect(screen.getByText(/PokéExplorer/i)).toBeInTheDocument();
    expect(screen.getByText(/bulbasaur/i)).toBeInTheDocument();
  });
});