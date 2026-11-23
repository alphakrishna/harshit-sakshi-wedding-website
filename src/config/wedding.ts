/**
 * ─────────────────────────────────────────────────────────────
 *  WEDDING DETAILS: edit this file only.
 *  Every name, date, venue, link and line of copy on the site
 *  comes from here. Anything marked TODO is a placeholder.
 * ─────────────────────────────────────────────────────────────
 */

export type EventKey = "haldi" | "mehendi" | "sangeet" | "wedding";

export interface WeddingEvent {
  key: EventKey;
  name: string;
  tagline: string;
  /** ISO date "YYYY-MM-DD", or null while not confirmed */
  date: string | null;
  /** Free text, e.g. "11:00 AM onwards", or null while not confirmed */
  time: string | null;
  venueName: string | null;
  dressCode: string | null;
  image: string;
  imageAlt: string;
  /** CSS colour used for the event's script title and accents */
  accent: string;
}

export interface StoryChapter {
  title: string;
  text: string;
  image: string;
  imageAlt: string;
  width: number;
  height: number;
}

export const wedding = {
  couple: {
    groom: "Harshit",
    bride: "Sakshi",
    tagline: "Two souls. One beautiful forever.",
    hashtag: "", // TODO: e.g. "#HarshitKiSakshi" (leave empty to hide)
  },

  families: {
    // TODO: replace placeholders with the real family names
    groomParents: "Smt. [Mother's name] & Shri [Father's name]",
    brideParents: "Smt. [Mother's name] & Shri [Father's name]",
  },

  /** Main wedding day. Drives the countdown and the hero date. */
  weddingDate: "2027-02-20",
  /** Countdown target (IST). TODO: change the time once the muhurat is fixed. */
  countdownTarget: "2027-02-20T00:00:00+05:30",

  venue: {
    name: "Venue to be announced", // TODO
    address: "Faridabad, Haryana", // TODO: full address
    city: "Faridabad",
    /** TODO: paste the Google Maps share link for "Get directions" */
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Faridabad%2C+Haryana",
    /** Embedded map. Works without an API key. TODO: replace query with the venue name. */
    mapEmbedUrl: "https://www.google.com/maps?q=Faridabad,+Haryana&output=embed",
    notes: [
      "Nearest metro: TODO",
      "Parking available at the venue: TODO",
    ],
  },

  events: [
    {
      key: "haldi",
      name: "Haldi",
      tagline: "Turmeric, marigolds and a lot of laughter",
      date: null,
      time: null,
      venueName: null,
      dressCode: "Shades of yellow",
      image: "/images/event-haldi.webp",
      imageAlt: "Illustration of Harshit applying haldi to a laughing Sakshi among marigolds",
      accent: "#8a5a12",
    },
    {
      key: "mehendi",
      name: "Mehendi",
      tagline: "Henna, music and the bride's name hidden in the design",
      date: null,
      time: null,
      venueName: null,
      dressCode: "Greens and florals",
      image: "/images/event-mehendi.webp",
      imageAlt: "Illustration of Sakshi showing her mehendi-decorated hands beside Harshit",
      accent: "#3f5a2c",
    },
    {
      key: "sangeet",
      name: "Sangeet",
      tagline: "An evening of dance, songs and celebration",
      date: null,
      time: null,
      venueName: null,
      dressCode: "Indo-western glam",
      image: "/images/event-sangeet.webp",
      imageAlt: "Illustration of Harshit and Sakshi dancing under fairy lights",
      accent: "#5b2a5e",
    },
    {
      key: "wedding",
      name: "Wedding",
      tagline: "Seven pheras, one forever",
      date: "2027-02-20",
      time: null,
      venueName: null,
      dressCode: "Traditional Indian",
      image: "/images/event-wedding.webp",
      imageAlt: "Illustration of Harshit and Sakshi in wedding attire under a floral mandap",
      accent: "#7a1f2b",
    },
  ] satisfies WeddingEvent[],

  /**
   * PLACEHOLDER STORY. The artwork and copy below are illustrative only and
   * have NOT been confirmed by the couple. TODO: replace with the real story.
   */
  story: {
    intro: "From a chance meeting to a lifetime together",
    chapters: [
      {
        title: "The First Meeting",
        text: "It all began at work, where coding, coffee and a simple “Hey!” turned into something truly special.",
        image: "/images/story-first-meeting.webp",
        imageAlt: "Harshit and Sakshi smiling at each other beside a laptop at work",
        width: 394,
        height: 288,
      },
      {
        title: "From Colleagues to Best Friends",
        text: "Long discussions, quick lunches and endless chats. We soon became each other’s go-to person.",
        image: "/images/story-friendship.webp",
        imageAlt: "Harshit and Sakshi laughing over cups of coffee",
        width: 445,
        height: 237,
      },
      {
        title: "The Real Connection",
        text: "Through late-night deploys, shared goals and supporting each other’s dreams, we realised it was more than friendship.",
        image: "/images/story-connection.webp",
        imageAlt: "Sakshi resting her head on Harshit’s shoulder while he works on a laptop",
        width: 409,
        height: 295,
      },
      {
        title: "Choosing Forever",
        text: "Because with you, life felt lighter, happier and complete. And that’s when we knew: it’s you, always.",
        image: "/images/story-proposal.webp",
        imageAlt: "Harshit kneeling with a ring as Sakshi covers her smile in joy",
        width: 462,
        height: 304,
      },
    ] satisfies StoryChapter[],
    note: ["Two developers.", "Countless conversations.", "One beautiful forever."],
  },

  blessing: {
    invocation: "श्री राधे कृष्ण",
    shloka: [
      "कृष्णाय वासुदेवाय हरये परमात्मने।",
      "प्रणतः क्लेशनाशाय गोविन्दाय नमो नमः॥",
    ],
    meaning:
      "We bow to Shri Krishna, son of Vasudeva, who removes the sorrows of all who seek Him. With the blessings of Radha Rani and Shri Krishna, and of our families,",
  },

  closing: {
    line: "See you at our forever",
    codeTag: "// forever starts with us ♡",
  },

  rsvp: {
    /** Respond-by date shown on the form. TODO: confirm */
    deadline: "2027-01-31",
    /**
     * Google Apps Script Web App URL (see docs/google-sheets-rsvp.md).
     * TODO: paste the URL, or set NEXT_PUBLIC_RSVP_ENDPOINT in the host's env settings.
     */
    endpoint: process.env.NEXT_PUBLIC_RSVP_ENDPOINT ?? "",
    maxGuests: 10,
  },

  music: {
    /** TODO: drop the audio file in public/audio/ and set the path, e.g. "/audio/wedding-song.mp3" */
    src: "",
    title: "", // shown to screen readers, e.g. song name
  },

  share: {
    message: "You're invited! Harshit & Sakshi are getting married on 20 February 2027 in Faridabad. View the invitation and RSVP:",
  },

  site: {
    /** Live URL (Cloudflare Pages). Change if you add a custom domain. Needed for WhatsApp/OG previews. */
    url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://harshit-sakshi-wedding-website.pages.dev",
    title: "Harshit & Sakshi | Wedding Invitation",
    description:
      "Harshit and Sakshi invite you to celebrate their wedding on 20 February 2027 in Faridabad. Event details, venue and RSVP.",
    /** Personal invitation: keep out of search results. Set true only if you want it indexed. */
    indexable: false,
  },
} as const;

export type Wedding = typeof wedding;
