// src/app/api/contact/route.ts
import { NextResponse } from "next/server";

export const runtime = "nodejs"; // ensure Node runtime (env vars + fetch OK)

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

    // Basic server-side validation
    if (!name || !email) {
      return NextResponse.json(
        { ok: false, error: "Missing required fields: name, email" },
        { status: 400 }
      );
    }

    const text = [
      `Name: ${name}`,
      `Email: ${email}`,
      date ? `Event Date: ${date}` : null,
      location ? `Location: ${location}` : null,
      "",
      message ? `Message:\n${message}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { ok: false, error: "Missing RESEND_API_KEY (set env var in Vercel)" },
        { status: 500 }
      );
    }

    // Send via Resend (use onboarding sender for initial deliverability)
    const r = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Bookings <onboarding@resend.dev>", // swap to verified domain later
        to: ["djsandia312@gmail.com"],
        reply_to: email || undefined,
        subject: "New Booking Request — Dj Sandia",
        text,
      }),
    });

    if (!r.ok) {
      const errText = await r.text();
      // Surface Resend error to the client so you see *why* it failed
      return NextResponse.json({ ok: false, error: errText }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    // Also log to serverless logs for Vercel > Functions > Logs
    console.error("[/api/contact] Unhandled error:", message);
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
