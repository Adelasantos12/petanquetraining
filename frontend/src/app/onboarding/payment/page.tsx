'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
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
        <div className="text-left mb-4">
          <Link href="/" className="inline-flex items-center text-sm text-muted hover:text-gray-900">
            <ArrowLeft className="w-4 h-4 mr-1" /> Volver al inicio
          </Link>
        </div>
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
          <Button
            variant="outline"
            className="w-full border-dashed border-accent text-accent hover:bg-accent-light"
            onClick={async () => {
              setIsLoading(true);
              try {
                await api.post('/onboarding/debug/skip-payment');
                router.push('/onboarding/schedule');
              } catch (err) {
                console.error(err);
                alert('Error al saltar pago. Asegúrate de que el backend esté corriendo.');
              } finally {
                setIsLoading(false);
              }
            }}
            disabled={isLoading}
          >
            Simular Pago (Test)
          </Button>
        </div>
      </div>
    </div>
  );
}
