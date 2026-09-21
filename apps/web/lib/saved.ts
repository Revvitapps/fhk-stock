"use client";

import { useMemo, useSyncExternalStore } from "react";
import { SAVED_EVENT } from "@/lib/install";

const KEY = "tm_saved";
const listeners = new Set<() => void>();

function read() {
  try {
    return localStorage.getItem(KEY) ?? "[]";
  } catch {
    return "[]";
  }
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  window.addEventListener("storage", listener);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", listener);
  };
}

function parse(raw: string): string[] {
  try {
    const value: unknown = JSON.parse(raw);
    return Array.isArray(value) ? value.filter((item) => typeof item === "string") : [];
  } catch {
    return [];
  }
}

/** Slugs of the images this visitor has saved, newest first. Lives in localStorage. */
export function useSavedSlugs() {
  const raw = useSyncExternalStore(subscribe, read, () => "[]");
  return useMemo(() => parse(raw), [raw]);
}

export function toggleSaved(slug: string) {
  const current = parse(read());
  const saving = !current.includes(slug);
  const next = saving ? [slug, ...current] : current.filter((item) => item !== slug);

  try {
    localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    return;
  }

  listeners.forEach((listener) => listener());
  if (saving) window.dispatchEvent(new Event(SAVED_EVENT));
}
