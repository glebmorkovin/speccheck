export const metadata = {
  title: "Политика конфиденциальности — SpecCheck",
  description: "Политика конфиденциальности сервиса SpecCheck.",
};

export default function PrivacyPage() {
  return (
    <main className="container mx-auto max-w-4xl space-y-6 px-4 py-16">
      <h1 className="font-display text-5xl uppercase leading-tight">
        Политика конфиденциальности
      </h1>
      <p className="text-black/80">
        Настоящая политика описывает порядок обработки персональных данных,
        которые вы передаёте через сайт SpecCheck (ИИ-бот для контроля
        измерений).
      </p>
      <section className="space-y-3">
        <h2 className="font-display text-3xl uppercase">1. Какие данные собираем</h2>
        <p className="text-black/80">
          Данные из формы заявки: имя, компания, телефон, email, комментарий.
          Дополнительно фиксируем технические данные запроса (IP, время) для
          защиты от спама и обеспечения работоспособности.
        </p>
      </section>
      <section className="space-y-3">
        <h2 className="font-display text-3xl uppercase">2. Цели обработки</h2>
        <p className="text-black/80">
          Связаться с вами, предоставить демо и коммерческое предложение по
          SpecCheck, согласовать условия внедрения и поддержку.
        </p>
      </section>
      <section className="space-y-3">
        <h2 className="font-display text-3xl uppercase">3. Срок хранения</h2>
        <p className="text-black/80">
          Данные хранятся до достижения целей обращения и не дольше, чем это
          требуется законодательством или договорённостями сторон.
        </p>
      </section>
      <section className="space-y-3">
        <h2 className="font-display text-3xl uppercase">
          4. Передача третьим лицам
        </h2>
        <p className="text-black/80">
          Мы не передаём данные третьим лицам, кроме сервисов доставки
          сообщений (SMTP, Telegram) при необходимости уведомления о заявке.
        </p>
      </section>
      <section className="space-y-3">
        <h2 className="font-display text-3xl uppercase">5. Контакты для запросов</h2>
        <p className="text-black/80">
          Для запросов на удаление или уточнение данных свяжитесь:{" "}
          <a href="mailto:hello@speccheck.site" className="underline">
            hello@speccheck.site
          </a>{" "}
          или по телефонам, указанным на странице контактов.
        </p>
      </section>
      <section className="space-y-3">
        <h2 className="font-display text-3xl uppercase">6. Согласие пользователя</h2>
        <p className="text-black/80">
          Отправляя форму на сайте, вы подтверждаете согласие на обработку
          персональных данных для целей, указанных выше.
        </p>
      </section>
    </main>
  );
}
