import { createServerFn } from "@tanstack/react-start";
import { EMAIL } from "@/lib/site";

export type LeadInput = {
  kind: "service" | "estimate" | "hoa";
  name: string;
  phone: string;
  email?: string;
  details?: string;
  company?: string;
  property?: string;
  extra?: string;
  website?: string;
};

export async function emailLeadFromBrowser(data: LeadInput) {
  const subject =
    data.kind === "hoa"
      ? `HOA / property manager request from ${data.name}`
      : data.kind === "estimate"
        ? `Estimate request from ${data.name}`
        : `Service request from ${data.name}`;
  try {
    const response = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(EMAIL)}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        _subject: subject,
        _template: "table",
        _captcha: "false",
        _replyto: data.email || undefined,
        name: data.name,
        phone: data.phone,
        email: data.email || "not provided",
        company: data.company || "",
        property: data.property || "",
        details: [data.extra, data.details].filter(Boolean).join("\n\n") || "None provided",
        form: data.kind,
      }),
    });
    return response.ok;
  } catch {
    return false;
  }
}

function clean(value: unknown, max = 500) {
  return String(value ?? "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, max);
}

export const sendLead = createServerFn({ method: "POST" })
  .validator((input: unknown): LeadInput => {
    const data = (input ?? {}) as Partial<LeadInput>;
    const kind = data.kind === "estimate" || data.kind === "hoa" ? data.kind : "service";
    const name = clean(data.name, 120);
    const phone = clean(data.phone, 40);
    if (name.length < 2 || phone.replace(/\D/g, "").length < 10) {
      throw new Error("Name and a reachable phone number are required.");
    }
    return {
      kind,
      name,
      phone,
      email: clean(data.email, 160),
      details: clean(data.details, 2000),
      company: clean(data.company, 160),
      property: clean(data.property, 200),
      extra: clean(data.extra, 400),
      website: clean(data.website, 80),
    };
  })
  .handler(async ({ data }) => {
    if (data.website) return { ok: true as const };

    const subject =
      data.kind === "hoa"
        ? `HOA / property manager request from ${data.name}`
        : data.kind === "estimate"
          ? `Estimate request from ${data.name}`
          : `Service request from ${data.name}`;

    const record = {
      ...data,
      website: undefined,
      subject,
      to: EMAIL,
      createdAt: new Date().toISOString(),
    };

    const { appendFile, mkdir } = await import("node:fs/promises");
    const path = await import("node:path");
    const dir = path.join(process.cwd(), "data");
    await mkdir(dir, { recursive: true });
    await appendFile(path.join(dir, "leads.jsonl"), `${JSON.stringify(record)}\n`, "utf8");

    const response = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(EMAIL)}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        _subject: subject,
        _template: "table",
        _captcha: "false",
        _replyto: data.email || undefined,
        name: data.name,
        phone: data.phone,
        email: data.email || "not provided",
        company: data.company || "",
        property: data.property || "",
        details: [data.extra, data.details].filter(Boolean).join("\n\n") || "None provided",
        form: data.kind,
      }),
    });

    if (!response.ok) return { ok: true as const, emailed: false as const };
    return { ok: true as const, emailed: true as const };
  });
