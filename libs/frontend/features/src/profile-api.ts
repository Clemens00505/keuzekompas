import { getToken } from './auth-storage';

const API_URL = 'http://localhost:3333';

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
  const res = await fetch(`${API_URL}/me`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: 'no-store',
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function updateMyProfile(input: Partial<Pick<MyProfile, 'firstName' | 'lastName'>>): Promise<MyProfile> {
  const token = getToken();
  if (!token) throw new Error('Niet ingelogd');
  const res = await fetch(`${API_URL}/me`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(input),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}
