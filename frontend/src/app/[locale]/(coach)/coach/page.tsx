'use client';

import { useEffect, useState } from 'react';
import { api } from '@/providers/AuthProvider';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useTranslations } from 'next-intl';

export default function CoachDashboard() {
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

  if (isLoading) return <div className="p-8">Cargando panel de coach...</div>;

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Coach Control Center</h1>
        <p className="text-muted">Gestión de jugadores y programa intensivo</p>
      </header>

      <div className="grid grid-cols-1 gap-6">
        <Card className="overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-border text-xs uppercase text-muted font-medium">
              <tr>
                <th className="px-6 py-4">Jugador</th>
                <th className="px-6 py-4">Estado</th>
                <th className="px-6 py-4">Último Diagnóstico</th>
                <th className="px-6 py-4">Progreso Bloque</th>
                <th className="px-6 py-4">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {players.map((player) => (
                <tr key={player.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-medium">{player.email}</div>
                    <div className="text-xs text-muted">ID: {player.id.substring(0,8)}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${
                      player.status === 'ACTIVE_MEMBER' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {player.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    {player.merciAssessments?.[0] ? (
                      <span className="text-accent font-medium">Completado</span>
                    ) : (
                      <span className="text-muted italic">Pendiente</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-accent h-full w-1/3"></div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <Button variant="outline" size="sm">Ver Perfil</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>
    </div>
  );
}
