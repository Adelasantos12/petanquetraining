'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/navigation';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleLanguageChange = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <div className="flex space-x-2 text-xs font-medium uppercase">
      {['es', 'en', 'fr'].map((l) => (
        <button
          key={l}
          onClick={() => handleLanguageChange(l)}
          className={`px-2 py-1 rounded transition-colors ${
            locale === l
              ? 'bg-accent text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          {l}
        </button>
      ))}
    </div>
  );
}
