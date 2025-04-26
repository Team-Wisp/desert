'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const router = useRouter();

  async function handleVerifyEmail() {
    setLoading(true);
    setError('');
    try {
      // 1. Verify email
      const verifyRes = await fetch('/api/auth/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const verifyData = await verifyRes.json();
      if (!verifyRes.ok) throw new Error(verifyData.error || 'Verification failed');

      // 2. Send OTP
      const otpRes = await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const otpData = await otpRes.json();
      if (!otpRes.ok) throw new Error(otpData.error || 'Failed to send OTP');

      setStep(2);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleVerifyOtp() {
    setLoading(true);
    setError('');
    try {
      const otpRes = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp }),
      });
      const otpData = await otpRes.json();
  
      if (!otpRes.ok) {
        throw new Error(otpData.error || 'OTP verification failed');
      }
  
      // ⚡ NEW: If user already exists
      if (otpData?.user) {
        alert('Account already exists. Please login.');
        router.push('/login');
        return;
      }
  
      // If not, proceed to password step
      setStep(3);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }
  

  async function handleSetPassword() {
    setLoading(true);
    setError('');
    try {
      const passwordRes = await fetch('/api/auth/set-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const passwordData = await passwordRes.json();
      if (!passwordRes.ok) throw new Error(passwordData.error || 'Setting password failed');

      alert('Account created! Please login.');
      router.push('/login');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-6">
      <h1 className="text-2xl font-bold mb-6">Sign Up</h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {step === 1 && (
        <div className="flex flex-col items-center space-y-4">
          <input
            className="border p-2 w-64"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            onClick={handleVerifyEmail}
            disabled={!email || loading}
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? 'Verifying...' : 'Verify Email'}
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="flex flex-col items-center space-y-4">
          <input
            className="border p-2 w-64"
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <button
            onClick={handleVerifyOtp}
            disabled={!otp || loading}
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? 'Verifying OTP...' : 'Submit OTP'}
          </button>
        </div>
      )}

      {step === 3 && (
        <div className="flex flex-col items-center space-y-4">
          <input
            className="border p-2 w-64"
            type="password"
            placeholder="Set Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            onClick={handleSetPassword}
            disabled={!password || loading}
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? 'Setting Password...' : 'Set Password'}
          </button>
        </div>
      )}
    </div>
  );
}
