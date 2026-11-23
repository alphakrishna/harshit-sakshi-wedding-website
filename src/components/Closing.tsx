"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import { wedding } from "@/config/wedding";
import { formatLongDate } from "@/lib/format";
import { Ornament } from "./Ornament";
import { Petals } from "./Petals";
import { ShareButtons } from "./ShareButtons";
import { BlessingsShower } from "./BlessingsShower";

export function Closing() {
  const root = useRef<HTMLElement>(null);
  const { couple, closing } = wedding;

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const tl = gsap.timeline({ scrollTrigger: { trigger: root.current, start: "top 65%" } });
        tl.fromTo(".closing-couple", { opacity: 0, x: -40 }, { opacity: 1, x: 0, duration: 1.2, ease: "power3.out" })
          .fromTo(".closing-plaque", { opacity: 0, y: 30, scale: 0.96 }, { opacity: 1, y: 0, scale: 1, duration: 1, ease: "power3.out" }, "-=0.8")
          .fromTo(".closing-deco", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.15 }, "-=0.5");
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="closing"
      aria-labelledby="closing-title"
      className="section relative overflow-hidden pb-[max(7rem,env(safe-area-inset-bottom))]"
      style={{ background: "linear-gradient(180deg, transparent, rgb(234 199 204 / 0.35) 40%, rgb(239 225 196 / 0.45))" }}
    >
      <Petals count={8} />

      <div className="container-x relative grid items-center gap-8 lg:grid-cols-2 lg:gap-4">
        <div className="closing-couple mx-auto w-full max-w-[30rem]">
          <Image
            src="/images/couple-closing.webp"
            alt={`${couple.groom} and ${couple.bride} sitting close together beneath lanterns and flowering arches`}
            width={743}
            height={876}
            sizes="(min-width: 1024px) 30rem, 92vw"
            className="fade-right h-auto w-full"
          />
        </div>

        <div className="relative mx-auto w-full max-w-[32rem]">
          <div className="closing-plaque relative rounded-[2.5rem] border-2 border-gold/70 bg-[radial-gradient(120%_100%_at_50%_0%,#fffaf1,#f7ead8)] px-6 py-10 text-center shadow-[0_30px_60px_-30px_rgba(69,51,71,0.45)] sm:px-10">
            <span aria-hidden="true" className="pointer-events-none absolute inset-2.5 rounded-[2rem] border border-gold/40" />
            <h2 id="closing-title" className="font-display text-5xl font-semibold leading-none text-wine sm:text-6xl">
              {couple.groom}
              <span className="gold-text font-medium italic"> &amp; </span>
              {couple.bride}
            </h2>
            <Ornament className="my-4" />
            <p className="font-display text-3xl italic text-plum sm:text-4xl">{closing.line}</p>
            <p className="mt-6 inline-block rounded-xl border border-gold/70 bg-white/60 px-4 py-2 font-mono text-sm text-plum">
              {closing.codeTag}
            </p>
            <p className="eyebrow mt-6">
              <time dateTime={wedding.weddingDate}>{formatLongDate(wedding.weddingDate)}</time>
            </p>
          </div>
        </div>
      </div>

      <div className="closing-deco container-x relative mt-14 text-center">
        <BlessingsShower />
        <p className="mt-8 font-display text-lg italic text-plum">Share the joy with family and friends</p>
        <ShareButtons className="mt-4" />
        {couple.hashtag && <p className="mt-6 font-display text-xl text-gold-ink">{couple.hashtag}</p>}
        <p className="mt-10 text-sm text-plum/70">With love and blessings · {couple.groom} &amp; {couple.bride}</p>
        <p className="mt-2 text-xs text-plum/80">
          Crafted with <span aria-hidden="true">♡</span>
          <span className="sr-only">love</span> by{" "}
          <a
            href="https://www.aaurigotech.com/"
            target="_blank"
            rel="noopener"
            className="underline decoration-gold/50 underline-offset-2 transition hover:text-wine"
          >
            Aaurigo Tech
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </p>
      </div>
    </section>
  );
}
