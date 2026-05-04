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
        <p className="text-gray-600 mb-6">Версия от 04.05.2026</p>

        <div className="space-y-6 text-gray-700">
          <section>
            <h2 className="text-xl font-bold mb-3">1. ОБЩИЕ ПОЛОЖЕНИЯ</h2>
            <p className="mb-2">1.1. Настоящая Политика конфиденциальности (далее — «Политика») действует в отношении всей информации, которую сервис DENTAPRICE (далее — «Сервис») может получить о Пользователе во время использования сайта <strong>https://denta-price.pro</strong> (далее — «Сайт»).</p>
            <p className="mb-2">1.2. Использование Сервиса означает безоговорочное согласие Пользователя с настоящей Политикой.</p>
            <p className="mb-2">1.3. <strong>Оператор персональных данных:</strong></p>
            <div className="bg-gray-50 p-4 my-2 rounded">
              <p>Наименование: <strong>Индивидуальный предприниматель Bayes</strong></p>
              <p>БИН: <strong>680511302143</strong></p>
              <p>Адрес: <strong>Республика Казахстан, г. Алматы, ул. Достык, д. 121/3</strong></p>
              <p>Телефон: <strong>+7 706 734 8706</strong></p>
              <p>Электронная почта: <strong>abilovbbb@gmail.com</strong></p>
            </div>
            <p className="mb-2">1.4. Настоящая Политика разработана в соответствии с <strong>Законом Республики Казахстан «О персональных данных и их защите»</strong> (далее — «Закон»).</p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">2. КАКИЕ ДАННЫЕ МЫ СОБИРАЕМ</h2>
            <p className="mb-2">2.1. Оператор может собирать следующие персональные данные:</p>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse my-2 text-sm">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border p-2 text-left">Категория</th>
                    <th className="border p-2 text-left">Данные</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td className="border p-2">Идентификационные</td><td className="border p-2">Фамилия, имя, отчество (при наличии)</td></tr>
                  <tr><td className="border p-2">Контактные</td><td className="border p-2">Номер телефона, адрес электронной почты</td></tr>
                  <tr><td className="border p-2">Профессиональные</td><td className="border p-2">Специализация, место работы, адрес оказания услуг, стоимость услуг</td></tr>
                  <tr><td className="border p-2">Технические</td><td className="border p-2">IP-адрес, данные cookies, информация о браузере, действия на Сайте</td></tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">3. ЦЕЛИ СБОРА И ОБРАБОТКИ ИНФОРМАЦИИ</h2>
            <p className="mb-2">3.1. Оператор обрабатывает персональные данные в следующих целях:</p>
            <ul className="list-disc pl-6 mb-2 space-y-1">
              <li>идентификация Пользователя;</li>
              <li>предоставление доступа к функционалу Сайта;</li>
              <li>размещение информации о Специалисте;</li>
              <li>связь с Пользователем (техническая поддержка);</li>
              <li>улучшение качества Сервиса;</li>
              <li>направление информационных уведомлений.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">4. ПРАВОВЫЕ ОСНОВАНИЯ ОБРАБОТКИ</h2>
            <p className="mb-2">4.1. Обработка персональных данных осуществляется на основании:</p>
            <ul className="list-disc pl-6 mb-2 space-y-1">
              <li><strong>статьи 10 Закона Республики Казахстан «О персональных данных и их защите»</strong> (согласие субъекта);</li>
              <li>действий, совершаемых Пользователем при регистрации и использовании Сайта, которые признаются согласием на обработку персональных данных.</li>
            </ul>
            <p className="mb-2">4.2. Регистрируясь на Сайте и/или заполняя формы обратной связи, Пользователь дает <strong>согласие на сбор, обработку, хранение и использование</strong> своих персональных данных.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">5. СРОКИ ХРАНЕНИЯ ПЕРСОНАЛЬНЫХ ДАННЫХ</h2>
            <p className="mb-2">5.1. Персональные данные хранятся в течение <strong>5 (пяти) лет</strong> с момента последнего взаимодействия Пользователя с Сайтом.</p>
            <p className="mb-2">5.2. После истечения срока хранения или отзыва согласия персональные данные подлежат уничтожению.</p>
            <p className="mb-2">5.3. Пользователь вправе отозвать согласие на обработку персональных данных, направив письменное уведомление на адрес электронной почты: <strong>abilovbbb@gmail.com</strong>.</p>
            <p className="mb-2">5.4. В случае отзыва согласия Оператор удаляет учетную запись и персональные данные Пользователя в течение <strong>10 (десяти) рабочих дней</strong>.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">6. ЗАЩИТА ПЕРСОНАЛЬНЫХ ДАННЫХ</h2>
            <p className="mb-2">6.1. Оператор принимает необходимые организационные и технические меры для защиты персональных данных от неправомерного или случайного доступа, уничтожения, изменения, блокирования, копирования, распространения, а также от иных неправомерных действий третьих лиц.</p>
            <p className="mb-2">6.2. Оператор не передает персональные данные третьим лицам, за исключением случаев, предусмотренных законодательством Республики Казахстан.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">7. ПРАВА ПОЛЬЗОВАТЕЛЯ</h2>
            <p className="mb-2">7.1. Пользователь имеет право:</p>
            <ul className="list-disc pl-6 mb-2 space-y-1">
              <li><strong>на получение информации</strong> — о своих персональных данных, обрабатываемых Оператором;</li>
              <li><strong>на уточнение</strong> — внесение изменений в персональные данные при их неполноте или неточности;</li>
              <li><strong>на удаление</strong> — уничтожение персональных данных (отзыв согласия);</li>
              <li><strong>на блокирование</strong> — временное прекращение обработки персональных данных.</li>
            </ul>
            <p className="mb-2">7.2. Для реализации своих прав Пользователь направляет запрос на адрес электронной почты: <strong>abilovbbb@gmail.com</strong>.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">8. ИСПОЛЬЗОВАНИЕ COOKIES</h2>
            <p className="mb-2">8.1. Сайт использует файлы cookies для:</p>
            <ul className="list-disc pl-6 mb-2 space-y-1">
              <li>аутентификации Пользователя;</li>
              <li>хранения настроек и предпочтений;</li>
              <li>сбора статистики использования Сайта;</li>
              <li>улучшения работы и функциональности Сервиса.</li>
            </ul>
            <p className="mb-2">8.2. Пользователь может отключить cookies в настройках браузера, но это может ограничить функциональность Сайта.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">9. ПЕРЕДАЧА ДАННЫХ ТРЕТЬИМ ЛИЦАМ</h2>
            <p className="mb-2">9.1. Оператор передает персональные данные третьим лицам в следующих случаях:</p>
            <ul className="list-disc pl-6 mb-2 space-y-1">
              <li>по требованию государственных органов — в соответствии с законодательством РК;</li>
              <li>платежному партнеру (банк) — для проведения оплаты (только платежные данные);</li>
              <li>с согласия Пользователя — письменное или электронное согласие.</li>
            </ul>
            <p className="mb-2">9.2. Платежные данные (информация о банковской карте) обрабатываются платежным партнером. Оператор не хранит полные данные банковских карт.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">10. ИЗМЕНЕНИЕ ПОЛИТИКИ КОНФИДЕНЦИАЛЬНОСТИ</h2>
            <p className="mb-2">10.1. Оператор вправе вносить изменения в настоящую Политику в одностороннем порядке.</p>
            <p className="mb-2">10.2. Изменения вступают в силу с момента размещения новой редакции на Сайте по адресу: <strong>https://denta-price.pro/privacy</strong></p>
            <p className="mb-2">10.3. Использование Сайта после опубликования изменений означает согласие Пользователя с новой редакцией Политики.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">11. КОНТАКТНАЯ ИНФОРМАЦИЯ</h2>
            <p className="mb-1"><strong>Индивидуальный предприниматель Bayes</strong></p>
            <p className="mb-1">БИН: <strong>680511302143</strong></p>
            <p className="mb-1">Адрес: <strong>Республика Казахстан, г. Алматы, ул. Достык, д. 121/3</strong></p>
            <p className="mb-1">Телефон: <strong>+7 706 734 8706</strong></p>
            <p className="mb-1">Электронная почта: <strong>abilovbbb@gmail.com</strong></p>
          </section>

          <div className="border-t pt-6 mt-8 text-center text-gray-500 text-xs">
            <p>© 2026 Denta-Price. Все права защищены.</p>
            <p>Дата публикации: 04.05.2026 | Версия: 2.0</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}