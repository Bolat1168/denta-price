export default function RulesPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-black mb-8">Правила использования сайта DENTA-PRICE</h1>
      <p className="text-gray-600 mb-6">г. Алматы | Дата публикации: 04.05.2026 | Версия: 2.0</p>

      <div className="space-y-8 text-gray-700">
        <section>
          <h2 className="text-xl font-bold mb-3">1. ОБЩИЕ ПОЛОЖЕНИЯ</h2>
          <p className="mb-2">1.1. Настоящие Правила устанавливают порядок использования Сайта <strong>https://denta-price.pro</strong> (далее — «Сайт») и являются неотъемлемой частью Публичной оферты, размещенной по адресу: <strong>https://denta-price.pro/offer</strong>.</p>
          <p className="mb-2">1.2. Исполнитель (Оператор Сайта): <strong>Индивидуальный предприниматель Bayes</strong>, БИН: <strong>680511302143</strong>, адрес: <strong>Республика Казахстан, г. Алматы, ул. Достык, д. 121/3</strong>.</p>
          <p className="mb-2">1.3. Используя Сайт, Специалисты и Пользователи (далее — «Заказчики») подтверждают свое согласие с настоящими Правилами.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-3">2. ФУНКЦИОНАЛ САЙТА</h2>
          <h3 className="text-lg font-semibold mb-2 mt-4">2.1. Для Пользователей</h3>
          <p className="mb-2">2.1.1. Пользователь может:</p>
          <ul className="list-disc pl-6 mb-2 space-y-1">
            <li>выбрать услугу;</li>
            <li>выбрать ценовой сегмент (ECONOM, COMFORT, OPTIMUM, PREMIUM, LUXURY);</li>
            <li>выбрать радиус поиска (1 км, 3 км, 6 км, Город);</li>
            <li>ознакомиться с карточками Специалистов (фото, ФИО, услуга, цена);</li>
            <li>связаться со Специалистом через WhatsApp.</li>
          </ul>
          <p className="mb-2">2.1.2. Сайт <strong>не осуществляет запись</strong> к Специалистам. Связь и запись происходят напрямую между Пользователем и Специалистом.</p>

          <h3 className="text-lg font-semibold mb-2 mt-4">2.2. Для Специалистов</h3>
          <p className="mb-2">2.2.1. Специалист может:</p>
          <ul className="list-disc pl-6 mb-2 space-y-1">
            <li>зарегистрироваться и создать профиль;</li>
            <li>добавить услуги с ценами (не менее 3);</li>
            <li>зарегистрировать несколько кабинетов (точек приёма);</li>
            <li>выбрать радиусы продвижения (1 км, 3 км, 6 км, Город);</li>
            <li>участвовать в аукционе за приоритетный показ;</li>
            <li>просматривать статистику показов и переходов;</li>
            <li>пополнять баланс и отслеживать историю платежей.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-3">3. АУКЦИОННЫЙ МЕХАНИЗМ И ВЫТЕСНЕНИЕ</h2>
          
          <h3 className="text-lg font-semibold mb-2 mt-4">3.1. Общая схема</h3>
          <p className="mb-2">3.1.1. В каждом слоте (сочетание услуги, сегмента и радиуса) одновременно может находиться <strong>не более 3 Специалистов</strong> в приоритетном отображении.</p>
          <p className="mb-2">3.1.2. Приоритет отображения определяется на основе <strong>размера добровольной ставки</strong> Специалиста.</p>

          <h3 className="text-lg font-semibold mb-2 mt-4">3.2. Ставка в зависимости от радиуса</h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse my-4 text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-3 text-left">Радиус</th>
                  <th className="border p-3 text-left">Коэффициент</th>
                  <th className="border p-3 text-left">Итоговая ставка</th>
                 </tr>
              </thead>
              <tbody>
                <tr><td className="border p-3">1 км</td><td className="border p-3">0,4</td><td className="border p-3">3,2% от цены услуги</td></tr>
                <tr><td className="border p-3">3 км</td><td className="border p-3">0,6</td><td className="border p-3">4,8% от цены услуги</td></tr>
                <tr><td className="border p-3">6 км</td><td className="border p-3">0,8</td><td className="border p-3">6,4% от цены услуги</td></tr>
                <tr><td className="border p-3">Город</td><td className="border p-3">1,0</td><td className="border p-3">8% от цены услуги</td></tr>
              </tbody>
            </table>
          </div>
          <p className="mb-2"><strong>Формула:</strong> <code>Ставка = Цена услуги × 8% × Коэффициент радиуса</code></p>

          <h3 className="text-lg font-semibold mb-2 mt-4">3.3. Механизм вытеснения</h3>
          <p className="mb-2">3.3.1. Специалист видит текущую максимальную ставку в выбранном слоте.</p>
          <p className="mb-2">3.3.2. Для вытеснения конкурента Специалист может:</p>
          <ul className="list-disc pl-6 mb-2 space-y-1">
            <li><strong>×1,1</strong> — повышение ставки на 10% (стандартное вытеснение);</li>
            <li><strong>×1,3</strong> — повышение ставки на 30% (гарантированное вытеснение).</li>
          </ul>
          <div className="bg-red-50 border-l-4 border-red-500 p-4 my-4">
            <p><strong>3.3.3. Платежи являются невозвратными.</strong> Услуга считается оказанной с момента попадания Специалиста в приоритетную позицию. В случае вытеснения денежные средства не возвращаются.</p>
          </div>

          <h3 className="text-lg font-semibold mb-2 mt-4">3.4. Правила конкуренции</h3>
          <p className="mb-2">3.4.1. Вытеснение работает только внутри одного слота (услуга, сегмент, радиус).</p>
          <p className="mb-2">3.4.2. Разные радиусы не конкурируют между собой. Разные сегменты не конкурируют между собой.</p>
          <p className="mb-2">3.4.3. Специалист может одновременно участвовать в нескольких радиусах. Каждый радиус оплачивается отдельно.</p>

          <h3 className="text-lg font-semibold mb-2 mt-4">3.5. Продолжительность показа</h3>
          <p className="mb-2">3.5.1. Длительность нахождения Специалиста в топ-3 <strong>не фиксирована и не гарантируется</strong>.</p>
          <p className="mb-2">3.5.2. Слот остаётся активным до момента вытеснения другим Специалистом.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-3">4. СЕГМЕНТАЦИЯ</h2>
          <p className="mb-2">4.1. Сегмент (ECONOM, COMFORT, OPTIMUM, PREMIUM, LUXURY) определяется <strong>автоматически</strong> на основе цены услуги, указанной Специалистом.</p>
          <p className="mb-2">4.2. Границы сегментов рассчитываются по формуле:</p>
          <div className="bg-gray-100 p-4 my-4 rounded font-mono text-sm">
            <p>шаг = (макс - мин) / 4</p>
            <p>econom_max = мин + шаг × 1</p>
            <p>comfort_max = мин + шаг × 2</p>
            <p>optimum_max = мин + шаг × 3</p>
            <p>premium_max = мин + шаг × 4</p>
          </div>
          <p className="mb-2">4.3. Сегмент присваивается по правилу:</p>
          <ul className="list-disc pl-6 mb-2 space-y-1">
            <li><strong>ECONOM</strong> — цена ≤ econom_max</li>
            <li><strong>COMFORT</strong> — econom_max &lt; цена ≤ comfort_max</li>
            <li><strong>OPTIMUM</strong> — comfort_max &lt; цена ≤ optimum_max</li>
            <li><strong>PREMIUM</strong> — optimum_max &lt; цена ≤ premium_max</li>
            <li><strong>LUXURY</strong> — цена &gt; premium_max</li>
          </ul>
          <p className="mb-2">4.4. Специалист не может выбрать или изменить сегмент вручную. Сегмент отображается в личном кабинете.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-3">5. ТРЕБОВАНИЯ К СПЕЦИАЛИСТАМ</h2>
          <p className="mb-2">5.1. Специалист <strong>гарантирует</strong>:</p>
          <ul className="list-disc pl-6 mb-2 space-y-1">
            <li>наличие действующей лицензии на медицинскую деятельность (в случаях, предусмотренных законодательством РК);</li>
            <li>достоверность, полноту и актуальность размещаемой информации.</li>
          </ul>
          <p className="mb-2">5.2. Исполнитель <strong>вправе запросить</strong> у Специалиста копии лицензий и иных разрешительных документов.</p>
          <p className="mb-2">5.3. В случае непредоставления документов или выявления нарушения Исполнитель <strong>вправе заблокировать</strong> профиль Специалиста без возврата оплаченных средств.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-3">6. ЗАПРЕЩЁННЫЕ ДЕЙСТВИЯ</h2>
          <p className="mb-2">6.1. Специалисту <strong>запрещается</strong>:</p>
          <ul className="list-disc pl-6 mb-2 space-y-1">
            <li>размещать недостоверную информацию;</li>
            <li>указывать адрес, не соответствующий фактическому месту оказания услуг;</li>
            <li>продвигать услуги, на осуществление которых отсутствует лицензия.</li>
          </ul>
          <p className="mb-2">6.2. Пользователю <strong>запрещается</strong> использовать Сайт для целей, не связанных с поиском стоматологических услуг.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-3">7. ОТВЕТСТВЕННОСТЬ</h2>
          <p className="mb-2">7.1. Исполнитель <strong>не несёт ответственности</strong> за:</p>
          <ul className="list-disc pl-6 mb-2 space-y-1">
            <li>качество медицинских услуг, оказанных Специалистами;</li>
            <li>наличие лицензий у Специалистов;</li>
            <li>достоверность информации, размещённой Специалистами;</li>
            <li>длительность нахождения Специалиста в топ-3;</li>
            <li>споры между Пользователем и Специалистом.</li>
          </ul>
          <p className="mb-2">7.2. Специалист <strong>несёт полную ответственность</strong> за:</p>
          <ul className="list-disc pl-6 mb-2 space-y-1">
            <li>соблюдение лицензионных требований;</li>
            <li>достоверность размещённой информации;</li>
            <li>качество оказанных медицинских услуг;</li>
            <li>разрешение споров с Пользователями.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-3">8. ПРЕТЕНЗИОННЫЙ ПОРЯДОК</h2>
          <p className="mb-2">8.1. Все споры подлежат разрешению в <strong>претензионном порядке</strong>.</p>
          <p className="mb-2">8.2. Срок рассмотрения претензии — <strong>15 (пятнадцать) рабочих дней</strong>.</p>
          <p className="mb-2">8.3. При недостижении согласия спор передаётся в суд по месту нахождения Исполнителя.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-3">9. ИЗМЕНЕНИЕ ПРАВИЛ</h2>
          <p className="mb-2">9.1. Исполнитель вправе изменять настоящие Правила в одностороннем порядке. Изменения вступают в силу с момента публикации на Сайте по адресу: <strong>https://denta-price.pro/rules</strong></p>
          <p className="mb-2">9.2. Использование Сайта после опубликования изменений означает согласие Заказчика с новой редакцией Правил.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-3">10. КОНТАКТНАЯ ИНФОРМАЦИЯ</h2>
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
    </div>
  );
}