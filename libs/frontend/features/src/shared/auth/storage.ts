const TOKEN_KEY = 'kk.accessToken';
const TOKEN_COOKIE = 'kk.at';

export function setToken(token: string) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(TOKEN_KEY, token);
  try {
    const isSecure = location.protocol === 'https:';
    document.cookie = `${TOKEN_COOKIE}=1; Path=/; SameSite=Lax${isSecure ? '; Secure' : ''}`;
  } catch {}
}

export function getToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(TOKEN_KEY);
}

export function clearToken() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(TOKEN_KEY);
  try {
    document.cookie = `${TOKEN_COOKIE}=; Path=/; Max-Age=0`;
  } catch {}
}

function hasAuthCookie(): boolean {
  if (typeof document === 'undefined') return false;
  try {
    return document.cookie.split(';').some(c => c.trim().startsWith(`${TOKEN_COOKIE}=`));
  } catch {
    return false;
  }
}

export function isLoggedIn(): boolean {
  return !!getToken() && hasAuthCookie();
}
