'use client';
import { useState } from 'react';
import Footer from '../components/Footer';
import DesktopHeader from '../components/DesktopHeader';
import MobileHeader from '../components/MobileHeader';

export default function PrivacyPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="w-full min-h-screen flex flex-col bg-white font-sans">
      <DesktopHeader />
      <MobileHeader isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />
      <main className="flex-grow p-8 max-w-4xl mx-auto">
        <h1 className="text-3xl font-black mb-6">Политика конфиденциальности</h1>
        
        <div className="space-y-4 text-gray-700">
          <section>
            <h2 className="text-xl font-bold mb-2">1. Общие положения</h2>
            <p>1.1. Настоящая Политика конфиденциальности действует в отношении всей информации, которую сервис DENTAPRICE может получить о Пользователе во время использования сайта.</p>
            <p>1.2. Использование сервиса означает безоговорочное согласие Пользователя с настоящей Политикой.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-2">2. Какие данные мы собираем</h2>
            <ul className="list-disc pl-5">
              <li>Фамилия и имя</li>
              <li>Контактный телефон</li>
              <li>Адрес электронной почты</li>
              <li>IP-адрес, данные cookies, информация о браузере</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-2">3. Цели сбора и обработки информации</h2>
            <ul className="list-disc pl-5">
              <li>Идентификация Пользователя</li>
              <li>Связь с Пользователем</li>
              <li>Улучшение качества сервиса</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-2">4. Защита персональных данных</h2>
            <p>4.1. Администрация принимает необходимые меры для защиты персональных данных от неправомерного доступа.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-2">5. Права Пользователя</h2>
            <p>5.1. Пользователь имеет право на получение информации о своих данных, их уточнение или удаление.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-2">6. Контактная информация</h2>
            <p>По вопросам обработки персональных данных: [вставь свой email]</p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}