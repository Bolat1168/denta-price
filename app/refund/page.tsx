export default function RefundPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-black mb-8">Политика возврата денежных средств</h1>
      <p className="text-gray-600 mb-6">Версия: 1.0 | Дата публикации: 03.04.2026</p>

      <div className="space-y-8 text-gray-700">
        <section>
          <h2 className="text-xl font-bold mb-3">1. ОБЩИЕ ПОЛОЖЕНИЯ</h2>
          <p className="mb-2">1.1. Настоящая Политика возврата денежных средств (далее — «Политика») устанавливает порядок и основания возврата денежных средств, уплаченных Специалистами за услуги продвижения на Сайте <strong>https://denta-price.pro</strong>.</p>
          <p className="mb-2">1.2. Политика является неотъемлемой частью Публичной оферты, размещенной по адресу: <strong>https://denta-price.pro/offer</strong>.</p>
          <div className="bg-red-50 border-l-4 border-red-500 p-4 my-4">
            <p><strong>1.3. Все оплаты, произведенные Специалистами, являются окончательными и невозвратными, за исключением случаев, прямо предусмотренных настоящей Политикой.</strong></p>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-3">2. ОСНОВАНИЯ ДЛЯ ВОЗВРАТА</h2>
          <p className="mb-2">2.1. Возврат производится ТОЛЬКО в следующих случаях:</p>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse my-4 text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-3 text-left">№</th>
                  <th className="border p-3 text-left">Основание</th>
                  <th className="border p-3 text-left">Условия</th>
                  <th className="border p-3 text-left">Сумма возврата</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border p-3">1</td>
                  <td className="border p-3"><strong>Техническая ошибка</strong></td>
                  <td className="border p-3">Двойное списание одной и той же операции в результате сбоя платежной системы или сайта</td>
                  <td className="border p-3">100% излишне уплаченной суммы</td>
                </tr>
                <tr>
                  <td className="border p-3">2</td>
                  <td className="border p-3"><strong>Невозможность размещения по вине Исполнителя</strong></td>
                  <td className="border p-3">Сбой сервера, в результате которого слот не был предоставлен ни одному из оплативших, и услуга не была оказана</td>
                  <td className="border p-3">100% суммы оплаты</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-3">3. СЛУЧАИ, НЕ ПОДЛЕЖАЩИЕ ВОЗВРАТУ</h2>
          <p className="mb-2">3.1. Возврат НЕ производится в следующих случаях:</p>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse my-4 text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-3 text-left">№</th>
                  <th className="border p-3 text-left">Ситуация</th>
                  <th className="border p-3 text-left">Объяснение</th>
                </tr>
              </thead>
              <tbody>
                <tr><td className="border p-3">1</td><td className="border p-3"><strong>Вытеснение другим специалистом</strong></td><td className="border p-3">Специалист был вытеснен в течение 15 минут после оплаты. Это коммерческий риск, принимаемый при оплате</td></tr>
                <tr><td className="border p-3">2</td><td className="border p-3"><strong>Короткое время показа</strong></td><td className="border p-3">Слот был вытеснен через несколько минут или секунд после оплаты. Продолжительность показа не гарантируется</td></tr>
                <tr><td className="border p-3">3</td><td className="border p-3"><strong>Отсутствие пациентов</strong></td><td className="border p-3">Специалист не получил пациентов в период показа. Оплата производится за возможность показа, а не за гарантированного пациента</td></tr>
                <tr><td className="border p-3">4</td><td className="border p-3"><strong>Добровольный отказ</strong></td><td className="border p-3">Специалист самостоятельно отказался от размещения после оплаты</td></tr>
                <tr><td className="border p-3">5</td><td className="border p-3"><strong>Низкая конверсия</strong></td><td className="border p-3">Специалист не удовлетворен количеством полученных заявок или пациентов</td></tr>
                <tr><td className="border p-3">6</td><td className="border p-3"><strong>Некорректные настройки</strong></td><td className="border p-3">Специалист неправильно указал геолокацию, услуги или сегмент, что повлияло на видимость</td></tr>
                <tr><td className="border p-3">7</td><td className="border p-3"><strong>Изменение цен конкурентами</strong></td><td className="border p-3">Конкуренты повысили ставки, и слот был потерян</td></tr>
                <tr><td className="border p-3">8</td><td className="border p-3"><strong>Истечение срока размещения</strong></td><td className="border p-3">Слот не был вытеснен, услуга считается оказанной в полном объеме</td></tr>
                <tr><td className="border p-3">9</td><td className="border p-3"><strong>Нарушение условий оферты</strong></td><td className="border p-3">Информация специалиста была удалена по основаниям, предусмотренным п. 3.3 Публичной оферты</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-3">4. ПОРЯДОК ОСУЩЕСТВЛЕНИЯ ВОЗВРАТА</h2>
          <p className="mb-2">4.1. Для инициирования возврата Специалист должен:</p>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse my-4 text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-3 text-left">Шаг</th>
                  <th className="border p-3 text-left">Действие</th>
                  <th className="border p-3 text-left">Срок</th>
                </tr>
              </thead>
              <tbody>
                <tr><td className="border p-3">1</td><td className="border p-3">Направить письменное заявление на адрес <strong>abilovbbb@gmail.com</strong> с пометкой «Возврат средств»</td><td className="border p-3">В течение 3 (трех) рабочих дней с момента оплаты</td></tr>
                <tr><td className="border p-3">2</td><td className="border p-3">Указать в заявлении: ФИО, дату и сумму оплаты, основание для возврата, подтверждающие скриншоты (при наличии)</td><td className="border p-3">—</td></tr>
                <tr><td className="border p-3">3</td><td className="border p-3">Дождаться рассмотрения заявления</td><td className="border p-3">До 10 (десяти) рабочих дней</td></tr>
              </tbody>
            </table>
          </div>
          <p className="mb-2">4.2. Исполнитель вправе запросить дополнительные материалы для подтверждения оснований возврата.</p>
          <p className="mb-2">4.3. Возврат осуществляется на ту же банковскую карту или счет, с которого производилась оплата, в течение 10 (десяти) рабочих дней после принятия положительного решения.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-3">5. КОМИССИЯ ПЛАТЕЖНОГО ПАРТНЕРА</h2>
          <p className="mb-2">5.1. При возврате денежных средств комиссия платежного партнера (банка, платежной системы) <strong>не возвращается</strong>, если она была удержана при проведении платежа.</p>
          <p className="mb-2">5.2. Исполнитель не получает и не удерживает указанную комиссию. Комиссия взимается платежной системой за проведение транзакции.</p>
          <p className="mb-2">5.3. В случае возврата по основанию «Техническая ошибка» (п. 2.1 №1) Исполнитель компенсирует комиссию платежного партнера за свой счет.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-3">6. ПСИХОЛОГИЧЕСКОЕ ОБОСНОВАНИЕ (ДЛЯ СПЕЦИАЛИСТА)</h2>
          <h3 className="text-lg font-semibold mb-2 mt-4">6.1. Почему деньги не возвращаются при вытеснении</h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse my-4 text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-3 text-left">Аргумент</th>
                  <th className="border p-3 text-left">Объяснение</th>
                </tr>
              </thead>
              <tbody>
                <tr><td className="border p-3"><strong>Это аукционная модель</strong></td><td className="border p-3">Вы платите за возможность занять слот. Если другой специалист готов заплатить больше — он получает слот. Ваша ставка остается в системе.</td></tr>
                <tr><td className="border p-3"><strong>Это стимулирует конкуренцию</strong></td><td className="border p-3">Если бы деньги возвращались, каждый мог бы делать ставки без риска. Это разрушило бы аукцион.</td></tr>
                <tr><td className="border p-3"><strong>Это честно</strong></td><td className="border p-3">Вы видите цвет кнопки (зеленый, желтый, красный) перед оплатой. Желтый и красный означают, что слот уже оплачен. Вы принимаете риск, когда платите.</td></tr>
                <tr><td className="border p-3"><strong>Это дешевле, чем простой</strong></td><td className="border p-3">Пустой час стоит вам 10 000–100 000 ₸. Ставка 1 000–25 000 ₸ — это страховка от простоя.</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-3">7. ПРИМЕРЫ</h2>
          <h3 className="text-lg font-semibold mb-2 mt-4">7.1. Пример 1: Вытеснение (возврат НЕ производится)</h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse my-2 text-sm">
              <thead><tr className="bg-gray-100"><th className="border p-2 text-left">Действие</th><th className="border p-2 text-left">Результат</th></tr></thead>
              <tbody>
                <tr><td className="border p-2">Специалист А оплатил слот 5 000 ₸ (зеленая кнопка)</td><td className="border p-2">Получил слот</td></tr>
                <tr><td className="border p-2">Через 5 минут Специалист Б оплатил 5 500 ₸ (желтая кнопка)</td><td className="border p-2">Специалист А вытеснен</td></tr>
                <tr><td className="border p-2">Специалист А требует возврата</td><td className="border p-2"><strong>Отказано.</strong> Это коммерческий риск, принятый при оплате</td></tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-lg font-semibold mb-2 mt-4">7.2. Пример 2: Короткое время показа (возврат НЕ производится)</h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse my-2 text-sm">
              <thead><tr className="bg-gray-100"><th className="border p-2 text-left">Действие</th><th className="border p-2 text-left">Результат</th></tr></thead>
              <tbody>
                <tr><td className="border p-2">Специалист А оплатил слот 5 000 ₸</td><td className="border p-2">Получил слот</td></tr>
                <tr><td className="border p-2">Через 2 минуты Специалист Б оплатил 5 500 ₸</td><td className="border p-2">Специалист А вытеснен</td></tr>
                <tr><td className="border p-2">Специалист А требует возврата, потому что «показ был всего 2 минуты»</td><td className="border p-2"><strong>Отказано.</strong> Продолжительность показа не гарантируется</td></tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-lg font-semibold mb-2 mt-4">7.3. Пример 3: Техническая ошибка (возврат производится)</h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse my-2 text-sm">
              <thead><tr className="bg-gray-100"><th className="border p-2 text-left">Действие</th><th className="border p-2 text-left">Результат</th></tr></thead>
              <tbody>
                <tr><td className="border p-2">Специалист А нажал «Оплатить» один раз</td><td className="border p-2">Списались 5 000 ₸ дважды</td></tr>
                <tr><td className="border p-2">Специалист А обратился с заявлением</td><td className="border p-2"><strong>Возврат 5 000 ₸.</strong> Комиссия платежного партнера компенсируется Исполнителем</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-3">8. ИТОГОВАЯ ТАБЛИЦА</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse my-4 text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-3 text-left">Ситуация</th>
                  <th className="border p-3 text-left">Возврат?</th>
                </tr>
              </thead>
              <tbody>
                <tr><td className="border p-3">Вытеснение другим специалистом</td><td className="border p-3">❌ НЕТ</td></tr>
                <tr><td className="border p-3">Короткое время показа (2–3 минуты)</td><td className="border p-3">❌ НЕТ</td></tr>
                <tr><td className="border p-3">Отсутствие пациентов</td><td className="border p-3">❌ НЕТ</td></tr>
                <tr><td className="border p-3">Добровольный отказ</td><td className="border p-3">❌ НЕТ</td></tr>
                <tr><td className="border p-3">Некорректные настройки геолокации</td><td className="border p-3">❌ НЕТ</td></tr>
                <tr><td className="border p-3">Техническая ошибка (двойное списание)</td><td className="border p-3">✅ ДА</td></tr>
                <tr><td className="border p-3">Невозможность размещения по вине Исполнителя</td><td className="border p-3">✅ ДА</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-3">9. КОНТАКТЫ ДЛЯ ОБРАЩЕНИЙ</h2>
          <p className="mb-1"><strong>По вопросам возврата денежных средств:</strong></p>
          <p className="mb-1"><strong>Индивидуальный предприниматель Bayes</strong></p>
          <p className="mb-1">Электронная почта: <strong>abilovbbb@gmail.com</strong> (с пометкой «Возврат средств»)</p>
          <p className="mb-1">Телефон: <strong>+7 706 734 8706</strong></p>
        </section>

        <div className="border-t pt-6 mt-8 text-center text-gray-500 text-xs">
          <p>© 2026 Denta-Price. Все права защищены.</p>
          <p>Дата публикации: 03.04.2026 | Версия: 1.0</p>
        </div>
      </div>
    </div>
  );
}