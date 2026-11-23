# SEO / technical crawl checklist: Harshit & Sakshi wedding site

Copied from Part 9 of `02-Website-Dev-and-SEO-Guidelines.md`.

**Project context:** this is a *private* invitation, so `noindex, nofollow` is intentional (`site.indexable: false`). Items that only matter for ranking pages are marked N/A below. Lighthouse and PageSpeed are run manually by Krishna.

## Pre-launch status (build checks done by Claude on 2026-11-23, local static build)
| Check | Result |
|---|---|
| One `<title>` and a unique meta description | ✅ `Harshit & Sakshi \| Wedding Invitation` |
| Exactly one H1, with H2/H3 in order | ✅ one H1 (hero); each section has an H2 |
| og:title / og:description / og:image (absolute) / og:url | ✅ image is absolute, built from `site.url`. **Update `site.url` to the live URL before launch** |
| `noindex` on a page that shouldn't rank | ✅ `noindex, nofollow` (intentional) |
| robots.txt allows crawling, so the noindex tag can be seen | ✅ |
| Sitemap | N/A: the site is noindex, and listing a noindex URL would send conflicting signals (9.4) |
| Canonical | ✅ self-canonical `/` |
| Custom 404 returning a 404 status | ✅ `404.html` exported (the host must serve it; Vercel, Netlify and Cloudflare do) |
| Structured data | N/A: noindex page; no rich results needed |
| All images have alt text (decorative ones use `alt=""`) | ✅ 0 images missing alt |
| Form labels, keyboard use, visible focus, `lang` | ✅ `lang="en-IN"`; Devanagari blocks have `lang="hi"` |
| No horizontal scroll at 390px and 1440px | ✅ |
| Reduced motion | ✅ content fully visible with no animation |
| Images compressed as WebP, with width/height, hero not lazy | ✅ hero images use `priority` |
| Content without JS | ✅ statically rendered HTML; the envelope is skipped through `<noscript>` |
| hreflang / AMP / login areas | N/A |

## Still to do after deploy (manual)
- [ ] 9.2: check outbound links (Google Maps, WhatsApp) once the real map link is in
- [ ] 9.8: real-phone test (Android Chrome + iPhone Safari); Lighthouse and PageSpeed (manual)
- [ ] 9.10: axe DevTools or WAVE scan; Lighthouse accessibility (manual)
- [ ] 9.11: proofread names, dates, addresses and phone numbers by hand once the real details are in
- [ ] Test the WhatsApp preview: paste the live URL in a chat and check the image and title
- [ ] Submit a test RSVP and confirm the row appears in Google Sheets
- [ ] 9.12 Search Console / GA4: N/A while the site is noindex (add GA4 only if you want RSVP analytics)

## Sign-off
| Item | Result |
|---|---|
| Date of audit | |
| Site / environment | |
| Crawl file saved as | |
| "Must" items failed | |
| N/A items and reason | Sitemap, structured data, Search Console: private noindex invitation |
| Checked by | |
