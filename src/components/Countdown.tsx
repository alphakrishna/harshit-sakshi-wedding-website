"use client";

import { useEffect, useState } from "react";

function diff(target: number) {
  const ms = Math.max(0, target - Date.now());
  return {
    days: Math.floor(ms / 86_400_000),
    hours: Math.floor((ms / 3_600_000) % 24),
    minutes: Math.floor((ms / 60_000) % 60),
    seconds: Math.floor((ms / 1000) % 60),
    done: ms === 0,
  };
}

export function Countdown({ target }: { target: string }) {
  const t = new Date(target).getTime();
  // null on the server / first paint to avoid a hydration mismatch
  const [left, setLeft] = useState<ReturnType<typeof diff> | null>(null);

  useEffect(() => {
    const tick = () => setLeft(diff(t));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [t]);

  if (left?.done) {
    return <p className="font-display text-xl italic text-wine">Today we begin our forever ♡</p>;
  }

  const units = [
    ["Days", left?.days],
    ["Hours", left?.hours],
    ["Minutes", left?.minutes],
    ["Seconds", left?.seconds],
  ] as const;

  return (
    <div role="timer" aria-label="Countdown to the wedding" className="flex justify-center gap-2 sm:gap-3">
      {units.map(([label, value]) => (
        <div
          key={label}
          className="flex w-[4.25rem] flex-col items-center rounded-xl border border-gold/40 bg-parchment/80 py-2 backdrop-blur-sm sm:w-20"
          aria-hidden={label === "Seconds" ? true : undefined}
        >
          <span className="font-display text-2xl font-semibold tabular-nums text-wine sm:text-3xl" style={{ perspective: "200px" }}>
            <span key={value ?? "x"} className="digit-flip">
              {value === undefined ? "–" : String(value).padStart(2, "0")}
            </span>
          </span>
          <span className="text-[0.68rem] uppercase tracking-[0.18em] text-gold-ink">{label}</span>
        </div>
      ))}
    </div>
  );
}
