'use client';

import { useAuth } from '@/providers/AuthProvider';
import { Link } from '@/navigation';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/Button';
import { Target, BarChart2, ShieldCheck, Zap } from 'lucide-react';

export default function LocaleHomePage() {
  const t = useTranslations('landing');
  const { user, isLoading } = useAuth();

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Hero Section */}
      <header className="px-8 py-20 md:py-32 flex flex-col items-center text-center max-w-4xl mx-auto">
        <div className="inline-flex items-center px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-bold tracking-widest uppercase mb-6">
          <Target className="w-3 h-3 mr-2" /> CIEP-N2 Authorized Program
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold text-black mb-6 tracking-tight">
          {t('title')}
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 mb-10 leading-relaxed">
          {t('subtitle')}. {t('description')}
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          {isLoading ? (
             <div className="h-12 w-32 bg-gray-100 animate-pulse rounded-md" />
          ) : user ? (
            <Link href={user.role === 'coach' ? '/coach' : '/dashboard'}>
              <Button size="lg" className="px-8 h-12 text-base">
                Go to Dashboard
              </Button>
            </Link>
          ) : (
            <>
              <Link href="/register">
                <Button size="lg" className="px-8 h-12 text-base">
                  {t('register')}
                </Button>
              </Link>
              <Link href="/login">
                <Button size="lg" variant="outline" className="px-8 h-12 text-base">
                  {t('login')}
                </Button>
              </Link>
            </>
          )}
        </div>
      </header>

      {/* Features Grid */}
      <section className="bg-gray-50 py-24 px-8 border-y border-gray-100">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="space-y-4">
            <div className="w-12 h-12 bg-accent/10 flex items-center justify-center rounded-xl text-accent">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold">Método MERCI</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Basado en el sistema CIEP: Motricity, Emotions, Relationships, Five Senses e Intelligence. Un enfoque holístico único.
            </p>
          </div>
          <div className="space-y-4">
            <div className="w-12 h-12 bg-accent/10 flex items-center justify-center rounded-xl text-accent">
              <BarChart2 className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold">Seguimiento de Datos</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Visualiza tu progresión con gráficos de radar y estadísticas de efectividad por distancia (6m y 7m).
            </p>
          </div>
          <div className="space-y-4">
            <div className="w-12 h-12 bg-accent/10 flex items-center justify-center rounded-xl text-accent">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold">Gating Estricto</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Un programa estructurado donde desbloqueas nuevos desafíos solo cuando estás listo. Calidad antes que cantidad.
            </p>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-24 px-8 text-center max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-4 italic text-gray-400">"La precisión es una ciencia; la consistencia es un arte."</h2>
        <p className="text-sm font-bold uppercase tracking-widest text-accent">Adlai Pulido, CIEP-N2 Coach</p>
      </section>
    </div>
  );
}
