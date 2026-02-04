'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { api } from '@/providers/AuthProvider';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

export default function ProfileStep() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    yearsOfExperience: '',
    tournamentsPlayedPerYear: '',
    tournamentsTargetPerYear: '',
    strengths: '',
    weaknesses: '',
    goalShortTerm: '',
    goalMediumTerm: '',
    goalLongTerm: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await api.post('/onboarding/profile', {
          ...formData,
          yearsOfExperience: parseInt(formData.yearsOfExperience),
          tournamentsPlayedPerYear: parseInt(formData.tournamentsPlayedPerYear),
          tournamentsTargetPerYear: parseInt(formData.tournamentsTargetPerYear),
      });
      router.push('/onboarding/commitment');
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl border border-border shadow-sm">
        <Link href="/" className="inline-flex items-center text-sm text-muted hover:text-gray-900 mb-4">
          <ArrowLeft className="w-4 h-4 mr-1" /> Volver al inicio
        </Link>
        <h2 className="text-2xl font-bold mb-6">Paso 1: Perfil del Jugador</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Años de experiencia"
            type="number"
            value={formData.yearsOfExperience}
            onChange={(e) => setFormData({ ...formData, yearsOfExperience: e.target.value })}
            required
          />
          <Input
            label="Torneos jugados por año"
            type="number"
            value={formData.tournamentsPlayedPerYear}
            onChange={(e) => setFormData({ ...formData, tournamentsPlayedPerYear: e.target.value })}
            required
          />
          <Input
            label="Torneos objetivo por año"
            type="number"
            value={formData.tournamentsTargetPerYear}
            onChange={(e) => setFormData({ ...formData, tournamentsTargetPerYear: e.target.value })}
            required
          />
          <div className="md:col-span-2 space-y-4">
            <Input
              label="Fortalezas"
              value={formData.strengths}
              onChange={(e) => setFormData({ ...formData, strengths: e.target.value })}
              required
            />
            <Input
              label="Debilidades"
              value={formData.weaknesses}
              onChange={(e) => setFormData({ ...formData, weaknesses: e.target.value })}
              required
            />
            <Input
              label="Meta Corto Plazo"
              value={formData.goalShortTerm}
              onChange={(e) => setFormData({ ...formData, goalShortTerm: e.target.value })}
              required
            />
            <Input
              label="Meta Mediano Plazo"
              value={formData.goalMediumTerm}
              onChange={(e) => setFormData({ ...formData, goalMediumTerm: e.target.value })}
              required
            />
            <Input
              label="Meta Largo Plazo"
              value={formData.goalLongTerm}
              onChange={(e) => setFormData({ ...formData, goalLongTerm: e.target.value })}
              required
            />
          </div>
          <Button type="submit" className="md:col-span-2" disabled={isLoading}>
            {isLoading ? 'Guardando...' : 'Siguiente: Carta Compromiso'}
          </Button>
        </form>
      </div>
    </div>
  );
}
