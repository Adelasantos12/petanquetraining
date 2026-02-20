'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { api } from '@/providers/AuthProvider';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ChevronLeft, User, Activity, CreditCard, ClipboardCheck } from 'lucide-react';
import { Link } from '@/navigation';

export default function PlayerDetailPage() {
  const { id } = useParams();
  const [player, setPlayer] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPlayer = async () => {
      try {
        const { data } = await api.get(`/coach/players/${id}`);
        setPlayer(data);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPlayer();
  }, [id]);

  if (isLoading) return <div className="p-8">Cargando perfil del jugador...</div>;
  if (!player) return <div className="p-8">Jugador no encontrado.</div>;

  return (
    <div className="p-8 max-w-7xl mx-auto pb-24">
      <Link href="/coach" className="flex items-center text-sm text-muted hover:text-accent mb-6">
        <ChevronLeft className="w-4 h-4 mr-1" /> Volver al Panel
      </Link>

      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-4xl font-bold">{player.email}</h1>
          <p className="text-muted">Estado: <span className="text-accent font-bold">{player.status}</span></p>
        </div>
        <div className="space-x-4">
          <Button variant="outline">Suspender</Button>
          <Button>Asignar Nuevo Bloque</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card className="p-6">
          <div className="flex items-center mb-4 text-accent">
            <User className="w-5 h-5 mr-2" />
            <h3 className="font-bold">Perfil del Jugador</h3>
          </div>
          <div className="space-y-4 text-sm">
            <div>
              <p className="text-muted text-xs uppercase">Años de experiencia</p>
              <p className="font-medium">{player.profile?.experienceYears || 'N/A'}</p>
            </div>
            <div>
              <p className="text-muted text-xs uppercase">Fortalezas</p>
              <p className="font-medium">{player.profile?.strengths || 'No registradas'}</p>
            </div>
            <div>
              <p className="text-muted text-xs uppercase">Debilidades</p>
              <p className="font-medium">{player.profile?.weaknesses || 'No registradas'}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center mb-4 text-accent">
            <Activity className="w-5 h-5 mr-2" />
            <h3 className="font-bold">Diagnóstico MERCI</h3>
          </div>
          {player.merciAssessments?.[0] ? (
            <div className="space-y-2">
                <div className="flex justify-between text-sm">
                    <span>Puntaje Total</span>
                    <span className="font-bold">{player.merciAssessments[0].totalScore}</span>
                </div>
                <Button className="w-full mt-4" variant="outline" size="sm">Ver Radar Chart</Button>
            </div>
          ) : (
            <p className="text-muted text-sm italic">Sin diagnóstico completado.</p>
          )}
        </Card>

        <Card className="p-6">
          <div className="flex items-center mb-4 text-accent">
            <CreditCard className="w-5 h-5 mr-2" />
            <h3 className="font-bold">Estado de Pagos</h3>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
                <span>Inscripción</span>
                <span className="text-green-500 font-bold">PAGADO</span>
            </div>
            <div className="flex justify-between text-sm">
                <span>Mensualidad</span>
                <span className="text-green-500 font-bold">AL DÍA</span>
            </div>
          </div>
        </Card>
      </div>

      <div className="mt-12">
        <div className="flex items-center mb-6 text-accent">
          <ClipboardCheck className="w-5 h-5 mr-2" />
          <h3 className="font-bold text-xl">Resultados Prácticos</h3>
        </div>
        <Card className="p-0 overflow-hidden">
            <table className="w-full text-left">
                <thead className="bg-gray-50 border-b border-border text-xs uppercase text-muted font-medium">
                    <tr>
                        <th className="px-6 py-4">Bloque</th>
                        <th className="px-6 py-4">Estado</th>
                        <th className="px-6 py-4">Fecha Completado</th>
                        <th className="px-6 py-4">Acción</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-border">
                    {player.playerBlocks?.map((pb: any) => (
                        <tr key={pb.id}>
                            <td className="px-6 py-4 font-medium">{pb.block?.name}</td>
                            <td className="px-6 py-4">
                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${pb.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                                    {pb.status.toUpperCase()}
                                </span>
                            </td>
                            <td className="px-6 py-4 text-sm text-muted">
                                {pb.completedAt ? new Date(pb.completedAt).toLocaleDateString() : '-'}
                            </td>
                            <td className="px-6 py-4">
                                <Button variant="ghost" size="sm" className="text-accent p-0">Ver Detalle</Button>
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
