'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Landing from '@/components/Landing';

export default function LandingPage() {
  const router = useRouter();

  useEffect(() => {
    const tokenExists = document.cookie.includes('wisp-token=');
    if (tokenExists) {
      router.replace('/');
    }
  }, []);

  return <Landing />;
}
