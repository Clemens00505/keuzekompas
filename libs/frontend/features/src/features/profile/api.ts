import { getToken } from '../../shared/auth/storage';
import { apiFetch } from '../../shared/api/http';
import { API_URL } from '../../shared/config/env';

export type MyProfile = {
  id: string;
  email: string;
  studentNumber: string;
  firstName: string;
  lastName: string;
};

export async function getMyProfile(): Promise<MyProfile> {
  const token = getToken();
  if (!token) throw new Error('Niet ingelogd');
  return apiFetch(`${API_URL}/me`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: 'no-store',
  });
}

export async function updateMyProfile(input: Partial<Pick<MyProfile, 'firstName' | 'lastName'>>): Promise<MyProfile> {
  const token = getToken();
  if (!token) throw new Error('Niet ingelogd');
  return apiFetch(`${API_URL}/me`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(input),
  });
}
