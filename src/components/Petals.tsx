/**
 * Lightweight falling petals (CSS only). Positions are deterministic so the
 * server and client render the same markup. Hidden for reduced motion.
 */
export function Petals({ count = 12, className = "" }: { count?: number; className?: string }) {
  const petals = Array.from({ length: count }, (_, i) => {
    const seed = (i * 7919) % 100; // cheap pseudo-random spread
    return {
      left: `${(i * 97 + seed) % 100}%`,
      dur: `${11 + (seed % 9)}s`,
      delay: `${-((i * 1.7) % 14)}s`,
      drift: `${(seed % 2 ? 1 : -1) * (30 + (seed % 60))}px`,
      spin: `${360 + (seed % 4) * 120}deg`,
      scale: 0.7 + (seed % 5) * 0.12,
    };
  });

  return (
    <div aria-hidden="true" className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {petals.map((p, i) => (
        <span
          key={i}
          className="petal"
          style={
            {
              left: p.left,
              scale: p.scale,
              "--dur": p.dur,
              "--delay": p.delay,
              "--drift": p.drift,
              "--spin": p.spin,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
