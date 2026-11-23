"use client";

import { useState } from "react";
import { wedding } from "@/config/wedding";
import { SectionHeading } from "./Ornament";

export function Venue() {
  const { venue } = wedding;
  // The map loads only when asked for: it saves data on mobile and keeps Google off the page until then.
  const [showMap, setShowMap] = useState(false);

  return (
    <section id="venue" aria-labelledby="venue-title" className="section">
      <div className="container-x">
        <SectionHeading id="venue-title" eyebrow="Where" title="The Venue" />

        <div className="mx-auto mt-12 grid max-w-4xl gap-6 md:grid-cols-[1fr_1.2fr]">
          <div data-reveal className="paper-card flex flex-col p-6 sm:p-8">
            <p className="eyebrow">We are celebrating at</p>
            <h3 className="mt-2 font-display text-3xl font-semibold leading-tight text-wine">{venue.name}</h3>
            <address className="mt-2 not-italic text-plum/90">{venue.address}</address>

            <ul className="mt-5 space-y-2 text-base text-plum/90">
              {venue.notes.map((n) => (
                <li key={n} className="flex gap-2">
                  <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                  {n}
                </li>
              ))}
            </ul>

            <div className="mt-auto flex flex-wrap gap-3 pt-6">
              <a href={venue.mapsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-green">
                <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <path d="M12 21s-7-6.1-7-11.5a7 7 0 0 1 14 0C19 14.9 12 21 12 21z" />
                  <circle cx="12" cy="9.5" r="2.5" />
                </svg>
                Get directions
                <span className="sr-only"> (opens Google Maps)</span>
              </a>
            </div>
          </div>

          <div data-reveal className="paper-card relative min-h-[18rem] overflow-hidden p-2">
            {showMap ? (
              <iframe
                title={`Map showing ${venue.name}, ${venue.address}`}
                src={venue.mapEmbedUrl}
                className="h-full min-h-[18rem] w-full rounded-[1rem] border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            ) : (
              <button
                type="button"
                onClick={() => setShowMap(true)}
                className="group relative grid h-full min-h-[18rem] w-full place-items-center overflow-hidden rounded-[1rem] bg-blush-soft"
                style={{
                  backgroundImage:
                    "linear-gradient(rgb(181 154 101 / 0.18) 1px, transparent 1px), linear-gradient(90deg, rgb(181 154 101 / 0.18) 1px, transparent 1px)",
                  backgroundSize: "28px 28px",
                }}
              >
                <span className="flex flex-col items-center gap-3">
                  <span className="grid h-14 w-14 place-items-center rounded-full bg-wine text-ivory shadow-lg transition group-hover:scale-110">
                    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.6">
                      <path d="M12 21s-7-6.1-7-11.5a7 7 0 0 1 14 0C19 14.9 12 21 12 21z" />
                      <circle cx="12" cy="9.5" r="2.5" />
                    </svg>
                  </span>
                  <span className="font-display text-lg font-semibold text-wine">Show map</span>
                  <span className="text-sm text-plum/80">{venue.city}</span>
                </span>
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
