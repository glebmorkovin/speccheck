"use client";

import { motion } from "framer-motion";

const steps = [
  {
    title: "Загрузка чертежа",
    text: "Telegram-бот принимает чертёж в цифровом формате через удобный мессенджер.",
    color: "bg-orange",
  },
  {
    title: "Автоматическое извлечение",
    text: "Система автоматически извлекает контрольные размеры и параметры из документа.",
    color: "bg-sky",
  },
  {
    title: "Сопоставление инструментов",
    text: "Алгоритм сопоставляет размеры с базой доступных измерительных инструментов.",
    color: "bg-mint",
  },
  {
    title: "Формирование списка",
    text: "Готовый список необходимых инструментов и контрольных размеров для качественного измерения.",
    color: "bg-yellow",
  },
];

export default function SolutionSteps() {
  return (
    <section
      id="solution"
      className="section"
      aria-labelledby="solution-title"
    >
      <div className="container mx-auto max-w-6xl space-y-8">
        <div className="flex flex-col gap-3">
          <h2 id="solution-title" className="section-title">
            Решение — ИИ-бот
          </h2>
          <p className="section-subtitle">
            Сплошная автоматизация: от загрузки чертежа до готового перечня
            контрольных размеров и инструментов.
          </p>
        </div>
        <div id="how" className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {steps.map((step, idx) => (
            <motion.div
              key={step.title}
              className={`card ${step.color} p-6`}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, delay: idx * 0.05 }}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="pill border-[3px] border-black bg-white px-3 py-1 text-xs">
                  Шаг {idx + 1}
                </div>
                <div className="pill border-[3px] border-black bg-black px-3 py-1 text-xs text-white">
                  Telegram
                </div>
              </div>
              <h3 className="mt-4 font-display text-3xl uppercase leading-tight">
                {step.title}
              </h3>
              <p className="mt-3 text-base text-black/80">{step.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
