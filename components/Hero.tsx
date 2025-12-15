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
      <div className="container mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 lg:grid-cols-12">
        <motion.div
          className="lg:col-span-7 space-y-6"
          {...fadeUp}
        >
          <div className="inline-flex w-full max-w-4xl items-center justify-center gap-3 rounded-full border-[3px] border-black bg-yellow px-6 py-3 text-sm font-semibold uppercase tracking-[0.14em] shadow-pill md:text-base lg:text-lg">
            SPECCHECK · ИИ-БОТ ДЛЯ КОНТРОЛЯ ИЗМЕРЕНИЙ
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
          <div className="relative rounded-[32px] border-[3px] border-black bg-gradient-to-br from-sky via-white to-lavender p-6 shadow-card overflow-hidden">
            <div className="absolute inset-2 rounded-[26px] border-[2px] border-black/30 pointer-events-none" />
            <div className="relative flex min-h-[360px] flex-col justify-between gap-6">
              <div className="flex justify-between items-center">
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
                {pictos.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center gap-2 rounded-full border-[3px] border-black bg-white px-3 py-2 text-sm shadow-pill"
                  >
                    <span aria-hidden className="flex h-8 w-8 items-center justify-center rounded-full border-[2px] border-black bg-sky/60">
                      {item.icon}
                    </span>
                    <span className="font-semibold">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

const pictos = [
  {
    label: "Автоматизация",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5 text-black" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" />
      </svg>
    ),
  },
  {
    label: "Точность",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5 text-black" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 20L12 4l8 16H4z" />
        <path d="M10 16h4" />
      </svg>
    ),
  },
  {
    label: "ИИ",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5 text-black" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="5" y="5" width="14" height="14" rx="3" />
        <path d="M9 9h6M9 12h6M9 15h4" />
      </svg>
    ),
  },
  {
    label: "Скорость",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5 text-black" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 13l12-8-4 8 8 0-12 8 4-8H4z" />
      </svg>
    ),
  },
];
