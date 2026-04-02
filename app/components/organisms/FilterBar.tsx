'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useTransition, useEffect, useState } from 'react';
import { Search, Filter, Loader2 } from 'lucide-react';

const TYPES = ['fire', 'water', 'grass', 'electric', 'ghost', 'psychic', 'ice'];

export default function FilterBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  
  const [localSearch, setLocalSearch] = useState(searchParams.get('search') ?? '');

  useEffect(() => {
    const timer = setTimeout(() => {
      if (localSearch !== (searchParams.get('search') ?? '')) {
        updateFilters('search', localSearch);
      }
    }, 400); 
    return () => clearTimeout(timer);
  }, [localSearch]);

  const updateFilters = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value);
    else params.delete(key);
    
    // Reset to page 1 whenever filters change
    params.delete('page');

    startTransition(() => {
      router.replace(`/?${params.toString()}`, { scroll: false });
    });
  };

  return (
    <div className="w-full flex flex-col sm:flex-row gap-3 items-center">
      <div className="relative flex-1 w-full group">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors">
          <Search size={18} strokeWidth={2.5} />
        </div>
        <input
          type="text"
          placeholder="Search Pokémon..."
          value={localSearch}
          onChange={(e) => setLocalSearch(e.target.value)}
          className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 text-slate-900 placeholder:text-slate-400 rounded-2xl outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all shadow-sm font-medium"
        />
      </div>
    
      <div className="relative w-full sm:w-48 group">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none group-focus-within:text-indigo-500 transition-colors">
          <Filter size={16} strokeWidth={2.5} />
        </div>
        <select 
          value={searchParams.get('type') ?? ''}
          onChange={(e) => updateFilters('type', e.target.value)}
          className="w-full pl-10 pr-4 py-3 appearance-none bg-white border border-slate-200 text-slate-700 font-bold text-sm rounded-2xl outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 cursor-pointer transition-all shadow-sm"
        >
          <option value="">All Types</option>
          {TYPES.map(t => (
            <option key={t} value={t} className="capitalize">
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </option>
          ))}
        </select>

        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
          <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>

      <div className="flex items-center justify-center w-10 h-10">
        {isPending && (
          <Loader2 className="text-indigo-600 animate-spin" size={20} />
        )}
      </div>
    </div>
  );
}