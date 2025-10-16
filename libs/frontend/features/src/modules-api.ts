import { getToken } from './auth-storage';
const API_URL = 'http://localhost:3333';

export type VKM = {
  id: string;
  name: string;
  ec: 15 | 30;
  niveau: 'NLQF-5' | 'NLQF-6';
  thema: string[];
};

export async function getModules(filters?: { q?: string; ec?: 15|30; niveau?: 'NLQF-5'|'NLQF-6'; thema?: string }): Promise<VKM[]> {
  const token = getToken();
  const params = new URLSearchParams();
  if (filters?.q) params.set('q', filters.q);
  if (filters?.ec) params.set('ec', String(filters.ec));
  if (filters?.niveau) params.set('niveau', filters.niveau);
  if (filters?.thema) params.set('thema', filters.thema);
  const url = `${API_URL}/modules${params.toString() ? `?${params.toString()}` : ''}`;
  const res = await fetch(url, {
    cache: 'no-store',
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  });
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
  const token = getToken();
  const res = await fetch(`${API_URL}/modules`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
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
