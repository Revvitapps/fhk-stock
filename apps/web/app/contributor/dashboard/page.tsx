import type { Metadata } from "next";
import Image from "next/image";
import { PortalBar } from "@/components/PortalBar";
import { catalogAssets } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Contributor dashboard",
  robots: { index: false, follow: false }
};

const uploads = [
  { slug: "sunday-set-six-rows-back", status: "Live", licenses: 41 },
  { slug: "voices-in-the-room", status: "Live", licenses: 28 },
  { slug: "behind-the-board", status: "Live", licenses: 17 },
  { slug: "baptism-sunday", status: "In review", licenses: 0 },
  { slug: "sunday-message", status: "Needs tags", licenses: 0 }
];

const earnings = [
  { month: "Apr", amount: 180 },
  { month: "May", amount: 240 },
  { month: "Jun", amount: 210 },
  { month: "Jul", amount: 320 },
  { month: "Aug", amount: 410 },
  { month: "Sep", amount: 520 }
];

const statusClass: Record<string, string> = {
  Live: "pill success",
  "In review": "pill",
  "Needs tags": "pill neutral"
};

export default function ContributorDashboardPage() {
  const peak = Math.max(...earnings.map((entry) => entry.amount));
  const rows = uploads.flatMap((upload) => {
    const asset = catalogAssets.find((item) => item.slug === upload.slug);
    return asset ? [{ ...upload, asset }] : [];
  });

  return (
    <>
      <PortalBar current="contributor" />
      <div className="shell">
        <div className="portal-head">
          <p className="kicker">Contributor dashboard</p>
          <h1 className="section-title">Welcome back.</h1>
        </div>

        <div className="grid-3">
          <div className="panel">
            <p className="kicker">Earnings this month</p>
            <div className="stat">$520</div>
            <p className="stat-delta">↑ 27% vs. August</p>
          </div>
          <div className="panel">
            <p className="kicker">Licenses sold</p>
            <div className="stat">86</div>
            <p className="subtle">Across 3 live images.</p>
          </div>
          <div className="panel">
            <p className="kicker">In the review queue</p>
            <div className="stat">2</div>
            <p className="subtle">Typical turnaround is three days.</p>
          </div>
        </div>

        <section className="section two-col" style={{ gridTemplateColumns: "1.2fr 0.8fr" }}>
          <div className="panel">
            <h3>Your uploads</h3>
            <div className="rows">
              {rows.map((row) => (
                <div key={row.slug} className="row">
                  <div className="row-thumb">
                    <Image src={row.asset.image} alt="" fill sizes="72px" />
                  </div>
                  <div>
                    <div className="row-title">{row.asset.title}</div>
                    <div className="row-meta">{row.asset.id}</div>
                  </div>
                  <span className={statusClass[row.status]}>{row.status}</span>
                  <span className="row-meta">{row.licenses > 0 ? `${row.licenses} licenses` : "—"}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="panel">
            <h3>Earnings, last six months</h3>
            <div className="bars" role="img" aria-label="Monthly earnings rising from $180 in April to $520 in September">
              {earnings.map((entry, index) => (
                <div key={entry.month} className="bar">
                  <span>${entry.amount}</span>
                  <i
                    style={{
                      height: `${Math.round((entry.amount / peak) * 100)}%`,
                      animationDelay: `${index * 70}ms`
                    }}
                  />
                  <span>{entry.month}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
