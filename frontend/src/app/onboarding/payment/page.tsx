'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/providers/AuthProvider';
import { Button } from '@/components/ui/Button';

export default function PaymentStep() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleStripe = async () => {
    setIsLoading(true);
    try {
      // In a real app, this would redirect to Stripe Checkout
      const { data } = await api.post('/payments/stripe/create-session');
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (err) {
      console.error('Stripe error', err);
      // For development purposes, if Stripe fails (e.g. no keys), allow manual simulation
      alert('Error al conectar con Stripe. En producción, aquí irías a la pasarela.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-xl border border-border shadow-sm text-center">
        <h2 className="text-2xl font-bold mb-4">Inscripción al Programa</h2>
        <p className="text-muted mb-8">
          El acceso al diagnóstico MERCI y a los bloques de entrenamiento requiere el pago de la inscripción inicial (50.00 CHF).
        </p>

        <div className="space-y-4">
          <Button className="w-full" onClick={handleStripe} disabled={isLoading}>
            Pagar con Tarjeta / TWINT (Stripe)
          </Button>

          <Button variant="outline" className="w-full" disabled>
            Pagar con PayPal (Próximamente)
          </Button>

          {/* Debug Button */}
          <button
            onClick={async () => {
              // Internal debug to skip payment in dev
              await api.post('/onboarding/complete-scheduling'); // Actually simulate next step
              router.push('/onboarding/scheduling');
            }}
            className="text-xs text-gray-300 mt-8 hover:text-gray-600"
          >
            [DEBUG] Saltar pago
          </button>
        </div>
      </div>
    </div>
  );
}
