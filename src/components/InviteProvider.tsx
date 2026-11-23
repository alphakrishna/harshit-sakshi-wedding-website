"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { wedding } from "@/config/wedding";

interface InviteState {
  opened: boolean;
  open: () => void;
  hasMusic: boolean;
  playing: boolean;
  toggleMusic: () => void;
}

const InviteContext = createContext<InviteState | null>(null);

export function useInvite() {
  const ctx = useContext(InviteContext);
  if (!ctx) throw new Error("useInvite must be used inside <InviteProvider>");
  return ctx;
}

export function InviteProvider({ children }: { children: React.ReactNode }) {
  const [opened, setOpened] = useState(false);
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const hasMusic = Boolean(wedding.music.src);

  // Lock page scroll while the envelope is closed
  useEffect(() => {
    document.body.classList.toggle("is-locked", !opened);
    return () => document.body.classList.remove("is-locked");
  }, [opened]);

  const play = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return;
    try {
      audio.volume = 0.55;
      await audio.play();
      setPlaying(true);
    } catch {
      setPlaying(false);
    }
  }, []);

  const open = useCallback(() => {
    setOpened(true);
    // Opening the envelope is a user gesture, so the browser allows playback here.
    if (hasMusic) void play();
  }, [hasMusic, play]);

  const toggleMusic = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      void play();
    } else {
      audio.pause();
      setPlaying(false);
    }
  }, [play]);

  return (
    <InviteContext.Provider value={{ opened, open, hasMusic, playing, toggleMusic }}>
      {children}
      {hasMusic && (
        <audio ref={audioRef} src={wedding.music.src} loop preload="none" aria-hidden="true" />
      )}
    </InviteContext.Provider>
  );
}
