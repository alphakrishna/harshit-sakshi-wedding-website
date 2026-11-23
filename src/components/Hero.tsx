"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import { wedding } from "@/config/wedding";
import { formatLongDate } from "@/lib/format";
import { useInvite } from "./InviteProvider";
import { Countdown } from "./Countdown";
import { Ornament } from "./Ornament";
import { burst } from "@/lib/burst";

const SPARKLES = [
  { top: "6%", left: "12%", tw: "3.2s", td: "0s" },
  { top: "14%", left: "86%", tw: "2.6s", td: "0.8s" },
  { top: "30%", left: "4%", tw: "3.6s", td: "1.4s" },
  { top: "34%", left: "94%", tw: "2.9s", td: "0.4s" },
  { top: "52%", left: "10%", tw: "3.1s", td: "2s" },
  { top: "48%", left: "90%", tw: "3.4s", td: "1.1s" },
];

function Bell({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 40 120" className={className}>
      <line x1="20" y1="0" x2="20" y2="62" stroke="#b59a65" strokeWidth="1.2" />
      <circle cx="20" cy="40" r="3" fill="#e79aab" />
      <circle cx="20" cy="52" r="2.5" fill="#f3dca7" />
      <path d="M8 92 C8 74 12 64 20 64 C28 64 32 74 32 92 Z" fill="url(#bellg)" stroke="#8a6a2e" strokeWidth="0.8" />
      <rect x="5" y="91" width="30" height="4" rx="2" fill="#b59a65" />
      <circle cx="20" cy="99" r="3.2" fill="#8a6a2e" />
      <defs>
        <linearGradient id="bellg" x1="0" x2="1">
          <stop offset="0" stopColor="#8a6a2e" />
          <stop offset="0.45" stopColor="#f3dca7" />
          <stop offset="1" stopColor="#a88444" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function Hero() {
  const { opened } = useInvite();
  const root = useRef<HTMLElement>(null);
  const { groom, bride, tagline } = wedding.couple;

  useGSAP(
    () => {
      if (!opened) return;
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
        tl.fromTo(".hero-couple", { opacity: 0, scale: 1.05 }, { opacity: 1, scale: 1, duration: 1.4 })
          .fromTo("[data-hero]", { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 1, stagger: 0.12 }, "-=1.1")
          .fromTo(".hero-lotus", { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 1 }, "-=0.8")
          .fromTo(".hero-feather", { opacity: 0, x: 30, rotate: 8 }, { opacity: 1, x: 0, rotate: 0, duration: 1 }, "<");

        // gentle float on the divine blessing
        gsap.to(".hero-rk", { y: -6, duration: 3.2, ease: "sine.inOut", yoyo: true, repeat: -1 });

        // pointer parallax (desktop / devices with a fine pointer)
        if (window.matchMedia("(pointer: fine)").matches && root.current) {
          const layers = [
            [".hero-couple", 10],
            [".hero-lotus", 22],
            [".hero-feather", 26],
            [".hero-rk", -12],
          ] as const;
          const movers = layers.map(([sel, depth]) => ({
            x: gsap.quickTo(sel, "x", { duration: 0.8, ease: "power3.out" }),
            depth,
          }));
          const onMove = (e: PointerEvent) => {
            const nx = e.clientX / window.innerWidth - 0.5;
            movers.forEach((m) => m.x(nx * m.depth));
          };
          root.current.addEventListener("pointermove", onMove);
          return () => root.current?.removeEventListener("pointermove", onMove);
        }

        // independent parallax layers
        gsap.to(".hero-couple", {
          yPercent: 6,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
        });
        gsap.to(".hero-lotus", {
          yPercent: -30,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
        });
        gsap.to(".hero-feather", {
          yPercent: -45,
          rotate: -6,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
        });
      });
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set("[data-hero], .hero-couple, .hero-lotus, .hero-feather", { opacity: 1 });
      });
    },
    { scope: root, dependencies: [opened] },
  );

  return (
    <section
      ref={root}
      id="home"
      aria-labelledby="hero-title"
      className="relative overflow-hidden pt-[max(2rem,env(safe-area-inset-top))]"
    >
      {/* hanging temple bells */}
      <Bell className="swing pointer-events-none absolute left-[4%] top-0 z-0 h-24 w-8 sm:left-[8%] sm:h-32 sm:w-11" />
      <Bell className="swing pointer-events-none absolute right-[4%] top-0 z-0 h-20 w-7 [animation-delay:-1.6s] sm:right-[8%] sm:h-28 sm:w-10" />

      {/* twinkling sparkles */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-[1]">
        {SPARKLES.map((p, i) => (
          <span
            key={i}
            className="sparkle"
            style={{ top: p.top, left: p.left, "--tw": p.tw, "--td": p.td } as React.CSSProperties}
          />
        ))}
      </div>

      {/* soft arch glow behind the content */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-[34rem] w-[min(140vw,56rem)] -translate-x-1/2 rounded-b-[50%] opacity-80"
        style={{ background: "radial-gradient(60% 70% at 50% 25%, #fffaf2 0%, rgb(255 250 242 / 0) 70%)" }}
      />

      <div className="container-x relative grid items-center gap-6 lg:grid-cols-[1.05fr_1fr] lg:gap-12 lg:py-10">
        {/* text column */}
        <div className="relative z-10 flex flex-col items-center text-center lg:order-2">
          <div data-hero className="hero-rk relative w-[min(68vw,300px)]">
            <Image
              src="/images/radha-krishna.webp"
              alt="Radha and Krishna embracing, Krishna playing the flute"
              width={477}
              height={251}
              priority
              className="h-auto w-full"
            />
          </div>

          <div data-hero className="mt-2 flex items-center gap-3">
            <span aria-hidden="true" className="h-px w-10 bg-gold" />
            <p lang="hi" className="font-deva text-2xl text-wine">
              {wedding.blessing.invocation}
            </p>
            <span aria-hidden="true" className="h-px w-10 bg-gold" />
          </div>

          <h1
            id="hero-title"
            data-hero
            className="mt-3 font-display text-[3.1rem] font-semibold leading-[0.95] tracking-tight text-wine min-[400px]:text-[3.5rem] sm:text-7xl"
          >
            {groom}
            <span className="gold-text mx-2 font-display text-[0.85em] font-medium italic"> &amp; </span>
            {bride}
          </h1>

          <p data-hero className="mt-3 font-display text-xl italic text-plum sm:text-2xl">
            {tagline}
          </p>

          <div data-hero>
            <Ornament className="mt-4" />
          </div>

          <p data-hero className="eyebrow mt-3">
            <time dateTime={wedding.weddingDate}>{formatLongDate(wedding.weddingDate)}</time>
            <span aria-hidden="true"> · </span>
            {wedding.venue.city}
          </p>

          <div data-hero className="mt-5">
            <Countdown target={wedding.countdownTarget} />
          </div>

          <div data-hero className="mt-6 flex flex-wrap justify-center gap-3">
            <a href="#rsvp" className="btn btn-primary">
              RSVP
            </a>
            <a href="#celebrations" className="btn btn-outline">
              View celebrations
            </a>
          </div>
        </div>

        {/* couple column */}
        <div className="relative mx-auto w-full max-w-[34rem] lg:order-1">
          <button
            type="button"
            onClick={(e) => {
              const r = e.currentTarget.getBoundingClientRect();
              const x = e.clientX || r.left + r.width / 2;
              const y = e.clientY || r.top + r.height / 2;
              burst(x, y, { kind: "hearts", count: 16, spread: 120 });
            }}
            aria-label={`Send love to ${groom} and ${bride}`}
            className="hero-couple group relative block w-full cursor-pointer rounded-3xl"
          >
            <span className="absolute right-4 top-4 z-10 rounded-full border border-gold/60 bg-parchment/85 px-3 py-1 font-display text-sm italic text-wine shadow-sm backdrop-blur-sm transition group-hover:scale-105">
              Tap to send love ♡
            </span>
            <Image
              src="/images/couple-hero.webp"
              alt={`${groom} in a green embroidered kurta and ${bride} in a blush dupatta, smiling together`}
              width={900}
              height={836}
              priority
              sizes="(min-width: 1024px) 34rem, 100vw"
              className="h-auto w-full"
            />
          </button>
          <Image
            src="/images/lotus.webp"
            alt=""
            width={215}
            height={246}
            className="hero-lotus pointer-events-none absolute -bottom-2 -left-3 w-[26%] max-w-[9rem] drop-shadow-md"
          />
          <Image
            src="/images/peacock-feather.webp"
            alt=""
            width={226}
            height={334}
            className="hero-feather pointer-events-none absolute -bottom-3 -right-3 w-[24%] max-w-[8rem] drop-shadow-md"
          />
        </div>
      </div>

      <a
        href="#blessings"
        className="relative z-10 mx-auto mt-6 mb-4 flex w-max flex-col items-center gap-1 text-sm text-gold-ink"
        aria-label="Scroll to blessings"
      >
        <span className="eyebrow !text-[0.65rem]">Scroll</span>
        <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" style={{ animation: "bob 2s ease-in-out infinite" }}>
          <path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </a>
    </section>
  );
}
