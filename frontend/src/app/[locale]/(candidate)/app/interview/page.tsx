'use client';

import { useEffect, useState } from 'react';
import { api } from '@/providers/AuthProvider';
import { useTranslations } from 'next-intl';

export default function InterviewPage() {
  const t = useTranslations('status');
  const [interview, setInterview] = useState<any>(null);

  useEffect(() => {
    const fetchInterview = async () => {
        try {
            const { data } = await api.get('/interviews/me');
            setInterview(data);
        } catch (err) {
            console.error(err);
        }
    };
    fetchInterview();
  }, []);

  return (
    <div className="max-w-2xl mx-auto py-24 px-6 text-center">
      <h1 className="text-3xl font-bold mb-8">Tu Entrevista</h1>
      {interview ? (
          <div className="bg-white p-8 rounded-xl border border-border shadow-sm">
              <p className="text-lg font-medium mb-4">Fecha: {new Date(interview.scheduledAt).toLocaleString()}</p>
              <a href={interview.meetingUrl} target="_blank" className="text-accent underline">Unirse a la reunión</a>
              <div className="mt-8 pt-8 border-t border-border text-left">
                  <h3 className="font-bold mb-2">Instrucciones:</h3>
                  <ul className="list-disc list-inside text-sm text-muted">
                      <li>Conéctate 5 minutos antes.</li>
                      <li>Asegúrate de tener buena conexión.</li>
                      <li>Ten a la mano tus dudas sobre el programa.</li>
                  </ul>
              </div>
          </div>
      ) : (
          <p className="text-muted">Aún no tienes una entrevista agendada.</p>
      )}
    </div>
  );
}
