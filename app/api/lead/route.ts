import fs from "fs";
import path from "path";
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { z } from "zod";
import { LeadRecord, rememberLead } from "@/lib/leads-store";

const HOUR = 1000 * 60 * 60;
const RATE_LIMIT = 10;
const rateMap = new Map<string, { count: number; reset: number }>();

const leadSchema = z
  .object({
    name: z.string().trim().min(1),
    company: z.string().trim().optional().default(""),
    phone: z.string().trim().optional().default(""),
    email: z.string().trim().optional().default(""),
    comment: z.string().trim().optional().default(""),
    website: z.string().trim().optional().default(""),
  })
  .superRefine((data, ctx) => {
    if (!data.phone && !data.email) {
      ctx.addIssue({
        code: "custom",
        message: "Укажите телефон или email",
      });
    }
    if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      ctx.addIssue({
        code: "custom",
        message: "Некорректный email",
      });
    }
  });

const getClientIp = (req: NextRequest) => {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) {
    const ip = forwarded.split(",")[0]?.trim();
    if (ip) return ip;
  }
  // @ts-ignore NextRequest may expose ip in some runtimes
  return (req as any).ip || "unknown";
};

const checkRateLimit = (ip: string) => {
  const now = Date.now();
  const current = rateMap.get(ip) || { count: 0, reset: now + HOUR };

  if (now > current.reset) {
    current.count = 0;
    current.reset = now + HOUR;
  }

  current.count += 1;
  rateMap.set(ip, current);

  if (current.count > RATE_LIMIT) {
    return false;
  }
  return true;
};

const saveToFile = async (lead: LeadRecord) => {
  try {
    const dataDir = path.join(process.cwd(), "data");
    const filePath = path.join(dataDir, "leads.jsonl");
    await fs.promises.mkdir(dataDir, { recursive: true });
    await fs.promises.appendFile(filePath, `${JSON.stringify(lead)}\n`, "utf8");
  } catch (error) {
    console.error("Не удалось сохранить лид в файл", error);
  }
};

const maybeSendEmail = async (lead: LeadRecord) => {
  const {
    SMTP_HOST,
    SMTP_PORT,
    SMTP_USER,
    SMTP_PASS,
    LEADS_TO_EMAIL,
  } = process.env;

  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS || !LEADS_TO_EMAIL) {
    return;
  }

  try {
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT),
      secure: Number(SMTP_PORT) === 465,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });

    await transporter.sendMail({
      from: `"SpecCheck" <${SMTP_USER}>`,
      to: LEADS_TO_EMAIL,
      subject: "Новая заявка SpecCheck",
      text: renderLeadText(lead),
    });
  } catch (error) {
    console.error("Не удалось отправить email", error);
  }
};

const maybeSendTelegram = async (lead: LeadRecord) => {
  const { TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID } = process.env;
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) return;

  try {
    await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: renderLeadText(lead),
          parse_mode: "HTML",
        }),
      },
    );
  } catch (error) {
    console.error("Не удалось отправить в Telegram", error);
  }
};

const renderLeadText = (lead: LeadRecord) =>
  [
    "Новая заявка SpecCheck",
    `Имя: ${lead.name}`,
    `Компания: ${lead.company || "-"}`,
    `Телефон: ${lead.phone || "-"}`,
    `Email: ${lead.email || "-"}`,
    `Комментарий: ${lead.comment || "-"}`,
    `Источник: ${lead.source}`,
    `Время: ${lead.timestamp}`,
  ].join("\n");

export async function POST(req: NextRequest) {
  const ip = getClientIp(req);
  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: "Слишком много запросов. Попробуйте позже." },
      { status: 429 },
    );
  }

  let parsed;
  try {
    const body = await req.json();
    parsed = leadSchema.parse(body);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Некорректные данные";
    return NextResponse.json({ error: message }, { status: 400 });
  }

  if (parsed.website) {
    return NextResponse.json({ ok: true });
  }

  const lead: LeadRecord = {
    name: parsed.name,
    company: parsed.company,
    phone: parsed.phone,
    email: parsed.email,
    comment: parsed.comment,
    timestamp: new Date().toISOString(),
    source: ip,
  };

  console.log("Новая заявка SpecCheck", lead);
  rememberLead(lead);
  await saveToFile(lead);
  await Promise.all([maybeSendEmail(lead), maybeSendTelegram(lead)]);

  return NextResponse.json({ ok: true });
}
