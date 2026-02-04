'use client';

import { useEffect, useState } from 'react';
import { api, useAuth } from '@/providers/AuthProvider';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function CoachDashboard() {
  const { logout } = useAuth();
  const router = useRouter();
  const [players, setPlayers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const { data } = await api.get('/coach/players');
        setPlayers(data);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPlayers();
  }, []);

  if (isLoading) return <div className="p-8">Cargando lista de jugadores...</div>;

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      <nav className="bg-white border-b border-border px-8 py-4 flex justify-between items-center mb-8">
        <h1 className="text-xl font-bold">CIEP Coach Panel</h1>
        <Button variant="ghost" size="sm" onClick={() => { logout(); router.push('/login'); }}>Cerrar Sesión</Button>
      </nav>

      <div className="max-w-7xl mx-auto px-8">
        <h2 className="text-2xl font-bold mb-6">Jugadores</h2>

        <div className="bg-white rounded-xl border border-border shadow-sm overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 border-b border-border">
                <th className="px-6 py-4 font-bold text-sm">Email</th>
                <th className="px-6 py-4 font-bold text-sm">Estado Onboarding</th>
                <th className="px-6 py-4 font-bold text-sm">Años Exp.</th>
                <th className="px-6 py-4 font-bold text-sm">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {players.map((player) => (
                <tr key={player.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium">{player.email}</td>
                  <td className="px-6 py-4 text-sm capitalize">
                    <span className={`px-2 py-1 rounded-full text-[10px] font-bold ${
                      player.profile?.onboardingStep === 'completed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {player.profile?.onboardingStep}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">{player.profile?.yearsOfExperience || '-'}</td>
                  <td className="px-6 py-4 text-sm">
                    <Link href={`/coach/players/${player.id}`}>
                      <Button variant="outline" size="sm">Ver Detalles</Button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
