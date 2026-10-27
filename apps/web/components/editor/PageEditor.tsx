"use client";

import { Puck, type Data } from "@puckeditor/core";
import "@puckeditor/core/puck.css";
import { useState } from "react";
import { lockEditor } from "@/app/edit/actions";
import { editorConfig } from "@/lib/editor/config";

type Props = { data: Data; storage: "blob" | "local" | "none" };

type Toast = { tone: "ok" | "error"; text: string } | null;

export function PageEditor({ data, storage }: Props) {
  const [toast, setToast] = useState<Toast>(null);

  async function publish(next: Data) {
    setToast({ tone: "ok", text: "Publishing…" });
    const response = await fetch("/api/editor/publish", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(next)
    });
    const result = (await response.json().catch(() => ({}))) as { error?: string };
    setToast(
      response.ok
        ? { tone: "ok", text: "Published. Your homepage is live." }
        : { tone: "error", text: result.error ?? "Publishing failed. Try again." }
    );
    window.setTimeout(() => setToast(null), 5000);
  }

  return (
    <div className="fx-editor">
      {storage === "none" ? (
        <p className="fx-banner">
          Preview mode: edits work, but Publish needs a Blob store connected to this Vercel project.
        </p>
      ) : null}
      <Puck
        config={editorConfig}
        data={data}
        onPublish={publish}
        headerTitle="Homepage"
        headerPath="FHK Stock"
        height="100%"
        viewports={[
          { width: 390, height: "auto", icon: "Smartphone", label: "Phone" },
          { width: 820, height: "auto", icon: "Tablet", label: "Tablet" },
          { width: 1360, height: "auto", icon: "Monitor", label: "Desktop" }
        ]}
        overrides={{
          headerActions: ({ children }) => (
            <>
              <a className="fx-link" href="/" target="_blank" rel="noreferrer">
                View site
              </a>
              <form action={lockEditor}>
                <button className="fx-link" type="submit">
                  Sign out
                </button>
              </form>
              {children}
            </>
          )
        }}
      />
      {toast ? (
        <div className={`fx-toast ${toast.tone}`} role="status">
          {toast.text}
        </div>
      ) : null}
    </div>
  );
}
