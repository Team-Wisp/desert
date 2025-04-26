'use client';

import { useEffect, useState } from 'react';

export default function TestPage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch('/api/auth/me', { credentials: 'include' });
        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error('Error fetching user:', error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, []);

  if (loading) {
    return <div>Loading session...</div>;
  }

  if (!user) {
    return <div>Not logged in.</div>;
  }

  return (
    <div>
      <h1>Successful login!</h1>
      <p>Domain: {user.domain}</p>
      <p>Organization Type: {user.orgType}</p>
      <p>Verified: {user.isVerified ? 'Yes' : 'No'}</p>
    </div>
  );
}
