import Image from 'next/image';
import Link from 'next/link';
import { getPokemonByName } from '@/lib/api';

interface PokemonCardProps {
  name: string;
  index: number; // Required for LCP optimization
}

export default async function PokemonCard({ name, index }: PokemonCardProps) {
  const pokemon = await getPokemonByName(name);
  
  if (!pokemon) return null;

  return (
    <Link 
      href={`/listing/${name}`} 
      className="group relative bg-white rounded-[2rem] border border-slate-200 p-5 hover:shadow-2xl hover:shadow-indigo-100 transition-all duration-300 hover:-translate-y-2 flex flex-col"
    >
      {/* Image Container with high-contrast background */}
      <div className="relative aspect-square bg-slate-50 rounded-[1.5rem] mb-5 overflow-hidden border border-slate-100">
        <Image
          src={pokemon.sprites.other['official-artwork'].front_default}
          alt={name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          // F-1 Optimization: Prioritize the first row (index 0-3) to fix LCP warning
          priority={index < 4} 
          className="object-contain p-6 group-hover:scale-110 transition-transform duration-500 ease-out"
        />
      </div>

      {/* Pokemon ID - Subtle but visible */}
      <span className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.2em] mb-1">
        #{pokemon.id.toString().padStart(3, '0')}
      </span>

      {/* Name with high visibility text color */}
      <h3 className="text-xl font-bold capitalize text-slate-950 group-hover:text-indigo-600 transition-colors">
        {name}
      </h3>

      {/* Type Tags */}
      <div className="flex flex-wrap gap-2 mt-3">
        {pokemon.types.map((t) => (
          <span 
            key={t.type.name} 
            className="text-[10px] uppercase tracking-tighter font-black px-2.5 py-1 bg-slate-100 text-slate-700 border border-slate-200 rounded-lg group-hover:bg-indigo-50 group-hover:border-indigo-100 group-hover:text-indigo-700 transition-colors"
          >
            {t.type.name}
          </span>
        ))}
      </div>
    </Link>
  );
}