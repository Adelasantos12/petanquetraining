'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/providers/AuthProvider';

export default function OnboardingPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkStatus = async () => {
      try {
        const { data } = await api.get('/onboarding/status');
        const step = data.onboardingStep;

        if (step === 'completed') {
          router.push('/dashboard');
        } else {
          router.push(`/onboarding/${step}`);
        }
      } catch (err) {
        router.push('/login');
      }
    };

    checkStatus();
  }, [router]);

  return <div className="min-h-screen flex items-center justify-center">Cargando progreso...</div>;
}
