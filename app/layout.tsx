import type { Metadata } from "next";
import { Bebas_Neue, Inter } from "next/font/google";
import "./globals.css";

const bebas = Bebas_Neue({
  subsets: ["latin", "cyrillic"],
  weight: "400",
  variable: "--font-bebas",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  display: "swap",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  title: "ИИ-бот для контроля измерений",
  description:
    "SpecCheck — ИИ-бот для контроля измерений: загружайте чертёж в Telegram, получайте контрольные размеры и список инструмента за минуты.",
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "ИИ-бот для контроля измерений — SpecCheck",
    description:
      "Telegram-бот, который автоматизирует извлечение контрольных размеров и подбирает измерительный инструмент.",
    url: "/",
    siteName: "SpecCheck",
    locale: "ru_RU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SpecCheck — ИИ-бот для контроля измерений",
    description:
      "Загружайте чертёж в Telegram и получайте контрольные размеры и список инструмента за минуты.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={`${bebas.variable} ${inter.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
