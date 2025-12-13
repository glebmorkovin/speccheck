import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";
import { LeadRecord, leadsMemory } from "@/lib/leads-store";

export async function GET() {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const filePath = path.join(process.cwd(), "data", "leads.jsonl");
  let fileLeads: LeadRecord[] = [];

  try {
    const content = await fs.promises.readFile(filePath, "utf8");
    const lines = content
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);
    fileLeads = lines.slice(-50).map((line) => JSON.parse(line));
  } catch (error) {
    // file may be absent in dev — that's ok
  }

  return NextResponse.json({
    memory: leadsMemory,
    file: fileLeads,
  });
}
