"use client";

import { motion } from "framer-motion";

const contacts = [
  {
    name: "Чупалов Егор",
    phone: "+7 989 579 1580",
    telegram: "@pavelson_e",
    color: "bg-lavender",
  },
  {
    name: "Морковин Глеб",
    phone: "+7 904 641 5167",
    telegram: "@ghhshka",
    color: "bg-mint",
  },
];

export default function Contacts() {
  return (
    <section id="contacts" className="section" aria-labelledby="contacts-title">
      <div className="container mx-auto max-w-6xl space-y-8">
        <div className="flex flex-col gap-3">
          <h2 id="contacts-title" className="section-title">
            Контакты
          </h2>
          <p className="section-subtitle">
            Пишите или звоните — обсудим внедрение под ваш процесс контроля.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {contacts.map((contact, idx) => (
            <motion.div
              key={contact.phone}
              className={`card ${contact.color} p-6 flex flex-col gap-3`}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, delay: idx * 0.05 }}
            >
              <h3 className="font-display text-3xl uppercase leading-tight">
                {contact.name}
              </h3>
              <p className="text-lg font-semibold">{contact.phone}</p>
              <div className="flex flex-wrap gap-3">
                <a
                  href={`tel:${contact.phone.replace(/\s|\+/g, "")}`}
                  className="pill border-[3px] border-black bg-black px-4 py-2 text-sm text-white hover:-translate-y-1 hover:shadow-pill"
                  aria-label={`Позвонить ${contact.name}`}
                >
                  Позвонить
                </a>
                <a
                  href={`https://t.me/${contact.telegram.replace("@", "")}`}
                  className="pill border-[3px] border-black bg-white px-4 py-2 text-sm hover:-translate-y-1 hover:shadow-pill"
                  aria-label={`Написать в Telegram ${contact.name}`}
                >
                  Написать в TG {contact.telegram}
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
