"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t-2 border-black/10 bg-white/90 py-8">
      <div className="container mx-auto flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full border-[3px] border-black bg-yellow flex items-center justify-center font-display text-lg">
            SC
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-semibold uppercase tracking-[0.1em]">
              SpecCheck
            </span>
            <span className="text-xs text-black/70">
              ИИ-бот для контроля измерений
            </span>
          </div>
        </div>
        <div className="flex items-center gap-4 text-sm font-semibold">
          <Link
            href="/privacy"
            className="pill border-[2px] border-black bg-white px-4 py-2"
            aria-label="Политика конфиденциальности"
          >
            Privacy
          </Link>
          <Link
            href="/terms"
            className="pill border-[2px] border-black bg-white px-4 py-2"
            aria-label="Условия использования"
          >
            Terms
          </Link>
          <span className="text-black/60">
            © {new Date().getFullYear()} SpecCheck
          </span>
        </div>
      </div>
    </footer>
  );
}
