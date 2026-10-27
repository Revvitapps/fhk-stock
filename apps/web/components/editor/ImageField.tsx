"use client";

/**
 * Photo picker for the editor sidebar: pick from the site's library or upload a new one.
 */

import { useRef, useState } from "react";
import { catalogAssets } from "@/lib/catalog";

type Props = { value: string; onChange: (value: string) => void; readOnly?: boolean };

export function ImageField({ value, onChange, readOnly }: Props) {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const input = useRef<HTMLInputElement>(null);

  async function upload(file: File) {
    setStatus("Uploading…");
    const body = new FormData();
    body.append("file", file);
    const response = await fetch("/api/editor/upload", { method: "POST", body });
    const result = (await response.json().catch(() => ({}))) as { url?: string; error?: string };
    if (result.url) {
      onChange(result.url);
      setStatus(null);
      setOpen(false);
    } else {
      setStatus(result.error ?? "Upload failed. Try again.");
    }
  }

  return (
    <div className="fx-image">
      <div className="fx-image-current">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        {value ? <img src={value} alt="" /> : <span>No photo</span>}
      </div>
      {readOnly ? null : (
        <div className="fx-image-actions">
          <button type="button" onClick={() => setOpen((v) => !v)}>
            {open ? "Close library" : "Choose photo"}
          </button>
          <button type="button" onClick={() => input.current?.click()}>
            Upload
          </button>
          <input
            ref={input}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            hidden
            onChange={(event) => {
              const file = event.target.files?.[0];
              if (file) void upload(file);
              event.target.value = "";
            }}
          />
        </div>
      )}
      {status ? <p className="fx-image-status">{status}</p> : null}
      {open ? (
        <div className="fx-image-grid">
          {catalogAssets.map((asset) => (
            <button
              key={asset.id}
              type="button"
              title={asset.title}
              aria-pressed={asset.image === value}
              onClick={() => {
                onChange(asset.image);
                setOpen(false);
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={asset.image} alt={asset.title} loading="lazy" />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
