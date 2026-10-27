/**
 * The homepage, broken into sections a client can edit, reorder, add and remove.
 * Each render reuses the site's own markup and classes, so an edited page looks
 * exactly like the hand-built one. Text props are ReactNode-friendly because the
 * editor swaps strings for inline-editable nodes while editing.
 */

import Image from "next/image";
import Link from "next/link";
import type { Route } from "next";
import type { ReactNode } from "react";
import { AssetCard } from "@/components/AssetCard";
import { catalogAssets, collections, licenseTiers } from "@/lib/catalog";

type Text = ReactNode;

const lowestPrice = Math.min(...catalogAssets.map((asset) => asset.price));

function Photo({ src, sizes, priority }: { src: string; sizes: string; priority?: boolean }) {
  if (!src) return null;
  return <Image src={src} alt="" fill sizes={sizes} priority={priority} />;
}

export type HeroProps = {
  eyebrow: Text;
  headlineStart: Text;
  headlineItalic: Text;
  headlineEnd: Text;
  lede: Text;
  showSearch: "yes" | "no";
  searchPlaceholder: string;
  popular: { term: string }[];
  imageMain: string;
  imageTop: string;
  imageBottom: string;
  chipTitle: Text;
  chipBody: Text;
  showStats: "yes" | "no";
};

export function HeroBlock(props: HeroProps) {
  return (
    <section className="hero">
      <div className="shell hero-inner">
        <div className="hero-copy">
          <div className="eyebrow on-dark">
            <span className="eyebrow-dot" />
            {props.eyebrow}
          </div>
          <h1 className="display">
            {props.headlineStart} <em>{props.headlineItalic}</em> {props.headlineEnd}
          </h1>
          <p className="lede">{props.lede}</p>
          {props.showSearch === "yes" ? (
            <form className="hero-search" action="/search" role="search">
              <label htmlFor="hero-q" className="sr-only">
                Search images
              </label>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.5-3.5" />
              </svg>
              <input id="hero-q" name="q" type="search" placeholder={props.searchPlaceholder} />
              <button type="submit">Search</button>
            </form>
          ) : null}
          {props.popular.length ? (
            <div className="hero-tags">
              <span>Popular:</span>
              {props.popular.map(({ term }) => (
                <Link key={term} href={{ pathname: "/search", query: { q: term } }}>
                  {term}
                </Link>
              ))}
            </div>
          ) : null}
        </div>

        <div className="hero-mosaic" aria-hidden="true">
          <div className="mosaic-tile mosaic-main">
            <Photo src={props.imageMain} sizes="(max-width: 920px) 60vw, 30vw" priority />
          </div>
          <div className="mosaic-tile mosaic-top">
            <Photo src={props.imageTop} sizes="(max-width: 920px) 40vw, 20vw" priority />
          </div>
          <div className="mosaic-tile mosaic-bottom">
            <Photo src={props.imageBottom} sizes="(max-width: 920px) 40vw, 20vw" priority />
          </div>
          <div className="mosaic-chip">
            <span className="mosaic-chip-check">✓</span>
            <div>
              <strong>{props.chipTitle}</strong>
              <span>{props.chipBody}</span>
            </div>
          </div>
        </div>
      </div>

      {props.showStats === "yes" ? (
        <div className="shell">
          <dl className="hero-stats">
            <div>
              <dt>{catalogAssets.length}</dt>
              <dd>hand-picked launch images</dd>
            </div>
            <div>
              <dt>{collections.length}</dt>
              <dd>curated collections</dd>
            </div>
            <div>
              <dt>{licenseTiers.length}</dt>
              <dd>plain-English licenses</dd>
            </div>
            <div>
              <dt>${lowestPrice}</dt>
              <dd>starting price per image</dd>
            </div>
          </dl>
        </div>
      ) : null}
    </section>
  );
}

export type MarqueeProps = { tags: { tag: string }[] };

export function MarqueeBlock({ tags }: MarqueeProps) {
  const words = tags.map((item) => item.tag);
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {[...words, ...words].map((tag, index) => (
          <span key={`${tag}-${index}`}>{tag}</span>
        ))}
      </div>
    </div>
  );
}

type SectionHead = { kicker: Text; title: Text };

function Head({ kicker, title, aside }: SectionHead & { aside?: ReactNode }) {
  return (
    <div className="section-head reveal">
      <div>
        <p className="kicker">{kicker}</p>
        <h2 className="section-title">{title}</h2>
      </div>
      {aside}
    </div>
  );
}

export type FeaturedProps = SectionHead & { count: number; linkLabel: string };

