'use client';

import { usePathname, useRouter } from 'next/navigation';
import { Home, DollarSign, Star } from 'lucide-react';
import clsx from 'clsx';

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();

  const navItems = [
    { label: 'Home', icon: Home, href: '/' },
    { label: 'Salaries', icon: DollarSign, href: '/salaries' },
    { label: 'Reviews', icon: Star, href: '/reviews' },
  ];

  const handleLogout = () => {
    document.cookie = 'wisp-token=; path=/; max-age=0';
    router.push('/landing');
  };

  return (
    <nav className="w-full px-6 py-4 bg-white border-b border-[#E5E5E5] flex items-center justify-between">
      {/* Left: Logo + Name */}
      <div className="flex items-center space-x-2 cursor-pointer" onClick={() => router.push('/')}>
      <img src="/wisp.png" alt="Wisp Logo" width={28} height={28} />
        <span className="text-xl font-bold text-[#111111]">Wisp</span>
      </div>

      {/* Center: Nav Items */}
      <div className="flex space-x-6 items-center text-sm font-medium">
        {navItems.map(({ label, icon: Icon, href }) => {
          const isActive = pathname === href;
          return (
            <button
              key={href}
              onClick={() => router.push(href)}
              className={clsx(
                'flex items-center space-x-1 transition',
                isActive
                  ? 'text-black border-b-2 border-black pb-1'
                  : 'text-[#777] hover:text-black'
              )}
            >
              <Icon size={18} />
              <span>{label}</span>
            </button>
          );
        })}
      </div>

      {/* Right: Search + Logout */}
      <div className="flex items-center space-x-4">
        <input
          placeholder="Search"
          className="px-3 py-1.5 rounded-md border border-[#DDD] text-sm focus:outline-none bg-[#F9F9F9] placeholder:text-[#AAA]"
        />
        <button
          onClick={handleLogout}
          className="text-sm px-4 py-1.5 bg-[#111111] text-white rounded hover:bg-[#333]"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
