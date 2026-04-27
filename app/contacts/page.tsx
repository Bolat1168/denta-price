'use client';
import { useState } from 'react';
import Footer from '@/app/components/Footer';
import DesktopHeader from '@/app/components/DesktopHeader';
import MobileHeader from '@/app/components/MobileHeader';

export default function ContactsPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="w-full min-h-screen flex flex-col bg-white font-sans">
      <DesktopHeader />
      <MobileHeader isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />
      <main className="flex-grow p-8 max-w-4xl mx-auto">
        <h1 className="text-3xl font-black mb-6">Контакты</h1>
        <p className="mb-2"><strong>Юридический адрес:</strong> г. Алматы, пр. Достык, д. 121/3</p>
        <p className="mb-2"><strong>Телефон:</strong> +7 (727) 123-45-67</p>
        <p className="mb-2"><strong>Email:</strong> info@dentaprice.kz</p>
      </main>
      <Footer />
    </div>
  );
}
