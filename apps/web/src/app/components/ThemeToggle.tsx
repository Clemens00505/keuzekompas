'use client';
import { useEffect, useState } from 'react';

const STORAGE_KEY = 'kk-theme';
type Theme = 'light' | 'dark';

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  if (theme === 'dark') root.setAttribute('data-theme', 'dark');
  else root.removeAttribute('data-theme');
}

function getSystemPreference(): Theme {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function ThemeToggle({ className = '' }: { className?: string }) {
  const [theme, setTheme] = useState<Theme>('light');
  const isDark = theme === 'dark';

  useEffect(() => {
    const stored = (localStorage.getItem(STORAGE_KEY) as Theme | null);
    const initial = stored || getSystemPreference();
    setTheme(initial);
    applyTheme(initial);

    if (!stored) {
      const mq = window.matchMedia('(prefers-color-scheme: dark)');
      const handler = () => {
        const sys = mq.matches ? 'dark' : 'light';
        setTheme(sys);
        applyTheme(sys);
      };
      mq.addEventListener('change', handler);
      return () => mq.removeEventListener('change', handler);
    }
  }, []);

  function toggle() {
    const next: Theme = isDark ? 'light' : 'dark';
    setTheme(next);
    applyTheme(next);
    localStorage.setItem(STORAGE_KEY, next);
  }

  const label = isDark ? 'Lichte modus' : 'Donkere modus';

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      role="switch"
      aria-checked={isDark}
      className={`theme-toggle ${className}`.trim()}
      data-mode={isDark ? 'dark' : 'light'}
    >
      <span className="track" aria-hidden="true">
        <span className="thumb">
          {isDark ? '🌙' : '☀️'}
        </span>
      </span>
    </button>
  );
}
