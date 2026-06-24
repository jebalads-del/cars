'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AR_TRANSLATIONS } from '@/lib/types';

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">⚡</span>
            </div>
            <span className="hidden sm:inline font-bold text-xl text-foreground">سويفت موتورز</span>
          </Link>

          <nav className="flex items-center gap-8">
            <Link
              href="/"
              className={`transition-colors ${
                pathname === '/'
                  ? 'text-primary font-semibold'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {AR_TRANSLATIONS.home}
            </Link>
            <Link
              href="/cars"
              className={`transition-colors ${
                pathname === '/cars'
                  ? 'text-primary font-semibold'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {AR_TRANSLATIONS.cars}
            </Link>
            <Link
              href="/admin"
              className={`transition-colors px-4 py-2 rounded-lg ${
                pathname === '/admin'
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
              }`}
            >
              {AR_TRANSLATIONS.admin}
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
