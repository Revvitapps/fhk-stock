"use client";

import { useMemo, useState } from "react";
import { AssetCard } from "@/components/AssetCard";
import { catalogAssets, collections, getCollection, type CollectionSlug } from "@/lib/catalog";

type SortKey = "featured" | "price-asc" | "price-desc";

type CatalogBrowserProps = {
  initialQuery: string;
  initialCollection: CollectionSlug | null;
};

export function CatalogBrowser({ initialQuery, initialCollection }: CatalogBrowserProps) {
  const [query, setQuery] = useState(initialQuery);
  const [collection, setCollection] = useState<CollectionSlug | null>(initialCollection);
  const [sort, setSort] = useState<SortKey>("featured");

  const results = useMemo(() => {
    const terms = query.toLowerCase().split(/\s+/).filter(Boolean);

    const matches = catalogAssets.filter((asset) => {
      if (collection && asset.collection !== collection) {
        return false;
      }

      const haystack = [
        asset.title,
        asset.description,
        getCollection(asset.collection)?.name ?? "",
        ...asset.tags
      ]
        .join(" ")
        .toLowerCase();

      return terms.every((term) => haystack.includes(term));
    });

    if (sort === "price-asc") {
      return [...matches].sort((a, b) => a.price - b.price);
    }

    if (sort === "price-desc") {
      return [...matches].sort((a, b) => b.price - a.price);
    }

    return matches;
  }, [query, collection, sort]);

  function reset() {
    setQuery("");
    setCollection(null);
  }

  return (
    <>
      <div className="browser-bar">
        <label className="browser-search">
          <span className="sr-only">Search images</span>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" />
          </svg>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by moment, mood, or season"
          />
        </label>
        <label>
          <span className="sr-only">Sort results</span>
          <select
            className="select"
            value={sort}
            onChange={(event) => setSort(event.target.value as SortKey)}
          >
            <option value="featured">Featured first</option>
            <option value="price-asc">Price: low to high</option>
            <option value="price-desc">Price: high to low</option>
          </select>
        </label>
      </div>

      <div className="chips" role="group" aria-label="Filter by collection">
        <button
          type="button"
          className="chip"
          aria-pressed={collection === null}
          onClick={() => setCollection(null)}
        >
          All images
          <small>{catalogAssets.length}</small>
        </button>
        {collections.map((item) => (
          <button
            key={item.slug}
            type="button"
            className="chip"
            aria-pressed={collection === item.slug}
            onClick={() => setCollection(item.slug)}
          >
            {item.name}
            <small>{catalogAssets.filter((asset) => asset.collection === item.slug).length}</small>
          </button>
        ))}
      </div>

      <p className="result-count" aria-live="polite">
        {results.length} {results.length === 1 ? "image" : "images"}
        {query ? ` for “${query}”` : ""}
      </p>

      {results.length > 0 ? (
        <div className="masonry">
          {results.map((asset, index) => (
            <AssetCard key={asset.id} asset={asset} priority={index < 3} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h3>Nothing in the library matches that yet.</h3>
          <p>Try a broader term, or clear the filters to see the full launch collection.</p>
          <button type="button" className="button secondary" onClick={reset}>
            Clear filters
          </button>
        </div>
      )}
    </>
  );
}
