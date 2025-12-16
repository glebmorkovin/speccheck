"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { calculateRoi, ROI_CONSTANTS } from "@/utils/roi";
import { formatCurrency } from "@/utils/currency";

const fade = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.55 },
};

export default function RoiCalculator() {
  const [drawings, setDrawings] = useState("10");
  const [employees, setEmployees] = useState("10");
  const [rate, setRate] = useState("2500");
  const [time, setTime] = useState("7");

  const result = useMemo(
    () =>
      calculateRoi({
        drawingsPerEmployee: toNumber(drawings, 10),
        employees: toNumber(employees, 1),
        rate: toNumber(rate, 0),
        time: toNumber(time, 1),
      }),
    [drawings, employees, rate, time],
  );

  return (
    <section
      id="calculator"
      className="section"
      aria-labelledby="calculator-title"
    >
      <div className="container mx-auto max-w-6xl space-y-10">
        <div className="flex flex-col gap-3">
          <h2 id="calculator-title" className="section-title">
            Калькулятор ROI
          </h2>
          <p className="section-subtitle">
            Быстрый расчёт экономии труда и окупаемости SpecCheck с учётом
            подписки и лимитов.
          </p>
        </div>

        <motion.div
          className="grid grid-cols-1 gap-8 lg:grid-cols-12"
          {...fade}
        >
          <div className="card bg-white p-6 lg:col-span-5">
            <h3 className="font-display text-2xl uppercase leading-tight">
              Вводные
            </h3>
            <div className="mt-4 grid grid-cols-1 gap-4">
              <NumberInput
                label="Сколько чертежей в среднем обрабатывает один сотрудник в месяц"
                ariaLabel="Среднее число чертежей на сотрудника"
                value={drawings}
                setValue={setDrawings}
                fallback={10}
              />
              <NumberInput
                label="Количество сотрудников (N)"
                ariaLabel="Количество сотрудников"
                value={employees}
                setValue={setEmployees}
                fallback={1}
              />
              <NumberInput
                label="Ставка в час (R)"
                ariaLabel="Ставка в час"
                value={rate}
                setValue={setRate}
                fallback={2500}
                maxLength={6}
              />
              <NumberInput
                label="Время на 1 чертёж, минут (T)"
                ariaLabel="Время на один чертеж"
                value={time}
                setValue={setTime}
                fallback={7}
              />
            </div>
            <div className="mt-4 flex flex-wrap gap-2 text-xs text-black/70">
              <span className="pill border-[2px] border-black bg-sky px-3 py-1">
                Лицензия: {formatCurrency(ROI_CONSTANTS.license)}
              </span>
              <span className="pill border-[2px] border-black bg-yellow px-3 py-1">
                Подписка: {formatCurrency(ROI_CONSTANTS.subscription)}/мес
              </span>
              <span className="pill border-[2px] border-black bg-lavender px-3 py-1">
                Лимит: {ROI_CONSTANTS.subscriptionLimit} чертежей/мес
              </span>
            </div>
            {result.warning && (
              <div className="mt-4 rounded-[18px] border-[2px] border-black bg-orange/70 px-4 py-3 text-sm font-semibold text-black">
                {result.warning}
              </div>
            )}
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 gap-4 md:grid-cols-2">
            <ResultCard
              title="Расчётный объём чертежей/мес"
              value={result.rawDrawings.toLocaleString("ru-RU")}
              color="bg-lavender"
            />
            <ResultCard
              title="Учтённый объём (лимит подписки)"
              value={result.cappedDrawings.toLocaleString("ru-RU")}
              color="bg-sky"
            />
            <ResultCard
              title="Экономия на труде/мес"
              value={formatCurrency(result.laborSavingsMonth)}
              color="bg-mint"
            />
            <ResultCard
              title="Чистая экономия/мес (минус подписка)"
              value={formatCurrency(result.netSavingsMonth)}
              color="bg-yellow"
            />
            <ResultCard
              title="Окупаемость лицензии (мес)"
              value={
                result.paybackMonths
                  ? `${result.paybackMonths} мес`
                  : "Не окупается при текущих вводных"
              }
              color="bg-orange"
            />
            <ResultCard
              title="Чистый эффект за 12 месяцев"
              value={formatCurrency(result.yearlyEffect)}
              color="bg-blue"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function ResultCard({
  title,
  value,
  color,
}: {
  title: string;
  value: string;
  color: string;
}) {
  return (
    <div className={`card ${color} p-5`}>
      <p className="text-sm font-semibold uppercase tracking-[0.08em]">
        {title}
      </p>
      <p className="mt-3 font-display text-3xl uppercase leading-tight">
        {value}
      </p>
    </div>
  );
}

function NumberInput({
  label,
  ariaLabel,
  value,
  setValue,
  fallback,
  maxLength = 4,
}: {
  label: string;
  ariaLabel: string;
  value: string;
  setValue: (v: string) => void;
  fallback: number;
  maxLength?: number;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-sm font-semibold uppercase tracking-[0.08em]">
        {label}
      </span>
      <input
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        value={value}
        onChange={(e) => setValue(e.target.value.slice(0, maxLength))}
        onBlur={() => {
          if (value.trim() === "") setValue(String(fallback));
        }}
        className="rounded-[18px] border-[2px] border-black px-4 py-3 text-base shadow-inner focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue/40"
        aria-label={ariaLabel}
      />
    </label>
  );
}

function toNumber(raw: string, fallback: number) {
  const cleaned = raw.replace(/[^\d.,]/g, "").replace(",", ".");
  const num = parseFloat(cleaned);
  if (!Number.isFinite(num) || num <= 0) return fallback;
  return Math.min(1000, num);
}
