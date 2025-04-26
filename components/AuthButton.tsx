'use client';

import { useRouter } from 'next/navigation';

interface AuthButtonProps {
  label: string;
  route: string;
}

export default function AuthButton({ label, route }: AuthButtonProps) {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push(route)}
      className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
    >
      {label}
    </button>
  );
}
