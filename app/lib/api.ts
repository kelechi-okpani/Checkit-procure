import { PokemonDetail, PokemonListItem } from "@/components/utility/types";

const BASE_URL = 'https://pokeapi.co/api/v2';

export async function getPokemonByName(name: string): Promise<PokemonDetail | null> {
  try {
    const res = await fetch(`${BASE_URL}/pokemon/${name}`, {
      cache: 'force-cache', 
    });

    if (!res.ok) return null;
    
    const data: PokemonDetail = await res.json();
    return data;
  } catch (error) {
    console.error(`Error fetching ${name}:`, error);
    return null;
  }
}

export async function getPokemonListWithDetails(
  limit: number = 100, 
  offset: number = 0
): Promise<PokemonDetail[]> {
  const res = await fetch(`${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`, {
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch Pokemon list: ${res.statusText}`);
  }

  const data: { results: PokemonListItem[] } = await res.json();

  if (!data.results) return [];

  const detailPromises = data.results.map((p: PokemonListItem) => 
    getPokemonByName(p.name)
  );

  const detailedResults = await Promise.all(detailPromises);

  return detailedResults.filter((p): p is PokemonDetail => p !== null);
}