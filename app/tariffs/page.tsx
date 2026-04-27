export default function TariffsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-black mb-8">Тарифы и условия продвижения DENTA-PRICE</h1>
      <p className="text-gray-600 mb-6">Версия: 1.0 | Дата публикации: 03.04.2026</p>

      <div className="space-y-8 text-gray-700">
        <section>
          <h2 className="text-xl font-bold mb-3">1. ОБЩИЕ ПОЛОЖЕНИЯ</h2>
          <p className="mb-2">1.1. Настоящий документ устанавливает тарифы на услуги по размещению и продвижению информации о Специалистах на Сайте <strong>https://denta-price.pro</strong> и является неотъемлемой частью Публичной оферты, размещенной по адресу: <strong>https://denta-price.pro/offer</strong>.</p>
          <p className="mb-2">1.2. Услуги предоставляются Специалистам на возмездной основе. Стоимость определяется автоматически в зависимости от факторов, указанных в разделе 2 настоящего документа.</p>
          <div className="bg-red-50 border-l-4 border-red-500 p-4 my-4">
            <p><strong>1.3. Все оплаты, произведенные Специалистами за размещение информации на Сайте, являются окончательными и невозвратными</strong>, за исключением случаев технической ошибки (двойное списание) или невозможности размещения по вине Исполнителя (п. 5.2).</p>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-3">2. ФАКТОРЫ, ВЛИЯЮЩИЕ НА СТОИМОСТЬ</h2>
          <p className="mb-2">2.1. Стоимость размещения и продвижения информации о Специалисте определяется автоматически с учетом следующих факторов:</p>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse my-4 text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-3 text-left">Фактор</th>
                  <th className="border p-3 text-left">Описание</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border p-3"><strong>Радиус продвижения</strong></td>
                  <td className="border p-3">Город / 6 км / 3 км / 1 км (независимые системы слотов, вытеснение только внутри своего радиуса)</td>
                </tr>
                <tr>
                  <td className="border p-3"><strong>Спрос (конъюнктура)</strong></td>
                  <td className="border p-3">Текущий уровень спроса в выбранном радиусе, определяемый автоматически на основе активности Специалистов</td>
                </tr>
                <tr>
                  <td className="border p-3"><strong>Сегмент размещения</strong></td>
                  <td className="border p-3">Luxury / Premium / Optimum / Comfort / Econom / Жақында</td>
                </tr>
                <tr>
                  <td className="border p-3"><strong>Статус временного слота</strong></td>
                  <td className="border p-3">Зеленый (свободно) — базовая ставка; Желтый (оплачено в течение 15 минут) — коэффициент 1.1; Красный (две и более оплаты в течение 15 минут) — коэффициент 1.3</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mb-2">2.2. Оплата за продвижение услуги является <strong>автоматически определяемым расчетом, зависящим от конъюнктуры спроса</strong>. Стоимость может изменяться в режиме реального времени в зависимости от активности других Специалистов.</p>
          <p className="mb-2">2.3. Конкретная стоимость отображается Специалисту в личном кабинете перед подтверждением заказа. Факт оплаты означает согласие Специалиста с рассчитанной стоимостью.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-3">3. КОЭФФИЦИЕНТЫ ВЫТЕСНЕНИЯ</h2>
          <p className="mb-2">3.1. При оплате временного слота, который находится в <strong>периоде вытеснения</strong> (желтая или красная кнопка), применяются следующие коэффициенты к базовой ставке:</p>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse my-4 text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-3 text-left">Цвет кнопки (статус слота)</th>
                  <th className="border p-3 text-left">Коэффициент</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border p-3"><span className="inline-block w-4 h-4 bg-yellow-500 rounded-full mr-2 align-middle"></span> Желтая (оплачено 1 раз в течение последних 15 минут)</td>
                  <td className="border p-3"><strong>1.1 (110%)</strong></td>
                </tr>
                <tr>
                  <td className="border p-3"><span className="inline-block w-4 h-4 bg-red-500 rounded-full mr-2 align-middle"></span> Красная (оплачено 2 и более раз в течение последних 15 минут)</td>
                  <td className="border p-3"><strong>1.3 (130%)</strong></td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mb-2">3.2. Стоимость вытеснения рассчитывается по формуле:</p>
          <div className="bg-gray-100 p-4 my-4 rounded text-center font-mono">
            <strong>Базовая ставка × Коэффициент вытеснения</strong>
          </div>
          <p className="mb-2">3.3. <strong>Пример расчета:</strong></p>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse my-4 text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-3 text-left">Статус слота</th>
                  <th className="border p-3 text-left">Базовая ставка</th>
                  <th className="border p-3 text-left">Коэффициент</th>
                  <th className="border p-3 text-left">Итоговая стоимость</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border p-3"><span className="inline-block w-4 h-4 bg-green-500 rounded-full mr-2 align-middle"></span> Зеленая (свободно)</td>
                  <td className="border p-3">5 000 ₸</td>
                  <td className="border p-3">1.0</td>
                  <td className="border p-3">5 000 ₸</td>
                </tr>
                <tr>
                  <td className="border p-3"><span className="inline-block w-4 h-4 bg-yellow-500 rounded-full mr-2 align-middle"></span> Желтая (1 оплата)</td>
                  <td className="border p-3">5 000 ₸</td>
                  <td className="border p-3">1.1</td>
                  <td className="border p-3">5 500 ₸</td>
                </tr>
                <tr>
                  <td className="border p-3"><span className="inline-block w-4 h-4 bg-red-500 rounded-full mr-2 align-middle"></span> Красная (2+ оплаты)</td>
                  <td className="border p-3">5 000 ₸</td>
                  <td className="border p-3">1.3</td>
                  <td className="border p-3">6 500 ₸</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mb-2">3.4. Базовая ставка определяется автоматически на основе рыночной конъюнктуры спроса и может варьироваться в зависимости от выбранного радиуса, сегмента и текущей активности Специалистов.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-3">4. ПОРЯДОК ОПЛАТЫ</h2>
          <p className="mb-2">4.1. Оплата производится в тенге путем <strong>100% предоплаты</strong> с использованием платежных инструментов, доступных на Сайте.</p>
          <p className="mb-2">4.2. Моментом оплаты считается поступление денежных средств на расчетный счет Исполнителя или платежного партнера.</p>
          <div className="bg-red-50 border-l-4 border-red-500 p-4 my-4">
            <p><strong>4.3. После оплаты:</strong></p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Специалист <strong>не имеет права</strong> требовать возврата оплаченной суммы, за исключением случаев, указанных в п. 5.2;</li>
              <li>слот может быть вытеснен другим Специалистом в течение 15 минут;</li>
              <li>в случае вытеснения оплаченная сумма <strong>не возвращается</strong>.</li>
            </ul>
          </div>
          <p className="mb-2">4.4. Специалист, оплачивая слот, понимает и принимает, что:</p>
          <ul className="list-disc pl-6 mb-2 space-y-1">
            <li>продолжительность показа оплаченного слота не фиксирована и не гарантируется;</li>
            <li>слот может быть вытеснен в любой момент после оплаты, в том числе через несколько секунд или минут;</li>
            <li>вытеснение возможно только в пределах одного радиуса (город, 6 км, 3 км или 1 км).</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-3">5. ВОЗВРАТ ДЕНЕЖНЫХ СРЕДСТВ</h2>
          <div className="bg-red-50 border-l-4 border-red-500 p-4 my-4">
            <p><strong>5.1. Общее правило:</strong></p>
            <p><strong>Все оплаты, произведенные Специалистами за размещение информации на Сайте, являются окончательными и невозвратными.</strong></p>
          </div>
          <p className="mb-2">5.2. <strong>Исключения (возврат возможен только в следующих случаях):</strong></p>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse my-4 text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-3 text-left">Основание для возврата</th>
                  <th className="border p-3 text-left">Условия возврата</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border p-3"><strong>Техническая ошибка</strong></td>
                  <td className="border p-3">Двойное списание одной и той же операции. Возвращается излишне уплаченная сумма.</td>
                </tr>
                <tr>
                  <td className="border p-3"><strong>Невозможность размещения по вине Исполнителя</strong></td>
                  <td className="border p-3">Сбой сервера, в результате которого слот не был предоставлен ни одному из оплативших. Возвращается <strong>100% суммы оплаты</strong>.</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mb-2">5.3. <strong>Возврат НЕ производится в следующих случаях:</strong></p>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse my-4 text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-3 text-left">Основание для отказа в возврате</th>
                  <th className="border p-3 text-left">Пояснение</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border p-3"><strong>Вытеснение</strong></td>
                  <td className="border p-3">Другой Специалист оплатил слот в течение 15 минут после оплаты. Специалист, которого вытеснили, <strong>теряет оплаченную сумму</strong>. Это коммерческий риск, принимаемый Специалистом при оплате.</td>
                </tr>
                <tr>
                  <td className="border p-3"><strong>Отсутствие вытеснения</strong></td>
                  <td className="border p-3">Слот закреплен за Специалистом, услуга считается оказанной.</td>
                </tr>
                <tr>
                  <td className="border p-3"><strong>Добровольный отказ</strong></td>
                  <td className="border p-3">Специалист самостоятельно отказался от размещения после оплаты.</td>
                </tr>
                <tr>
                  <td className="border p-3"><strong>Нарушение условий</strong></td>
                  <td className="border p-3">Информация удалена по основаниям, предусмотренным п. 3.3 Публичной оферты.</td>
                </tr>
                <tr>
                  <td className="border p-3"><strong>Короткое время показа</strong></td>
                  <td className="border p-3">Слот был вытеснен через короткий промежуток времени (несколько секунд или минут). Продолжительность показа не гарантируется.</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="bg-red-50 border-l-4 border-red-500 p-4 my-4">
            <p><strong>5.4. Специалист подтверждает, что:</strong></p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>ознакомлен с механизмом вытеснения, включая правило о том, что вытеснение возможно только в пределах одного радиуса;</li>
              <li>понимает, что оплата является невозвратной;</li>
              <li>принимает на себя коммерческий риск возможной потери оплаченной суммы в случае вытеснения;</li>
              <li>понимает, что продолжительность показа оплаченного слота не гарантируется и зависит исключительно от активности других Специалистов (частоты оплат в том же радиусе);</li>
              <li>слот может быть вытеснен в любой момент после оплаты, в том числе через несколько секунд или минут;</li>
              <li>в случае вытеснения денежные средства не возвращаются независимо от времени, прошедшего с момента оплаты до вытеснения.</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-3">6. ИЗМЕНЕНИЕ ТАРИФОВ</h2>
          <p className="mb-2">6.1. Исполнитель вправе изменять настоящие Тарифы в одностороннем порядке. Изменения вступают в силу с момента публикации на Сайте по адресу: <strong>https://denta-price.pro/tariffs</strong></p>
          <p className="mb-2">6.2. Изменения применяются к заказам, оформленным после опубликования изменений. Ранее оплаченные заказы не пересматриваются.</p>
        </section>

        <div className="border-t pt-6 mt-8">
          <h2 className="text-xl font-bold mb-4">Дополнительно: Пояснение для Специалистов</h2>
          <h3 className="text-lg font-semibold mb-3">КАК РАБОТАЕТ СИСТЕМА ПРОДВИЖЕНИЯ DENTA-PRICE</h3>

          <h3 className="text-md font-semibold mt-4 mb-2">1. Радиусы продвижения (независимые)</h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse my-2 text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-2 text-left">Радиус</th>
                  <th className="border p-2 text-left">Где отображается</th>
                </tr>
              </thead>
              <tbody>
                <tr><td className="border p-2"><strong>Город</strong></td><td className="border p-2">Основной поиск (мобильная версия: верхнее, среднее, нижнее окна; десктоп версия: сетка 6 карточек)</td></tr>
                <tr><td className="border p-2"><strong>6 км</strong></td><td className="border p-2">По нажатию «Рядом» — верхнее окно (мобильная) / первая строка (десктоп)</td></tr>
                <tr><td className="border p-2"><strong>3 км</strong></td><td className="border p-2">По нажатию «Рядом» — среднее окно (мобильная) / первая-вторая строка (десктоп)</td></tr>
                <tr><td className="border p-2"><strong>1 км</strong></td><td className="border p-2">По нажатию «Рядом» — нижнее окно (мобильная) / вторая строка (десктоп)</td></tr>
              </tbody>
            </table>
          </div>
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-4">
            <p><strong>Важно:</strong> Вытеснение работает <strong>только внутри своего радиуса</strong>. Оплата в 6 км <strong>не может</strong> вытеснить специалиста в 3 км или 1 км.</p>
          </div>

          <h3 className="text-md font-semibold mt-4 mb-2">2. Цвет кнопки — предупреждение</h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse my-2 text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-2 text-left">Цвет</th>
                  <th className="border p-2 text-left">Что означает</th>
                </tr>
              </thead>
              <tbody>
                <tr><td className="border p-2"><span className="inline-block w-3 h-3 bg-green-500 rounded-full mr-1"></span> <strong>Зеленая</strong></td><td className="border p-2">Слот свободен. Оплата по базовой ставке.</td></tr>
                <tr><td className="border p-2"><span className="inline-block w-3 h-3 bg-yellow-500 rounded-full mr-1"></span> <strong>Желтая</strong></td><td className="border p-2">Слот оплачен в течение последних 15 минут. Чтобы вытеснить, нужно оплатить с коэффициентом <strong>1.1 (110%)</strong>.</td></tr>
                <tr><td className="border p-2"><span className="inline-block w-3 h-3 bg-red-500 rounded-full mr-1"></span> <strong>Красная</strong></td><td className="border p-2">Слот оплачен 2+ раз в течение последних 15 минут. Чтобы вытеснить, нужно оплатить с коэффициентом <strong>1.3 (130%)</strong>.</td></tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-md font-semibold mt-4 mb-2">3. Как происходит вытеснение</h3>
          <ol className="list-decimal pl-6 mb-4 space-y-2">
            <li>Вы оплачиваете слот.</li>
            <li>В течение <strong>15 минут после вашей оплаты</strong> любой другой специалист <strong>в том же радиусе</strong> может оплатить слот с повышающим коэффициентом.</li>
            <li>Если это произошло:
              <ul className="list-disc pl-6 mt-1">
                <li>Вы <strong>теряете слот</strong>;</li>
                <li>Ваша оплата <strong>не возвращается</strong> (коммерческий риск);</li>
                <li>Новый период вытеснения (15 минут) начинается с момента оплаты последнего специалиста.</li>
              </ul>
            </li>
            <li>Если в течение 15 минут после вашей оплаты никто не оплатил слот:
              <ul className="list-disc pl-6 mt-1">
                <li>Слот <strong>закрепляется за вами</strong>;</li>
                <li>Ваше объявление размещается.</li>
              </ul>
            </li>
          </ol>

          <div className="bg-gray-100 p-4 my-4 rounded">
            <p className="font-bold mb-2">4. Пример:</p>
            <p><strong>Радиус 3 км:</strong></p>
            <ol className="list-decimal pl-6 mt-2 space-y-1">
              <li><strong>Специалист А</strong> оплачивает 5000 ₸ (зеленая кнопка).</li>
              <li>Через 5 минут <strong>Специалист Б</strong> (тоже в радиусе 3 км) оплачивает 5500 ₸ (желтая кнопка). — Специалист А <strong>теряет 5000 ₸</strong> (вытеснен).</li>
              <li>Через 10 минут <strong>Специалист В</strong> (тоже в радиусе 3 км) оплачивает 6500 ₸ (красная кнопка). — Специалист Б <strong>теряет 5500 ₸</strong> (вытеснен).</li>
              <li>В течение следующих 15 минут оплат не было. — <strong>Специалист В</strong> получает слот, заплатив 6500 ₸.</li>
            </ol>
          </div>

          <h3 className="text-md font-semibold mt-4 mb-2">5. Как долго будет показываться мое объявление?</h3>
          <p><strong>Никто не знает.</strong> Это зависит от других специалистов.</p>
          <ul className="list-disc pl-6 my-2 space-y-1">
            <li>Если в вашем радиусе <strong>никто не пытается вытеснить</strong> ваш слот, объявление будет показываться <strong>несколько дней, недель или даже месяцев</strong>.</li>
            <li>Если в вашем радиусе <strong>высокая конкуренция</strong>, ваш слот могут вытеснить <strong>через несколько минут или даже секунд</strong> после оплаты.</li>
          </ul>
          <div className="bg-red-50 border-l-4 border-red-500 p-4 my-4">
            <p><strong>Сайт не гарантирует минимальное или максимальное время показа.</strong> Вы платите за <strong>возможность занять слот</strong>. Как долго вы в нем продержитесь — зависит от того, сколько других специалистов готовы заплатить больше.</p>
          </div>

          <h3 className="text-md font-semibold mt-4 mb-2">6. Почему деньги не возвращаются?</h3>
          <p>Это <strong>аукционная модель с невозвратными ставками</strong>. Вы платите за <strong>попытку занять слот</strong>. Если другой специалист готов заплатить больше — он получает слот, а ваша ставка остается в системе. Это стимулирует предлагать конкурентную цену за продвижение.</p>

          <h3 className="text-md font-semibold mt-4 mb-2">7. Что важно знать перед оплатой</h3>
          <ul className="list-disc pl-6 space-y-1">
            <li><strong>Цвет кнопки — это предупреждение</strong>, а не гарантия.</li>
            <li>Если кнопка желтая или красная — кто-то уже оплатил этот слот. Ваша оплата — это попытка вытеснить его.</li>
            <li>Вытеснение может произойти <strong>в любое время в течение 15 минут после вашей оплаты</strong>.</li>
            <li>В случае вытеснения <strong>деньги не возвращаются</strong>.</li>
            <li><strong>Оплачивая слот, вы принимаете этот риск.</strong></li>
          </ul>
        </div>

        <div className="border-t pt-6 mt-8 text-center text-gray-500 text-xs">
          <p>© 2026 Denta-Price. Все права защищены.</p>
          <p>Дата публикации: 03.04.2026 | Версия: 1.0</p>
        </div>
      </div>
    </div>
  );
}