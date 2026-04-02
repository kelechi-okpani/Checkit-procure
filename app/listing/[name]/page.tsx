import { getPokemonByName } from '@/lib/api';
import { Metadata } from 'next';
import Image from 'next/image';
import Breadcrumbs from '@/components/organisms/Breadcrumbs';
import { notFound } from 'next/navigation';

interface Props {
  params: Promise<{ name: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { name } = await params;
  const pokemon = await getPokemonByName(name);
  
  if (!pokemon) return { title: 'Pokémon Not Found' };

  return {
    title: `${name.charAt(0).toUpperCase() + name.slice(1)} | PokéExplorer`,
    description: `View stats, weight, and types for ${name}.`,
    openGraph: {
      images: [pokemon.sprites.other['official-artwork'].front_default],
    },
  };
}

export default async function PokemonDetailPage({ params }: Props) {
  const { name } = await params;
  const pokemon = await getPokemonByName(name);

  if (!pokemon) notFound();

  return (
    <div className="min-h-screen bg-slate-50 py-8 md:py-16 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <Breadcrumbs items={[
            { label: 'Explorer', href: '/' }, 
            { label: name }
          ]} />
        </div>
        
        <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-2xl shadow-indigo-100/50 overflow-hidden grid md:grid-cols-2">
          
          {/* Visual Section */}
          <div className="relative bg-gradient-to-br from-indigo-50 to-white p-8 md:p-16 flex items-center justify-center border-b md:border-b-0 md:border-r border-slate-100">
            <div className="absolute top-8 left-8">
               <span className="text-6xl font-black text-slate-200/50 select-none">
                 #{pokemon.id.toString().padStart(3, '0')}
               </span>
            </div>
            
            <Image
              src={pokemon.sprites.other['official-artwork'].front_default}
              alt={name}
              width={450}
              height={450}
              priority 
              className="relative z-10 drop-shadow-[0_20px_50px_rgba(79,70,229,0.2)] hover:scale-105 transition-transform duration-700 ease-out"
            />
          </div>
          
          <div className="p-8 md:p-14 flex flex-col justify-center bg-white">
            <div className="mb-2">
               <span className="inline-block px-3 py-1 rounded-md bg-indigo-600 text-white text-[10px] font-bold uppercase tracking-[0.2em]">
                 Pokémon Details
               </span>
            </div>

            <h1 className="text-5xl md:text-6xl font-black capitalize text-slate-950 tracking-tight mb-6">
              {pokemon.name}
            </h1>
            
            <div className="flex flex-wrap gap-3 mb-10">
              {pokemon.types.map((t: any) => (
                <span 
                  key={t.type.name} 
                  className="px-5 py-2 rounded-xl bg-slate-100 border border-slate-200 text-slate-800 text-sm font-bold uppercase tracking-wider shadow-sm"
                >
                  {t.type.name}
                </span>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-6 border-t border-slate-100 pt-10">
              <div className="group">
                <p className="text-xs font-black text-indigo-600 uppercase tracking-[0.15em] mb-2 group-hover:translate-x-1 transition-transform">
                  Height
                </p>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-slate-950">{pokemon.height / 10}</span>
                  <span className="text-slate-500 font-medium">meters</span>
                </div>
              </div>

              <div className="group">
                <p className="text-xs font-black text-indigo-600 uppercase tracking-[0.15em] mb-2 group-hover:translate-x-1 transition-transform">
                  Weight
                </p>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-slate-950">{pokemon.weight / 10}</span>
                  <span className="text-slate-500 font-medium">kg</span>
                </div>
              </div>
            </div>

            <div className="mt-12 p-6 rounded-2xl bg-indigo-50/50 border border-indigo-100">
               <p className="text-sm text-indigo-900 font-medium leading-relaxed">
                 This Pokémon is part of the original PokéExplorer database. Use the breadcrumbs above to return to the global search.
               </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}