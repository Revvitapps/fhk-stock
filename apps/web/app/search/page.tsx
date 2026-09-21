import type { Metadata } from "next";
import { CatalogBrowser } from "@/components/CatalogBrowser";
import { getCollection } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Browse images",
  description: "Search the FHK Stock library of worship, community, and everyday-ministry imagery.",
  robots: {
    index: false,
    follow: true
  }
};

type SearchPageProps = {
  searchParams: Promise<{
    q?: string | string[];
    collection?: string | string[];
  }>;
};

function first(value?: string | string[]) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const query = first(params.q) ?? "";
  const collection = getCollection(first(params.collection) ?? "");

  return (
    <>
      <section className="page-hero">
        <div className="shell">
          <p className="kicker on-dark">Browse</p>
          <h1 className="display">{collection ? collection.name : "The full library."}</h1>
          <p className="lede">
            {collection
              ? collection.blurb
              : "Every image in the launch collection, searchable by moment, mood, or season."}
          </p>
        </div>
      </section>
      <section className="page-body shell">
        <CatalogBrowser
          key={`${query}-${collection?.slug ?? "all"}`}
          initialQuery={query}
          initialCollection={collection?.slug ?? null}
        />
      </section>
    </>
  );
}
