// Central place to configure frontend environment values
// In Next.js, expose API URL via NEXT_PUBLIC_API_URL
export const API_URL = (process.env.NEXT_PUBLIC_API_URL as string) || 'http://localhost:3333';