export function FeaturedBlock({ kicker, title, count, linkLabel }: FeaturedProps) {
  return (
    <section className="section shell">
      <Head
        kicker={kicker}
        title={title}
        aside={
          <Link href="/search" className="text-link">
            {linkLabel} →
          </Link>
        }
      />
      <div className="masonry">
        {catalogAssets.slice(0, Math.max(1, count)).map((asset, index) => (
          <AssetCard key={asset.id} asset={asset} priority={index < 2} />
        ))}
      </div>
    </section>
  );
}

export type CollectionsProps = SectionHead;

export function CollectionsBlock({ kicker, title }: CollectionsProps) {
  return (
    <section className="section shell" id="collections">
      <Head kicker={kicker} title={title} />
      <div className="collection-grid">
        {collections.map((collection) => {
          const count = catalogAssets.filter((asset) => asset.collection === collection.slug).length;
          return (
            <Link
              key={collection.slug}
              href={{ pathname: "/search", query: { collection: collection.slug } }}
              className="collection-card reveal"
            >
              <Image src={collection.cover} alt="" fill sizes="(max-width: 920px) 100vw, 40vw" />
              <div className="collection-card-copy">
                <span className="pill on-dark">
                  {count} {count === 1 ? "image" : "images"}
                </span>
                <h3>{collection.name}</h3>
                <p>{collection.blurb}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

export type StepsProps = SectionHead & { steps: { title: string; body: string }[] };

export function StepsBlock({ kicker, title, steps }: StepsProps) {
  return (
    <section className="section shell">
      <Head kicker={kicker} title={title} />
      <ol className="steps">
        {steps.map((step, index) => (
          <li key={index} className="step reveal">
            <span className="step-number">{String(index + 1).padStart(2, "0")}</span>
            <h3>{step.title}</h3>
            <p>{step.body}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

export type LicenseBandProps = SectionHead & { lede: Text; buttonLabel: string; buttonHref: string };

export function LicenseBandBlock({ kicker, title, lede, buttonLabel, buttonHref }: LicenseBandProps) {
  return (
    <section className="band">
      <div className="shell band-inner">
        <div className="reveal">
          <p className="kicker on-dark">{kicker}</p>
          <h2 className="section-title">{title}</h2>
          <p className="lede">{lede}</p>
          <Link href={buttonHref as Route} className="button light">
            {buttonLabel}
          </Link>
        </div>
        <div className="license-cards">
          {licenseTiers.map((tier) => (
            <div key={tier.id} className="license-card reveal">
              <div className="license-card-head">
                <h3>{tier.name}</h3>
                <span>from ${lowestPrice * tier.multiplier}</span>
              </div>
              <p>{tier.summary}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export type CalloutProps = SectionHead & {
  body: Text;
  image: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel: string;
  secondaryHref: string;
};

export function CalloutBlock(props: CalloutProps) {
  return (
    <section className="section shell">
      <div className="contributor-cta reveal">
        <div className="contributor-cta-copy">
          <p className="kicker">{props.kicker}</p>
          <h2 className="section-title">{props.title}</h2>
          <p className="subtle">{props.body}</p>
          <div className="stack">
            {props.primaryLabel ? (
              <Link href={props.primaryHref as Route} className="button primary">
                {props.primaryLabel}
              </Link>
            ) : null}
            {props.secondaryLabel ? (
              <Link href={props.secondaryHref as Route} className="button secondary">
                {props.secondaryLabel}
              </Link>
            ) : null}
          </div>
        </div>
        {props.image ? (
          <div className="contributor-cta-media">
            <Image src={props.image} alt="" fill sizes="(max-width: 920px) 100vw, 40vw" />
          </div>
        ) : null}
      </div>
    </section>
  );
}

export type TextSectionProps = SectionHead & { body: Text; align: "left" | "center" };

export function TextSectionBlock({ kicker, title, body, align }: TextSectionProps) {
  return (
    <section className="section shell">
      <div className="reveal" style={{ maxWidth: 760, margin: align === "center" ? "0 auto" : undefined, textAlign: align }}>
        <p className="kicker">{kicker}</p>
        <h2 className="section-title">{title}</h2>
        <div className="subtle" style={{ fontSize: "1.1rem", lineHeight: 1.6 }}>
          {body}
        </div>
      </div>
    </section>
  );
}

export type QuoteProps = { quote: Text; name: Text; role: Text };

export function QuoteBlock({ quote, name, role }: QuoteProps) {
  return (
    <section className="band">
      <div className="shell reveal" style={{ maxWidth: 900, textAlign: "center", paddingBlock: "1rem" }}>
        <p className="section-title" aria-hidden="true" style={{ fontSize: "3rem", lineHeight: 1, marginBottom: 0 }}>
          “
        </p>
        <blockquote className="section-title" style={{ fontStyle: "italic", margin: 0 }}>
          {quote}
        </blockquote>
        <p className="kicker on-dark" style={{ marginTop: "1.5rem" }}>
          {name} · {role}
        </p>
      </div>
    </section>
  );
}
