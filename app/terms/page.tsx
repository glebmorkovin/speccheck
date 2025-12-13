export const metadata = {
  title: "Условия использования — SpecCheck",
  description: "Условия использования и оферта для сайта SpecCheck.",
};

export default function TermsPage() {
  return (
    <main className="container mx-auto max-w-4xl space-y-6 px-4 py-16">
      <h1 className="font-display text-5xl uppercase leading-tight">
        Условия использования / Оферта
      </h1>
      <section className="space-y-3">
        <h2 className="font-display text-3xl uppercase">1. Общие положения</h2>
        <p className="text-black/80">
          Сайт SpecCheck носит информационный характер. Цель — познакомить с
          продуктом “ИИ-бот для контроля измерений” и собрать заявки для
          демонстрации и обсуждения внедрения.
        </p>
      </section>
      <section className="space-y-3">
        <h2 className="font-display text-3xl uppercase">2. Не публичная оферта</h2>
        <p className="text-black/80">
          Заявка через сайт не является публичной офертой. Финальные условия
          сотрудничества, цены и SLA обсуждаются индивидуально и фиксируются в
          договоре.
        </p>
      </section>
      <section className="space-y-3">
        <h2 className="font-display text-3xl uppercase">3. Права на материалы</h2>
        <p className="text-black/80">
          Тексты, дизайн и материалы сайта принадлежат владельцам SpecCheck. Их
          нельзя копировать или использовать без явного разрешения.
        </p>
      </section>
      <section className="space-y-3">
        <h2 className="font-display text-3xl uppercase">4. Ответственность</h2>
        <p className="text-black/80">
          Мы стремимся к актуальности информации, но не гарантируем абсолютную
          полноту. Владельцы сайта не несут ответственность за любые убытки,
          возникшие из-за использования информации без последующего договора.
        </p>
      </section>
      <section className="space-y-3">
        <h2 className="font-display text-3xl uppercase">5. Ограничения</h2>
        <p className="text-black/80">
          Используя сайт, вы соглашаетесь не пытаться нарушить его работу,
          защищённость данных или использовать форму в целях спама.
        </p>
      </section>
      <section className="space-y-3">
        <h2 className="font-display text-3xl uppercase">6. Контакты</h2>
        <p className="text-black/80">
          Для вопросов по условиям:{" "}
          <a href="mailto:hello@speccheck.site" className="underline">
            hello@speccheck.site
          </a>{" "}
          или телефоны на странице контактов.
        </p>
      </section>
    </main>
  );
}
