'use client';

import { usePathname, useRouter } from 'next/navigation';
import { Search, MessageCircle, User, BookOpen, DollarSign, Star, Plus, Menu, LogOut, ThumbsUp } from 'lucide-react';
import clsx from 'clsx';
import React, { useState, useRef, useEffect } from 'react';
import Button from './Button';

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setProfileOpen(false);
      }
    }
    if (profileOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [profileOpen]);

  const navItems = [
    { label: 'Topics', icon: BookOpen, href: '/topics' },
    { label: 'Salaries', icon: DollarSign, href: '/salaries' },
    { label: 'Reviews', icon: Star, href: '/reviews' },
  ];

  // Profile dropdown items
  const profileMenu = [
    { label: 'Profile', icon: User, href: '/profile' },
    { label: 'Reviews', icon: Star, href: '/my-reviews' },
    { label: 'Upvotes', icon: ThumbsUp, href: '/upvotes' },
  ];

  const handleSignOut = () => {
    document.cookie = 'wisp-token=; path=/; max-age=0';
    router.push('/landing');
  };

  return (
    <nav className="w-full px-8 bg-white border-b border-[#E5E5E5] flex items-center justify-between font-sans h-16 relative">
      {/* Left: Logo + Search */}
      <div className="flex items-center space-x-4 min-w-0 flex-shrink-0">
        <div className="flex items-center space-x-2 cursor-pointer" onClick={() => router.push('/')}> 
          <img src="/wisp.png" alt="Wisp Logo" width={32} height={32} />
        </div>
        {/* Search Bar */}
        <div className="relative flex items-center w-48 sm:w-64">
          <Search size={18} className="absolute left-3 text-[#aaa]" />
          <input
            type="text"
            placeholder="Search"
            className="pl-10 pr-4 py-2 rounded-full border border-[#E5E5E5] bg-[#f9f9f9] text-base text-[#222] placeholder:text-[#aaa] focus:outline-none focus:ring-2 focus:ring-black transition-colors duration-200 w-full"
            style={{ fontFamily: 'sohne, Helvetica Neue, Arial, sans-serif' }}
          />
        </div>
      </div>

      {/* Desktop Center: Nav Items (icons above text) */}
      <div className="flex-1 hidden lg:flex justify-center items-center space-x-10">
        {navItems.map(({ label, icon: Icon, href }) => {
          const isActive = pathname === href;
          return (
            <button
              key={href}
              onClick={() => router.push(href)}
              className={clsx(
                'flex flex-col items-center justify-center px-3 py-1.5 rounded-full text-base font-medium transition-colors duration-200',
                isActive
                  ? 'bg-black text-white'
                  : 'text-[#222] hover:bg-[#f3f3f3] hover:text-black'
              )}
              style={{ fontFamily: 'sohne, Helvetica Neue, Arial, sans-serif', minWidth: 70 }}
            >
              <Icon size={22} className="mb-1" />
              <span className="text-xs font-semibold tracking-wide">{label}</span>
            </button>
          );
        })}
      </div>

      {/* Desktop Right: Create Post, Feedback, Profile */}
      <div className="hidden lg:flex items-center space-x-4">
        {/* Create Post - minimalistic */}
        <button
          onClick={() => router.push('/create-post')}
          className="flex items-center space-x-1 px-3 py-1.5 rounded-full border border-[#E5E5E5] bg-white text-[#222] text-sm font-medium hover:bg-[#f3f3f3] transition-colors duration-200 shadow-sm"
          style={{ fontFamily: 'sohne, Helvetica Neue, Arial, sans-serif' }}
        >
          <Plus size={16} />
          <span>Create</span>
        </button>
        {/* Feedback Icon */}
        <button className="p-2 rounded-full hover:bg-[#f3f3f3] transition-colors duration-200" title="Feedback">
          <MessageCircle size={22} className="text-[#222]" />
        </button>
        {/* Profile Icon with Dropdown */}
        <div className="relative">
          <button
            ref={profileRef}
            onClick={() => setProfileOpen((open) => !open)}
            className="p-2 rounded-full hover:bg-[#f3f3f3] transition-colors duration-200"
            title="Profile"
            aria-haspopup="true"
            aria-expanded={profileOpen}
          >
            <User size={22} className="text-[#222]" />
          </button>
          {profileOpen && (
            <div
              ref={dropdownRef}
              className="absolute right-0 mt-2 w-48 bg-white border border-[#E5E5E5] rounded-lg shadow-lg z-50 py-2 animate-fade-in"
            >
              {profileMenu.map(({ label, icon: Icon, href }) => (
                <button
                  key={href}
                  onClick={() => { setProfileOpen(false); router.push(href); }}
                  className="w-full flex items-center px-4 py-2 text-sm text-[#222] hover:bg-[#f3f3f3] transition-colors duration-200"
                  style={{ fontFamily: 'sohne, Helvetica Neue, Arial, sans-serif' }}
                >
                  <Icon size={18} className="mr-2" />
                  {label}
                </button>
              ))}
              <div className="border-t border-[#E5E5E5] my-2" />
              <button
                onClick={handleSignOut}
                className="w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-[#f3f3f3] transition-colors duration-200"
              >
                <LogOut size={18} className="mr-2" />
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Hamburger */}
      <div className="flex lg:hidden items-center">
        <button onClick={() => setMobileOpen(!mobileOpen)} className="p-2 rounded-full hover:bg-[#f3f3f3] transition-colors duration-200">
          <Menu size={26} className="text-[#222]" />
        </button>
      </div>

      {/* Mobile Drawer (slide-in from right, 30% width, blurred overlay) */}
      {mobileOpen && (
        <>
          {/* Blurred Overlay */}
          <div
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
            onClick={() => setMobileOpen(false)}
          />
          {/* Drawer */}
          <div className="fixed top-0 right-0 h-full w-1/3 max-w-xs bg-white border-l border-[#E5E5E5] shadow-lg z-50 flex flex-col items-center py-4 space-y-4 animate-slide-in">
            {navItems.map(({ label, icon: Icon, href }) => {
              const isActive = pathname === href;
              return (
                <button
                  key={href}
                  onClick={() => { setMobileOpen(false); router.push(href); }}
                  className={clsx(
                    'flex flex-col items-center justify-center px-3 py-2 rounded-full text-base font-medium transition-colors duration-200 w-11/12',
                    isActive
                      ? 'bg-black text-white'
                      : 'text-[#222] hover:bg-[#f3f3f3] hover:text-black'
                  )}
                  style={{ fontFamily: 'sohne, Helvetica Neue, Arial, sans-serif' }}
                >
                  <Icon size={22} className="mb-1" />
                  <span className="text-xs font-semibold tracking-wide">{label}</span>
                </button>
              );
            })}
            {/* Create Post (Mobile) - minimalistic */}
            <button
              onClick={() => { setMobileOpen(false); router.push('/create-post'); }}
              className="flex items-center space-x-1 px-3 py-1.5 rounded-full border border-[#E5E5E5] bg-white text-[#222] text-sm font-medium hover:bg-[#f3f3f3] transition-colors duration-200 shadow-sm w-11/12 justify-center"
              style={{ fontFamily: 'sohne, Helvetica Neue, Arial, sans-serif' }}
            >
              <Plus size={16} />
              <span>Create</span>
            </button>
            <div className="flex items-center space-x-4 mt-2">
              <button className="p-2 rounded-full hover:bg-[#f3f3f3] transition-colors duration-200" title="Feedback">
                <MessageCircle size={22} className="text-[#222]" />
              </button>
              {/* Profile Icon with Dropdown (Mobile) */}
              <div className="relative">
                <button
                  onClick={() => setProfileOpen((open) => !open)}
                  className="p-2 rounded-full hover:bg-[#f3f3f3] transition-colors duration-200"
                  title="Profile"
                  aria-haspopup="true"
                  aria-expanded={profileOpen}
                >
                  <User size={22} className="text-[#222]" />
                </button>
                {profileOpen && (
                  <div
                    className="absolute right-0 mt-2 w-48 bg-white border border-[#E5E5E5] rounded-lg shadow-lg z-50 py-2 animate-fade-in"
                  >
                    {profileMenu.map(({ label, icon: Icon, href }) => (
                      <button
                        key={href}
                        onClick={() => { setProfileOpen(false); setMobileOpen(false); router.push(href); }}
                        className="w-full flex items-center px-4 py-2 text-sm text-[#222] hover:bg-[#f3f3f3] transition-colors duration-200"
                        style={{ fontFamily: 'sohne, Helvetica Neue, Arial, sans-serif' }}
                      >
                        <Icon size={18} className="mr-2" />
                        {label}
                      </button>
                    ))}
                    <div className="border-t border-[#E5E5E5] my-2" />
                    <button
                      onClick={() => { setProfileOpen(false); setMobileOpen(false); handleSignOut(); }}
                      className="w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-[#f3f3f3] transition-colors duration-200"
                    >
                      <LogOut size={18} className="mr-2" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </nav>
  );
};

export default Navbar;
