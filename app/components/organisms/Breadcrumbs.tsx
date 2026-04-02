import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

export default function Breadcrumbs({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav className="flex items-center space-x-2 text-sm text-slate-500 mb-6">
      <Link href="/" className="hover:text-indigo-600 transition-colors">
        <Home size={16} />
      </Link>
      {items.map((item, index) => (
        <div key={index} className="flex items-center space-x-2">
          <ChevronRight size={14} />
          {item.href ? (
            <Link href={item.href} className="hover:text-indigo-600 capitalize">
              {item.label}
            </Link>
          ) : (
            <span className="font-semibold text-slate-900 capitalize">{item.label}</span>
          )}
        </div>
      ))}
    </nav>
  );
}