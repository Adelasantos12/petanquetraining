'use client';

import { useEffect, useState } from 'react';
import { api, useAuth } from '@/providers/AuthProvider';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/navigation';

export default function StatusPage() {
  const t = useTranslations('status');
  const tc = useTranslations('common');
  const { user } = useAuth();
  const router = useRouter();
  const [status, setStatus] = useState<string>('lead');

  useEffect(() => {
    const fetchStatus = async () => {
        try {
            const { data } = await api.get('/onboarding/status');
            setStatus(data.status);
        } catch (err) {
            console.error(err);
        }
    };
    fetchStatus();
  }, []);

  const steps = [
    'applicant_submitted',
    'interview_scheduled',
    'diagnostic_unlocked',
    'accepted',
    'active_member'
  ];

  return (
    <div className="max-w-2xl mx-auto py-24 px-6">
      <h1 className="text-3xl font-bold mb-12 text-center">{tc('status')}</h1>

      <div className="space-y-8">
        {steps.map((s, idx) => {
            const isActive = steps.indexOf(status) >= idx || status === 'active_member';
            return (
                <div key={s} className="flex items-center space-x-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                        isActive ? 'bg-accent text-white' : 'bg-gray-100 text-gray-400'
                    }`}>
                        {idx + 1}
                    </div>
                    <div className="flex-grow">
                        <p className={`font-medium ${isActive ? 'text-gray-900' : 'text-gray-400'}`}>
                            {t(s)}
                        </p>
                    </div>
                </div>
            );
        })}
      </div>

      <div className="mt-12 p-8 bg-gray-50 rounded-xl border border-border text-center">
          <p className="text-muted mb-6">Tu estado actual: <span className="font-bold text-accent">{t(status)}</span></p>
          {status === 'lead' && (
              <button onClick={() => router.push('/application')} className="bg-accent text-white px-6 py-2 rounded-lg">
                  Comenzar Aplicación
              </button>
          )}
          {status === 'accepted' && (
              <button onClick={() => router.push('/onboarding/payment')} className="bg-accent text-white px-6 py-2 rounded-lg">
                  Proceder al Pago
              </button>
          )}
      </div>
    </div>
  );
}
