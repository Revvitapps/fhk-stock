import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getCatalogAsset } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Contributors",
  description: "Sell your church and ministry photography on FHK Stock. Keep your copyright and earn on every license."
};

const benefits = [
  {
    title: "Keep your copyright",
    body: "You license your work through FHK Stock on a non-exclusive basis. It stays yours, always."
  },
  {
    title: "A reviewer, not a robot",
    body: "Every submission is looked at by a person who gives you notes you can actually use."
  },
  {
    title: "Monthly payouts",
    body: "Earnings are tracked per license in your dashboard and paid out at the start of each month."
  }
];

const steps = [
  { title: "Apply", body: "Share a few frames so we can see your eye. Most applications hear back within a week." },
  { title: "Upload", body: "Drag in full-resolution files, add titles and tags, and submit them for review." },
  { title: "Earn", body: "Approved images go live in the library. You earn every time one is licensed." }
];

export default function ContributorsPage() {
  const cover = getCatalogAsset("voices-in-the-room");

  return (
    <>
      <section className="page-hero">
        <div className="shell">
          <p className="kicker on-dark">For photographers</p>
          <h1 className="display">
            You already shoot every Sunday. <em>Get paid for it.</em>
          </h1>
          <p className="lede">
            FHK Stock is built around the people behind the camera at real churches. Bring your best
            frames and we will handle review, delivery, and payouts.
          </p>
          <div className="stack">
            <Link href="/sign-in" className="button primary">
              Open the contributor demo
            </Link>
          </div>
        </div>
      </section>

      <section className="page-body shell">
        <div className="grid-3">
          {benefits.map((benefit) => (
            <div key={benefit.title} className="panel reveal">
              <h3>{benefit.title}</h3>
              <p className="subtle">{benefit.body}</p>
            </div>
          ))}
        </div>

        <div className="section">
          <div className="contributor-cta reveal">
            <div className="contributor-cta-copy">
              <p className="kicker">How it works</p>
              <h2 className="section-title">Three steps from camera roll to catalog.</h2>
              <ol className="rows" style={{ margin: "1.5rem 0 0", padding: 0, listStyle: "none" }}>
                {steps.map((step, index) => (
                  <li key={step.title} className="row" style={{ gridTemplateColumns: "48px 1fr" }}>
                    <span className="step-number" style={{ margin: 0 }}>
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <div className="row-title">{step.title}</div>
                      <div className="row-meta">{step.body}</div>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
            {cover ? (
              <div className="contributor-cta-media">
                <Image src={cover.image} alt={cover.title} fill sizes="(max-width: 920px) 100vw, 40vw" />
              </div>
            ) : null}
          </div>
        </div>
      </section>
    </>
  );
}
