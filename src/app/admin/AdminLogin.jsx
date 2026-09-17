'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui';
import { Field, Notice } from '@/components/Field';

export default function AdminLogin() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  async function signIn(e) {
    e.preventDefault();
    setBusy(true);
    setError('');
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'That password was not accepted.');
      setPassword('');
      // The page is a server component; re-render it now the cookie is set.
      router.refresh();
    } catch (err) {
      setError(err.message);
      setBusy(false);
    }
  }

  return (
    <form onSubmit={signIn} className="max-w-sm space-y-8">
      <Field
        label="Admin password"
        type="password"
        autoComplete="current-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {error && <Notice>{error}</Notice>}
      <Button type="submit" variant="deep" disabled={busy} arrow={!busy}>
        {busy ? 'Checking…' : 'Sign in'}
      </Button>
    </form>
  );
}
