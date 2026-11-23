"use client";

import { useEffect, useState } from "react";
import { useInvite } from "./InviteProvider";

const links = [
  { href: "#home", label: "Home", d: "M4 11l8-7 8 7v9H4z M10 20v-5h4v5" },
  { href: "#story", label: "Story", d: "M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z" },
  { href: "#celebrations", label: "Events", d: "M4 7h16v13H4zM4 11h16M8 4v5M16 4v5" },
  { href: "#venue", label: "Venue", d: "M12 21s-7-6.1-7-11.5a7 7 0 0 1 14 0C19 14.9 12 21 12 21z M12 7a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5z" },
  { href: "#rsvp", label: "RSVP", d: "M4 6h16v12H4z M4 7l8 6 8-6" },
];

/** Floating bottom navigation with the music toggle. Appears after the envelope opens. */
export function Dock() {
  const { opened, hasMusic, playing, toggleMusic } = useInvite();
  const [current, setCurrent] = useState("#home");

  useEffect(() => {
    const sections = links
      .map((l) => document.querySelector<HTMLElement>(l.href))
      .filter((s): s is HTMLElement => Boolean(s));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setCurrent(`#${e.target.id}`);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  return (
    <nav
      aria-label="Sections"
      className={`fixed inset-x-0 bottom-0 z-40 flex justify-center px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] transition duration-700 ease-[var(--ease-soft)] ${
        opened ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-full opacity-0"
      }`}
    >
      <div className="flex items-center gap-0.5 rounded-full border border-gold/50 bg-parchment/90 p-1.5 shadow-[0_14px_34px_-14px_rgba(69,51,71,0.5)] backdrop-blur-md">
        {links.map((l) => {
          const active = current === l.href;
          return (
            <a
              key={l.href}
              href={l.href}
              aria-current={active ? "location" : undefined}
              className={`flex min-h-11 min-w-11 flex-col items-center justify-center rounded-full px-2.5 py-1 text-[0.62rem] font-semibold uppercase tracking-wider transition sm:px-3.5 ${
                active ? "bg-wine text-ivory" : "text-plum hover:bg-blush-soft"
              }`}
            >
              <svg aria-hidden="true" viewBox="0 0 24 24" className="h-[1.15rem] w-[1.15rem]" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round">
                <path d={l.d} />
              </svg>
              <span className="mt-0.5">{l.label}</span>
            </a>
          );
        })}

        {hasMusic && (
          <button
            type="button"
            onClick={toggleMusic}
            aria-pressed={playing}
            aria-label={playing ? "Pause music" : "Play music"}
            className="ml-1 grid h-11 w-11 place-items-center rounded-full border border-gold/60 text-wine transition hover:bg-blush-soft"
          >
            {playing ? (
              <span aria-hidden="true" className="flex h-4 items-end gap-[3px]">
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className="w-[3px] rounded-full bg-wine"
                    style={{ height: "100%", animation: `shimmer 0.9s ease-in-out ${i * 0.2}s infinite`, transformOrigin: "bottom" }}
                  />
                ))}
              </span>
            ) : (
              <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M9 18V5l11-2v13" />
                <circle cx="6.5" cy="18" r="2.5" />
                <circle cx="17.5" cy="16" r="2.5" />
              </svg>
            )}
          </button>
        )}
      </div>
    </nav>
  );
}
