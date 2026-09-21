import type { Metadata } from "next";
import { PortalBar } from "@/components/PortalBar";
import { ReviewQueue } from "@/components/ReviewQueue";
import { catalogAssets } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Review queue",
  robots: { index: false, follow: false }
};

export default function AdminReviewPage() {
  const queue = catalogAssets.slice(6, 12);

  return (
    <>
      <PortalBar current="admin" />
      <div className="shell page-body" style={{ paddingTop: 0 }}>
        <div className="portal-head">
          <p className="kicker">Moderation</p>
          <h1 className="section-title">Review queue.</h1>
        </div>
        <ReviewQueue assets={queue} />
      </div>
    </>
  );
}
