import type { Metadata, Viewport } from "next";
import {
  Cormorant_Garamond,
  EB_Garamond,
  Pinyon_Script,
  Tiro_Devanagari_Hindi,
  JetBrains_Mono,
} from "next/font/google";
import { wedding } from "@/config/wedding";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const ebGaramond = EB_Garamond({
  variable: "--font-ebgaramond",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});

const pinyon = Pinyon_Script({
  variable: "--font-pinyon",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const tiro = Tiro_Devanagari_Hindi({
  variable: "--font-tiro",
  subsets: ["devanagari", "latin"],
  weight: "400",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

const { site } = wedding;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: site.title,
  description: site.description,
  alternates: { canonical: "/" },
  robots: site.indexable
    ? { index: true, follow: true }
    : { index: false, follow: false, googleBot: { index: false, follow: false } },
  openGraph: {
    type: "website",
    url: "/",
    title: `${wedding.couple.groom} & ${wedding.couple.bride} are getting married`,
    description: site.description,
    siteName: `${wedding.couple.groom} & ${wedding.couple.bride}`,
    locale: "en_IN",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: `${wedding.couple.groom} and ${wedding.couple.bride}: See you at our forever`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${wedding.couple.groom} & ${wedding.couple.bride} are getting married`,
    description: site.description,
    images: ["/og-image.jpg"],
  },
  icons: {
    apple: "/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#f8f3eb",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-IN"
      className={`${cormorant.variable} ${ebGaramond.variable} ${pinyon.variable} ${tiro.variable} ${jetbrains.variable}`}
    >
      <head>
        {/* Hide-then-reveal styling only applies once JS is confirmed to run */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "document.documentElement.classList.add('js');if(matchMedia('(prefers-reduced-motion: no-preference)').matches)document.documentElement.classList.add('js-motion');",
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
