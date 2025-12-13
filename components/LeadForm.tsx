"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { motion } from "framer-motion";

type Status = "idle" | "loading" | "success" | "error";

export default function LeadForm() {
  const [form, setForm] = useState({
    name: "",
    company: "",
    phone: "",
    email: "",
    comment: "",
    website: "",
    consent: false,
  });
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const fallbackMailto = () => {
    const body = encodeURIComponent(
      `Имя: ${form.name}\nКомпания: ${form.company}\nТелефон: ${form.phone}\nEmail: ${form.email}\nКомментарий: ${form.comment}`,
    );
    const mailto = `mailto:hello@speccheck.site?subject=Заявка SpecCheck&body=${body}`;
    window.location.href = mailto;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (!form.name.trim()) {
      setError("Введите имя");
      return;
    }
    if (!form.consent) {
      setError("Нужно согласие на обработку данных");
      return;
    }
    if (!form.phone.trim() && !form.email.trim()) {
      setError("Укажите телефон или email");
      return;
    }
    setStatus("loading");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setStatus("error");
        setError(data?.error || "Ошибка при отправке. Попробуйте ещё раз.");
        return;
      }
      setStatus("success");
      setForm({
        name: "",
        company: "",
        phone: "",
        email: "",
        comment: "",
        website: "",
        consent: false,
      });
    } catch (err: unknown) {
      console.error(err);
      setStatus("error");
      setError("Не удалось отправить заявку. Попробуйте ещё раз.");
      fallbackMailto();
    }
  };

  return (
    <section id="lead" className="section" aria-labelledby="lead-title">
      <div className="container mx-auto max-w-6xl space-y-8">
        <div className="flex flex-col gap-3">
          <h2 id="lead-title" className="section-title">
            Оставьте заявку
          </h2>
          <p className="section-subtitle">
            Получите демо и расчёт внедрения SpecCheck под ваши чертежи и
            формат контроля.
          </p>
        </div>

        <motion.form
          onSubmit={handleSubmit}
          className="card bg-white p-6 grid grid-cols-1 gap-4 md:grid-cols-2"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55 }}
          aria-live="polite"
        >
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold uppercase tracking-[0.08em]">
              Имя*
            </label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="rounded-[18px] border-[2px] border-black px-4 py-3 text-base shadow-inner focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue/40"
              aria-label="Имя"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold uppercase tracking-[0.08em]">
              Компания
            </label>
            <input
              name="company"
              value={form.company}
              onChange={handleChange}
              className="rounded-[18px] border-[2px] border-black px-4 py-3 text-base shadow-inner focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue/40"
              aria-label="Компания"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold uppercase tracking-[0.08em]">
              Телефон (если нет email)
            </label>
            <input
              name="phone"
              type="tel"
              value={form.phone}
              onChange={handleChange}
              className="rounded-[18px] border-[2px] border-black px-4 py-3 text-base shadow-inner focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue/40"
              aria-label="Телефон"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold uppercase tracking-[0.08em]">
              Email (если нет телефона)
            </label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              className="rounded-[18px] border-[2px] border-black px-4 py-3 text-base shadow-inner focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue/40"
              aria-label="Email"
            />
          </div>
          <div className="md:col-span-2 flex flex-col gap-2">
            <label className="text-sm font-semibold uppercase tracking-[0.08em]">
              Комментарий
            </label>
            <textarea
              name="comment"
              value={form.comment}
              onChange={handleChange}
              rows={3}
              className="rounded-[18px] border-[2px] border-black px-4 py-3 text-base shadow-inner focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue/40"
              aria-label="Комментарий"
            />
          </div>
          <div className="hidden">
            <label>
              website
              <input
                name="website"
                value={form.website}
                onChange={handleChange}
                autoComplete="off"
              />
            </label>
          </div>
          <div className="md:col-span-2 flex flex-col gap-4">
            <label className="flex items-center gap-3 text-sm font-medium">
              <input
                type="checkbox"
                name="consent"
                checked={form.consent}
                onChange={handleChange}
                className="h-5 w-5 rounded border-[2px] border-black accent-black focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue/40"
                aria-label="Согласен на обработку персональных данных"
              />
              <span>Согласен на обработку персональных данных</span>
            </label>
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="submit"
                className="pill border-[3px] border-black bg-black px-6 py-3 text-base text-white hover:-translate-y-1 hover:shadow-pill disabled:cursor-not-allowed disabled:opacity-50"
                disabled={status === "loading"}
                aria-label="Отправить заявку"
              >
                {status === "loading" ? "Отправляем..." : "Отправить заявку"}
              </button>
              {status === "success" && (
                <span className="pill border-[3px] border-black bg-mint px-4 py-2 text-sm font-semibold">
                  Заявка отправлена
                </span>
              )}
              {status === "error" && (
                <span className="pill border-[3px] border-black bg-orange px-4 py-2 text-sm font-semibold">
                  Не удалось отправить, открылся mailto-fallback
                </span>
              )}
            </div>
            {error && (
              <p className="text-sm font-semibold text-red-700">{error}</p>
            )}
          </div>
        </motion.form>
      </div>
    </section>
  );
}
