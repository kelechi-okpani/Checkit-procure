import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getPokemonByName } from '@/lib/api';

describe('API Functions', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn());
  });

  it('getPokemonByName returns data on successful fetch', async () => {
    const mockData = { name: 'pikachu', id: 25 };
    (fetch as any).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockData),
    });
    const result = await getPokemonByName('pikachu');
    expect(result).toEqual(mockData);
  });

  it('returns null when the API returns a 404', async () => {
    (fetch as any).mockResolvedValue({ ok: false });
    const result = await getPokemonByName('unknown');
    expect(result).toBeNull();
  });
});


