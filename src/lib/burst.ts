"use client";

import { gsap, MOTION_OK } from "./gsap";

type Kind = "petals" | "hearts" | "confetti";

const PALETTES: Record<Kind, string[]> = {
  petals: ["#f6c9d1", "#e79aab", "#f3b6c2", "#fbe0e4"],
  hearts: ["#b03a5f", "#d9677f", "#e79aab", "#b59a65"],
  confetti: ["#b59a65", "#d9c391", "#e79aab", "#6b2340", "#2f4a3a", "#f3dca7"],
};

function makePiece(kind: Kind, color: string) {
  const el = document.createElement("span");
  el.setAttribute("aria-hidden", "true");
  el.style.cssText = "position:fixed;left:0;top:0;pointer-events:none;z-index:70;will-change:transform,opacity;";
  if (kind === "hearts") {
    el.textContent = "♥";
    el.style.color = color;
    el.style.fontSize = `${14 + Math.random() * 14}px`;
    el.style.lineHeight = "1";
  } else if (kind === "petals") {
    el.style.width = `${10 + Math.random() * 8}px`;
    el.style.height = `${8 + Math.random() * 6}px`;
    el.style.borderRadius = "80% 0 80% 0";
    el.style.background = `linear-gradient(135deg, #fff3, ${color})`;
  } else {
    el.style.width = `${6 + Math.random() * 6}px`;
    el.style.height = `${4 + Math.random() * 10}px`;
    el.style.borderRadius = Math.random() > 0.5 ? "2px" : "50%";
    el.style.background = color;
  }
  return el;
}

/** Explodes petals / hearts / confetti from a screen point. No-op under reduced motion. */
export function burst(x: number, y: number, { kind = "petals" as Kind, count = 24, spread = 160 } = {}) {
  if (typeof window === "undefined" || !window.matchMedia(MOTION_OK).matches) return;
  const colors = PALETTES[kind];
  for (let i = 0; i < count; i++) {
    const el = makePiece(kind, colors[i % colors.length]);
    document.body.appendChild(el);
    const angle = Math.random() * Math.PI * 2;
    const dist = spread * (0.4 + Math.random() * 0.6);
    gsap.set(el, { x, y, xPercent: -50, yPercent: -50, scale: 0.4, rotate: Math.random() * 360 });
    gsap
      .timeline({ onComplete: () => el.remove() })
      .to(el, {
        x: x + Math.cos(angle) * dist,
        y: y + Math.sin(angle) * dist - (kind === "hearts" ? 60 : 20),
        scale: 1,
        rotate: `+=${(Math.random() - 0.5) * 360}`,
        duration: 0.7 + Math.random() * 0.3,
        ease: "power3.out",
      })
      .to(el, {
        y: `+=${kind === "hearts" ? -80 : 120 + Math.random() * 80}`,
        x: `+=${(Math.random() - 0.5) * 60}`,
        opacity: 0,
        duration: 1 + Math.random() * 0.6,
        ease: "power1.in",
      });
  }
}

/** Petals raining across the whole viewport. */
export function rain({ kind = "petals" as Kind, count = 60, duration = 4 } = {}) {
  if (typeof window === "undefined" || !window.matchMedia(MOTION_OK).matches) return;
  const colors = PALETTES[kind];
  const w = window.innerWidth;
  const h = window.innerHeight;
  for (let i = 0; i < count; i++) {
    const el = makePiece(kind, colors[i % colors.length]);
    document.body.appendChild(el);
    const startX = Math.random() * w;
    gsap.set(el, { x: startX, y: -30, rotate: Math.random() * 360, scale: 0.7 + Math.random() * 0.6 });
    gsap.to(el, {
      x: startX + (Math.random() - 0.5) * 160,
      y: h + 40,
      rotate: `+=${360 + Math.random() * 360}`,
      duration: duration * (0.6 + Math.random() * 0.6),
      delay: Math.random() * duration * 0.6,
      ease: "none",
      onComplete: () => el.remove(),
    });
  }
}
