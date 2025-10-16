const API_URL = 'http://localhost:3333';

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
  console.log('[Login] request', { url: `${API_URL}/auth/login`, email });
  return await (await import('./http')).apiFetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
}
