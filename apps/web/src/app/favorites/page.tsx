'use client';
import React, { useEffect, useMemo, useState } from 'react';
import { isLoggedIn, getFavorites, type Favorite, getModule, type VKM, userMessage } from '@keuzekompas/frontend-features-modules';
import { ModuleList } from '@keuzekompas/frontend-ui';
import { useRouter } from 'next/navigation';

export default function FavoritesPage() {
  const router = useRouter();
  if (typeof window !== 'undefined' && !isLoggedIn()) {
    router.replace('/login?redirect=/favorites');
    return null;
  }

  const [favs, setFavs] = useState<Favorite[]>([]);
  const [modules, setModules] = useState<VKM[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const favorites = await getFavorites();
        setFavs(favorites);
        // fetch module details in parallel (small n expected)
        const detail = await Promise.all(
          favorites.map(f => getModule(f.moduleId).catch(() => null))
        );
        setModules(detail.filter(Boolean) as VKM[]);
      } catch (e: any) {
        setError(userMessage(e));
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <section className="max-w-2xl mx-auto space-y-6">
      <div className="card">
        <h1 className="text-2xl font-bold">Mijn favorieten</h1>
        <p className="text-gray-600">Overzicht van modules die je als favoriet hebt gemarkeerd.</p>
      </div>

      {loading ? (
        <div className="card">Laden...</div>
      ) : error ? (
        <div className="card text-red-600">Fout: {error}</div>
      ) : (
        <div className="card">
          <ModuleList items={modules} />
        </div>
      )}
    </section>
  );
}
