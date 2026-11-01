import { NextResponse } from "next/server";
import { APPLICATION, OFFER, type Question } from "@/lib/content";
import { WAITLIST_LIST } from "@/lib/site";

type ApplicationBody = {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  answers?: Record<string, unknown>;
  channels?: unknown;
  consent?: boolean;
  sourcePage?: string;
  website?: string;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^\+?[0-9\s()-]{7,20}$/;
const QUESTIONS: Question[] = APPLICATION.questions.flat();

const RETRY_ERROR =
  "I couldn't send your application just now, so could you try again in a moment?";

function fail(error: string, status = 400) {
  return NextResponse.json({ error }, { status });
}

function clean(question: Question, raw: unknown): string | null {
  if (question.type === "multi") {
    const picked = Array.isArray(raw)
      ? raw.filter((v): v is string => typeof v === "string" && question.options.includes(v))
      : [];
    if (!picked.length) return question.optional ? "" : null;
    return picked.join(", ");
  }
  const value = typeof raw === "string" ? raw.trim().slice(0, 2000) : "";
  if (!value) return question.optional ? "" : null;
  if (question.type === "single" && !question.options.includes(value)) return null;
  if (question.type === "rating" || question.type === "scale") {
    const n = Number(value);
    if (!Number.isInteger(n) || n < question.min || n > question.max) return null;
  }
  return value;
}

export async function POST(request: Request) {
  const webhookUrl = process.env.GHL_WEBHOOK_URL;
  if (!webhookUrl) {
    return fail("Applications aren't switched on yet, so please try again shortly.", 500);
  }

  let body: ApplicationBody;
  try {
    body = (await request.json()) as ApplicationBody;
  } catch {
    return fail(RETRY_ERROR);
  }

  if (body.website?.trim()) return fail(RETRY_ERROR);

  const firstName = body.firstName?.trim() ?? "";
  const lastName = body.lastName?.trim() ?? "";
  const email = body.email?.trim() ?? "";
  const phone = body.phone?.trim() ?? "";

  if (!firstName || !lastName) {
    return fail("Could you add your first and last name?");
  }
  if (!EMAIL_PATTERN.test(email)) {
    return fail("That email doesn't look quite right, so could you check it and try again?");
  }
  if (!PHONE_PATTERN.test(phone)) {
    return fail("Could you add your WhatsApp number with the country code?");
  }

  const channels = Array.isArray(body.channels)
    ? body.channels.filter(
        (c): c is string =>
          typeof c === "string" && (APPLICATION.channels as readonly string[]).includes(c),
      )
    : [];
  if (body.consent !== true || channels.length === 0) {
    return fail("Could you tick how you're happy to be contacted and the consent box?");
  }

  const answers: Record<string, string> = {};
  for (const question of QUESTIONS) {
    const value = clean(question, body.answers?.[question.key]);
    if (value === null) return fail(`One answer is missing: ${question.label}`);
    answers[question.key] = value;
  }

  const sourcePage = body.sourcePage?.trim() || "/";
  const consentAt = new Date().toISOString();
  const summary = QUESTIONS.map((q) => `${q.label}\n${answers[q.key] || "Not answered"}`).join(
    "\n\n",
  );

  const payload = {
    firstName,
    lastName,
    name: `${firstName} ${lastName}`,
    email,
    phone,
    ...answers,
    py_contact_channels: channels.join(", "),
    py_consent: "Yes",
    py_consent_text: APPLICATION.consent,
    py_consent_at: consentAt,
    py_early_bird_offer: `50% off, applied before ${OFFER.deadline}`,
    customFields: {
      ...answers,
      py_contact_channels: channels.join(", "),
      py_consent: "Yes",
      py_consent_at: consentAt,
    },
    message: `Productize Yourself early-bird application\n\n${summary}`,
    project: WAITLIST_LIST,
    projectLabel: "Productize Yourself 2027 application",
    formVariant: "application",
    sourcePage,
    source: `productizeyourself.ai application, ${sourcePage}`,
    tags: `website-lead,waitlist,${WAITLIST_LIST},py-application,py-early-bird-50`,
  };

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const detail = await response.text().catch(() => "");
      console.error("Application webhook failed:", response.status, detail);
      return fail(RETRY_ERROR, 502);
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Application webhook request error:", error);
    return fail(RETRY_ERROR, 502);
  }
}
