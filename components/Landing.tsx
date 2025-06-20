'use client';

import { useEffect, useState } from 'react';
import AuthModal from './AuthModal';
import LandingLeft from './LandingLeft';
import LandingRight from './LandingRight';

export default function Landing() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [iframeMode, setIframeMode] = useState<'signup' | 'login' | null>(null);

  useEffect(() => {
    const tokenExists = document.cookie.includes('wisp-token=');
    setIsLoggedIn(tokenExists);
  }, []);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      switch (event.data?.event) {
        case 'OASIS_SIGNUP_SUCCESS':
          setIframeMode(null);
          alert('Signup complete. You can now log in.');
          break;
        case 'OASIS_USER_EXISTS':
          setIframeMode(null);
          alert('User already exists. Try logging in instead.');
          break;
        case 'OASIS_LOGIN_SUCCESS':
          const token = event.data.data.token;
          document.cookie = `wisp-token=${token}; path=/; max-age=86400; secure; samesite=Strict`;
          setIframeMode(null);
          setIsLoggedIn(true);
          window.location.href = '/';
          break;
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-[#F5F5F5] text-[#111111]">
      <LandingLeft />
      <LandingRight
        isLoggedIn={isLoggedIn}
        onLogin={() => setIframeMode('login')}
        onSignup={() => setIframeMode('signup')}
        onLogout={() => {
          document.cookie = 'wisp-token=; path=/; max-age=0';
          setIsLoggedIn(false);
          window.location.href = '/';
        }}
      />
      <AuthModal mode={iframeMode} onClose={() => setIframeMode(null)} />
    </div>
  );
}
