"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { gsap, MOTION_OK } from "@/lib/gsap";
import { wedding, type WeddingEvent } from "@/config/wedding";
import { formatLongDate, formatShortDate } from "@/lib/format";
import { SectionHeading, Ornament } from "./Ornament";
import { Mandala } from "./SaveTheDate";
import { burst } from "@/lib/burst";

const canTilt = () =>
  typeof window !== "undefined" &&
  window.matchMedia(MOTION_OK).matches &&
  window.matchMedia("(pointer: fine)").matches;

function tilt(e: React.PointerEvent<HTMLElement>) {
  const card = e.currentTarget.querySelector<HTMLElement>(".tilt-card");
  if (!card) return;
  const r = card.getBoundingClientRect();
  const px = (e.clientX - r.left) / r.width;
  const py = (e.clientY - r.top) / r.height;
  card.style.setProperty("--mx", `${px * 100}%`);
  card.style.setProperty("--my", `${py * 100}%`);
  if (canTilt()) {
    gsap.to(card, { rotateY: (px - 0.5) * 14, rotateX: (0.5 - py) * 12, duration: 0.5, ease: "power2.out" });
  }
}

function untilt(e: React.PointerEvent<HTMLElement>) {
  const card = e.currentTarget.querySelector<HTMLElement>(".tilt-card");
  if (card) gsap.to(card, { rotateY: 0, rotateX: 0, duration: 0.7, ease: "power3.out" });
}

const TBA = "To be announced";

export function Celebrations() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<WeddingEvent | null>(null);

  const openEvent = (event: WeddingEvent, e?: React.MouseEvent) => {
    if (e) burst(e.clientX, e.clientY, { kind: "petals", count: 14, spread: 110 });
    setActive(event);
    const dialog = dialogRef.current;
    if (!dialog) return;
    dialog.showModal();
    if (window.matchMedia(MOTION_OK).matches) {
      gsap.fromTo(
        panelRef.current,
        { opacity: 0, y: 40, scale: 0.96 },
        { opacity: 1, y: 0, scale: 1, duration: 0.55, ease: "power3.out" },
      );
    }
  };

  const close = () => dialogRef.current?.close();

  return (
    <section
      id="celebrations"
      aria-labelledby="celebrations-title"
      className="section overflow-hidden"
      style={{ background: "linear-gradient(180deg, transparent, rgb(245 228 226 / 0.7) 18%, rgb(245 228 226 / 0.7) 82%, transparent)" }}
    >
      <Mandala className="celebrations-mandala pointer-events-none absolute left-1/2 top-24 -ml-[22rem] h-[44rem] w-[44rem] text-gold opacity-[0.12] motion-safe:animate-[spin_160s_linear_infinite]" />
      <div className="container-x relative">
        <SectionHeading
          id="celebrations-title"
          eyebrow="Join us for"
          title="Our Celebrations"
          subtitle="Tap a celebration to see the details"
        />

        <ul className="mx-auto mt-12 grid max-w-4xl grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {wedding.events.map((event) => (
            <li key={event.key} data-reveal>
              <button
                type="button"
                onClick={(e) => openEvent(event, e)}
                onPointerMove={tilt}
                onPointerLeave={untilt}
                aria-haspopup="dialog"
                className="group block w-full text-center [perspective:900px]"
              >
                <span className="tilt-card paper-card relative block overflow-hidden [transform-style:preserve-3d] rounded-t-[50%_4.5rem] p-2 pb-3 transition duration-500 ease-[var(--ease-soft)] group-hover:-translate-y-1.5 group-hover:shadow-[0_24px_40px_-22px_rgba(69,51,71,0.55)] sm:rounded-t-[50%_6rem]">
                  <Image
                    src={event.image}
                    alt={event.imageAlt}
                    width={419}
                    height={416}
                    sizes="(min-width: 1024px) 14rem, 45vw"
                    className="fade-bottom aspect-square h-auto w-full rounded-t-[50%_4rem] object-cover object-top transition duration-700 ease-[var(--ease-soft)] group-hover:scale-[1.03] sm:rounded-t-[50%_5.5rem]"
                  />
                  <span
                    className="-mt-1 block font-script text-[2.1rem] leading-tight sm:text-[2.5rem]"
                    style={{ color: event.accent }}
                  >
                    {event.name}
                  </span>
                  <span className="mt-0.5 block text-[0.8rem] uppercase tracking-[0.14em] text-plum/80">
                    {event.date ? formatShortDate(event.date) : "Date TBA"}
                  </span>
                  <span className="mt-2 inline-flex items-center gap-1 font-display text-sm italic text-gold-ink">
                    View details
                    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6">
                      <path d="M9 6l6 6-6 6" />
                    </svg>
                  </span>
                  <span aria-hidden="true" className="card-shine" />
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <dialog
        ref={dialogRef}
        aria-labelledby="event-dialog-title"
        onClick={(e) => {
          if (e.target === dialogRef.current) close(); // click on backdrop
        }}
        onClose={() => setActive(null)}
        className="m-auto w-[min(92vw,30rem)] max-h-[90dvh] overflow-visible bg-transparent p-0 backdrop:bg-plum/55 backdrop:backdrop-blur-sm"
      >
        <div ref={panelRef} className="paper-card relative max-h-[90dvh] overflow-y-auto rounded-t-[50%_7rem] p-3 pb-6">
          {active && (
            <>
              <button
                type="button"
                onClick={close}
                aria-label="Close details"
                className="absolute right-3 top-3 z-10 grid h-11 w-11 place-items-center rounded-full bg-parchment/90 text-wine shadow"
              >
                <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
              <Image
                src={active.image}
                alt={active.imageAlt}
                width={419}
                height={416}
                sizes="30rem"
                className="fade-bottom h-auto max-h-[42dvh] w-full rounded-t-[50%_6.5rem] object-cover object-top"
              />
              <div className="px-3 text-center">
                <h3
                  id="event-dialog-title"
                  className="mt-1 font-script text-5xl leading-tight"
                  style={{ color: active.accent }}
                >
                  {active.name}
                </h3>
                <p className="mt-1 font-display text-lg italic text-plum">{active.tagline}</p>
                <Ornament className="my-4" />
                <dl className="mx-auto grid max-w-xs grid-cols-[auto_1fr] gap-x-4 gap-y-2 text-left text-base">
                  <dt className="eyebrow self-center !text-[0.7rem]">Date</dt>
                  <dd>{active.date ? formatLongDate(active.date) : TBA}</dd>
                  <dt className="eyebrow self-center !text-[0.7rem]">Time</dt>
                  <dd>{active.time ?? TBA}</dd>
                  <dt className="eyebrow self-center !text-[0.7rem]">Venue</dt>
                  <dd>{active.venueName ?? `${wedding.venue.city} (details soon)`}</dd>
                  {active.dressCode && (
                    <>
                      <dt className="eyebrow self-center !text-[0.7rem]">Dress code</dt>
                      <dd>{active.dressCode}</dd>
                    </>
                  )}
                </dl>
                <div className="mt-6 flex flex-wrap justify-center gap-3">
                  <a href="#venue" onClick={close} className="btn btn-outline">
                    Venue &amp; directions
                  </a>
                  <a href="#rsvp" onClick={close} className="btn btn-primary">
                    RSVP
                  </a>
                </div>
              </div>
            </>
          )}
        </div>
      </dialog>
    </section>
  );
}
