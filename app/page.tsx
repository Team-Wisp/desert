

import Navbar from '@/components/Navbar';

export default function Page() {
  return (
    <div className="min-h-screen bg-[#F5F5F5] text-[#111111]">
      <Navbar />
      <main className="p-6">
        <h1 className="text-2xl font-semibold">Welcome to TeamWisp</h1>
        <p className="text-[#555555] mt-2">This is your main dashboard.</p>
        {/* Add more dashboard components below as needed */}
      </main>
    </div>
  );
}
