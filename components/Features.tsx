"use client";

import { motion } from "framer-motion";

const features = [
  {
    title: "Универсальность форматов",
    text: "PDF, JPEG, PNG, DXF и другие популярные технические форматы.",
    color: "bg-sky",
  },
  {
    title: "Постоянное обновление",
    text: "Автоматическая актуализация базы инструментов с учётом новых измерительных средств и стандартов.",
    color: "bg-yellow",
  },
  {
    title: "Интеллектуальное распознавание",
    text: "Определение типовых обозначений, единиц измерений и технологических допусков.",
    color: "bg-orange",
  },
  {
    title: "Кастомизация",
    text: "Адаптация под специфику конкретного предприятия и отрасли.",
    color: "bg-lavender",
  },
];

export default function Features() {
  return (
    <section
      id="features"
      className="section"
      aria-labelledby="features-title"
    >
      <div className="container mx-auto max-w-6xl space-y-8">
        <div className="flex flex-col gap-3">
          <h2 id="features-title" className="section-title">
            Возможности
          </h2>
          <p className="section-subtitle">
            Всё, что нужно для стабильного контроля без лишних движений.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {features.map((feature, idx) => (
            <motion.div
              key={feature.title}
              className={`card ${feature.color} p-6`}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, delay: idx * 0.05 }}
            >
              <h3 className="font-display text-3xl uppercase leading-tight">
                {feature.title}
              </h3>
              <p className="mt-3 text-base text-black/80">{feature.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
