const API_URL = 'http://localhost:3333';

export type VKM = {
  id: string;
  name: string;
  ec: 15 | 30;
  niveau: 'NLQF-5' | 'NLQF-6';
  thema: string[];
};

export async function getModules(): Promise<VKM[]> {
  const res = await fetch(`${API_URL}/modules`, { cache: 'no-store' });
  if (!res.ok) throw new Error(await res.text());
  const data = await res.json();
  return data.map((m: any) => ({
    id: m.id || m._id || m.idModule || crypto.randomUUID(),
    name: m.name,
    ec: m.ec,
    niveau: m.niveau,
    thema: Array.isArray(m.thema) ? m.thema : [],
  }));
}

export async function createModule(payload: Omit<VKM, 'id'>): Promise<VKM> {
  const res = await fetch(`${API_URL}/modules`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(await res.text());
  const m = await res.json();
  return {
    id: m.id || m._id || crypto.randomUUID(),
    name: m.name,
    ec: m.ec,
    niveau: m.niveau,
    thema: Array.isArray(m.thema) ? m.thema : [],
  };
}