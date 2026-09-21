import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PortalBar } from "@/components/PortalBar";
import { catalogAssets } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Your downloads",
  robots: { index: false, follow: false }
};

const purchases = [
  { slug: "sanctuary-at-golden-hour", license: "Extended", date: "Sep 14", receipt: "R-20418" },
  { slug: "small-group-tuesday-night", license: "Standard", date: "Sep 9", receipt: "R-20377" },
  { slug: "welcome-at-the-door", license: "Standard", date: "Aug 28", receipt: "R-20102" },
  { slug: "morning-study-notes", license: "Standard", date: "Aug 28", receipt: "R-20102" }
];

export default function AccountPage() {
  const rows = purchases.flatMap((purchase) => {
    const asset = catalogAssets.find((item) => item.slug === purchase.slug);
    return asset ? [{ ...purchase, asset }] : [];
  });

  return (
    <>
      <PortalBar current="buyer" />
      <div className="shell">
        <div className="portal-head">
          <p className="kicker">Buyer account</p>
          <h1 className="section-title">Your downloads.</h1>
        </div>

        <div className="grid-3">
          <div className="panel">
            <p className="kicker">Licensed images</p>
            <div className="stat">{rows.length}</div>
            <p className="subtle">Yours to use forever.</p>
          </div>
          <div className="panel">
            <p className="kicker">Credits remaining</p>
            <div className="stat">6</div>
            <p className="subtle">From your 10-credit pack. Credits never expire.</p>
          </div>
          <div className="panel">
            <p className="kicker">Team seats</p>
            <div className="stat">3</div>
            <p className="subtle">Everyone shares the same library and receipts.</p>
          </div>
        </div>

        <section className="section">
          <div className="panel">
            <div className="section-head" style={{ marginBottom: "0.5rem" }}>
              <h3>License history</h3>
              <Link href="/search" className="text-link">
                Find more images →
              </Link>
            </div>
            <div className="rows">
              {rows.map((row) => (
                <div key={row.slug} className="row">
                  <div className="row-thumb">
                    <Image src={row.asset.image} alt="" fill sizes="72px" />
                  </div>
                  <div>
                    <Link href={`/assets/${row.asset.slug}`} className="row-title">
                      {row.asset.title}
                    </Link>
                    <div className="row-meta">
                      {row.date} · Receipt {row.receipt}
                    </div>
                  </div>
                  <span className={row.license === "Extended" ? "pill" : "pill neutral"}>{row.license}</span>
                  <span className="text-link">Download</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
