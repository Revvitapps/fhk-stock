import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AssetCard } from "@/components/AssetCard";
import { LicensePicker } from "@/components/LicensePicker";
import { SaveButton } from "@/components/SaveButton";
import { catalogAssets, getCatalogAsset, getCollection, getRelatedAssets } from "@/lib/catalog";

type AssetPageProps = {
  params: Promise<{
    assetId: string;
  }>;
};

export function generateStaticParams() {
  return catalogAssets.map((asset) => ({ assetId: asset.slug }));
}

export async function generateMetadata({ params }: AssetPageProps): Promise<Metadata> {
  const { assetId } = await params;
  const asset = getCatalogAsset(assetId);

  if (!asset) {
    return {
      title: "Image not found"
    };
  }

  return {
    title: asset.title,
    description: asset.description,
    openGraph: {
      title: asset.title,
      description: asset.description,
      images: [asset.image]
    }
  };
}

function orientation(width: number, height: number) {
  if (width === height) {
    return "Square";
  }

  return width > height ? "Landscape" : "Portrait";
}

export default async function AssetPage({ params }: AssetPageProps) {
  const { assetId } = await params;
  const asset = getCatalogAsset(assetId);

  if (!asset) {
    notFound();
  }

  const collection = getCollection(asset.collection);
  const related = getRelatedAssets(asset);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ImageObject",
    name: asset.title,
    description: asset.description,
    contentUrl: asset.image,
    width: asset.width,
    height: asset.height
  };

  return (
    <div className="shell">
      <nav className="crumbs" aria-label="Breadcrumb">
        <Link href="/search">Browse</Link>
        <span>/</span>
        <Link href={{ pathname: "/search", query: { collection: asset.collection } }}>
          {collection?.name}
        </Link>
        <span>/</span>
        <span>{asset.title}</span>
      </nav>

      <div className="asset-layout">
        <div className="asset-stage">
          <Image
            src={asset.image}
            alt={asset.title}
            width={asset.width}
            height={asset.height}
            sizes="(max-width: 1024px) 100vw, 60vw"
            priority
          />
          <div className="asset-stage-mark" aria-hidden="true">
            TMStock preview
          </div>
        </div>

        <div className="asset-info">
          <p className="kicker">{collection?.name}</p>
          <h1>{asset.title}</h1>
          <p className="subtle">{asset.description}</p>

          <LicensePicker asset={asset} />
          <SaveButton slug={asset.slug} title={asset.title} variant="inline" />

          <dl className="spec-list">
            <div>
              <dt>Image ID</dt>
              <dd>{asset.id}</dd>
            </div>
            <div>
              <dt>Preview size</dt>
              <dd>
                {asset.width} × {asset.height} px
              </dd>
            </div>
            <div>
              <dt>Orientation</dt>
              <dd>{orientation(asset.width, asset.height)}</dd>
            </div>
          </dl>

          <div className="tag-row">
            {asset.tags.map((tag) => (
              <Link key={tag} href={{ pathname: "/search", query: { q: tag } }}>
                {tag}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <section className="section">
        <div className="section-head">
          <div>
            <p className="kicker">Keep looking</p>
            <h2 className="section-title">More like this.</h2>
          </div>
          <Link href="/search" className="text-link">
            Browse everything →
          </Link>
        </div>
        <div className="masonry">
          {related.map((item) => (
            <AssetCard key={item.id} asset={item} />
          ))}
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </div>
  );
}
