'use client';
import type { VKM } from '@keuzekompas/frontend-features-modules';

export function ModuleList({ items }: { items: VKM[] }) {
  if (!items?.length) return <p className="opacity-70">Geen modules gevonden.</p>;

  return (
    <ul className="space-y-2">
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
            <div className="font-semibold">{m.name}</div>
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
