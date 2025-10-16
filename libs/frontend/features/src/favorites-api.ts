import { getToken } from './auth-storage';

const API_URL = 'http://localhost:3333';

export type Favorite = {
  _id: string;
  userId: string;
  moduleId: string;
};

export async function getFavorites(): Promise<Favorite[]> {
  const token = getToken();
  if (!token) throw new Error('Niet ingelogd');
  const res = await fetch(`${API_URL}/favorites`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: 'no-store',
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function addFavorite(moduleId: string): Promise<Favorite> {
  const token = getToken();
  if (!token) throw new Error('Niet ingelogd');
  const res = await fetch(`${API_URL}/favorites/${encodeURIComponent(moduleId)}`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function removeFavorite(moduleId: string): Promise<void> {
  const token = getToken();
  if (!token) throw new Error('Niet ingelogd');
  const res = await fetch(`${API_URL}/favorites/${encodeURIComponent(moduleId)}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error(await res.text());
}
