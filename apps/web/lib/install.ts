"use client";

/**
 * Tiny module-level store for the deferred `beforeinstallprompt` event, shared by
 * <InstallCard/> and <InstallButton/> so either can trigger the native prompt.
 */
export interface BeforeInstallPromptEvent extends Event {
  readonly userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
  prompt(): Promise<void>;
}

type Listener = (event: BeforeInstallPromptEvent | null) => void;

let deferred: BeforeInstallPromptEvent | null = null;
let captured = false;
const listeners = new Set<Listener>();

/** Attach the window listener once. Safe to call from several components. */
export function captureInstallPrompt() {
  if (typeof window === "undefined" || captured) return;
  captured = true;
  window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    deferred = event as BeforeInstallPromptEvent;
    listeners.forEach((listener) => listener(deferred));
  });
  window.addEventListener("appinstalled", () => {
    deferred = null;
    listeners.forEach((listener) => listener(null));
  });
}

export function subscribeInstallPrompt(listener: Listener) {
  listeners.add(listener);
  listener(deferred);
  return () => {
    listeners.delete(listener);
  };
}

export type InstallOutcome = "accepted" | "dismissed" | "unavailable";

/** Show the native prompt if the browser gave us one. */
export async function promptInstall(): Promise<InstallOutcome> {
  const event = deferred;
  if (!event) return "unavailable";
  try {
    await event.prompt();
    const choice = await event.userChoice;
    if (choice.outcome === "accepted") {
      deferred = null;
      listeners.forEach((listener) => listener(null));
    }
    return choice.outcome;
  } catch {
    return "unavailable";
  }
}

/** iOS Safari never fires beforeinstallprompt; it needs the share-sheet steps instead. */
export function isIOS() {
  if (typeof navigator === "undefined") return false;
  return (
    /iPad|iPhone|iPod/.test(navigator.userAgent) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1)
  );
}

/** True when the page is running as an installed app (home-screen launch). */
export function isStandalone() {
  if (typeof window === "undefined") return false;
  return (
    window.matchMedia?.("(display-mode: standalone)").matches ||
    (window.navigator as Navigator & { standalone?: boolean }).standalone === true
  );
}

export const INSTALL_KEYS = { visits: "tm_visits", dismissed: "tm_install_dismissed" } as const;
export const OPEN_INSTALL_EVENT = "tm:open-install";
export const SAVED_EVENT = "tm:image-saved";
