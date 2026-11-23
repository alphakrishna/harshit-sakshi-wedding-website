"use client";

import { gsap, ScrollTrigger, useGSAP, MOTION_OK } from "@/lib/gsap";

/**
 * Site-wide motion: gentle reveals for `data-reveal`, a handwriting-style wipe for
 * `data-write` titles, the arch parallax and the gold scroll-progress bar.
 * Under reduced motion nothing animates and everything stays visible.
 */
export function ScrollReveal() {
  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add(MOTION_OK, () => {
      ScrollTrigger.batch("[data-reveal]", {
        start: "top 88%",
        once: true,
        onEnter: (els) =>
          gsap.fromTo(
            els,
            { opacity: 0, y: 26 },
            { opacity: 1, y: 0, duration: 0.9, ease: "power2.out", stagger: 0.1, overwrite: true },
          ),
      });

      gsap.utils.toArray<HTMLElement>("[data-write]").forEach((el) => {
        gsap.fromTo(
          el,
          { clipPath: "inset(-25% 110% -25% -10%)" },
          {
            clipPath: "inset(-25% -10% -25% -10%)",
            duration: 1.6,
            ease: "power2.inOut",
            scrollTrigger: { trigger: el, start: "top 85%", once: true },
          },
        );
      });

      gsap.fromTo(
        ".parallax-arch",
        { yPercent: -6 },
        { yPercent: 6, ease: "none", scrollTrigger: { trigger: "#blessings", start: "top bottom", end: "bottom top", scrub: true } },
      );

      gsap.to(".scroll-progress", {
        scaleX: 1,
        ease: "none",
        scrollTrigger: { trigger: document.body, start: "top top", end: "bottom bottom", scrub: 0.3 },
      });

      // Fonts and images change layout after load; keep trigger positions correct.
      const refresh = () => ScrollTrigger.refresh();
      window.addEventListener("load", refresh);
      document.fonts?.ready.then(refresh);
      return () => window.removeEventListener("load", refresh);
    });
  });

  return <div aria-hidden="true" className="scroll-progress" />;
}
