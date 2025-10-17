import { apiFetch } from '../../shared/api/http';
import { API_URL } from '../../shared/config/env';

export type LoginResponse = {
  accessToken: string;
  user: {
    id: string;
    email: string;
    studentNumber: string;
    firstName: string;
    lastName: string;
  };
};

export async function loginRequest(email: string, password: string): Promise<LoginResponse> {
  return await apiFetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
}
