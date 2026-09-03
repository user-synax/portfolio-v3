import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

/**
 * POST /api/contact — sends the contact-form message via Resend.
 *
 * Env (see .env.example):
 *   RESEND_API_KEY  — required (server-only)
 *   CONTACT_FROM    — verified sender, e.g. "Ayush <contact@synax.me>"
 *                     (testing fallback: onboarding@resend.dev)
 *   CONTACT_TO      — delivery inbox; defaults to user-synax@proton.me
 *
 * Hardening notes: payloads are validated + length-capped here (client
 * checks are convenience only), and a hidden "company" honeypot field
 * absorbs naive bots with a silent success. If the form ever gets real
 * traffic, add rate limiting per IP before this route (e.g. Upstash
 * Ratelimit / Vercel KV) and keep an eye on Resend abuse protection.
 */

const MAX_NAME = 80;
const MAX_MESSAGE = 5000;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const DEFAULT_TO = "user-synax@proton.me";

type ContactPayload = {
  name: string;
  email: string;
  message: string;
};

function validate(body: Record<string, unknown>): {
  data: ContactPayload | null;
  errors: Record<string, string>;
} {
  const raw = {
    name: typeof body.name === "string" ? body.name.trim() : "",
    email: typeof body.email === "string" ? body.email.trim() : "",
    message: typeof body.message === "string" ? body.message.trim() : "",
  };

  const errors: Record<string, string> = {};
  if (raw.name.length < 2) errors.name = "Please enter your name.";
  else if (raw.name.length > MAX_NAME) errors.name = "Name is too long.";
  if (!EMAIL_RE.test(raw.email)) errors.email = "That email doesn't look right.";
  if (raw.message.length < 10) errors.message = "Message should be at least 10 characters.";
  else if (raw.message.length > MAX_MESSAGE) errors.message = "Message is too long.";

  return Object.keys(errors).length > 0
    ? { data: null, errors }
    : { data: raw, errors: {} };
}

/** Escape text for safe embedding in the HTML email body. */
function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

/** Strip line breaks — a name must never reach the subject line verbatim. */
function safeSubject(value: string): string {
  return value.replace(/[\r\n]+/g, " ").slice(0, MAX_NAME);
}

function renderTextEmail({ name, email, message }: ContactPayload): string {
  return [
    `New message via synax.me`,
    ``,
    `Name:    ${name}`,
    `Email:   ${email}`,
    ``,
    `Message:`,
    message,
    ``,
    `Reply to ${email} to answer.`,
  ].join("\n");
}

function renderHtmlEmail({ name, email, message }: ContactPayload): string {
  const esc = {
    name: escapeHtml(name),
    email: escapeHtml(email),
    message: escapeHtml(message),
  };

  return `<!doctype html>
<html lang="en">
  <body style="margin:0;background:#0c0a09;padding:32px 16px;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td align="center">
          <table role="presentation" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;background:#131110;border:1px solid rgba(231,229,228,0.12);border-radius:8px;">
            <tr>
              <td style="padding:28px 28px 4px;">
                <p style="margin:0;font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#e8b34b;">
                  New message &mdash; synax.me
                </p>
                <h1 style="margin:14px 0 0;font-family:Georgia,'Times New Roman',serif;font-size:22px;font-weight:500;color:#e7e5e4;">
                  Contact from ${esc.name}
                </h1>
              </td>
            </tr>
            <tr>
              <td style="padding:12px 28px 4px;">
                <p style="margin:0 0 2px;font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:11px;letter-spacing:1.5px;text-transform:uppercase;color:#78716c;">
                  Email
                </p>
                <a href="mailto:${esc.email}" style="font-family:Georgia,'Times New Roman',serif;font-size:15px;color:#e8b34b;text-decoration:none;">
                  ${esc.email}
                </a>
              </td>
            </tr>
            <tr>
              <td style="padding:12px 28px 28px;">
                <p style="margin:0 0 6px;font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:11px;letter-spacing:1.5px;text-transform:uppercase;color:#78716c;">
                  Message
                </p>
                <div style="margin:0;font-family:Georgia,'Times New Roman',serif;font-size:15px;line-height:1.6;color:#e7e5e4;white-space:pre-wrap;">
                  ${esc.message}
                </div>
              </td>
            </tr>
            <tr>
              <td style="padding:0 28px 24px;">
                <p style="margin:0;font-size:12px;color:#78716c;">
                  Reply to this email to answer ${esc.name} directly.
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: humans never see the hidden "company" field, so any value
  // means a bot. Answer with a fake success instead of an error.
  if (typeof body.company === "string" && body.company !== "") {
    return NextResponse.json({ ok: true });
  }

  const { data, errors } = validate(body);
  if (!data) {
    const firstError = Object.values(errors)[0] ?? "Invalid request.";
    return NextResponse.json({ error: firstError, fields: errors }, { status: 400 });
  }

  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json(
      { error: "Contact form isn't configured yet." },
      { status: 503 },
    );
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  const { data: sent, error } = await resend.emails.send({
    from: process.env.CONTACT_FROM || "Ayush <onboarding@resend.dev>",
    to: [process.env.CONTACT_TO || DEFAULT_TO],
    replyTo: data.email,
    subject: `New contact: ${safeSubject(data.name)} via synax.me`,
    text: renderTextEmail(data),
    html: renderHtmlEmail(data),
  });

  if (error || !sent?.id) {
    // Details are for the server log only — don't leak Resend internals to visitors.
    console.error("[api/contact] Resend send failed:", error ?? "no message id");
    return NextResponse.json(
      { error: "Message couldn't be sent. Please try again." },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}
