import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Simple pricing for FHK Stock: single images, credit packs, and a plan for whole church teams."
};

const plans = [
  {
    name: "Single image",
    price: "$22",
    unit: "and up",
    blurb: "One frame for one project. No account minimums, no subscription.",
    features: ["Standard license included", "Full-resolution download", "License receipt for your records"],
    cta: "Browse images",
    href: "/search",
    featured: false
  },
  {
    name: "Credit pack",
    price: "$149",
    unit: "for 10 credits",
    blurb: "For the comms lead planning a season of series art, slides, and socials.",
    features: [
      "Save roughly 40% per image",
      "Credits never expire",
      "Share credits across your team",
      "Upgrade any image to Extended for 3 credits"
    ],
    cta: "Get a credit pack",
    href: "/sign-in",
    featured: true
  },
  {
    name: "Church plan",
    price: "$299",
    unit: "per year",
    blurb: "Unlimited Standard downloads for one church or ministry, every campus included.",
    features: ["Unlimited Standard licenses", "Unlimited team seats", "Early access to new collections"],
    cta: "Start a church plan",
    href: "/sign-in",
    featured: false
  }
] as const;

const faqs = [
  {
    q: "Do I need an account to buy a single image?",
    a: "You will create one at checkout so your downloads and receipts live somewhere safe. It takes about a minute."
  },
  {
    q: "What happens to my images if I cancel the Church plan?",
    a: "Anything you downloaded while subscribed stays licensed forever. You just can't download new images under the plan."
  },
  {
    q: "Can I get a refund?",
    a: "Yes, within 14 days, as long as the image hasn't been downloaded at full resolution."
  }
];

export default function PricingPage() {
  return (
    <>
      <section className="page-hero">
        <div className="shell">
          <p className="kicker on-dark">Pricing</p>
          <h1 className="display">
            Fair prices. <em>Forever</em> licenses.
          </h1>
          <p className="lede">
            Pay once per image, stock up with credits, or cover the whole team for a year. Every
            option comes with the same plain-English license.
          </p>
        </div>
      </section>

      <section className="page-body shell">
        <div className="pricing-grid">
          {plans.map((plan) => (
            <div key={plan.name} className={plan.featured ? "price-card featured" : "price-card"}>
              {plan.featured ? <span className="pill on-dark">Most popular</span> : null}
              <h3>{plan.name}</h3>
              <div className="price">
                {plan.price} <small>{plan.unit}</small>
              </div>
              <p className="subtle">{plan.blurb}</p>
              <ul>
                {plan.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
              <Link href={plan.href} className={plan.featured ? "button light" : "button secondary"}>
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>

        <div className="section two-col">
          <div>
            <p className="kicker">Questions</p>
            <h2 className="section-title">The short answers.</h2>
            <p className="subtle" style={{ marginTop: "1rem" }}>
              Wondering what a license actually lets you do?{" "}
              <Link href="/licensing" className="text-link">
                Compare licenses →
              </Link>
            </p>
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
