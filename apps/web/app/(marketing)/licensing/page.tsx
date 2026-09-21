import type { Metadata } from "next";
import Link from "next/link";
import { licenseTiers } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Licensing",
  description: "What the FHK Stock Standard and Extended licenses cover, in plain English."
};

const rows: { use: string; standard: boolean; extended: boolean }[] = [
  { use: "Church and ministry websites", standard: true, extended: true },
  { use: "Social media, email, and slides", standard: true, extended: true },
  { use: "Livestream graphics and lower thirds", standard: true, extended: true },
  { use: "Print runs up to 5,000 copies", standard: true, extended: true },
  { use: "Unlimited print runs", standard: false, extended: true },
  { use: "Paid advertising campaigns", standard: false, extended: true },
  { use: "Merchandise and products for resale", standard: false, extended: true },
  { use: "Templates you sell or distribute", standard: false, extended: true }
];

const faqs = [
  {
    q: "Does a license ever expire?",
    a: "No. Both licenses are perpetual. Buy once and keep using the image for as long as you like."
  },
  {
    q: "Can our whole staff use an image we bought?",
    a: "Yes. A license covers your entire organization, including volunteers working on your behalf."
  },
  {
    q: "Can I edit, crop, or add text to an image?",
    a: "Absolutely. Crop it, grade it, put your sermon title on it. You just can't resell or redistribute the file itself."
  },
  {
    q: "What isn't allowed under either license?",
    a: "Reselling the original file, using images in a way that misrepresents the people in them, or using them in logos and trademarks."
  }
];

export default function LicensingPage() {
  return (
    <>
      <section className="page-hero">
        <div className="shell">
          <p className="kicker on-dark">Licensing</p>
          <h1 className="display">
            Written for people, <em>not</em> lawyers.
          </h1>
          <p className="lede">
            Two licenses, one page. If you can read this table, you understand exactly what you
            are buying.
          </p>
        </div>
      </section>

      <section className="page-body shell">
        <div className="table-wrap">
          <table className="compare">
            <thead>
              <tr>
                <th scope="col">What you can do</th>
                {licenseTiers.map((tier) => (
                  <th key={tier.id} scope="col">
                    {tier.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.use}>
                  <td>{row.use}</td>
                  <td>
                    <span className={row.standard ? "yes" : "no"}>
                      {row.standard ? "✓" : "—"}
                      <span className="sr-only">{row.standard ? "Included" : "Not included"}</span>
                    </span>
                  </td>
                  <td>
                    <span className={row.extended ? "yes" : "no"}>
                      {row.extended ? "✓" : "—"}
                      <span className="sr-only">{row.extended ? "Included" : "Not included"}</span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="section two-col">
          <div>
            <p className="kicker">Good to know</p>
            <h2 className="section-title">Common licensing questions.</h2>
            <div className="stack">
              <Link href="/search" className="button primary">
                Browse images
              </Link>
              <Link href="/pricing" className="button secondary">
                See pricing
              </Link>
            </div>
          </div>
          <div className="faq">
            {faqs.map((faq) => (
              <details key={faq.q}>
                <summary>{faq.q}</summary>
                <p>{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
