'use client';

import { useEffect } from 'react';
import { useRouter } from '@/navigation';
import { useAuth } from '@/providers/AuthProvider';

export default function LocaleHomePage() {
  const router = useRouter();
  const { user, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading) {
      if (user) {
        if (user.role === 'coach') {
            router.push('/coach');
        } else {
            router.push('/dashboard');
        }
      } else {
        router.push('/login');
      }
    }
  }, [user, isLoading, router]);

  return <div>Redirecting...</div>;
}
