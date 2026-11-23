"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import { wedding } from "@/config/wedding";
import { formatShortDate } from "@/lib/format";
import { useInvite } from "./InviteProvider";
import { Petals } from "./Petals";
import { burst, rain } from "@/lib/burst";

/**
 * Full-screen opening: an ivory envelope sealed with a wax monogram.
 * Tapping the seal opens the flap, slides the card up and reveals the site.
 */
export function Envelope() {
  const { open } = useInvite();
  const [gone, setGone] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const seal = useRef<HTMLButtonElement>(null);
  const busy = useRef(false);

  // Keep the page behind inert while the envelope is shown, and focus the seal.
  useEffect(() => {
    const main = document.getElementById("main");
    if (main) main.inert = !gone;
    if (!gone) seal.current?.focus({ preventScroll: true });
    return () => {
      if (main) main.inert = false;
    };
  }, [gone]);

  // Entrance
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.from(".env-intro > *", { y: 16, opacity: 0, duration: 0.9, stagger: 0.12, ease: "power2.out" });
        gsap.from(".env-body", { y: 40, opacity: 0, scale: 0.94, duration: 1.1, ease: "power3.out", delay: 0.2 });
      });
    },
    { scope: root },
  );

  function handleOpen() {
    if (busy.current || !root.current) return;
    busy.current = true;
    const q = gsap.utils.selector(root.current);
    const reduce = !window.matchMedia(MOTION_OK).matches;

    if (reduce) {
      open();
      gsap.to(root.current, { opacity: 0, duration: 0.3, onComplete: () => setGone(true) });
      return;
    }

    const tl = gsap.timeline({ onComplete: () => setGone(true) });
    tl.to(q(".env-hint"), { opacity: 0, duration: 0.25 })
      .to(seal.current, { scale: 0.6, opacity: 0, duration: 0.45, ease: "back.in(2)" }, "<")
      .to(q(".env-flap"), { rotateX: 180, duration: 0.9, ease: "power2.inOut" }, "-=0.1")
      .set(q(".env-flap"), { zIndex: 1 }, "-=0.45")
      .to(q(".env-card"), { yPercent: -62, duration: 1, ease: "power3.out" }, "-=0.2")
      .add(() => {
        const r = q(".env-card")[0]?.getBoundingClientRect();
        if (r) burst(r.left + r.width / 2, r.top + r.height / 2, { kind: "confetti", count: 70, spread: 260 });
        rain({ kind: "petals", count: 45, duration: 5 });
      }, "-=0.35")
      .add(() => open(), "+=0.25")
      .to(q(".env-stage"), { scale: 1.08, opacity: 0, duration: 0.8, ease: "power2.in" })
      .to(root.current, { opacity: 0, duration: 0.6, ease: "power1.out" }, "-=0.35");
  }

  if (gone) return null;

  const { groom, bride } = wedding.couple;

  return (
    <div
      ref={root}
      role="dialog"
      aria-modal="true"
      aria-label={`Wedding invitation from ${groom} and ${bride}`}
      className="envelope-overlay fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-ivory"
      style={{
        backgroundImage:
          "radial-gradient(120% 70% at 50% 0%, #f7dfe1 0%, transparent 60%), radial-gradient(90% 60% at 50% 110%, #efe1c4 0%, transparent 65%)",
      }}
    >
      <Petals count={10} />

      <div className="env-stage relative flex w-full flex-col items-center px-4 text-center">
        <div className="env-intro mb-8 flex flex-col items-center gap-2">
          <p lang="hi" className="font-deva text-xl text-wine">
            {wedding.blessing.invocation}
          </p>
          <p className="eyebrow">You are invited</p>
        </div>

        <div className="env-body relative w-[min(88vw,400px)]" style={{ perspective: "1200px" }}>
          <div className="relative aspect-[10/7]">
            {/* back of envelope */}
            <div className="absolute inset-0 rounded-md bg-[#ecd9cf] shadow-[0_30px_60px_-30px_rgba(69,51,71,0.55)]" />

            {/* card inside */}
            <div className="env-card absolute inset-x-[6%] top-[6%] bottom-[4%] z-[2] flex flex-col items-center justify-start rounded-md border border-gold/50 bg-parchment px-4 pt-5 text-center shadow-sm">
              <p className="eyebrow !text-[0.62rem]">The wedding of</p>
              <p className="mt-1 font-display text-[1.7rem] font-semibold leading-tight text-wine">
                {groom} <span className="italic text-gold-ink">&amp;</span> {bride}
              </p>
              <p className="mt-1 font-display text-sm italic text-plum">{formatShortDate(wedding.weddingDate)}</p>
            </div>

            {/* front pocket */}
            <svg
              className="absolute inset-0 z-[3] h-full w-full drop-shadow-[0_-2px_6px_rgba(69,51,71,0.12)]"
              viewBox="0 0 400 280"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="pocket" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#fbf3ea" />
                  <stop offset="1" stopColor="#f3e3d6" />
                </linearGradient>
              </defs>
              <path d="M0 6 L200 165 L400 6 L400 276 Q400 280 396 280 L4 280 Q0 280 0 276 Z" fill="url(#pocket)" />
              <path d="M2 278 L178 150 M398 278 L222 150" stroke="#b59a65" strokeOpacity="0.45" strokeWidth="1.2" fill="none" />
              <path d="M0 6 L200 165 L400 6" stroke="#b59a65" strokeOpacity="0.55" strokeWidth="1.2" fill="none" />
            </svg>

            {/* top flap */}
            <div
              className="env-flap absolute inset-x-0 top-0 z-[4] h-[60%] origin-top"
              style={{ transformStyle: "preserve-3d" }}
              aria-hidden="true"
            >
              <svg className="h-full w-full" viewBox="0 0 400 168" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="flap" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#f6e7dc" />
                    <stop offset="1" stopColor="#efd9cc" />
                  </linearGradient>
                </defs>
                <path d="M0 4 Q0 0 4 0 L396 0 Q400 0 400 4 L400 10 L200 168 L0 10 Z" fill="url(#flap)" />
                <path d="M0 10 L200 168 L400 10" stroke="#b59a65" strokeOpacity="0.7" strokeWidth="1.4" fill="none" />
              </svg>
            </div>

            {/* wax seal = the open button */}
            <button
              ref={seal}
              type="button"
              onClick={handleOpen}
              aria-label="Open the invitation"
              className="absolute left-1/2 top-[60%] z-[5] grid h-[4.75rem] w-[4.75rem] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full transition-transform duration-300 hover:scale-105"
              style={{
                background: "radial-gradient(circle at 35% 30%, #a43a63 0%, #7a2446 45%, #5a1631 100%)",
                boxShadow: "0 8px 18px -6px rgba(90,22,49,0.7), inset 0 2px 4px rgba(255,255,255,0.25), inset 0 -3px 6px rgba(0,0,0,0.3)",
              }}
            >
              <span aria-hidden="true" className="seal-pulse pointer-events-none absolute inset-0 rounded-full" />
              <span className="pointer-events-none absolute inset-[6px] rounded-full border border-dashed border-[#e8c98f]/60" />
              <span className="font-script text-[1.7rem] leading-none text-[#f3dca7]" aria-hidden="true">
                {groom[0]}
                <span className="text-xl">&amp;</span>
                {bride[0]}
              </span>
            </button>
          </div>
        </div>

        <p className="env-hint mt-8 font-display text-base italic text-plum" style={{ animation: "bob 2.4s ease-in-out infinite" }}>
          Tap the seal to open
        </p>
      </div>
    </div>
  );
}
