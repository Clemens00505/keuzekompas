'use client';
import React, { useEffect, useState } from 'react';
import { isLoggedIn, clearToken } from '@keuzekompas/frontend-features-modules';

export function NavAuth() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    setLoggedIn(isLoggedIn());
    const onStorage = (e: StorageEvent) => {
      if (e.key === 'kk.accessToken') setLoggedIn(!!e.newValue);
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  if (loggedIn) {
    return (
      <button
        className="btn btn-sm"
        onClick={() => {
          clearToken();
          location.href = '/login';
        }}
      >
        Uitloggen
      </button>
    );
  }

  return (
    <a className="btn btn-sm" href="/login">
      Inloggen
    </a>
  );
}
