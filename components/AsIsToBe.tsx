"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

type Card = {
  title: string;
  text: string;
  color: string;
  image: string;
  placeholder: string;
};

const cards: Card[] = [
  {
    title: "AS-IS",
    text: "Ручное заполнение накладной по чертежу, повторные сверки, человеческий фактор.",
    color: "bg-sky",
    image: "/as-is.png",
    placeholder: "AS-IS diagram",
  },
  {
    title: "TO-BE",
    text: "Загрузка в Telegram-бот → автоматизация извлечения параметров и подбора инструментов → быстрее и стабильнее.",
    color: "bg-mint",
    image: "/to-be.png",
    placeholder: "TO-BE diagram",
  },
];

function useImageAvailability(src: string) {
  const [available, setAvailable] = useState(false);

  useEffect(() => {
    let active = true;
    fetch(src, { method: "HEAD" })
      .then((res) => {
        if (active) setAvailable(res.ok);
      })
      .catch(() => setAvailable(false));
    return () => {
      active = false;
    };
  }, [src]);

  return available;
}

export default function AsIsToBe() {
  return (
    <section className="section" aria-labelledby="as-to-be-title">
      <div className="container mx-auto max-w-6xl space-y-10">
        <div className="flex flex-col gap-3">
          <h2 id="as-to-be-title" className="section-title">
            AS-IS → TO-BE
          </h2>
          <p className="section-subtitle">
            Убираем рутину и снижаем риск ошибок на этапе подготовки контроля.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {cards.map((card, idx) => (
            <AsToBeCard key={card.title} card={card} idx={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}

function AsToBeCard({ card, idx }: { card: Card; idx: number }) {
  const available = useImageAvailability(card.image);
  return (
    <motion.div
      className={`card ${card.color} p-6 flex flex-col gap-4`}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, delay: idx * 0.06 }}
    >
      <div className="flex items-center justify-between">
        <h3 className="font-display text-3xl uppercase leading-tight">
          {card.title}
        </h3>
        <span className="pill border-[3px] border-black bg-white px-3 py-1 text-xs">
          {idx === 0 ? "До" : "После"}
        </span>
      </div>
      <p className="text-base text-black/80">{card.text}</p>
      <div className="relative mt-auto flex-1 rounded-[22px] border-[3px] border-black bg-white/70 p-3">
        {available ? (
          <Image
            src={card.image}
            alt={card.placeholder}
            fill
            className="object-contain rounded-[18px]"
            sizes="(min-width: 1024px) 400px, 100vw"
          />
        ) : (
          <div className="flex h-full min-h-[220px] items-center justify-center rounded-[18px] bg-black/5 text-sm font-semibold uppercase text-black/60">
            {card.placeholder}
          </div>
        )}
      </div>
    </motion.div>
  );
}
