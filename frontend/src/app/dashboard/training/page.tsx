'use client';

import { useEffect, useState } from 'react';
import { api } from '@/providers/AuthProvider';
import TechnicalSheet from '@/components/TechnicalSheet';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

export default function TrainingPage() {
  const [activeBlock, setActiveBlock] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const fetchData = async () => {
    try {
      const { data } = await api.get('/training/active-block');
      setActiveBlock(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSave = async (exerciseId: string, distance: number, balls: number[]) => {
    setSaving(true);
    try {
      await api.post('/training/record-result', { exerciseId, distance, balls });
      await fetchData(); // Refresh data to see unlocking progress
    } catch (err: any) {
      alert(err.response?.data?.message || 'Error al guardar');
    } finally {
      setSaving(false);
    }
  };

  if (isLoading) return <div className="p-8">Cargando ejercicios...</div>;
  if (!activeBlock) return <div className="p-8">No hay bloques activos.</div>;

  // Find next required exercise/distance
  let nextToComplete: { exercise: any, distance: number } | null = null;
  for (const ex of activeBlock.block.exercises) {
    for (const dist of ex.distances) {
      const isDone = activeBlock.runs.some((r: any) => r.exerciseId === ex.id && r.distance === dist);
      if (!isDone) {
        nextToComplete = { exercise: ex, distance: dist };
        break;
      }
    }
    if (nextToComplete) break;
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      <div className="max-w-3xl mx-auto px-4 py-8">
        <Link href="/dashboard" className="flex items-center text-sm text-muted hover:text-accent mb-6">
          <ChevronLeft className="w-4 h-4 mr-1" /> Volver al Dashboard
        </Link>

        <h2 className="text-3xl font-bold mb-2">{activeBlock.block.name}</h2>
        <p className="text-muted mb-8">{activeBlock.block.description}</p>

        {nextToComplete ? (
          <div className="space-y-8">
            <div className="bg-accent/5 border border-accent/20 p-4 rounded-lg text-accent text-sm font-medium">
              Próxima tarea: {nextToComplete.exercise.name} a {nextToComplete.distance}m
            </div>

            <TechnicalSheet
              exerciseName={nextToComplete.exercise.name}
              distance={nextToComplete.distance}
              isLoading={saving}
              onSave={(balls) => handleSave(nextToComplete!.exercise.id, nextToComplete!.distance, balls)}
            />
          </div>
        ) : (
          <div className="bg-white p-12 text-center rounded-xl border border-border">
            <h3 className="text-2xl font-bold text-accent mb-2">¡Bloque Completado!</h3>
            <p className="text-muted">Has terminado todos los ejercicios de este bloque. El coach ha sido notificado.</p>
          </div>
        )}

        <div className="mt-12 space-y-4">
          <h3 className="font-bold text-lg">Progreso del Bloque</h3>
          {activeBlock.block.exercises.map((ex: any) => (
            <div key={ex.id} className="bg-white p-4 rounded-lg border border-border flex justify-between items-center">
              <div>
                <p className="font-medium">{ex.name}</p>
                <div className="flex space-x-2 mt-1">
                  {ex.distances.map((d: number) => {
                    const run = activeBlock.runs.find((r: any) => r.exerciseId === ex.id && r.distance === d);
                    return (
                      <span key={d} className={`text-[10px] px-1.5 py-0.5 rounded ${run ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-400'}`}>
                        {d}m {run ? `(${run.total}/6)` : ''}
                      </span>
                    );
                  })}
                </div>
              </div>
              {ex.distances.every((d: number) => activeBlock.runs.some((r: any) => r.exerciseId === ex.id && r.distance === d)) ? (
                <span className="text-green-500 text-xs font-bold">LISTO</span>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
