'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { AlertCircle, RefreshCcw, Home } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="min-h-[100vh] flex items-center justify-center p-6 bg-slate-50">
      <div className="max-w-md w-full bg-white rounded-[2.5rem] border border-slate-200 p-8 md:p-12 shadow-2xl shadow-slate-200/50 text-center">
        
     
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-50 mb-8 relative">
          <AlertCircle className="text-red-500 w-10 h-10" />
          <span className="absolute inset-0 rounded-full bg-red-400 animate-ping opacity-20"></span>
        </div>

     
        <div className="space-y-3 mb-10">
          <h2 className="text-3xl font-black text-slate-950 tracking-tight">
            Oops! Connection Lost
          </h2>
          <p className="text-slate-600 font-medium leading-relaxed">
            We couldn't retrieve the Pokémon data from the laboratory. 
            This might be a temporary network hiccup.
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <button
            onClick={() => reset()}
            className="group flex items-center justify-center gap-2 w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 active:scale-[0.98] transition-all shadow-lg shadow-indigo-200"
          >
            <RefreshCcw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
            Try Reconnecting
          </button>

          <Link
            href="/"
            className="flex items-center justify-center gap-2 w-full py-4 bg-white border border-slate-200 text-slate-700 rounded-2xl font-bold hover:bg-slate-50 hover:border-slate-300 transition-all"
          >
            <Home className="w-5 h-5" />
            Back to Explorer
          </Link>
        </div>
        {error.digest && (
          <p className="mt-8 text-[10px] font-mono text-slate-400 uppercase tracking-widest">
            Error ID: {error.digest}
          </p>
        )}
      </div>
    </main>
  );
}


// npx @cloudflare/next-on-pages
// export const runtime = 'edge';