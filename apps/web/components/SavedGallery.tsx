"use client";

import Link from "next/link";
import { AssetCard } from "@/components/AssetCard";
import { catalogAssets } from "@/lib/catalog";
import { useSavedSlugs } from "@/lib/saved";

export function SavedGallery() {
  const slugs = useSavedSlugs();
  const assets = slugs.flatMap((slug) => {
    const asset = catalogAssets.find((item) => item.slug === slug);
    return asset ? [asset] : [];
  });

  if (assets.length === 0) {
    return (
      <div className="empty">
        <h3>Nothing saved yet.</h3>
        <p>Tap the heart on any image to keep it here. Saved images stay on this device, even offline.</p>
        <Link href="/search" className="button primary">
          Browse images
        </Link>
      </div>
    );
  }

  return (
    <>
      <p className="result-count">
        {assets.length} saved {assets.length === 1 ? "image" : "images"}
      </p>
      <div className="masonry">
        {assets.map((asset) => (
          <AssetCard key={asset.id} asset={asset} />
        ))}
      </div>
    </>
  );
}
