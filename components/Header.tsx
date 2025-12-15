"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const navItems = [
  { label: "Проблема", href: "#problem" },
  { label: "Решение", href: "#solution" },
  { label: "Как работает", href: "#how" },
  { label: "Возможности", href: "#features" },
  { label: "Калькулятор", href: "#calculator" },
  { label: "Цена", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
  { label: "Контакты", href: "#contacts" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b-2 border-black/5 transition-colors ${
        scrolled ? "bg-white/90 backdrop-blur" : "bg-white/80 backdrop-blur"
      }`}
      aria-label="Главная навигация"
    >
      <div className="container mx-auto flex flex-col gap-3 px-3 py-3 md:flex-row md:items-center md:gap-4 lg:px-6">
        <div className="flex shrink-0 items-center gap-3">
          <div className="h-12 w-12 rounded-full border-[3px] border-black bg-yellow flex items-center justify-center shadow-pill text-lg font-display tracking-tight">
            SC
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-semibold uppercase tracking-[0.12em]">
              SpecCheck
            </span>
            <span className="text-xs text-black/70">
              ИИ-бот для контроля измерений
            </span>
          </div>
        </div>

        <div className="flex min-w-0 flex-1 items-center justify-start gap-2 overflow-x-auto whitespace-nowrap pb-1 pr-3 flex-nowrap md:justify-end lg:gap-2 lg:overflow-visible lg:pr-6">
          {navItems.map((item) => (
            <motion.div
              key={item.href}
              className="shrink-0"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
            >
              <Link
                href={item.href}
                className="pill whitespace-nowrap border-[2px] border-black bg-white px-3 py-2 text-sm hover:-translate-y-0.5 hover:shadow-pill"
                aria-label={`Перейти к секции ${item.label}`}
              >
                {item.label}
              </Link>
            </motion.div>
          ))}
          <motion.div
            className="shrink-0"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.05 }}
          >
            <Link
              href="#lead"
              className="pill whitespace-nowrap border-[3px] border-black bg-black px-5 py-2 text-sm text-white hover:-translate-y-1 hover:shadow-pill"
              aria-label="Запросить демо"
            >
              Запросить демо
            </Link>
          </motion.div>
        </div>
      </div>
    </header>
  );
}
