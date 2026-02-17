'use client';

import { Link, useRouter, usePathname } from '@/navigation';
import { useAuth } from '@/providers/AuthProvider';
import { Button } from './ui/Button';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function Header() {
  const t = useTranslations('common');
  const { user, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const locales = [
    { code: 'es', label: 'ES' },
    { code: 'en', label: 'EN' },
    { code: 'fr', label: 'FR' },
  ];

  const currentLocale = pathname.split('/')[1] || 'es';

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/80 backdrop-blur-md border-b border-gray-100 py-3' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-8 flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2 group">
          <div className="relative w-8 h-8 overflow-hidden rounded-md transition-transform group-hover:scale-110">
            <Image
              src="/logo.jpg"
              alt="perform."
              fill
              className="object-cover"
            />
          </div>
          <span className="text-xl font-bold text-graphite tracking-tighter">perform.</span>
        </Link>

        <nav className="flex items-center space-x-8">
          <div className="hidden md:flex items-center space-x-6">
            {locales.map((loc) => (
              <button
                key={loc.code}
                onClick={() => router.replace(pathname, { locale: loc.code as any })}
                className={`text-[10px] font-bold tracking-widest transition-colors ${currentLocale === loc.code ? 'text-accent-orange' : 'text-gray-secondary hover:text-graphite'}`}
              >
                {loc.label}
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Link href={user.role === 'coach' ? '/coach' : '/dashboard'} className="text-xs font-bold uppercase tracking-widest text-graphite hover:text-accent-orange transition-colors">
                  Dashboard
                </Link>
                <Button variant="ghost" size="sm" onClick={() => { logout(); router.push('/login'); }} className="text-[10px] uppercase font-bold tracking-widest">
                  {t('logout')}
                </Button>
              </>
            ) : (
              <>
                <Link href="/login" className="text-xs font-bold uppercase tracking-widest text-graphite hover:text-accent-orange transition-colors">
                  Sign in
                </Link>
                <Link href="/apply">
                  <Button size="sm" className="px-6">Apply</Button>
                </Link>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
