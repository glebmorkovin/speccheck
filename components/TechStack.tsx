"use client";

import { motion } from "framer-motion";

const stack = [
  {
    title: "Компьютерное зрение",
    text: "CV-модель для автоматического извлечения размеров, обозначений и технических параметров с чертежей любой сложности.",
    color: "bg-blue",
  },
  {
    title: "База инструментов",
    text: "Включает параметры доступных измерительных средств и интеллектуально сопоставляет их с найденными размерами.",
    color: "bg-lavender",
  },
  {
    title: "Telegram API",
    text: "Интеграция через популярный мессенджер обеспечивает мгновенный доступ без установки дополнительного ПО.",
    color: "bg-mint",
  },
];

export default function TechStack() {
  return (
    <section className="section" aria-labelledby="stack-title">
      <div className="container mx-auto max-w-6xl space-y-8">
        <div className="flex flex-col gap-3">
          <h2 id="stack-title" className="section-title">
            Технологическая основа
          </h2>
          <p className="section-subtitle">
            Внутри — компьютерное зрение, живая база инструментов и интеграция
            через Telegram.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {stack.map((item, idx) => (
            <motion.div
              key={item.title}
              className={`card ${item.color} p-6`}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, delay: idx * 0.05 }}
            >
              <h3 className="font-display text-3xl uppercase leading-tight">
                {item.title}
              </h3>
              <p className="mt-3 text-base text-black/80">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
