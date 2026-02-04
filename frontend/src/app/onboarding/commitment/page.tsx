'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/providers/AuthProvider';
import { Button } from '@/components/ui/Button';

export default function CommitmentStep() {
  const router = useRouter();
  const [signed, setSigned] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSign = async () => {
    if (!signed) return;
    setIsLoading(true);
    try {
      await api.post('/onboarding/commitment', {
        signedAt: new Date().toISOString(),
        userAgent: navigator.userAgent,
      });
      router.push('/onboarding/payment');
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto bg-white p-12 rounded-xl border border-border shadow-sm">
        <h2 className="text-3xl font-bold mb-8 text-center">Carta de Compromiso</h2>

        <div className="prose prose-sm max-w-none mb-8 p-6 bg-gray-50 rounded-lg border border-border overflow-y-auto max-h-96">
          <h3 className="text-center font-bold">PROGRAMA INTENSIVO CIEP - MÉTODO MERCI</h3>
          <p>Yo, el deportista, me comprometo a:</p>
          <ol>
            <li>Completar todos los ejercicios asignados en los plazos previstos.</li>
            <li>Registrar con honestidad los resultados de cada sesión.</li>
            <li>Mantener una actitud profesional y respetuosa con el Coach y mis compañeros.</li>
            <li>Realizar los pagos mensuales a tiempo para mantener el acceso al programa.</li>
            <li>Aceptar que el progreso depende de mi propia disciplina y esfuerzo.</li>
          </ol>
          <p className="mt-8">Este compromiso es vital para el éxito del entrenamiento intensivo.</p>
        </div>

        <div className="flex flex-col items-center space-y-6">
          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={signed}
              onChange={(e) => setSigned(e.target.checked)}
              className="w-5 h-5 accent-accent"
            />
            <span className="text-sm font-medium">He leído y acepto los términos de la Carta Compromiso</span>
          </label>

          <Button
            className="w-full max-w-sm"
            disabled={!signed || isLoading}
            onClick={handleSign}
          >
            {isLoading ? 'Firmando...' : 'Firmar Digitalmente'}
          </Button>
        </div>
      </div>
    </div>
  );
}
