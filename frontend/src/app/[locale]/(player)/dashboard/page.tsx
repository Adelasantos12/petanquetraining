'use client';

import { useEffect, useState } from 'react';
import { useRouter, Link } from '@/navigation';
import { api, useAuth } from '@/providers/AuthProvider';
import { Button } from '@/components/ui/Button';
import MerciRadar from '@/components/MerciRadar';

export default function PlayerDashboard() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [profile, setProfile] = useState<any>(null);
  const [activeBlock, setActiveBlock] = useState<any>(null);
  const [merci, setMerci] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profRes, blockRes, merciRes] = await Promise.all([
          api.get('/onboarding/status'),
          api.get('/training/active-block'),
          api.get('/merci/my-results'),
        ]);

        setProfile(profRes.data);
        setActiveBlock(blockRes.data);
        if (merciRes.data.length > 0) {
          setMerci(merciRes.data[0]);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) return <div className="p-8">Cargando dashboard...</div>;

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      <nav className="bg-white border-b border-border px-8 py-4 flex justify-between items-center mb-8">
        <h1 className="text-xl font-bold">CIEP MERCI Dashboard</h1>
        <div className="flex items-center space-x-4">
          <span className="text-sm text-muted">{user?.email}</span>
          <Button variant="ghost" size="sm" onClick={() => { logout(); router.push('/login'); }}>Cerrar Sesión</Button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Profile Summary */}
        <div className="lg:col-span-1 space-y-8">
          <div className="bg-white p-6 rounded-xl border border-border shadow-sm">
            <h2 className="text-lg font-bold mb-4">Mi Perfil</h2>
            <div className="space-y-2 text-sm">
              <p><span className="text-muted">Experiencia:</span> {profile?.yearsOfExperience} años</p>
              <p><span className="text-muted">Metas Largo Plazo:</span> {profile?.goalLongTerm}</p>
            </div>
            <Link href="/onboarding/profile">
              <Button variant="outline" size="sm" className="w-full mt-4">Editar Perfil</Button>
            </Link>
          </div>

          <div className="bg-white p-6 rounded-xl border border-border shadow-sm">
            <h2 className="text-lg font-bold mb-4">Estado de Pagos</h2>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="font-medium">Suscripción Activa</span>
            </div>
          </div>
        </div>

        {/* Core Content */}
        <div className="lg:col-span-2 space-y-8">

          {/* MERCI Radar */}
          <div className="bg-white p-8 rounded-xl border border-border shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Diagnóstico MERCI</h2>
              {!merci && (
                <Link href="/dashboard/merci">
                  <Button size="sm">Realizar Diagnóstico</Button>
                </Link>
              )}
            </div>
            {merci ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <MerciRadar data={merci} />
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted">Puntaje Total</p>
                    <p className="text-3xl font-bold text-accent">{merci.totalScore} / 150</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted">Comentarios del Coach</p>
                    <p className="text-sm italic">{merci.coachComments || 'Esperando comentarios...'}</p>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-center py-12 text-muted">Aún no tienes un diagnóstico aprobado.</p>
            )}
          </div>

          {/* Training Block */}
          <div className="bg-white p-8 rounded-xl border border-border shadow-sm">
            <h2 className="text-xl font-bold mb-6">Bloque de Entrenamiento Actual</h2>
            {activeBlock ? (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="font-bold">{activeBlock.block.name}</h3>
                  <span className="text-xs bg-accent-light text-accent px-2 py-1 rounded">EN PROGRESO</span>
                </div>
                <Link href="/dashboard/training">
                  <Button className="w-full">Ir a los Ejercicios</Button>
                </Link>
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted mb-4">No tienes bloques asignados actualmente.</p>
                <Button variant="outline" onClick={async () => {
                    await api.post('/training/debug/init-first-block');
                    window.location.reload();
                }}>
                  [DEBUG] Asignar Bloque Inicial
                </Button>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
