import Image from "next/image";
import Link from "next/link";
import { SaveButton } from "@/components/SaveButton";
import { getCollection, type CatalogAsset } from "@/lib/catalog";

type AssetCardProps = {
  asset: CatalogAsset;
  priority?: boolean;
};

export function AssetCard({ asset, priority = false }: AssetCardProps) {
  const collection = getCollection(asset.collection);

  return (
    <div className="asset-card">
      <Link href={`/assets/${asset.slug}`} className="asset-card-link">
        <Image
          src={asset.image}
          alt={asset.title}
          width={asset.width}
          height={asset.height}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          priority={priority}
        />
        <div className="asset-card-overlay">
          <div>
            <span className="asset-card-collection">{collection?.name}</span>
            <h3>{asset.title}</h3>
          </div>
          <span className="asset-card-price">${asset.price}</span>
        </div>
      </Link>
      <SaveButton slug={asset.slug} title={asset.title} />
    </div>
  );
}
