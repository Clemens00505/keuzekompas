'use client';
import React, { useEffect, useState } from 'react';
import { getModules, type VKM } from '@keuzekompas/frontend-features-modules';
import { ModuleList, NewModuleForm } from '@keuzekompas/frontend-ui';

export default function ModulesPage() {
  const [items, setItems] = useState<VKM[]>([]);
  const [error, setError] = useState<string | null>(null);
  const refresh = () => getModules().then(setItems).catch(e => setError(String(e)));

  useEffect(() => { refresh(); }, []);

  return (
    <section className="max-w-2xl mx-auto space-y-6">
      <div className="card">
        <h1 className="text-2xl font-bold">Modules</h1>
      </div>

      <div className="card">
        <NewModuleForm onCreated={refresh} />
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
