'use client';
import React, { useState, Suspense } from 'react'; // 👈 Importeer Suspense
import { loginRequest, setToken, isLoggedIn } from '@keuzekompas/frontend-features-modules';
import { useRouter, useSearchParams } from 'next/navigation';

// ----------------------------------------------------
// 1. Nieuwe component die de client-side logica bevat
// ----------------------------------------------------
function LoginContent() {
  const router = useRouter();
  // ⚠️ useSearchParams staat HIER veilig binnen de Suspense-grens
  const search = useSearchParams(); 
  const redirect = search.get('redirect') || '/modules';
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (isLoggedIn()) {
    router.replace(redirect);
    return null;
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await loginRequest(email.trim().toLowerCase(), password.trim());
      setToken(res.accessToken);
      // Ensure cookie is set before redirecting so middleware allows access
      setTimeout(() => router.replace(redirect), 0);
    } catch (e: any) {
      setError(String(e?.message || e));
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="max-w-md mx-auto space-y-6">
      <div className="card">
        <h1 className="text-2xl font-bold">Inloggen</h1>
        <p className="text-gray-600">Log in om modules te bekijken en beheren.</p>
      </div>

      <form className="card space-y-4" onSubmit={onSubmit}>
        <div>
          <label className="block text-sm font-medium">E-mail</label>
          <input
            type="email"
            className="input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Wachtwoord</label>
          <input
            type="password"
            className="input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="text-red-600">{error}</p>}
        <button className="btn" type="submit" disabled={loading}>
          {loading ? 'Bezig...' : 'Inloggen'}
        </button>
      </form>
    </section>
  );
}

// ----------------------------------------------------
// 2. Hoofd export met de Suspense Wrapper
// ----------------------------------------------------
export default function LoginPage() {
  return (
    // De prerendering faalt op deze pagina, dus verpak de inhoud in Suspense
    <Suspense fallback={<div>Laden...</div>}>
      <LoginContent />
    </Suspense>
  );
}