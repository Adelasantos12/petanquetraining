'use client';

import { useState } from 'react';
import { useRouter } from '@/navigation';
import { api } from '@/providers/AuthProvider';
import { Button } from '@/components/ui/Button';

const DOMAINS = [
  { id: 'motricity', label: 'Motricity (Motricidad)' },
  { id: 'emotions', label: 'Emotions (Emociones)' },
  { id: 'relationships', label: 'Relationships (Relaciones)' },
  { id: 'fiveSenses', label: 'Five Senses (Cinco Sentidos)' },
  { id: 'intelligence', label: 'Intelligence (Inteligencia)' },
];

export default function MerciQuestionnaire() {
  const router = useRouter();
  const [scores, setScores] = useState<Record<string, number>>({
    motricity: 15,
    emotions: 15,
    relationships: 15,
    fiveSenses: 15,
    intelligence: 15,
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      await api.post('/merci', scores);
      alert('Diagnóstico enviado. Espera la aprobación del coach.');
      router.push('/dashboard');
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <h2 className="text-3xl font-bold mb-8">Cuestionario MERCI</h2>
      <p className="text-muted mb-8">
        Evalúa cada dominio del 1 al 30 según tu autopercepción inicial (en una versión completa, responderías 6 preguntas por dominio).
      </p>

      <div className="space-y-8 bg-white p-8 rounded-xl border border-border">
        {DOMAINS.map((domain) => (
          <div key={domain.id} className="space-y-4">
            <div className="flex justify-between">
              <label className="font-medium">{domain.label}</label>
              <span className="font-bold text-accent">{scores[domain.id]}</span>
            </div>
            <input
              type="range"
              min="1"
              max="30"
              value={scores[domain.id]}
              onChange={(e) => setScores({ ...scores, [domain.id]: parseInt(e.target.value) })}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-accent"
            />
          </div>
        ))}

        <Button className="w-full mt-8" onClick={handleSubmit} disabled={isLoading}>
          {isLoading ? 'Enviando...' : 'Enviar Diagnóstico'}
        </Button>
      </div>
    </div>
  );
}
