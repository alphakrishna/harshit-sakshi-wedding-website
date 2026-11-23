import Image from "next/image";
import { wedding } from "@/config/wedding";
import { formatLongDate } from "@/lib/format";
import { Ornament } from "./Ornament";

export function Blessings() {
  const { blessing, families, couple } = wedding;

  return (
    <section id="blessings" aria-labelledby="blessings-title" className="section">
      <div className="container-x">
        <div className="relative mx-auto max-w-2xl">
          {/* arched invitation card */}
          <div
            data-reveal
            className="paper-card relative overflow-hidden rounded-t-[50%_9rem] px-6 pb-12 pt-0 text-center sm:rounded-t-[50%_12rem] sm:px-12"
          >
            <div className="parallax-arch -mx-6 sm:-mx-12">
              <Image
                src="/images/temple-arch.webp"
                alt="Carved temple arch with Radha and Krishna beneath flowering vines"
                width={1024}
                height={284}
                sizes="(min-width: 672px) 42rem, 100vw"
                className="fade-bottom h-auto w-full"
              />
            </div>

            <h2 id="blessings-title" className="sr-only">
              Blessings and invitation
            </h2>

            <div data-reveal lang="hi" className="mt-2 font-deva text-[1.2rem] leading-loose text-wine sm:text-2xl">
              {blessing.shloka.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>

            <p data-reveal className="mx-auto mt-4 max-w-md font-display text-lg italic leading-relaxed text-plum">
              {blessing.meaning}
            </p>

            <Ornament className="my-6" />

            <div data-reveal className="space-y-3">
              <p className="eyebrow">Together with their families</p>
              <p className="text-base text-plum/90">{families.groomParents}</p>
              <p className="font-display text-base italic text-gold-ink">and</p>
              <p className="text-base text-plum/90">{families.brideParents}</p>
            </div>

            <p data-reveal className="mx-auto mt-6 max-w-md font-display text-xl italic text-plum">
              request the pleasure of your presence at the wedding of
            </p>

            <p data-reveal className="mt-4 font-display text-5xl font-semibold leading-tight text-wine sm:text-6xl">
              {couple.groom}
              <span className="block font-script text-4xl font-normal text-gold">weds</span>
              {couple.bride}
            </p>

            <p data-reveal className="eyebrow mt-6">
              <time dateTime={wedding.weddingDate}>{formatLongDate(wedding.weddingDate)}</time>
            </p>
            <p data-reveal className="mt-1 text-base text-plum/90">
              {wedding.venue.name} · {wedding.venue.address}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
