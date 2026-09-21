"use client";

import { useEffect, useState } from "react";
import { LogoMark } from "@/components/Logo";
import {
  INSTALL_KEYS,
  OPEN_INSTALL_EVENT,
  SAVED_EVENT,
  captureInstallPrompt,
  isIOS,
  isStandalone,
  promptInstall,
  subscribeInstallPrompt
} from "@/lib/install";

/**
 * "Install TMStock" card. Appears after the second visit or the first saved image,
 * unless the app is already installed or the visitor dismissed it. The footer's
 * install button can also open it on demand.
 */
export function InstallCard() {
  const [open, setOpen] = useState(false);
  const [hasPrompt, setHasPrompt] = useState(false);
  const [ios, setIos] = useState(false);
  const [showSteps, setShowSteps] = useState(false);

  useEffect(() => {
    captureInstallPrompt();
    setIos(isIOS());
    if (isStandalone()) return;

    let dismissed = false;
    let visits = 0;
    try {
      visits = Number(localStorage.getItem(INSTALL_KEYS.visits) ?? "0");
      // One visit per browser session, not per page load.
      if (!sessionStorage.getItem("tm_visit_counted")) {
        visits += 1;
        localStorage.setItem(INSTALL_KEYS.visits, String(visits));
        sessionStorage.setItem("tm_visit_counted", "1");
      }
      dismissed = localStorage.getItem(INSTALL_KEYS.dismissed) === "1";
    } catch {}

    if (!dismissed && visits >= 2) setOpen(true);

    const onSaved = () => {
      if (!dismissed) setOpen(true);
    };
    const onForceOpen = () => {
      setShowSteps(false);
      setOpen(true);
    };

    window.addEventListener(SAVED_EVENT, onSaved);
    window.addEventListener(OPEN_INSTALL_EVENT, onForceOpen);
    const unsubscribe = subscribeInstallPrompt((event) => setHasPrompt(!!event));

    return () => {
      window.removeEventListener(SAVED_EVENT, onSaved);
      window.removeEventListener(OPEN_INSTALL_EVENT, onForceOpen);
      unsubscribe();
    };
  }, []);

  function dismiss() {
    setOpen(false);
    try {
      localStorage.setItem(INSTALL_KEYS.dismissed, "1");
    } catch {}
  }

  async function install() {
    if (hasPrompt) {
      const outcome = await promptInstall();
      if (outcome === "accepted") setOpen(false);
      return;
    }
    setShowSteps(true);
  }

  if (!open) return null;

  return (
    <aside className="install-card" aria-label="Install TMStock">
      <button type="button" className="install-close" aria-label="Dismiss" onClick={dismiss}>
        ×
      </button>
      <div className="install-head">
        <LogoMark size={44} />
        <div>
          <strong>Keep TMStock on your home screen</strong>
          <span>Opens instantly, works offline, and keeps your saved images close.</span>
        </div>
      </div>
      {showSteps ? (
        <ol className="install-steps">
          {ios ? (
            <>
              <li>
                Tap the <b>Share</b> button in Safari.
              </li>
              <li>
                Choose <b>Add to Home Screen</b>.
              </li>
              <li>
                Tap <b>Add</b>. That&apos;s it.
              </li>
            </>
          ) : (
            <>
              <li>
                Open your browser menu (<b>⋮</b> or the install icon in the address bar).
              </li>
              <li>
                Choose <b>Install TMStock</b> or <b>Add to Home Screen</b>.
              </li>
            </>
          )}
        </ol>
      ) : (
        <div className="install-actions">
          <button type="button" className="button primary small" onClick={install}>
            {hasPrompt ? "Install app" : "Show me how"}
          </button>
          <button type="button" className="button secondary small" onClick={dismiss}>
            Not now
          </button>
        </div>
      )}
    </aside>
  );
}
