// src/app/api/contact/route.ts
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type ContactPayload = {
  name?: string;
  email?: string;
  date?: string;
  location?: string;
  message?: string;
};

export async function POST(req: Request) {
  try {
    const { name = "", email = "", date = "", location = "", message = "" } =
      (await req.json()) as ContactPayload;

    if (!name || !email) {
      return NextResponse.json({ ok: false, error: "Missing required fields: name, email" }, { status: 400 });
    }

    const text = [
      `Name: ${name}`,
      `Email: ${email}`,
      date ? `Event Date: ${date}` : null,
      location ? `Location: ${location}` : null,
      "",
      message ? `Message:\n${message}` : "",
    ].filter(Boolean).join("\n");

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ ok: false, error: "Missing RESEND_API_KEY" }, { status: 500 });
    }

    // Use test recipient when on unverified/test setup
    const to = process.env.CONTACT_TO || "l.a.philias@gmail.com";

    const r = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Bookings Sandia <onboarding@resend.dev>",   // allowed in test
        to: [to],
        reply_to: email || undefined,
        subject: "New Booking Request — Dj Sandia",
        text,
      }),
    });

    if (!r.ok) {
      const errText = await r.text();
      console.error("[/api/contact] Resend error:", r.status, errText);
      return NextResponse.json({ ok: false, error: errText, status: r.status }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[/api/contact] Unhandled error:", message);
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
