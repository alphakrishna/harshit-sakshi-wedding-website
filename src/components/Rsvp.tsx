"use client";

import { useRef, useState } from "react";
import { gsap, MOTION_OK } from "@/lib/gsap";
import { wedding } from "@/config/wedding";
import { formatLongDate } from "@/lib/format";
import { SectionHeading } from "./Ornament";
import { rain } from "@/lib/burst";

type Status = "idle" | "sending" | "sent" | "error";

const field =
  "mt-1.5 block w-full rounded-xl border border-gold/50 bg-white/80 px-4 py-3 text-base text-plum placeholder:text-plum/45 focus:border-wine focus:outline-none focus:ring-2 focus:ring-wine/25";
const label = "font-display text-base font-semibold text-wine";

export function Rsvp() {
  const { rsvp, couple } = wedding;
  const [status, setStatus] = useState<Status>("idle");
  const [attending, setAttending] = useState<"yes" | "no" | "">("");
  const [error, setError] = useState("");
  const thanksRef = useRef<HTMLDivElement>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    const data = new FormData(form);
    if (data.get("company")) return; // honeypot: bots fill hidden fields

    if (!rsvp.endpoint) {
      setStatus("error");
      setError("RSVP isn’t connected yet. Please let the family know directly. We’ll have this working soon!");
      return;
    }

    setStatus("sending");
    setError("");
    try {
      const body = new URLSearchParams({
        name: String(data.get("name") ?? "").trim(),
        email: String(data.get("email") ?? "").trim(),
        attending: String(data.get("attending") ?? ""),
        guests: attending === "yes" ? String(data.get("guests") ?? "1") : "0",
        message: String(data.get("message") ?? "").trim(),
        submittedAt: new Date().toISOString(),
      });
      // Google Apps Script doesn't send CORS headers, so this is a "fire and forget" simple request.
      await fetch(rsvp.endpoint, { method: "POST", mode: "no-cors", body });
      setStatus("sent");
      form.reset();
      if (attending === "yes") rain({ kind: "confetti", count: 90, duration: 3.5 });
      else rain({ kind: "petals", count: 30, duration: 4 });
      requestAnimationFrame(() => {
        thanksRef.current?.focus();
        if (window.matchMedia(MOTION_OK).matches) {
          gsap.fromTo(thanksRef.current, { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 0.7, ease: "power3.out" });
        }
      });
    } catch {
      setStatus("error");
      setError("Something went wrong while sending. Please check your connection and try again.");
    }
  }

  return (
    <section id="rsvp" aria-labelledby="rsvp-title" className="section">
      <div className="container-x">
        <SectionHeading
          id="rsvp-title"
          eyebrow="Kindly respond"
          title="RSVP"
          subtitle={`Please let us know by ${formatLongDate(rsvp.deadline)}`}
        />

        <div data-reveal className="paper-card mx-auto mt-12 max-w-xl p-6 sm:p-10">
          {status === "sent" ? (
            <div ref={thanksRef} tabIndex={-1} role="status" className="py-6 text-center outline-none">
              <p className="font-script text-6xl text-wine">Thank you</p>
              <p className="mt-3 font-display text-xl italic text-plum">
                {attending === "no"
                  ? "We’ll miss you, and we’re grateful for your blessings."
                  : `${couple.groom} & ${couple.bride} can’t wait to celebrate with you!`}
              </p>
              <button type="button" onClick={() => setStatus("idle")} className="btn btn-outline mt-6">
                Send another response
              </button>
            </div>
          ) : (
            <form onSubmit={onSubmit} noValidate className="space-y-5">
              <div>
                <label htmlFor="rsvp-name" className={label}>
                  Your name
                </label>
                <input id="rsvp-name" name="name" type="text" required autoComplete="name" placeholder="Full name" className={field} />
              </div>

              <div>
                <label htmlFor="rsvp-email" className={label}>
                  Email
                </label>
                <input
                  id="rsvp-email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  inputMode="email"
                  placeholder="you@example.com"
                  className={field}
                />
              </div>

              <fieldset>
                <legend className={label}>Will you be joining us?</legend>
                <div className="mt-2 grid grid-cols-2 gap-3">
                  {(
                    [
                      ["yes", "Joyfully accept"],
                      ["no", "Regretfully decline"],
                    ] as const
                  ).map(([value, text]) => (
                    <label
                      key={value}
                      className={`flex min-h-12 cursor-pointer items-center justify-center rounded-xl border px-3 py-3 text-center font-display text-base font-semibold transition has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-wine ${
                        attending === value
                          ? "border-wine bg-wine text-ivory"
                          : "border-gold/50 bg-white/70 text-wine hover:bg-white"
                      }`}
                    >
                      <input
                        type="radio"
                        name="attending"
                        value={value}
                        required
                        className="sr-only"
                        checked={attending === value}
                        onChange={() => setAttending(value)}
                      />
                      {text}
                    </label>
                  ))}
                </div>
              </fieldset>

              {attending === "yes" && (
                <div>
                  <label htmlFor="rsvp-guests" className={label}>
                    Number of guests attending
                  </label>
                  <p id="rsvp-guests-hint" className="text-sm text-plum/75">
                    Including yourself
                  </p>
                  <select id="rsvp-guests" name="guests" defaultValue="1" aria-describedby="rsvp-guests-hint" className={field}>
                    {Array.from({ length: rsvp.maxGuests }, (_, i) => i + 1).map((n) => (
                      <option key={n} value={n}>
                        {n}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div>
                <label htmlFor="rsvp-message" className={label}>
                  A note for the couple <span className="font-normal text-plum/70">(optional)</span>
                </label>
                <textarea id="rsvp-message" name="message" rows={3} placeholder="Your wishes…" className={field} />
              </div>

              {/* honeypot: hidden from people, tempting for bots */}
              <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
                <label htmlFor="rsvp-company">Company</label>
                <input id="rsvp-company" name="company" type="text" tabIndex={-1} autoComplete="off" />
              </div>

              <div aria-live="polite" className="min-h-[1.5rem] text-center text-base text-wine">
                {status === "error" && error}
              </div>

              <button type="submit" disabled={status === "sending"} className="btn btn-primary w-full disabled:opacity-70">
                {status === "sending" ? "Sending…" : "Send RSVP"}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
