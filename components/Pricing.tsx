"use client";

import { motion } from "framer-motion";

const plans = [
  {
    title: "Базовая лицензия",
    price: "50 000 ₽",
    text: "Использование продукта без ограничений на 12 месяцев с доступом к полному функционалу системы.",
    color: "bg-blue",
  },
  {
    title: "Подписка на поддержку",
    price: "10 000 ₽/месяц",
    text: "До 500 обработанных чертежей/мес + круглосуточная техническая поддержка и профессиональный онбординг.",
    color: "bg-orange",
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="section" aria-labelledby="pricing-title">
      <div className="container mx-auto max-w-6xl space-y-8">
        <div className="flex flex-col gap-3">
          <h2 id="pricing-title" className="section-title">
            Цена
          </h2>
          <p className="section-subtitle">
            Честная модель: лицензия + поддержка с лимитом 500 чертежей в месяц.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {plans.map((plan, idx) => (
            <motion.div
              key={plan.title}
              className={`card ${plan.color} p-6`}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, delay: idx * 0.05 }}
            >
              <h3 className="font-display text-3xl uppercase leading-tight">
                {plan.title}
              </h3>
              <p className="mt-4 text-2xl font-semibold">{plan.price}</p>
              <p className="mt-3 text-base text-black/80">{plan.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
