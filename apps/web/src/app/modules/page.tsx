'use client';
import React, { useEffect, useMemo, useState } from 'react';
import { getModules, type VKM, isLoggedIn } from '@keuzekompas/frontend-features-modules';
import { ModuleList } from '@keuzekompas/frontend-ui';
import { useRouter } from 'next/navigation';

export default function ModulesPage() {
  const router = useRouter();
  // early guard: avoid running effects when not logged in
  if (typeof window !== 'undefined' && !isLoggedIn()) {
    // middleware will redirect on navigation; avoid loops by not pushing repeatedly
    router.replace('/login?redirect=/modules');
    return null;
  }
  const [items, setItems] = useState<VKM[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [q, setQ] = useState('');
  const [ec, setEc] = useState<'15' | '30' | ''>('');
  const [niveau, setNiveau] = useState<'NLQF-5' | 'NLQF-6' | ''>('');
  const [thema, setThema] = useState('');

  const filters = useMemo(() => ({
    q: q || undefined,
    ec: ec ? (Number(ec) as 15|30) : undefined,
    niveau: (niveau || undefined) as ('NLQF-5'|'NLQF-6'|undefined),
    thema: thema || undefined,
  }), [q, ec, niveau, thema]);

  useEffect(() => {
    const refresh = () => getModules(filters).then(setItems).catch(e => setError(String(e)));
    refresh();
  }, [router, filters]);

  if (!isLoggedIn()) return null;

  return (
    <section className="max-w-2xl mx-auto space-y-6">
      <div className="card">
        <h1 className="text-2xl font-bold">Modules</h1>
      </div>

      <div className="card section">
        <div className="filters">
          <input
            placeholder="Zoeken..."
            value={q}
            onChange={(e) => setQ(e.target.value)}
            style={{ color: 'var(--text)' }}
          />
          <select value={ec} onChange={(e) => setEc(e.target.value as any)} style={{ color: 'var(--text)' }}>
            <option value="">EC</option>
            <option value="15">15</option>
            <option value="30">30</option>
          </select>
          <select value={niveau} onChange={(e) => setNiveau(e.target.value as any)} style={{ color: 'var(--text)' }}>
            <option value="">Niveau</option>
            <option value="NLQF-5">NLQF-5</option>
            <option value="NLQF-6">NLQF-6</option>
          </select>
          <input
            placeholder="Thema"
            value={thema}
            onChange={(e) => setThema(e.target.value)}
            style={{ color: 'var(--text)' }}
          />
        </div>
      </div>

      {error ? (
        <p className="text-red-600">Fout: {error}</p>
      ) : (
        <div className="card">
          <ModuleList items={items} />
        </div>
      )}
    </section>
  );
}
