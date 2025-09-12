import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { name = "", email = "", date = "", location = "", message = "" } = await req.json();

    const body = [
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

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Bookings <bookings@resend.dev>", // replace with a verified sender later
        to: ["djsandia312@gmail.com"],
        reply_to: email || undefined,
        subject: "New Booking Request — Dj Sandia",
        text: body,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      return NextResponse.json({ ok: false, error: err }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: String(e?.message || e) }, { status: 500 });
  }
}

