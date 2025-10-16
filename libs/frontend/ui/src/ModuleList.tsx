'use client';
import React, { useEffect, useMemo, useState } from 'react';
import type { VKM } from '@keuzekompas/frontend-features-modules';
import { getFavorites, addFavorite, removeFavorite, type Favorite } from '@keuzekompas/frontend-features-modules';
import { userMessage } from '@keuzekompas/frontend-features-modules';

export function ModuleList({ items }: { items: VKM[] }) {
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const favSet = useMemo(() => new Set(favorites.map(f => f.moduleId)), [favorites]);

  const [favError, setFavError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    getFavorites().then(list => {
      if (!cancelled) setFavorites(list);
    }).catch((e) => {
      if (!cancelled) setFavError(userMessage(e));
    });
    return () => { cancelled = true; };
  }, []);

  async function toggleFavorite(moduleId: string) {
    const isFav = favSet.has(moduleId);
    if (isFav) {
      // optimistic update
      setFavorites(prev => prev.filter(f => f.moduleId !== moduleId));
      try {
        await removeFavorite(moduleId);
      } catch (e) {
        // rollback
        setFavorites(prev => prev.concat({ _id: crypto.randomUUID(), userId: 'me', moduleId } as any));
        alert(userMessage(e));
      }
    } else {
      // optimistic add
      setFavorites(prev => prev.concat({ _id: crypto.randomUUID(), userId: 'me', moduleId } as any));
      try {
        const saved = await addFavorite(moduleId);
        setFavorites(prev => prev.filter(f => f.moduleId !== moduleId).concat(saved));
      } catch (e) {
        // rollback
        setFavorites(prev => prev.filter(f => f.moduleId !== moduleId));
        alert(userMessage(e));
      }
    }
  }

  if (!items?.length) return <p className="opacity-70">Geen modules gevonden.</p>;

  return (
    <ul className="space-y-2">
      {favError && (
        <li className="text-red-600">Favorieten konden niet geladen worden: {favError}</li>
      )}
      {items.map((m) => {
        const themas = Array.isArray(m.thema)
          ? m.thema
          : String(m.thema ?? '')
              .split(',')
              .map(s => s.trim())
              .filter(Boolean);

        return (
          <li
            key={m.id}
            className="border p-3 rounded"
            style={{ background: 'var(--surface)' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '.5rem' }}>
              <div className="font-semibold">{m.name}</div>
              <div style={{ display: 'flex', gap: '.5rem' }}>
                <button
                  className="btn"
                  title={favSet.has(m.id) ? 'Verwijder uit favorieten' : 'Voeg toe aan favorieten'}
                  onClick={() => toggleFavorite(m.id)}
                >
                  {favSet.has(m.id) ? '★ Favoriet' : '☆ Favoriet'}
                </button>
              </div>
            </div>
            <div className="text-sm opacity-70">
              EC: {m.ec} • Niveau: {m.niveau}
            </div>
            <div>
              Thema:
            </div>

            {themas.length > 0 && (
              <div
                // container met spacing tussen pills, en wrap bij overflow
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '0.375rem',
                  marginTop: '0.375rem',
                }}
              >
                {themas.map((t) => (
                  <span
                    key={`${m.id}-${t}`}
                    // echte “pill” look
                    style={{
                      display: 'inline-block',
                      padding: '2px 8px',
                      fontSize: '12px',
                      fontWeight: 600,
                      lineHeight: 1.2,
                      borderRadius: '999px',
                      background: 'var(--primary-soft)',
                      color: 'var(--text)',
                      border: '1px solid var(--primary-soft-border)',
                      boxShadow: '0 1px 0 rgba(0,0,0,.04)',
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
}
