"use client";

import { useRef } from "react";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import { wedding } from "@/config/wedding";
import { dateParts } from "@/lib/format";
import { burst } from "@/lib/burst";

/** "YYYYMMDD" for the wedding day and the day after (all-day events end exclusive). */
function dayRange(iso: string) {
  const next = new Date(`${iso}T00:00:00Z`);
  next.setUTCDate(next.getUTCDate() + 1);
  return { start: iso.replaceAll("-", ""), end: next.toISOString().slice(0, 10).replaceAll("-", "") };
}

function downloadIcs() {
  const { couple, venue, weddingDate, site } = wedding;
  const { start, end } = dayRange(weddingDate);
  const stamp = new Date().toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Harshit & Sakshi//Wedding//EN",
    "CALSCALE:GREGORIAN",
    "BEGIN:VEVENT",
    `UID:${start}-harshit-sakshi@wedding`,
    `DTSTAMP:${stamp}`,
    `DTSTART;VALUE=DATE:${start}`,
    `DTEND;VALUE=DATE:${end}`,
    `SUMMARY:Wedding of ${couple.groom} & ${couple.bride}`,
    `LOCATION:${venue.name}\\, ${venue.address.replaceAll(",", "\\,")}`,
    `DESCRIPTION:Invitation & RSVP: ${site.url}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
  const url = URL.createObjectURL(new Blob([ics], { type: "text/calendar;charset=utf-8" }));
  const a = document.createElement("a");
  a.href = url;
  a.download = `${couple.groom}-${couple.bride}-wedding.ics`;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

/** Deep-green "Save the Date" band with big gold numerals and an add-to-calendar action. */
export function SaveTheDate() {
  const root = useRef<HTMLElement>(null);
  const d = dateParts(wedding.weddingDate);
  const range = dayRange(wedding.weddingDate);
  const google = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    `Wedding of ${wedding.couple.groom} & ${wedding.couple.bride}`,
  )}&dates=${range.start}/${range.end}&location=${encodeURIComponent(
    wedding.venue.address,
  )}&details=${encodeURIComponent(wedding.site.url)}`;

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const tl = gsap.timeline({ scrollTrigger: { trigger: root.current, start: "top 75%" } });
        tl.fromTo(".std-num", { yPercent: 60, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.9, stagger: 0.12, ease: "power3.out" })
          .fromTo(".std-line", { scaleX: 0 }, { scaleX: 1, duration: 0.8, ease: "power2.out" }, "-=0.6")
          .fromTo(".std-fade", { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.7, stagger: 0.1 }, "-=0.4");
        gsap.to(".std-mandala", { rotate: 360, duration: 120, ease: "none", repeat: -1 });
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      aria-labelledby="std-title"
      className="relative overflow-hidden bg-green py-16 text-center text-[#f3e6c8] sm:py-20"
      style={{
        backgroundImage:
          "radial-gradient(80% 120% at 50% 0%, #3d5e4a 0%, transparent 70%), radial-gradient(60% 80% at 50% 120%, #22382b 0%, transparent 70%)",
      }}
    >
      <Mandala className="std-mandala pointer-events-none absolute left-1/2 top-1/2 -ml-[17rem] -mt-[17rem] h-[34rem] w-[34rem] text-gold opacity-[0.13]" />
      <div className="pointer-events-none absolute inset-3 rounded-[1.5rem] border border-gold/35" aria-hidden="true" />

      <div className="container-x relative">
        <p className="std-fade eyebrow !text-gold-light">Save the date</p>
        <h2 id="std-title" className="sr-only">
          Save the date: {d.weekday}, {d.day} {d.month} {d.year}
        </h2>
        <div aria-hidden="true" className="mt-4 flex items-center justify-center gap-3 font-display font-semibold leading-none sm:gap-6">
          <span className="overflow-hidden"><span className="std-num block text-6xl sm:text-8xl">{String(d.day).padStart(2, "0")}</span></span>
          <span className="std-line h-12 w-px origin-center bg-gold sm:h-20" />
          <span className="overflow-hidden"><span className="std-num block text-6xl sm:text-8xl">{d.month.slice(0, 3).toUpperCase()}</span></span>
          <span className="std-line h-12 w-px origin-center bg-gold sm:h-20" />
          <span className="overflow-hidden"><span className="std-num block text-6xl sm:text-8xl">{d.year}</span></span>
        </div>
        <p className="std-fade mt-4 font-display text-xl italic text-[#f3e6c8]/90">
          {d.weekday} · {wedding.venue.city}
        </p>

        <div className="std-fade mt-7 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={(e) => {
              downloadIcs();
              burst(e.clientX || window.innerWidth / 2, e.clientY || window.innerHeight / 2, { kind: "confetti", count: 28 });
            }}
            className="btn bg-gold-light text-green shadow-[0_10px_24px_-12px_rgba(0,0,0,0.6)] hover:bg-[#e6d3a5]"
          >
            <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M4 7h16v13H4zM4 11h16M8 4v5M16 4v5M12 14v4M10 16h4" />
            </svg>
            Add to calendar
          </button>
          <a href={google} target="_blank" rel="noopener noreferrer" className="btn border border-gold-light/60 text-[#f3e6c8] hover:bg-white/10">
            Google Calendar
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </div>
      </div>
    </section>
  );
}

export function Mandala({ className = "" }: { className?: string }) {
  const petals = Array.from({ length: 16 }, (_, i) => i * 22.5);
  return (
    <svg aria-hidden="true" viewBox="0 0 200 200" className={className} fill="none" stroke="currentColor" strokeWidth="0.6">
      <circle cx="100" cy="100" r="96" />
      <circle cx="100" cy="100" r="70" />
      <circle cx="100" cy="100" r="30" />
      <circle cx="100" cy="100" r="12" />
      {petals.map((a) => (
        <g key={a} transform={`rotate(${a} 100 100)`}>
          <path d="M100 30 C108 45 108 58 100 70 C92 58 92 45 100 30 Z" />
          <path d="M100 4 C106 14 106 22 100 30 C94 22 94 14 100 4 Z" />
          <circle cx="100" cy="84" r="2" />
        </g>
      ))}
    </svg>
  );
}
