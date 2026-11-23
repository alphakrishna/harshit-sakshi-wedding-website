"use client";

import { useState } from "react";
import { burst, rain } from "@/lib/burst";

const MESSAGES = [
  "Your blessings are on their way ♡",
  "Radhe Radhe! Showered with love",
  "So many blessings, thank you!",
  "The couple feels the love ♡",
];

/** Playful button: every tap rains petals and hearts. The count is local to this visitor. */
export function BlessingsShower() {
  const [count, setCount] = useState(0);

  return (
    <div className="flex flex-col items-center">
      <button
        type="button"
        onClick={(e) => {
          setCount((c) => c + 1);
          rain({ kind: "petals", count: 50, duration: 4.5 });
          burst(e.clientX || window.innerWidth / 2, e.clientY || window.innerHeight / 2, { kind: "hearts", count: 18, spread: 140 });
        }}
        className="btn group relative overflow-hidden bg-gradient-to-r from-[#b59a65] via-[#d9c391] to-[#b59a65] bg-[length:200%_100%] text-[1.15rem] text-wine shadow-[0_12px_28px_-14px_rgba(138,106,46,0.9)] transition-[background-position] duration-700 hover:bg-[position:100%_0]"
      >
        <span aria-hidden="true" className="text-xl transition group-active:scale-125">🌸</span>
        Shower your blessings
      </button>
      <p aria-live="polite" className="mt-3 min-h-[1.5rem] font-display text-lg italic text-plum">
        {count > 0 && (
          <>
            {MESSAGES[(count - 1) % MESSAGES.length]}
            <span className="ml-2 text-gold-ink">×{count}</span>
          </>
        )}
      </p>
    </div>
  );
}
