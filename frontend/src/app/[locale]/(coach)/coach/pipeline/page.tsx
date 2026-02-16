'use client';

import { useEffect, useState } from 'react';
import { api } from '@/providers/AuthProvider';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

export default function PipelinePage() {
  const t = useTranslations('status');
  const [users, setUsers] = useState<any[]>([]);
  const [filter, setFilter] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await api.get('/coach/pipeline');
        setUsers(data);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const kpis = {
    total: users.length,
    applicants: users.filter(u => u.status === 'applicant_submitted').length,
    interviews: users.filter(u => u.status === 'interview_scheduled').length,
    active: users.filter(u => u.status === 'active_member').length,
  };

  const filteredUsers = filter === 'all' ? users : users.filter(u => u.status === filter);

  if (isLoading) return <div className="p-12 text-center">Cargando pipeline...</div>;

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      <nav className="bg-white border-b border-border px-8 py-4 flex justify-between items-center mb-8 shadow-sm">
        <h1 className="text-xl font-bold">CIEP CRM Pipeline</h1>
        <Link href="/coach">
            <Button variant="ghost">Panel General</Button>
        </Link>
      </nav>

      <div className="max-w-7xl mx-auto px-8">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            <div className="bg-white p-6 rounded-xl border border-border shadow-sm">
                <p className="text-sm text-muted mb-1">Total</p>
                <p className="text-3xl font-bold text-gray-900">{kpis.total}</p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-border shadow-sm">
                <p className="text-sm text-muted mb-1">Aplicantes</p>
                <p className="text-3xl font-bold text-accent">{kpis.applicants}</p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-border shadow-sm">
                <p className="text-sm text-muted mb-1">Entrevistas</p>
                <p className="text-3xl font-bold text-blue-600">{kpis.interviews}</p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-border shadow-sm">
                <p className="text-sm text-muted mb-1">Activos</p>
                <p className="text-3xl font-bold text-green-600">{kpis.active}</p>
            </div>
        </div>

        {/* Filters */}
        <div className="flex space-x-2 mb-8 overflow-x-auto pb-2">
            <button onClick={() => setFilter('all')} className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${filter === 'all' ? 'bg-gray-900 text-white' : 'bg-white border border-border text-gray-600'}`}>Todos</button>
            {['applicant_submitted', 'preselected', 'interview_scheduled', 'diagnostic_unlocked', 'accepted', 'active_member'].map(s => (
                <button
                    key={s}
                    onClick={() => setFilter(s)}
                    className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${filter === s ? 'bg-accent text-white' : 'bg-white border border-border text-gray-600'}`}
                >
                    {t(s)}
                </button>
            ))}
        </div>

        {/* User Table */}
        <div className="bg-white rounded-xl border border-border shadow-sm overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 border-b border-border">
                <th className="px-6 py-4 font-bold text-sm">Usuario</th>
                <th className="px-6 py-4 font-bold text-sm">Estado</th>
                <th className="px-6 py-4 font-bold text-sm">País</th>
                <th className="px-6 py-4 font-bold text-sm">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredUsers.map((u) => (
                <tr key={u.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                      <p className="text-sm font-medium">{u.email}</p>
                      <p className="text-xs text-muted">{u.id.substring(0, 8)}</p>
                  </td>
                  <td className="px-6 py-4 capitalize">
                      <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">{t(u.status)}</span>
                  </td>
                  <td className="px-6 py-4 text-sm font-mono">{u.profile?.country || '-'}</td>
                  <td className="px-6 py-4">
                      <Link href={`/coach/user/${u.id}`}>
                        <Button variant="outline" size="sm">Gestionar</Button>
                      </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredUsers.length === 0 && (
              <div className="p-12 text-center text-muted">No se encontraron usuarios en este estado.</div>
          )}
        </div>
      </div>
    </div>
  );
}
