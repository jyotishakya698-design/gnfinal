// ============================================================
// Email notifier
// ------------------------------------------------------------
// Brochure-request notifications are delivered to the address
// configured in src/data/brochureConfig.js.
//
// Two transports are supported, chosen automatically:
//
//   1. Resend (server-side) — used when RESEND_API_KEY is set.
//      This is the recommended production transport. Set
//      RESEND_FROM to a verified sender on your own domain.
//
//   2. FormSubmit (client-side) — free, no API key required.
//      FormSubmit blocks server-to-server requests, so the
//      browser posts to it directly. The recipient confirms the
//      address ONCE via the activation email FormSubmit sends on
//      first use. The endpoint is exposed to the client through
//      the /api/brochure response.
//
// This module never throws: if delivery fails the error is logged
// and reported back, but the visitor still receives the brochure.
// ============================================================

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function buildText(fields) {
  return fields
    .filter(([, value]) => value !== undefined && value !== null && value !== "")
    .map(([label, value]) => `${label}: ${value}`)
    .join("\n");
}

/** FormSubmit AJAX endpoint for a given recipient (used by the browser). */
export function formSubmitEndpoint(email) {
  return `https://formsubmit.co/ajax/${encodeURIComponent(email)}`;
}

async function sendViaResend({ to, subject, text, replyTo }) {
  const key = process.env.RESEND_API_KEY;
  const from =
    process.env.RESEND_FROM || "Good Notation <onboarding@resend.dev>";

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      subject,
      text,
      ...(replyTo ? { reply_to: replyTo } : {}),
    }),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Resend failed (${res.status}): ${body}`);
  }
  return "resend";
}

/**
 * Send a notification email from the server.
 * Uses Resend when RESEND_API_KEY is configured; otherwise reports
 * that no server transport is available so the client can fall back
 * to FormSubmit (see formSubmitEndpoint).
 *
 * @param {object} opts
 * @param {string} opts.to       recipient address
 * @param {string} opts.subject  subject line
 * @param {Array<[string,string]>} opts.fields  [label, value] pairs
 * @param {string} [opts.replyTo] optional reply-to address
 * @returns {Promise<{sent:boolean, transport:string|null, error?:string}>}
 */
export async function sendNotification({ to, subject, fields, replyTo }) {
  if (!to || !EMAIL_RE.test(to)) {
    return { sent: false, transport: null, error: "Invalid recipient address." };
  }

  if (!process.env.RESEND_API_KEY) {
    // No server transport configured — the client will use FormSubmit.
    return { sent: false, transport: null, error: "no-server-transport" };
  }

  const text = buildText(fields);

  try {
    const transport = await sendViaResend({ to, subject, text, replyTo });
    return { sent: true, transport };
  } catch (error) {
    console.error("[mailer] Notification failed:", error);
    return {
      sent: false,
      transport: null,
      error: String(error?.message || error),
    };
  }
}
