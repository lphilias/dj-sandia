// src/app/api/contact/route.ts
import { NextResponse } from "next/server";

export const runtime = "nodejs";        // ensure Node runtime
export const dynamic = "force-dynamic"; // avoid caching any responses

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
        { ok: false, error: "Missing RESEND_API_KEY (set it in Vercel → Project → Settings → Environment Variables)" },
        { status: 500 }
      );
    }

    // Use Resend onboarding sender for initial tests (works without domain verification).
    const r = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Bookings <onboarding@resend.dev>", // swap to a verified domain later
        to: ["djsandia312@gmail.com"],
        reply_to: email || undefined,
        subject: "New Booking Request — Dj Sandia",
        text,
      }),
    });

    if (!r.ok) {
      const errText = await r.text();
      // Log details to Vercel function logs for easy debugging
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
