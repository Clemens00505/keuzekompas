'use client';
import React, { useEffect, useMemo, useState } from 'react';
import { getModules, type VKM, isLoggedIn, userMessage } from '@keuzekompas/frontend-features-modules';
import { ModuleList } from '@keuzekompas/frontend-ui';
import { useRouter } from 'next/navigation';

export default function ModulesPage() {
  const router = useRouter();
  const [items, setItems] = useState<VKM[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
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
    let cancelled = false;
    const refresh = async () => {
      try {
        setLoading(true);
        if (!isLoggedIn()) {
          router.replace('/login?redirect=/modules');
          return;
        }
        const data = await getModules(filters);
        if (!cancelled) setItems(data);
        if (!cancelled) setError(null);
      } catch (e) {
        if (!cancelled) setError(userMessage(e));
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    refresh();
    return () => { cancelled = true; };
  }, [router, filters]);

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

      {loading ? (
        <div className="card">Laden...</div>
      ) : error ? (
        <p className="text-red-600">Fout: {error}</p>
      ) : (
        <div className="card">
          <ModuleList items={items} />
        </div>
      )}
    </section>
  );
}
