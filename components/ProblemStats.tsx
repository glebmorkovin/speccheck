"use client";

import { motion } from "framer-motion";

const stats = [
  {
    title: "До 20% времени",
    text: "На анализ чертежей и заполнение документов уходит до 20% рабочего времени.",
    color: "bg-orange",
  },
  {
    title: "~5% изделий в брак",
    text: "Из-за ошибок контроля около 5% изделий в месяц уходят в брак.",
    color: "bg-yellow",
  },
  {
    title: "50 000 ₽/мес + потери",
    text: "В среднем на работу инженера уходит 50 000 ₽ в месяц + потери ~5% от стоимости изделий.",
    color: "bg-lavender",
  },
];

export default function ProblemStats() {
  return (
    <section id="problem" className="section" aria-labelledby="problem-title">
      <div className="container mx-auto max-w-6xl space-y-8">
        <div className="flex flex-col gap-4">
          <h2 id="problem-title" className="section-title">
            Проблема
          </h2>
          <p className="section-subtitle">
            Ручной контроль чертежей тормозит производство, даёт ошибки и
            съедает бюджет.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {stats.map((item, idx) => (
            <motion.div
              key={item.title}
              className={`card ${item.color} p-6`}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
            >
              <h3 className="font-display text-3xl uppercase leading-tight">
                {item.title}
              </h3>
              <p className="mt-4 text-base text-black/80">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
