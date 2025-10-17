import { getToken } from '../../shared/auth/storage';
import { apiFetch } from '../../shared/api/http';
import type { VKM } from '../../entities/modules/types';
import { API_URL } from '../../shared/config/env';

export async function getModules(filters?: { q?: string; ec?: 15|30; niveau?: 'NLQF-5'|'NLQF-6'; thema?: string }): Promise<VKM[]> {
  const token = getToken();
  const params = new URLSearchParams();
  if (filters?.q) params.set('q', filters.q);
  if (filters?.ec) params.set('ec', String(filters.ec));
  if (filters?.niveau) params.set('niveau', filters.niveau);
  if (filters?.thema) params.set('thema', filters.thema);
  const url = `${API_URL}/modules${params.toString() ? `?${params.toString()}` : ''}`;
  const data = await apiFetch(url, {
    cache: 'no-store',
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  });
  return data.map((m: any) => ({
    id: m.id || m._id || m.idModule || crypto.randomUUID(),
    name: m.name,
    ec: m.ec,
    niveau: m.niveau,
    thema: Array.isArray(m.thema) ? m.thema : [],
  }));
}

export async function getModule(id: string): Promise<VKM> {
  const token = getToken();
  const m = await apiFetch(`${API_URL}/modules/${encodeURIComponent(id)}`, {
    cache: 'no-store',
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  });
  return {
    id: m.id || m._id || id,
    name: m.name,
    ec: m.ec,
    niveau: m.niveau,
    thema: Array.isArray(m.thema) ? m.thema : [],
  };
}

export async function createModule(payload: Omit<VKM, 'id'>): Promise<VKM> {
  const token = getToken();
  const m = await apiFetch(`${API_URL}/modules`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(payload),
  });
  return {
    id: m.id || m._id || crypto.randomUUID(),
    name: m.name,
    ec: m.ec,
    niveau: m.niveau,
    thema: Array.isArray(m.thema) ? m.thema : [],
  };
}
