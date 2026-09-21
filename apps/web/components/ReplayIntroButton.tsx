"use client";

import { INTRO_SEEN_KEY } from "@/components/LensIntro";

export function ReplayIntroButton() {
  return (
    <button
      type="button"
      className="link-button quiet"
      onClick={() => {
        try {
          sessionStorage.removeItem(INTRO_SEEN_KEY);
        } catch {}
        window.location.assign("/");
      }}
    >
      Replay intro
    </button>
  );
}
