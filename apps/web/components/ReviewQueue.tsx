"use client";

import Image from "next/image";
import { useState } from "react";
import type { CatalogAsset } from "@/lib/catalog";

type Decision = "pending" | "approved" | "rejected";

type ReviewQueueProps = {
  assets: CatalogAsset[];
};

export function ReviewQueue({ assets }: ReviewQueueProps) {
  const [decisions, setDecisions] = useState<Record<string, Decision>>({});
  const pending = assets.filter((asset) => (decisions[asset.id] ?? "pending") === "pending").length;

  function decide(id: string, decision: Decision) {
    setDecisions((current) => ({ ...current, [id]: decision }));
  }

  return (
    <>
      <p className="result-count" aria-live="polite">
        {pending} of {assets.length} submissions waiting on a decision
      </p>
      <div className="review-grid">
        {assets.map((asset) => {
          const state = decisions[asset.id] ?? "pending";

          return (
            <article key={asset.id} className="review-card" data-state={state}>
              <div className="review-card-media">
                <Image src={asset.image} alt={asset.title} fill sizes="(max-width: 640px) 100vw, 33vw" />
              </div>
              <div className="review-card-body">
                <div className="row-title">{asset.title}</div>
                <div className="row-meta">
                  {asset.id} · {asset.width} × {asset.height}
                </div>
                {state === "pending" ? (
                  <div className="review-card-actions">
                    <button type="button" className="button primary small" onClick={() => decide(asset.id, "approved")}>
                      Approve
                    </button>
                    <button type="button" className="button secondary small" onClick={() => decide(asset.id, "rejected")}>
                      Send back
                    </button>
                  </div>
                ) : (
                  <div className="review-card-actions">
                    <span className={state === "approved" ? "pill success" : "pill neutral"}>
                      {state === "approved" ? "Approved" : "Sent back with notes"}
                    </span>
                    <button type="button" className="link-button" onClick={() => decide(asset.id, "pending")}>
                      Undo
                    </button>
                  </div>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </>
  );
}
