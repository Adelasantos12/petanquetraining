'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { api } from '@/providers/AuthProvider';
import { Button } from '@/components/ui/Button';
import MerciRadar from '@/components/MerciRadar';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';

export default function PlayerDetails() {
  const { id } = useParams();
  const router = useRouter();
  const [player, setPlayer] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notes, setNotes] = useState('');

  const fetchDetails = async () => {
    try {
      const { data } = await api.get(`/coach/players/${id}`);
      setPlayer(data);
      setNotes(data.profile?.technicalNotes || '');
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, [id]);

  const handleApproveMerci = async (merciId: string) => {
    try {
      await api.put(`/merci/${merciId}/approve`, {
        coachComments: 'Excelente diagnóstico inicial. Perfil equilibrado.',
        rank: 'Rank 3',
      });
      fetchDetails();
    } catch (err) {
      alert('Error al aprobar');
    }
  };

  const saveNotes = async () => {
    try {
      await api.put(`/coach/players/${id}/notes`, { notes });
      alert('Notas guardadas');
    } catch (err) {
      alert('Error al guardar notas');
    }
  };

  if (isLoading) return <div className="p-8">Cargando detalles...</div>;
  if (!player) return <div className="p-8">Jugador no encontrado.</div>;

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      <div className="max-w-7xl mx-auto px-8 py-8">
        <Link href="/coach" className="flex items-center text-sm text-muted hover:text-accent mb-6">
          <ChevronLeft className="w-4 h-4 mr-1" /> Volver a la lista
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <div className="lg:col-span-1 space-y-8">
            <div className="bg-white p-6 rounded-xl border border-border shadow-sm">
              <h2 className="text-xl font-bold mb-4">Perfil: {player.email}</h2>
              <div className="space-y-4 text-sm">
                <p><span className="text-muted block">Años Exp:</span> {player.profile?.yearsOfExperience}</p>
                <p><span className="text-muted block">Fortalezas:</span> {player.profile?.strengths}</p>
                <p><span className="text-muted block">Debilidades:</span> {player.profile?.weaknesses}</p>
                <p><span className="text-muted block">Meta Largo Plazo:</span> {player.profile?.goalLongTerm}</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-border shadow-sm">
              <h2 className="text-lg font-bold mb-4">Notas Técnicas</h2>
              <textarea
                className="w-full h-32 p-2 text-sm border border-border rounded-md mb-4"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
              <Button size="sm" className="w-full" onClick={saveNotes}>Guardar Notas</Button>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-8">

            {/* MERCI Assessments */}
            <div className="bg-white p-8 rounded-xl border border-border shadow-sm">
              <h2 className="text-xl font-bold mb-6">Diagnósticos MERCI</h2>
              {player.merciAssessments?.length > 0 ? (
                player.merciAssessments.map((m: any) => (
                  <div key={m.id} className="border-t border-border pt-6 first:border-0 first:pt-0">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-sm font-medium">{new Date(m.createdAt).toLocaleDateString()}</span>
                      {m.status === 'pending' ? (
                        <Button size="sm" variant="secondary" onClick={() => handleApproveMerci(m.id)}>Aprobar</Button>
                      ) : (
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">APROBADO</span>
                      )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                      <MerciRadar data={m} size={250} />
                      <div className="text-sm">
                        <p className="font-bold mb-1">Total: {m.totalScore}</p>
                        <p className="text-muted italic">{m.coachComments}</p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-muted text-center py-8">No hay diagnósticos enviados.</p>
              )}
            </div>

            {/* Training Progress */}
            <div className="bg-white p-8 rounded-xl border border-border shadow-sm">
              <h2 className="text-xl font-bold mb-6">Bloques de Entrenamiento</h2>
              {player.playerBlocks?.length > 0 ? (
                player.playerBlocks.map((pb: any) => (
                  <div key={pb.id} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg mb-2">
                    <div>
                      <p className="font-bold">{pb.block.name}</p>
                      <p className="text-xs text-muted">Iniciado: {new Date(pb.startedAt).toLocaleDateString()}</p>
                    </div>
                    <span className={`text-[10px] font-bold px-2 py-1 rounded ${
                      pb.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                    }`}>
                      {pb.status.toUpperCase()}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-muted text-center py-8">No hay bloques asignados.</p>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
