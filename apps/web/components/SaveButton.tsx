"use client";

import { toggleSaved, useSavedSlugs } from "@/lib/saved";

type SaveButtonProps = {
  slug: string;
  title: string;
  variant?: "overlay" | "inline";
};

export function SaveButton({ slug, title, variant = "overlay" }: SaveButtonProps) {
  const saved = useSavedSlugs().includes(slug);

  return (
    <button
      type="button"
      className={variant === "overlay" ? "save-button" : "save-button inline"}
      aria-pressed={saved}
      aria-label={saved ? `Remove ${title} from saved` : `Save ${title}`}
      onClick={() => toggleSaved(slug)}
    >
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 20.5s-7.5-4.6-7.5-10.2A4.3 4.3 0 0 1 12 7.6a4.3 4.3 0 0 1 7.5 2.7c0 5.6-7.5 10.2-7.5 10.2Z" />
      </svg>
      {variant === "inline" ? <span>{saved ? "Saved" : "Save for later"}</span> : null}
    </button>
  );
}
