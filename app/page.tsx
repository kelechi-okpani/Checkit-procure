import { Suspense } from 'react';
import { getPokemonListWithDetails } from '@/lib/api'; 
import PokemonCard from '@/components/PokemonCard'; 
import FilterBar from '@/components/organisms/FilterBar';
import Pagination from '@/components/organisms/Pagination';
import { PokemonDetail } from '@/components/utility/types';

interface PageProps {
  searchParams: Promise<{ 
    search?: string; 
    type?: string; 
    page?: string 
  }>;
}

// export const runtime = 'edge'

export default async function HomePage({ searchParams }: PageProps) {
  const { search, type, page } = await searchParams;
  
  const currentPage = Number(page) || 1;
  const pageSize = 20;

  const allPokemon: PokemonDetail[] = await getPokemonListWithDetails(100, 0); 
  

  const filtered = allPokemon.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search?.toLowerCase() || '');
    const matchesType = type 
      ? p.types.some((t) => t.type.name.toLowerCase() === type.toLowerCase())
      : true;
    return matchesSearch && matchesType;
  });

  const offset = (currentPage - 1) * pageSize;
  const paginatedResults = filtered.slice(offset, offset + pageSize);

  return (
    <main className="min-h-screen bg-slate-50 p-6 md:p-12 lg:p-16 text-slate-900">
      <div className="max-w-7xl mx-auto">
        
        <header className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
          <div className="space-y-4">
            <div className="inline-flex items-center space-x-2 bg-indigo-100 border border-indigo-200 px-3 py-1 rounded-full">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-600"></span>
              </span>
              <span className="text-xs font-bold text-indigo-800 uppercase tracking-widest">Global Pokedex</span>
            </div>
            
            <div>
              <h1 className="text-5xl md:text-6xl font-black text-slate-950 tracking-tight mb-3">
                Poké<span className="text-indigo-600">Explorer</span>
              </h1>
              <p className="text-lg text-slate-700 font-medium max-w-xl leading-relaxed">
                A high-performance interface for searching and filtering the Pokémon universe. 
                Built with precision for the Checkit Assessment.
              </p>
            </div>
          </div>

          <div className="w-full lg:max-w-xl bg-white p-2 rounded-2xl shadow-sm border border-slate-200">
            <FilterBar />
          </div>
        </header>

        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 bg-white rounded-[2.5rem] border-2 border-dashed border-slate-200">
            <div className="bg-slate-100 p-6 rounded-full mb-6 text-slate-400">
              <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-slate-900">No results matched your search</h2>
            <p className="text-slate-600 mt-2 text-center max-w-sm font-medium">
              Try a different Pokémon name or select "All Types" to see more results.
            </p>
          </div>
        ) : (
          <div className="space-y-16">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {paginatedResults.map((p) => (
                <Suspense 
                  key={p.name} 
                  fallback={<div className="h-80 bg-white animate-pulse rounded-3xl border border-slate-200" />}
                >
                  <PokemonCard name={p.name} index={0} />
                </Suspense>
              ))}
            </div>
            <div className="flex justify-center border-t border-slate-200 pt-12">
              <Pagination 
                totalCount={filtered.length} 
                pageSize={pageSize} 
              />
            </div>
          </div>
        )}
      </div>
    </main>
  );
}