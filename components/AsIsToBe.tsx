"use client";

import Image from "next/image";
import { useEffect, useState, useRef } from "react";
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
    image: "/as-is.svg",
    placeholder: "AS-IS diagram",
  },
  {
    title: "TO-BE",
    text: "Загрузка в Telegram-бот → автоматизация извлечения параметров и подбора инструментов → быстрее и стабильнее.",
    color: "bg-mint",
    image: "/to-be.svg",
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
  const [activeDiagram, setActiveDiagram] = useState<Card | null>(null);
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const dragState = useRef<{ x: number; y: number; ox: number; oy: number } | null>(null);

  const resetView = () => {
    setZoom(1);
    setOffset({ x: 0, y: 0 });
  };

  const onWheelZoom = (e: React.WheelEvent<HTMLDivElement>) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    setZoom((z) => Math.min(3, Math.max(0.5, z + delta)));
  };

  const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (activeDiagram) {
      dragState.current = { x: e.clientX, y: e.clientY, ox: offset.x, oy: offset.y };
    }
  };

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (dragState.current) {
      const dx = e.clientX - dragState.current.x;
      const dy = e.clientY - dragState.current.y;
      setOffset({ x: dragState.current.ox + dx, y: dragState.current.oy + dy });
    }
  };

  const onMouseUp = () => {
    dragState.current = null;
  };

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
            <AsToBeCard
              key={card.title}
              card={card}
              idx={idx}
              onOpen={() => {
                setActiveDiagram(card);
                resetView();
              }}
            />
          ))}
        </div>
      </div>

      {activeDiagram && (
        <div className="fixed inset-0 z-50 flex flex-col bg-black/70 backdrop-blur">
          <div className="flex items-center justify-between px-4 py-3 text-white">
            <div className="font-semibold uppercase tracking-[0.14em]">
              {activeDiagram.title}
            </div>
            <div className="flex items-center gap-2">
              <button
                className="pill border-[2px] border-white/70 bg-white/10 px-3 py-1 text-sm font-semibold hover:bg-white/20"
                onClick={() => setZoom((z) => Math.min(3, z + 0.2))}
              >
                +
              </button>
              <button
                className="pill border-[2px] border-white/70 bg-white/10 px-3 py-1 text-sm font-semibold hover:bg-white/20"
                onClick={() => setZoom((z) => Math.max(0.5, z - 0.2))}
              >
                −
              </button>
              <button
                className="pill border-[2px] border-white/70 bg-white/10 px-3 py-1 text-sm font-semibold hover:bg-white/20"
                onClick={resetView}
              >
                Сброс
              </button>
              <button
                className="pill border-[2px] border-white/70 bg-white px-3 py-1 text-sm font-semibold text-black hover:bg-white/90"
                onClick={() => setActiveDiagram(null)}
              >
                ✕ Закрыть
              </button>
            </div>
          </div>
          <div
            className="relative flex-1 overflow-hidden bg-black/60"
            onWheel={onWheelZoom}
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
            onMouseLeave={onMouseUp}
          >
            <div
              className="absolute left-1/2 top-1/2"
              style={{
                transform: `translate(calc(-50% + ${offset.x}px), calc(-50% + ${offset.y}px)) scale(${zoom})`,
                transition: dragState.current ? "none" : "transform 120ms ease-out",
              }}
            >
              <img
                src={activeDiagram.image}
                alt={activeDiagram.placeholder}
                className="max-h-[80vh] rounded-[24px] border-[3px] border-white shadow-2xl"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function AsToBeCard({
  card,
  idx,
  onOpen,
}: {
  card: Card;
  idx: number;
  onOpen: () => void;
}) {
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
      <div className="relative mt-auto flex-1 rounded-[22px] border-[3px] border-black bg-white/70 p-3 hover:-translate-y-1 transition-transform duration-300">
        {available ? (
          <button
            type="button"
            className="relative block h-full w-full"
            onClick={onOpen}
            aria-label={`Открыть диаграмму ${card.title} в полный экран`}
          >
            <Image
              src={card.image}
              alt={card.placeholder}
              fill
              className="object-contain rounded-[18px]"
              sizes="(min-width: 1024px) 400px, 100vw"
            />
          </button>
        ) : (
          <div className="flex h-full min-h-[220px] items-center justify-center rounded-[18px] bg-black/5 text-sm font-semibold uppercase text-black/60">
            {card.placeholder}
          </div>
        )}
      </div>
    </motion.div>
  );
}
