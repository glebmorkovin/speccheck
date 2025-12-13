"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const fadeUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.6, ease: "easeOut" },
};

export default function Hero() {
  return (
    <section className="relative section" aria-labelledby="hero-title">
      <div className="container mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 lg:grid-cols-12">
        <motion.div
          className="lg:col-span-7 space-y-6"
          {...fadeUp}
        >
          <div className="inline-flex items-center gap-3 rounded-full border-[3px] border-black bg-yellow px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] shadow-pill">
            SpecCheck · ИИ-бот для контроля измерений
          </div>
          <h1
            id="hero-title"
            className="font-display text-5xl leading-[0.9] tracking-tight uppercase md:text-7xl"
          >
            ИИ-БОТ ДЛЯ <br /> КОНТРОЛЯ ИЗМЕРЕНИЙ
          </h1>
          <p className="max-w-2xl text-lg md:text-xl text-black/80">
            Загружайте чертёж в Telegram — получайте контрольные размеры и
            список измерительного инструмента за минуты.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="#calculator"
              className="pill border-[3px] border-black bg-black px-6 py-3 text-base text-white hover:-translate-y-1 hover:shadow-pill"
              aria-label="Перейти к калькулятору экономии"
            >
              Посчитать экономию
            </Link>
            <Link
              href="#how"
              className="pill border-[3px] border-black bg-white px-6 py-3 text-base hover:-translate-y-1 hover:shadow-pill"
              aria-label="Посмотреть как работает бот"
            >
              Смотреть как работает
            </Link>
          </div>
          <div className="flex flex-wrap gap-4 text-sm text-black/70">
            <span className="pill border-[2px] border-black bg-sky px-4 py-2">
              Telegram-first
            </span>
            <span className="pill border-[2px] border-black bg-lavender px-4 py-2">
              CV · AI · Automation
            </span>
            <span className="pill border-[2px] border-black bg-mint px-4 py-2">
              SpecCheck — быстрее и стабильнее
            </span>
          </div>
        </motion.div>

        <motion.div
          className="lg:col-span-5"
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.1 }}
        >
          <div className="relative rounded-[32px] border-[3px] border-black bg-gradient-to-br from-sky via-white to-lavender p-6 shadow-card">
            <div className="absolute inset-2 rounded-[26px] border-[2px] border-black/30 pointer-events-none" />
            <div className="relative flex min-h-[360px] flex-col justify-between gap-6">
              <div className="flex justify-between">
                <div className="pill border-[3px] border-black bg-orange px-4 py-2 text-sm text-white shadow-pill">
                  Постер SpecCheck
                </div>
                <div className="pill border-[3px] border-black bg-white px-3 py-2 text-sm">
                  AI inside
                </div>
              </div>
              <div className="space-y-3">
                <p className="font-display text-4xl uppercase leading-tight tracking-tight">
                  Telegram-бот <br /> анализирует чертёж <br /> и собирает
                  контроль
                </p>
                <p className="text-base text-black/80">
                  Автоматическое извлечение размеров, подбор измерительного
                  инструмента, готовый список без рутины.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                {["⚙️", "📐", "🤖", "🚀"].map((icon) => (
                  <span
                    key={icon}
                    className="pill border-[3px] border-black bg-white px-3 py-2 text-xl shadow-pill"
                    aria-hidden
                  >
                    {icon}
                  </span>
                ))}
              </div>
              <div className="absolute -left-6 -bottom-6 h-16 w-16 rotate-6 rounded-full border-[3px] border-black bg-yellow shadow-pill" />
              <div className="absolute -right-4 -top-6 h-14 w-14 -rotate-6 rounded-3xl border-[3px] border-black bg-mint shadow-card" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
