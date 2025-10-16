export class ApiError extends Error {
  status?: number;
  body?: any;
  constructor(message: string, status?: number, body?: any) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.body = body;
  }
}

export async function apiFetch(input: RequestInfo | URL, init?: RequestInit) {
  let res: Response;
  try {
    res = await fetch(input, init);
  } catch (e: any) {
    // Network or CORS error
    throw new ApiError(e?.message || 'Netwerkfout', undefined);
  }
  const contentType = res.headers.get('content-type') || '';
  const isJson = contentType.includes('application/json');
  const raw = await (isJson ? res.text() : res.text());
  const parseJson = () => {
    try { return raw ? JSON.parse(raw) : undefined; } catch { return undefined; }
  };
  if (!res.ok) {
    const data = isJson ? parseJson() : undefined;
    const msg = (data && (data.message || data.error || data.title)) || raw || `HTTP ${res.status}`;
    throw new ApiError(msg, res.status, data ?? raw);
  }
  // success
  if (!raw) return undefined as any;
  if (isJson) {
    const data = parseJson();
    return data as any;
  }
  return raw as any;
}
