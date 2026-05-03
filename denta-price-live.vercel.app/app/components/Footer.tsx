'use client';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-black text-white py-2 sm:py-3 text-[8px] sm:text-[10px] font-black uppercase border-t border-gray-900">
      <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 px-4">
        <Link href="/offer" className="hover:underline">Оферта</Link>
        <span className="text-gray-500">·</span>
        <Link href="/rules" className="hover:underline">Правила</Link>
        <span className="text-gray-500">·</span>
        <Link href="/tariffs" className="hover:underline">Тарифы</Link>
        <span className="text-gray-500">·</span>
        <Link href="/privacy" className="hover:underline">Конфиденциальность</Link>
        <span className="text-gray-500">·</span>
        <Link href="/refund" className="hover:underline">Возврат</Link>
        <span className="text-gray-500">·</span>
        <Link href="/contacts" className="hover:underline">Контакты</Link>
        <span className="text-gray-500 mx-2">·</span>
        <span>
          <span className="text-[#00BFFF]">DENTAPRICE</span> © 2026
        </span>
      </div>
    </footer>
  );
}
