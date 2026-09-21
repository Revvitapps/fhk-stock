"use client";

import { useEffect } from "react";
import { isStandalone } from "@/lib/install";

/**
 * Makes the site installable and keeps it feeling like an app once it's saved
 * to the home screen:
 *  - registers the service worker (production only; dev chunks aren't hashed)
 *  - marks the document so CSS can lean into app UI in standalone mode
 *  - sends links to other sites out to the browser instead of stranding the
 *    user on a third-party page inside the app window (no back button there)
 */
export function Pwa() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") return;
    if (!("serviceWorker" in navigator)) return;
    const sw = navigator.serviceWorker;

    // A copy already on someone's home screen should pick up new versions on
    // its own. When a new worker takes over we reload once to swap the page.
    const hadController = !!sw.controller;
    let reloading = false;
    const onControllerChange = () => {
      if (!hadController || reloading) return;
      reloading = true;
      window.location.reload();
    };
    sw.addEventListener("controllerchange", onControllerChange);

    let registration: ServiceWorkerRegistration | undefined;
    sw.register("/sw.js")
      .then((reg) => {
        registration = reg;
      })
      .catch(() => {});

    // An installed app can sit open for days; re-check when it returns to the foreground.
    const onVisible = () => {
      if (document.visibilityState === "visible") registration?.update().catch(() => {});
    };
    document.addEventListener("visibilitychange", onVisible);

    return () => {
      sw.removeEventListener("controllerchange", onControllerChange);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, []);

  useEffect(() => {
    if (!isStandalone()) return;
    const root = document.documentElement;
    root.classList.add("is-standalone");

    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const anchor = (event.target as HTMLElement | null)?.closest?.("a");
      if (!anchor || anchor.hasAttribute("download")) return;
      if (anchor.target && anchor.target !== "_self") return;

      let url: URL;
      try {
        url = new URL(anchor.href, window.location.href);
      } catch {
        return;
      }
      if (url.protocol !== "http:" && url.protocol !== "https:") return;
      if (url.origin === window.location.origin) return;

      event.preventDefault();
      window.open(url.href, "_blank", "noopener,noreferrer");
    };

    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("click", onClick);
      root.classList.remove("is-standalone");
    };
  }, []);

  return null;
}
