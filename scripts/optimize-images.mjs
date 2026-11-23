// Converts the source asset pack (assets-src/) into optimised WebP files in public/images/.
// Some crops have illustrative text baked into the artwork (event labels, the closing plaque,
// the Devanagari line under the temple arch). That text is trimmed off here so that all
// real, functional text lives in HTML.
//
// Run: npm run images

import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const SRC = "assets-src";
const OUT = "public/images";

/** keep: fraction of the image to keep from the top-left ({ w, h } in 0..1) */
const jobs = [
  // Hero
  { src: "hero/couple_hero_framed.png", out: "couple-hero.webp", width: 900 },
  { src: "hero/radha_krishna_blessing_framed.png", out: "radha-krishna.webp", width: 477 },
  { src: "hero/temple_arch_header.png", out: "temple-arch.webp", width: 1024, keep: { h: 0.8 } },
  { src: "hero/lotus_left.png", out: "lotus.webp", width: 215 },
  { src: "hero/peacock_feather_right.png", out: "peacock-feather.webp", width: 226 },

  // Love story (placeholder narrative artwork)
  { src: "story/first_meeting.png", out: "story-first-meeting.webp", width: 394 },
  { src: "story/friendship.png", out: "story-friendship.webp", width: 445, keep: { h: 0.86 } },
  { src: "story/connection.png", out: "story-connection.webp", width: 409 },
  { src: "story/proposal.png", out: "story-proposal.webp", width: 462, keep: { h: 0.92 } },

  // Celebrations: bottom label is baked in, so it is trimmed and rendered in HTML instead
  { src: "events/haldi_card.png", out: "event-haldi.webp", width: 403, keep: { h: 0.76 } },
  { src: "events/mehendi_card.png", out: "event-mehendi.webp", width: 419, keep: { h: 0.76 } },
  { src: "events/sangeet_card.png", out: "event-sangeet.webp", width: 407, keep: { h: 0.76 } },
  { src: "events/wedding_card.png", out: "event-wedding.webp", width: 419, keep: { h: 0.76 } },

  // Closing: the plaque on the right is trimmed off
  { src: "closing/couple_closing_framed.png", out: "couple-closing.webp", width: 978, keep: { w: 0.76 } },
];

await mkdir(OUT, { recursive: true });

for (const job of jobs) {
  const input = path.join(SRC, job.src);
  const meta = await sharp(input).metadata();
  let img = sharp(input);
  if (job.keep) {
    const width = Math.round(meta.width * (job.keep.w ?? 1));
    const height = Math.round(meta.height * (job.keep.h ?? 1));
    img = img.extract({ left: 0, top: 0, width, height });
  }
  const info = await img
    .resize({ width: job.width, withoutEnlargement: true })
    .webp({ quality: 80, alphaQuality: 90, effort: 6 })
    .toFile(path.join(OUT, job.out));
  console.log(`${job.out.padEnd(28)} ${info.width}x${info.height}  ${(info.size / 1024).toFixed(0)} KB`);
}

// Social / WhatsApp preview image (1200x630) from the landscape closing artwork
const og = await sharp(path.join(SRC, "closing/full_reference.png"))
  .resize({ width: 1200, height: 630, fit: "cover", position: "centre" })
  .flatten({ background: "#F8F3EB" })
  .jpeg({ quality: 82, mozjpeg: true })
  .toFile("public/og-image.jpg");
console.log(`og-image.jpg                 ${og.width}x${og.height}  ${(og.size / 1024).toFixed(0)} KB`);

// Favicon-sized lotus for the apple touch icon
await sharp(path.join(SRC, "hero/lotus_left.png"))
  .resize({ width: 180, height: 180, fit: "contain", background: "#F8F3EB" })
  .flatten({ background: "#F8F3EB" })
  .png()
  .toFile("public/apple-touch-icon.png");
console.log("apple-touch-icon.png done");
