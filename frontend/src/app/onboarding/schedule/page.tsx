'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { api } from '@/providers/AuthProvider';
import { Button } from '@/components/ui/Button';

export default function ScheduleStep() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleComplete = async () => {
    setIsLoading(true);
    try {
      await api.post('/onboarding/complete-scheduling');
      router.push('/dashboard');
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-xl border border-border shadow-sm text-center">
        <div className="text-left mb-4">
          <Link href="/" className="inline-flex items-center text-sm text-muted hover:text-gray-900">
            <ArrowLeft className="w-4 h-4 mr-1" /> Volver al inicio
          </Link>
        </div>
        <h2 className="text-2xl font-bold mb-4">Agenda tu Sesión Inicial</h2>
        <p className="text-muted mb-8">
          ¡Pago confirmado! Ahora, por favor agenda tu sesión de diagnóstico online con el Coach Adlai Pulido.
        </p>

        <a
          href="https://cal.com/example"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block w-full bg-gray-900 text-white py-3 rounded-md font-medium mb-6 hover:bg-gray-800 transition-colors"
        >
          Ir a Cal.com / Google Calendar
        </a>

        <div className="border-t border-border pt-6">
          <p className="text-sm text-muted mb-4">¿Ya has agendado tu cita?</p>
          <Button className="w-full" onClick={handleComplete} disabled={isLoading}>
            {isLoading ? 'Verificando...' : 'He agendado mi sesión'}
          </Button>
        </div>
      </div>
    </div>
  );
}
