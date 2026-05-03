'use client';

import Link from 'next/link';

interface MobileHeaderProps {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
}

export default function MobileHeader({ isMobileMenuOpen, setIsMobileMenuOpen }: MobileHeaderProps) {
  return (
    <header className="sticky top-0 z-50 flex h-[56px] items-center justify-between border-b border-gray-200 bg-white px-4 lg:hidden">
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="p-2"
        aria-label="Меню"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
      <div className="text-[18px] font-black text-[#0070f3] uppercase">DentaPrice</div>
      <Link
        href="/login"
        className="rounded-none border-2 border-[#0070f3] px-4 py-1 text-sm font-black text-[#0070f3] uppercase"
      >
        Кіру
      </Link>
    </header>
  );
}
