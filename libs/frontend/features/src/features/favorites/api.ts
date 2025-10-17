import { getToken } from '../../shared/auth/storage';
import { apiFetch } from '../../shared/api/http';
import { API_URL } from '../../shared/config/env';

export type Favorite = {
  _id: string;
  userId: string;
  moduleId: string;
};

export async function getFavorites(): Promise<Favorite[]> {
  const token = getToken();
  if (!token) throw new Error('Niet ingelogd');
  return apiFetch(`${API_URL}/favorites`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: 'no-store',
  });
}

export async function addFavorite(moduleId: string): Promise<Favorite> {
  const token = getToken();
  if (!token) throw new Error('Niet ingelogd');
  return apiFetch(`${API_URL}/favorites/${encodeURIComponent(moduleId)}`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
  });
}

export async function removeFavorite(moduleId: string): Promise<void> {
  const token = getToken();
  if (!token) throw new Error('Niet ingelogd');
  await apiFetch(`${API_URL}/favorites/${encodeURIComponent(moduleId)}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });
}
