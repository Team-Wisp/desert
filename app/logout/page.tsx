'use client';

export default function LogoutButton() {
  async function handleLogout() {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });
      // Redirect or reload page
      window.location.href = '/';
    } catch (error) {
      console.error('Logout failed', error);
    }
  }

  return (
    <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded">
      Logout
    </button>
  );
}
