"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";

const WatermelonLogo: React.FC<{ className?: string }>
= ({ className = "w-10 h-10" }) => (
  <svg className={className} viewBox="0 0 100 100" role="img" aria-label="Watermelon logo" xmlns="http://www.w3.org/2000/svg">
    <path d="M50 95c25 0 45-20 45-45H5c0 25 20 45 45 45z" fill="#16a34a"/>
    <path d="M50 88c21 0 38-17 38-38H12c0 21 17 38 38 38z" fill="#f8fafc"/>
    <path d="M50 82c18 0 32-14 32-32H18c0 18 14 32 32 32z" fill="#ef4444"/>
    {[...Array(9)].map((_, i) => {
      const angle = (i * 20 + 10) * (Math.PI/180);
      const r = 18;
      const cx = 50 + r * Math.cos(angle);
      const cy = 64 + r * Math.sin(angle) * 0.7;
      return <ellipse key={i} cx={cx} cy={cy} rx="2" ry="3" fill="#0b0b0b"/>;
    })}
  </svg>
);

export default function Page() {
  const contactRef = useRef<HTMLDivElement | null>(null);
  const scrollToContact = () => {
    contactRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-dvh bg-black text-white selection:bg-red-500 selection:text-white">
      <BackgroundFX />

      <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-black/40 border-b border-white/10">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <WatermelonLogo className="w-8 h-8"/>
            <span className="font-black tracking-tight text-xl">DJ Sandía</span>
          </div>
          <nav className="hidden sm:flex items-center gap-6 text-sm">
            <a href="#about" className="text-white/80 hover:text-white">About</a>
            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={scrollToContact}
              className="inline-flex items-center rounded-xl border border-red-500/50 bg-gradient-to-b from-red-600 to-red-700 px-4 py-2 font-semibold shadow-lg shadow-red-900/40 hover:shadow-red-700/50 focus:outline-none focus:ring-2 focus:ring-red-400"
            >
              Book Now
            </motion.button>
          </nav>
        </div>
      </header>

      <section className="relative mx-auto max-w-6xl px-4 pt-14 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="grid items-center gap-8 md:grid-cols-2"
        >
          <div className="order-2 md:order-1">
            <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-tight">
              <span className="block">Dj Sandia</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-200">
                Caribbean Heat • Chicago Beats
              </span>
            </h1>
            <p className="mt-5 text-base sm:text-lg text-white/80 max-w-prose">
              It’s simple: I love this music. My passion is blending the warmth of Caribbean rhythms with the soul of Chicago beats to create a vibe that’s impossible not to dance to. Let's party!
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <motion.button
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={scrollToContact}
                className="inline-flex items-center rounded-2xl border border-red-500/50 bg-gradient-to-b from-red-600 to-red-700 px-6 py-3 font-semibold shadow-lg shadow-red-900/40 hover:shadow-red-700/50 focus:outline-none focus:ring-2 focus:ring-red-400"
              >
                Book Now
              </motion.button>
              <motion.a
                whileHover={{ y: -1 }}
                href="#about"
                className="inline-flex items-center rounded-2xl border border-white/15 px-6 py-3 font-semibold text-white/90 hover:text-white hover:bg-white/5"
              >
                About
              </motion.a>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative order-1 md:order-2"
          >
            <div className="aspect-[4/5] w-full rounded-3xl bg-gradient-to-b from-white/5 to-white/0 border border-white/10 p-1">
              <div className="h-full w-full rounded-2xl overflow-hidden relative bg-black">
                <motion.img
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  src="https://github.com/lphilias/playground/blob/main/dj_sandia.jpeg?raw=true"
                  alt="Dj Sandia performing — red & black lighting"
                  className="h-full w-full object-cover"
                  loading="eager"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-black/15 to-transparent" />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      <section id="about" className="relative mx-auto max-w-6xl px-4 pb-20">
        <Card>
          <h2 className="text-2xl sm:text-3xl font-extrabold">About</h2>
          <p className="mt-4 text-base sm:text-lg text-white/80 leading-relaxed">
            Since 2015, I’ve been weaving Martinique heat into my Chicago house — not by pressing play, but by reading the room and making records talk to each other. Expect clean, seamless transitions, live mashups on the fly, and grooves that move from dancehall and reggaeton to house, afro house, and Brazilian funk. I’ve played everything from Navy Pier to living‑room birthdays; the goal is the same every time: keep it elegant, keep it moving, and make standing still impossible.
          </p>
        </Card>
      </section>

      <section ref={contactRef} id="contact" className="relative mx-auto max-w-6xl px-4 pb-28">
        <Card>
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <h2 className="text-2xl sm:text-3xl font-extrabold">Book DJ Sandía</h2>
          </div>
          <ContactForm />
        </Card>
      </section>

      <footer className="border-t border-white/10 py-8">
        <div className="mx-auto max-w-6xl px-4 text-sm text-white/50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <WatermelonLogo className="w-5 h-5" />
            <span className="font-bold tracking-tight">DJ Sandía</span>
          </div>
          <a href="#contact" className="hover:text-white">Book Now</a>
        </div>
      </footer>

      <div className="fixed bottom-3 left-0 right-0 z-40 px-4 sm:hidden">
        <motion.button
          whileHover={{ y: -1 }}
          whileTap={{ scale: 0.98 }}
          onClick={scrollToContact}
          className="w-full rounded-2xl border border-red-500/60 bg-red-600 px-6 py-3 font-semibold shadow-xl shadow-red-900/40"
        >
          Book Now
        </motion.button>
      </div>
    </div>
  );
}

