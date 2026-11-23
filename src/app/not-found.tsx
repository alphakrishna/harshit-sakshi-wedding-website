import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found | Harshit & Sakshi",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main className="grid min-h-dvh place-items-center px-4 text-center">
      <div>
        <p className="eyebrow">404</p>
        <h1 className="script-title mt-2 text-6xl">Lost on the way?</h1>
        <p className="mt-3 font-display text-xl italic text-plum">This page isn’t part of the celebration.</p>
        <Link href="/" className="btn btn-primary mt-8">
          Back to the invitation
        </Link>
      </div>
    </main>
  );
}
