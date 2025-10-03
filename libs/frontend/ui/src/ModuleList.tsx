'use client';
import type { VKM } from '@keuzekompas/frontend-features-modules';

export function ModuleList({ items }: { items: VKM[] }) {
  if (!items?.length) return <p className="opacity-70">Geen modules gevonden.</p>;
  return (
    <ul className="space-y-2">
      {items.map(m => (
        <li key={m.id} className="border p-3 rounded" style={{background:'var(--surface)'}}>
          <div className="font-semibold">{m.name}</div>
          <div className="text-sm opacity-70">EC: {m.ec} • Niveau: {m.niveau}</div>
          {m.thema?.length ? <div className="text-sm">Thema: {m.thema.join(', ')}</div> : null}
        </li>
      ))}
    </ul>
  );
}
