'use client';
import React from 'react';

export default function HomePage() {
  return (
    <section className="max-w-2xl mx-auto space-y-6">
      <div className="card">
        <h1 className="text-2xl font-bold">Welkom bij Keuzekompas</h1>
        <p className="text-gray-600">Log in om de modules te bekijken.</p>
        <div className="mt-4">
          <a className="btn" href="/login">Inloggen</a>
        </div>
      </div>
    </section>
  );
}
