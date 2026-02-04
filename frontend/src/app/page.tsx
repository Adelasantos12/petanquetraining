'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/providers/AuthProvider';
import Image from "next/image";
import { Button } from '@/components/ui/Button';

export default function Home() {
  const router = useRouter();
  const { user, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && user) {
      if (user.role === 'coach') {
        router.push('/coach');
      } else {
        router.push('/dashboard');
      }
    }
  }, [user, isLoading, router]);

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-8 text-center">
      <main className="max-w-3xl space-y-8">
        <h1 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl">
          CIEP <span className="text-accent">MERCI</span>
        </h1>
        <p className="text-xl text-gray-600 leading-8">
          Programa intensivo de seguimiento de petanca basado en el método MERCI.
          Optimiza tu rendimiento con diagnósticos precisos y bloques de entrenamiento secuenciales.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" onClick={() => router.push('/login')}>
            Iniciar Sesión
          </Button>
          <Button size="lg" variant="outline" onClick={() => router.push('/register')}>
            Registrarse
          </Button>
        </div>

        <div className="pt-12 grid grid-cols-1 sm:grid-cols-3 gap-8 text-left border-t border-border">
          <div>
            <h3 className="font-bold text-accent mb-2">Diagnóstico</h3>
            <p className="text-sm text-muted">Evaluación de 5 dominios clave del deportista.</p>
          </div>
          <div>
            <h3 className="font-bold text-accent mb-2">Entrenamiento</h3>
            <p className="text-sm text-muted">Ejercicios técnicos con desbloqueo secuencial.</p>
          </div>
          <div>
            <h3 className="font-bold text-accent mb-2">Seguimiento</h3>
            <p className="text-sm text-muted">Gráficas de evolución y feedback directo del Coach.</p>
          </div>
        </div>
      </main>
    </div>
  );
}
