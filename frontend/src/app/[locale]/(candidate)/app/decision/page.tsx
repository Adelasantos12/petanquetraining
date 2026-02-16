'use client';

import { useEffect, useState } from 'react';
import { api } from '@/providers/AuthProvider';
import { Button } from '@/components/ui/Button';
import { useRouter } from '@/navigation';

export default function DecisionPage() {
  const [decision, setDecision] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchDecision = async () => {
        try {
            const { data } = await api.get('/admission/me');
            setDecision(data);
        } catch (err) {
            console.error(err);
        }
    };
    fetchDecision();
  }, []);

  if (!decision) return <div className="p-24 text-center">Cargando decisión...</div>;

  return (
    <div className="max-w-2xl mx-auto py-24 px-6 text-center">
      <h1 className="text-3xl font-bold mb-8">Resultado de Admisión</h1>

      {decision.decision === 'accepted' ? (
          <div className="bg-green-50 p-8 rounded-xl border border-green-200">
              <h2 className="text-2xl font-bold text-green-700 mb-4">¡Felicidades! Has sido aceptado.</h2>
              <p className="text-green-600 mb-8">Estamos emocionados de tenerte en el programa intensivo CIEP MERCI.</p>
              <Button onClick={() => router.push('/onboarding/payment')} className="bg-green-600 hover:bg-green-700">
                  Proceder al Pago de Inscripción
              </Button>
          </div>
      ) : decision.decision === 'waitlisted' ? (
          <div className="bg-yellow-50 p-8 rounded-xl border border-yellow-200 text-yellow-700">
              <h2 className="text-2xl font-bold mb-4">Lista de Espera</h2>
              <p>Actualmente no tenemos cupos disponibles, pero te notificaremos en cuanto se libere uno.</p>
          </div>
      ) : (
          <div className="bg-red-50 p-8 rounded-xl border border-red-200 text-red-700">
              <h2 className="text-2xl font-bold mb-4">No Elegible</h2>
              <p>Gracias por tu interés. En este momento tu perfil no cumple con los requisitos del programa intensivo.</p>
          </div>
      )}
    </div>
  );
}
