// @ts-expect-error -
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import FilterBar from '@/components/organisms/FilterBar';
import { useRouter, useSearchParams } from 'next/navigation';

// Mock Next.js navigation
vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
  useSearchParams: vi.fn(),
}));

describe('FilterBar Component', () => {
  const mockReplace = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useRouter as any).mockReturnValue({ replace: mockReplace });
    (useSearchParams as any).mockReturnValue(new URLSearchParams(''));
  });

  it('updates the local state immediately when typing', () => {
    render(<FilterBar />);
    const input = screen.getByPlaceholderText(/search pokémon/i) as HTMLInputElement;
    
    fireEvent.change(input, { target: { value: 'pikachu' } });
    expect(input.value).toBe('pikachu');
  });

  it('debounces the search and updates the URL after 400ms', async () => {
    render(<FilterBar />);
    const input = screen.getByPlaceholderText(/search pokémon/i);
    
    fireEvent.change(input, { target: { value: 'charizard' } });

    // Ensure it hasn't called router immediately
    expect(mockReplace).not.toHaveBeenCalled();

    // Wait for the 400ms debounce timer in the component
    await waitFor(() => {
      expect(mockReplace).toHaveBeenCalledWith(
        expect.stringContaining('search=charizard'),
        expect.anything()
      );
    }, { timeout: 1000 });
  });

  it('updates the URL immediately when a type is selected', () => {
    render(<FilterBar />);
    const select = screen.getByRole('combobox');
    
    fireEvent.change(select, { target: { value: 'fire' } });

    expect(mockReplace).toHaveBeenCalledWith(
      expect.stringContaining('type=fire'),
      expect.anything()
    );
  });
});