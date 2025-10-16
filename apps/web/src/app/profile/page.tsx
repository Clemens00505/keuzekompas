'use client';
import React, { useEffect, useState } from 'react';
import { isLoggedIn, userMessage } from '@keuzekompas/frontend-features-modules';
import { getMyProfile, updateMyProfile, type MyProfile } from '@keuzekompas/frontend-features-modules';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const router = useRouter();
  if (typeof window !== 'undefined' && !isLoggedIn()) {
    router.replace('/login?redirect=/profile');
    return null;
  }
  const [me, setMe] = useState<MyProfile | null>(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoggedIn()) {
      router.replace('/login');
      return;
    }
    const run = async () => {
      try {
        setLoading(true);
        const data = await getMyProfile();
        setMe(data);
        setFirstName(data.firstName);
        setLastName(data.lastName);
      } catch (e: any) {
        setError(userMessage(e));
      } finally {
        setLoading(false);
      }
    };
    run();
  }, [router]);

  if (!isLoggedIn()) return null;

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    try {
      setSaving(true);
      const updated = await updateMyProfile({ firstName: firstName.trim(), lastName: lastName.trim() });
      setMe(updated);
      setSuccess('Profiel bijgewerkt');
    } catch (e: any) {
      setError(userMessage(e));
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className="max-w-xl mx-auto space-y-6">
      <div className="card">
        <h1 className="text-2xl font-bold">Mijn profiel</h1>
        <p className="text-gray-600">Bekijk en werk je gegevens bij.</p>
      </div>

      {loading ? (
        <div className="card">Laden...</div>
      ) : error ? (
        <div className="card text-red-600">Fout: {error}</div>
      ) : me ? (
        <form className="card space-y-4" onSubmit={onSubmit}>
          <div>
            <label className="block text-sm font-medium">E-mail</label>
            <input className="input" value={me.email} readOnly />
          </div>
          <div>
            <label className="block text-sm font-medium">Studentnummer</label>
            <input className="input" value={me.studentNumber} readOnly />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium">Voornaam</label>
              <input className="input" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
            </div>
            <div>
              <label className="block text-sm font-medium">Achternaam</label>
              <input className="input" value={lastName} onChange={(e) => setLastName(e.target.value)} />
            </div>
          </div>
          {success && <p className="text-green-700">{success}</p>}
          <div className="flex gap-2">
            <button className="btn" type="submit" disabled={saving}>{saving ? 'Opslaan...' : 'Opslaan'}</button>
            <a className="btn btn-secondary" href="/modules">Terug</a>
          </div>
        </form>
      ) : null}
    </section>
  );
}