function Meta() {
  return (
    <>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>DJ Sandía — Book Now</title>
      <meta property="og:title" content="DJ Sandía — Book Now" />
      <meta property="og:description" content="Premium DJ sets for corporate events and private parties. Clean transitions, live mashups, Caribbean heat meets Chicago beats." />
      <meta property="og:image" content="https://github.com/lphilias/playground/blob/main/dj_sandia.jpeg?raw=true" />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:image" content="https://github.com/lphilias/playground/blob/main/dj_sandia.jpeg?raw=true" />
    </>
  );
}

const Card: React.FC<{ children: React.ReactNode }>
= ({ children }) => (
  <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-10">
    <div className="pointer-events-none absolute inset-0 opacity-40 [mask-image:radial-gradient(60%_60%_at_50%_0%,black,transparent)]">
      <GridFX />
    </div>
    <div className="relative">
      {children}
    </div>
  </div>
);

function DiscSparkle() {
  return (
    <div className="relative grid place-items-center">
      <div className="relative h-56 w-56 sm:h-72 sm:w-72 rounded-full bg-[conic-gradient(from_180deg_at_50%_50%,_#000,_#ef4444_35%,_#000_70%,_#111)] border border-white/10 shadow-2xl shadow-red-900/30" />
      <div className="absolute inset-0 animate-pulse blur-2xl bg-red-600/20 rounded-full"/>
    </div>
  );
}

function GridFX() {
  return (
    <div className="absolute inset-0 opacity-60">
      <div className="absolute inset-0 bg-[linear-gradient(transparent_0,transparent_95%,rgba(255,255,255,0.05)_96%),linear-gradient(90deg,transparent_0,transparent_95%,rgba(255,255,255,0.05)_96%)] bg-[size:32px_32px]"/>
    </div>
  );
}

function BackgroundFX() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
      <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_-10%,rgba(239,68,68,0.20),transparent_60%)]"/>
    </div>
  );
}

function ContactForm() {
  const [submitting, setSubmitting] = useState(false);
  const [ok, setOk] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setOk(null); setErr(null);

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });

      if (res.ok) {
        setOk("Thanks! I’ll get back to you within 24 hours.");
        form.reset();
      } else {
        setErr("Something went wrong, please email me directly.");
      }
    } catch (e) {
      setErr("Something went wrong, please email me directly.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
      <label className="flex flex-col gap-2">
        <span className="text-sm text-white/70">Your Name</span>
        <input required name="name" placeholder="Alex Martin"
               className="h-11 rounded-xl bg-black/60 border border-white/15 px-3 outline-none focus:ring-2 focus:ring-red-400"/>
      </label>
      <label className="flex flex-col gap-2">
        <span className="text-sm text-white/70">Email</span>
        <input required name="email" type="email" placeholder="you@example.com"
               className="h-11 rounded-xl bg-black/60 border border-white/15 px-3 outline-none focus:ring-2 focus:ring-red-400"/>
      </label>
      <label className="flex flex-col gap-2">
        <span className="text-sm text-white/70">Event Date</span>
        <input name="date" type="date"
               className="h-11 rounded-xl bg-black/60 border border-white/15 px-3 outline-none focus:ring-2 focus:ring-red-400"/>
      </label>
      <label className="flex flex-col gap-2">
        <span className="text-sm text-white/70">Venue / City</span>
        <input name="location" placeholder="The Gwen Hotel, Chicago"
               className="h-11 rounded-xl bg-black/60 border border-white/15 px-3 outline-none focus:ring-2 focus:ring-red-400"/>
      </label>
      <label className="sm:col-span-2 flex flex-col gap-2">
        <span className="text-sm text-white/70">Message</span>
        <textarea name="message" rows={5} placeholder="Tell me about your event, vibe, set length, and any must‑plays."
                  className="rounded-xl bg-black/60 border border-white/15 px-3 py-2 outline-none focus:ring-2 focus:ring-red-400"/>
      </label>

      <div className="sm:col-span-2 flex flex-col gap-2">
        <motion.button
          whileHover={{ y: -1 }}
          whileTap={{ scale: 0.98 }}
          disabled={submitting}
          className="inline-flex items-center justify-center rounded-2xl border border-red-500/60 bg-red-600 px-6 py-3 font-semibold shadow-xl shadow-red-900/40 disabled:opacity-60"
        >
          {submitting ? "Sending…" : "Send Booking Request"}
        </motion.button>
        {ok && <p className="text-green-400 text-sm">{ok}</p>}
        {err && <p className="text-red-400 text-sm">{err}</p>}
        <p className="text-xs text-white/50">Prefer email? Write me at <a className="underline hover:text-white" href="mailto:djsandia312@gmail.com">djsandia312@gmail.com</a></p>
      </div>
    </form>
  );
}
