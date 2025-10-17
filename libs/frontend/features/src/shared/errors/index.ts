import { ApiError } from '../api/http';

export function userMessage(err: unknown): string {
  if (typeof err === 'string') return err;
  const e = err as any;
  if (e instanceof ApiError) {
    const status = e.status;
    if (status === 0 || status === undefined) return 'Netwerkfout. Controleer je verbinding.';
    if (status === 401) return 'Je sessie is verlopen of je bent niet ingelogd.';
    if (status === 403) return 'Je hebt geen toegang tot deze actie.';
    if (status === 404) return 'Niet gevonden.';
    if (status === 422) return 'Ongeldige invoer. Controleer je gegevens.';
    if (status && status >= 500) return 'Er ging iets mis op de server. Probeer het later opnieuw.';
    return e.message || `Fout (HTTP ${status})`;
  }
  if (e && typeof e.message === 'string') return e.message;
  try { return JSON.stringify(e); } catch { return 'Onbekende fout.'; }
}
