import { InviteProvider } from "@/components/InviteProvider";
import { Envelope } from "@/components/Envelope";
import { Hero } from "@/components/Hero";
import { Blessings } from "@/components/Blessings";
import { SaveTheDate } from "@/components/SaveTheDate";
import { LoveStory } from "@/components/LoveStory";
import { Celebrations } from "@/components/Celebrations";
import { Venue } from "@/components/Venue";
import { Rsvp } from "@/components/Rsvp";
import { Closing } from "@/components/Closing";
import { Dock } from "@/components/Dock";
import { ScrollReveal } from "@/components/ScrollReveal";

export default function Home() {
  return (
    <InviteProvider>
      {/* Without JavaScript the envelope can't open, so skip it entirely. */}
      <noscript>
        <style>{`.envelope-overlay{display:none!important}body.is-locked{overflow:auto;height:auto}`}</style>
      </noscript>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-wine focus:px-4 focus:py-2 focus:text-ivory"
      >
        Skip to content
      </a>

      <Envelope />

      <main id="main">
        <Hero />
        <SaveTheDate />
        <Blessings />
        <LoveStory />
        <Celebrations />
        <Venue />
        <Rsvp />
        <Closing />
      </main>

      <Dock />
      <ScrollReveal />
    </InviteProvider>
  );
}
