"use client";

import { useState } from "react";
import { wedding } from "@/config/wedding";

function pageUrl() {
  return typeof window !== "undefined" ? window.location.origin + window.location.pathname : wedding.site.url;
}

export function whatsappHref(url = wedding.site.url) {
  return `https://wa.me/?text=${encodeURIComponent(`${wedding.share.message} ${url}`)}`;
}

export function ShareButtons({ className = "" }: { className?: string }) {
  const [copied, setCopied] = useState(false);

  const nativeShare = async () => {
    const url = pageUrl();
    if (navigator.share) {
      try {
        await navigator.share({ title: wedding.site.title, text: wedding.share.message, url });
      } catch {
        /* user cancelled */
      }
      return;
    }
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <div className={`flex flex-wrap justify-center gap-3 ${className}`}>
      <a
        href={whatsappHref()}
        onClick={(e) => {
          e.currentTarget.href = whatsappHref(pageUrl());
        }}
        target="_blank"
        rel="noopener noreferrer"
        className="btn bg-[#1f7a4d] text-white shadow-[0_10px_22px_-12px_rgba(31,122,77,0.8)]"
      >
        <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
          <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.3-.4.8-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.8 11.9 11.9 0 0 0 4.6 4c1.7.7 2.4.8 3.2.7a2.8 2.8 0 0 0 1.8-1.3 2.3 2.3 0 0 0 .2-1.3c-.1-.1-.3-.2-.5-.3z" />
        </svg>
        Share on WhatsApp
        <span className="sr-only"> (opens WhatsApp)</span>
      </a>
      <button type="button" onClick={nativeShare} className="btn btn-outline">
        <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M12 3v12M7 8l5-5 5 5M5 13v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6" />
        </svg>
        {copied ? "Link copied!" : "Share invite"}
      </button>
    </div>
  );
}
