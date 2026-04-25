'use client';
import React from 'react';
import Link from 'next/link';

export default function DesktopHeader() {
  return (
    <header className="hidden h-[10vh] items-center justify-between border-b border-gray-200 bg-white px-5 lg:flex">
      <div className="text-[2.5vw] font-black tracking-tighter text-[#0070f3] uppercase leading-none">
        DentaPrice
      </div>
      <div className="flex items-center gap-2">
        <span className="text-[#00BFFF] text-xl font-black uppercase tracking-tighter">
          енсаулы?ы?ызды та?да?ыз
        </span>
        <span className="text-gray-400 text-sm font-medium italic">
          / ыбери своего дантиста
        </span>
      </div>
      <Link
        href="/register"
        className="rounded-none bg-[#0070f3] px-8 py-3 text-[1.1vw] font-black uppercase text-white"
      >
        іру / егистрация
      </Link>
    </header>
  );
}
