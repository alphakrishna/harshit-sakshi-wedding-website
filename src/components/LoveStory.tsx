"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import { wedding } from "@/config/wedding";
import { SectionHeading } from "./Ornament";
import { burst } from "@/lib/burst";

function wiggle(el: HTMLElement) {
  if (!window.matchMedia(MOTION_OK).matches) return;
  gsap.fromTo(el, { rotate: "-=4" }, { rotate: "+=4", duration: 0.6, ease: "elastic.out(1.2, 0.3)" });
}

const icons = [
  // calendar
  <path key="a" d="M4 7h16v13H4zM4 11h16M8 4v5M16 4v5M8 15h2M12 15h2M16 15h0" />,
  // two hearts / people
  <path key="b" d="M9 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM3 20c0-3.3 2.7-6 6-6M15.5 20.5l-3.2-3.1a2.1 2.1 0 1 1 3.2-2.7 2.1 2.1 0 1 1 3.2 2.7z" />,
  // laptop </>
  <path key="c" d="M5 6h14v10H5zM3 19h18M10.5 9 9 11l1.5 2M13.5 9 15 11l-1.5 2" />,
  // heart
  <path key="d" d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z" />,
];

export function LoveStory() {
  const root = useRef<HTMLElement>(null);
  const { story } = wedding;

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        // the gold thread draws itself as you scroll
        gsap.fromTo(
          ".story-thread",
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: { trigger: ".story-list", start: "top 70%", end: "bottom 60%", scrub: 0.6 },
          },
        );

        gsap.utils.toArray<HTMLElement>(".story-item").forEach((item, i) => {
          const fromLeft = i % 2 === 0;
          const tl = gsap.timeline({
            scrollTrigger: { trigger: item, start: "top 78%", once: true },
          });
          tl.fromTo(
            item.querySelector(".story-photo"),
            { opacity: 0, x: fromLeft ? -50 : 50, rotate: fromLeft ? -8 : 8 },
            { opacity: 1, x: 0, rotate: fromLeft ? -2 : 2, duration: 1, ease: "power3.out" },
          )
            .fromTo(
              item.querySelector(".story-dot"),
              { scale: 0 },
              { scale: 1, duration: 0.5, ease: "back.out(3)" },
              "-=0.7",
            )
            .fromTo(
              item.querySelector(".story-text"),
              { opacity: 0, y: 24 },
              { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
              "-=0.6",
            );
        });

        gsap.fromTo(
          ".story-forever",
          { opacity: 0, scale: 0.92, y: 20 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: { trigger: ".story-forever", start: "top 85%" },
          },
        );
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="story" aria-labelledby="story-title" className="section overflow-hidden">
      <div className="container-x">
        <SectionHeading id="story-title" eyebrow="Our" title="Love Story" subtitle={story.intro} />

        <ol className="story-list relative mx-auto mt-14 max-w-5xl">
          {/* timeline thread: left on mobile, centred on desktop */}
          <span
            aria-hidden="true"
            className="absolute bottom-6 left-[1.1rem] top-2 w-px border-l-2 border-dashed border-gold/60 md:left-1/2 md:-translate-x-1/2"
          />
          <span
            aria-hidden="true"
            className="story-thread absolute bottom-6 left-[1.1rem] top-2 w-[2px] origin-top bg-gradient-to-b from-gold-light via-gold to-gold-ink md:left-1/2 md:-translate-x-1/2"
          />

          {story.chapters.map((c, i) => {
            const reverse = i % 2 === 1;
            return (
              <li
                key={c.title}
                className="story-item relative grid gap-5 pb-14 pl-12 last:pb-4 md:grid-cols-2 md:gap-16 md:pl-0"
              >
                <span
                  aria-hidden="true"
                  className="story-dot absolute left-[1.1rem] top-8 z-10 grid h-5 w-5 -translate-x-1/2 place-items-center rounded-full border-2 border-gold bg-ivory shadow md:left-1/2"
                >
                  <span className="h-2 w-2 rounded-full bg-gold" />
                </span>

                <figure
                  className={`story-photo relative cursor-pointer ${reverse ? "md:order-2" : ""}`}
                  onClick={(e) => {
                    burst(e.clientX, e.clientY, { kind: "hearts", count: 12, spread: 100 });
                    wiggle(e.currentTarget);
                  }}
                >
                  <span
                    aria-hidden="true"
                    className={`absolute -bottom-4 z-10 grid h-12 w-12 place-items-center rounded-full border border-gold/60 bg-parchment font-display text-lg font-semibold text-gold-ink shadow-md ${
                      reverse ? "-left-2" : "-right-2"
                    }`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    aria-hidden="true"
                    className="absolute -top-3 left-1/2 z-10 h-6 w-20 -translate-x-1/2 rotate-[-3deg] bg-[#eadfc6]/80 shadow-sm"
                  />
                  <Image
                    src={c.image}
                    alt={c.imageAlt}
                    width={c.width}
                    height={c.height}
                    sizes="(min-width: 768px) 28rem, 90vw"
                    className="h-auto w-full drop-shadow-[0_14px_20px_rgba(69,51,71,0.25)]"
                  />
                </figure>

                <div
                  className={`story-text flex flex-col justify-center ${reverse ? "md:order-1 md:items-end md:text-right" : ""}`}
                >
                  <div className={`flex items-center gap-3 ${reverse ? "md:flex-row-reverse" : ""}`}>
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      className="h-7 w-7 shrink-0 text-gold-ink"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      {icons[i % icons.length]}
                    </svg>
                    <h3 className="font-display text-[1.75rem] font-semibold italic leading-tight text-wine">
                      {c.title}
                    </h3>
                  </div>
                  <p className="mt-2 max-w-sm text-plum/90">{c.text}</p>
                </div>
              </li>
            );
          })}
        </ol>

        <div className="story-forever mx-auto mt-10 flex max-w-3xl flex-col items-center gap-8 md:flex-row md:justify-center md:gap-14">
          <div className="relative w-64 rotate-[-4deg] bg-[#fdf9f1] px-6 py-6 shadow-[0_14px_30px_-16px_rgba(69,51,71,0.45)]">
            <span aria-hidden="true" className="absolute -top-3 left-6 h-6 w-16 rotate-[-6deg] bg-[#eadfc6]/85" />
            {story.note.map((line) => (
              <p key={line} className="font-display text-xl italic leading-snug text-plum">
                {line}
              </p>
            ))}
            <p aria-hidden="true" className="mt-2 font-mono text-sm text-gold-ink">
              &lt;/&gt; ♡
            </p>
          </div>
          <p className="text-center">
            <span className="block font-script text-4xl text-gold-ink">And now…</span>
            <span className="block font-script text-7xl leading-none text-wine sm:text-8xl">Forever</span>
          </p>
        </div>
      </div>
    </section>
  );
}
