import {useTranslations} from 'next-intl';

export default function NotFound() {
  const t = useTranslations('NotFound');
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold">404</h1>
      <p>{t('title') || 'Page not found'}</p>
    </div>
  );
}
