'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { useAuth, api } from '@/providers/AuthProvider';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();
  const { login } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (searchParams.get('registered')) {
      setSuccess('Registro exitoso. Ahora puedes iniciar sesión.');
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await api.post('/auth/login', { email, password });
      login(response.data.access_token, response.data.user);

      if (response.data.user.role === 'coach') {
        router.push('/coach');
      } else {
        router.push('/dashboard');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al iniciar sesión');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl border border-border">
      <Link href="/" className="inline-flex items-center text-sm text-muted hover:text-gray-900 mb-4">
        <ArrowLeft className="w-4 h-4 mr-1" /> Volver al inicio
      </Link>
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900">Bienvenido a CIEP</h2>
        <p className="mt-2 text-sm text-muted">Ingresa a tu cuenta MERCI</p>
      </div>

      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div className="space-y-4">
          <Input
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            label="Contraseña"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {error && <p className="text-sm text-alert">{error}</p>}
        {success && <p className="text-sm text-green-600 bg-green-50 p-2 rounded">{success}</p>}

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? 'Iniciando...' : 'Iniciar Sesión'}
        </Button>

        <div className="text-center">
          <button
            type="button"
            onClick={() => router.push('/register')}
            className="text-sm text-accent hover:underline"
          >
            ¿No tienes cuenta? Regístrate
          </button>
        </div>
      </form>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Suspense fallback={<div>Cargando...</div>}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
