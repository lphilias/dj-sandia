import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { name = "", email = "", date = "", location = "", message = "" } = await req.json();

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
      return NextResponse.json({ ok: false, error: "Missing RESEND_API_KEY" }, { status: 500 });
    }

    const r = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Bookings <bookings@resend.dev>", // swap to verified sender later
        to: ["djsandia312@gmail.com"],
        reply_to: email || undefined,
        subject: "New Booking Request — Dj Sandia",
        text,
      }),
    });

    if (!r.ok) {
      const errText = await r.text();
      return NextResponse.json({ ok: false, error: errText }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
