"use client";

import { useState } from "react";
import { licensePrice, licenseTiers, type CatalogAsset, type LicenseTier } from "@/lib/catalog";

type LicensePickerProps = {
  asset: CatalogAsset;
};

export function LicensePicker({ asset }: LicensePickerProps) {
  const [tierId, setTierId] = useState<LicenseTier["id"]>("standard");
  const [added, setAdded] = useState(false);
  const tier = licenseTiers.find((item) => item.id === tierId) ?? licenseTiers[0];

  return (
    <div className="license-picker">
      <div role="radiogroup" aria-label="Choose a license">
        {licenseTiers.map((item) => (
          <button
            key={item.id}
            type="button"
            role="radio"
            aria-checked={item.id === tierId}
            className="license-option"
            onClick={() => {
              setTierId(item.id);
              setAdded(false);
            }}
          >
            <span className="license-radio" aria-hidden="true" />
            <span className="license-option-copy">
              <strong>{item.name} license</strong>
              <span>{item.summary}</span>
            </span>
            <span className="license-option-price">${licensePrice(asset, item)}</span>
          </button>
        ))}
      </div>
      <button
        type="button"
        className="button primary block"
        disabled={added}
        onClick={() => setAdded(true)}
      >
        {added ? "Added to cart" : `Add to cart · $${licensePrice(asset, tier)}`}
      </button>
      {added ? (
        <p className="license-note added" role="status">
          Saved. Checkout opens when FHK Stock launches.
        </p>
      ) : (
        <p className="license-note">One-time purchase. Yours to use forever.</p>
      )}
    </div>
  );
}
