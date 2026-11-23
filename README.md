# Harshit & Sakshi: Wedding Invitation Website

A mobile-first wedding invitation site with a Vrindavan Divine Romance theme (ivory, blush, antique gold, deep green).
Built with **Next.js 16 (static export), TypeScript, Tailwind CSS v4 and GSAP**.

## Sections
1. **Envelope opening:** tap the wax seal (H&S). This also starts the music, if music has been added.
2. **Hero:** Radha-Krishna blessing, names, date, live countdown, couple portrait with parallax lotus and feather.
3. **Blessings:** temple arch, shloka, the families' invitation.
4. **Love story:** polaroid timeline with a gold thread that draws as you scroll. *The copy and artwork are placeholders.*
5. **Celebrations:** Haldi, Mehendi, Sangeet and Wedding cards. Tap a card to open its details.
6. **Venue:** address, a "Get directions" link and a map that loads when tapped.
7. **RSVP:** name, email, attending yes/no, number of guests and an optional note, saved to Google Sheets.
8. **Closing:** "See you at our forever", plus WhatsApp and native share buttons.

A floating bottom dock gives section navigation and a music toggle.

**Interactive touches:** confetti and petal rain when the envelope opens; a deep-green Save the Date band with Add to calendar (.ics) and Google Calendar; tap the couple photo or any polaroid for hearts; event cards tilt toward the cursor with a light sheen; flip-style countdown digits; section titles that write themselves in; a gold scroll-progress bar; a "Shower your blessings" button; confetti on RSVP. All burst and rain effects live in `src/lib/burst.ts`, and every one is skipped under reduced motion.

## Editing wedding details
**Everything lives in `src/config/wedding.ts`.** Search it for `TODO`:

| What | Field |
|---|---|
| Parents' names | `families` |
| Venue name, address, map links | `venue` |
| Event dates, times, venues, dress codes | `events[]`: use `null` to show "To be announced" |
| Countdown time | `countdownTarget` |
| Love story text | `story.chapters` (placeholder until confirmed) |
| RSVP Google Sheets URL | `rsvp.endpoint`: see `docs/google-sheets-rsvp.md` |
| Background music | `music.src`: put the file in `public/audio/` |
| Final website URL (for WhatsApp previews) | `site.url` |

## Commands
```bash
npm install
npm run dev      # local preview at http://localhost:3000
npm run build    # static site written to /out
npm run images   # re-create optimised WebP files from assets-src/
```

## Images
- `assets-src/` holds the original asset pack (PNG). Don't link to these from the site.
- `npm run images` writes WebP files to `public/images/`. It also trims the text baked into some crops (event labels, the closing plaque, the line under the temple arch), because all real text is HTML.
- To swap an image, replace the PNG in `assets-src/` and run `npm run images`. If its size changes, update the `width`/`height` in the config or component.
- `public/og-image.jpg` (1200×630) is the WhatsApp and social preview image.

## Music
Add the song file (for example `public/audio/wedding-song.mp3`, ideally under 3 MB at 128 kbps), then set `music.src` and `music.title`. Playback only starts after the guest taps the seal, and guests can pause it from the dock.
> Note: a commercial film song is copyrighted. A private invitation link is usually low-risk, but don't make the site public or indexable with it.

## Hosting (free)
`npm run build` produces a fully static `out/` folder, so any of these work:
- **Vercel** (recommended): import the folder or repo. Framework "Next.js" is auto-detected.
- **Netlify** or **Cloudflare Pages**: build command `npm run build`, output folder `out`.

After deploying, set `site.url` (or `NEXT_PUBLIC_SITE_URL`) to the live URL and redeploy, so WhatsApp previews show the image.

## Privacy and SEO
The site is a personal invitation, so `site.indexable` is `false`. Every page carries `noindex, nofollow`, and `robots.txt` allows crawling so search engines can see that tag. There's no sitemap on purpose. See `docs/seo-crawl-checklist.md`.

## Accessibility and motion
- Every animation goes through `gsap.matchMedia("(prefers-reduced-motion: no-preference)")`. Under reduced motion the content appears without animation, the petals are hidden and the envelope just fades.
- The envelope is a modal dialog with a focusable seal button, and the page behind it is `inert` until it opens. Without JavaScript the envelope is skipped.
- Event details use the native `<dialog>` element (focus trap, Esc to close). All form fields have labels, and status messages are announced through `aria-live`.
