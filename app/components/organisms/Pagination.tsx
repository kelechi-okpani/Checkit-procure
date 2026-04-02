'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';

interface PaginationProps {
  totalCount: number;
  pageSize: number;
}

export default function Pagination({ totalCount, pageSize }: PaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const currentPage = Number(searchParams.get('page')) || 1;
  const totalPages = Math.ceil(totalCount / pageSize);

  const updatePage = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', newPage.toString());
    router.push(`/?${params.toString()}`, { scroll: false });
  };

  if (totalPages <= 1) return null;

  // Logic to generate page numbers to show
  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 4) {
        pages.push(1, 2, 3, 4, 5, '...', totalPages);
      } else if (currentPage >= totalPages - 3) {
        pages.push(1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }
    return pages;
  };

  return (
    <nav className="flex flex-col items-center gap-4 mt-16 pt-10 border-t border-slate-200" aria-label="Pagination">
      <div className="flex items-center gap-1 md:gap-2">
        {/* Previous Button */}
        <button
          onClick={() => updatePage(currentPage - 1)}
          disabled={currentPage <= 1}
          className="flex items-center justify-center w-10 h-10 rounded-xl border border-slate-200 text-slate-700 hover:bg-white hover:border-indigo-500 hover:text-indigo-600 disabled:opacity-30 disabled:hover:border-slate-200 disabled:hover:text-slate-700 transition-all duration-200 shadow-sm"
          aria-label="Previous Page"
        >
          <ChevronLeft size={18} strokeWidth={2.5} />
        </button>

        {/* Page Numbers */}
        <div className="hidden md:flex items-center gap-1">
          {getPageNumbers().map((page, idx) => (
            <div key={idx}>
              {page === '...' ? (
                <span className="flex items-center justify-center w-10 h-10 text-slate-400">
                  <MoreHorizontal size={16} />
                </span>
              ) : (
                <button
                  onClick={() => updatePage(page as number)}
                  className={`w-10 h-10 rounded-xl text-sm font-bold transition-all duration-200 border ${
                    currentPage === page
                      ? 'bg-indigo-600 border-indigo-600 text-white shadow-md shadow-indigo-200 translate-y-[-2px]'
                      : 'bg-white border-slate-200 text-slate-700 hover:border-indigo-500 hover:text-indigo-600 shadow-sm'
                  }`}
                >
                  {page}
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Mobile Simplified View */}
        <div className="flex md:hidden items-center px-4">
          <span className="text-sm font-bold text-slate-900">
            Page {currentPage} <span className="text-slate-400 font-medium px-1">of</span> {totalPages}
          </span>
        </div>

  
        <button
          onClick={() => updatePage(currentPage + 1)}
          disabled={currentPage >= totalPages}
          className="flex items-center justify-center w-10 h-10 rounded-xl border border-slate-200 text-slate-700 hover:bg-white hover:border-indigo-500 hover:text-indigo-600 disabled:opacity-30 disabled:hover:border-slate-200 disabled:hover:text-slate-700 transition-all duration-200 shadow-sm"
          aria-label="Next Page"
        >
          <ChevronRight size={18} strokeWidth={2.5} />
        </button>
      </div>

      <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest">
        Showing {(currentPage - 1) * pageSize + 1} to {Math.min(currentPage * pageSize, totalCount)} of {totalCount} Pokemon
      </p>
    </nav>
  );
}