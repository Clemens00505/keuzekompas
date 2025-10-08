'use client';
import { useState } from 'react';
import { createModule } from '@keuzekompas/frontend-features-modules';

export function NewModuleForm({ onCreated }: { onCreated: () => void }) {
  const [msg, setMsg] = useState<string>('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const payload = {
      name: String(fd.get('name')),
      ec: Number(fd.get('ec')) as 15|30,
      niveau: String(fd.get('niveau')) as 'NLQF-5'|'NLQF-6',
      thema: String(fd.get('thema') || '')
        .split(',')
        .map(s => s.trim())
        .filter(Boolean),
    };
    try {
      await createModule(payload);
      setMsg('Aangemaakt ✅');
      onCreated();
      e.currentTarget.reset();
    } catch (err: any) {
      setMsg('Fout ❌ ' + (err?.message || String(err)));
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input name="name" placeholder="Naam" className="w-full" style={{ color: 'var(--text)' }} required />
      <div className="grid grid-cols-2 gap-3">
        <select name="ec" defaultValue="15" style={{ color: 'var(--text)' }}>
          <option value="15">15 EC</option>
          <option value="30">30 EC</option>
        </select>
        <select name="niveau" defaultValue="NLQF-5" style={{ color: 'var(--text)' }}>
          <option>NLQF-5</option>
          <option>NLQF-6</option>
        </select>
      </div>
      <input name="thema" placeholder="Thema's (komma-gescheiden)" className="w-full" style={{ color: 'var(--text)' }} />
      <button className="btn primary">Opslaan</button>
      {msg && <p className="text-sm">{msg}</p>}
    </form>
  );
}
