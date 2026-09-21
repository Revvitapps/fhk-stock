"use client";

import { OPEN_INSTALL_EVENT } from "@/lib/install";

export function InstallButton() {
  return (
    <button
      type="button"
      className="install-button"
      onClick={() => window.dispatchEvent(new Event(OPEN_INSTALL_EVENT))}
    >
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 4v11m0 0-4-4m4 4 4-4M5 19h14" />
      </svg>
      Get the app
    </button>
  );
}
