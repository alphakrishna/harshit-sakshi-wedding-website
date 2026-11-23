/** Gold line–lotus–line divider used under headings. Decorative only. */
export function Ornament({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 240 24"
      className={`mx-auto h-6 w-56 text-gold ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.1"
    >
      <path d="M8 12 H92" />
      <path d="M148 12 H232" />
      <circle cx="92" cy="12" r="1.6" fill="currentColor" />
      <circle cx="148" cy="12" r="1.6" fill="currentColor" />
      {/* lotus */}
      <path d="M120 4 C114 9 114 15 120 20 C126 15 126 9 120 4 Z" />
      <path d="M120 20 C112 19 106 14 104 9 C110 9 116 12 120 20 Z" />
      <path d="M120 20 C128 19 134 14 136 9 C130 9 124 12 120 20 Z" />
      <path d="M100 20 H140" />
    </svg>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  id,
  className = "",
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  id?: string;
  className?: string;
}) {
  return (
    <header className={`mx-auto max-w-xl text-center ${className}`} data-reveal>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 id={id} data-write className="script-title mt-2 text-[3.25rem] sm:text-6xl">
        {title}
      </h2>
      {subtitle && <p className="mt-3 font-display text-lg italic text-plum/90">{subtitle}</p>}
      <Ornament className="mt-4" />
    </header>
  );
}
