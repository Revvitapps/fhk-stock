import Image from "next/image";
import Link from "next/link";
import { AssetCard } from "@/components/AssetCard";
import { LensIntro } from "@/components/LensIntro";
import { catalogAssets, collections, getCatalogAsset, licenseTiers } from "@/lib/catalog";

const popularSearches = ["worship", "baptism", "small group", "kids", "potluck"];

const marqueeTags = [
  "Worship nights",
  "Baptism Sundays",
  "Small groups",
  "Sermon prep",
  "Potluck lunches",
  "Sanctuaries",
  "Volunteers",
  "Coffee & conversation",
  "Stage light",
  "Sunday mornings"
];

const steps = [
  {
    title: "Find the frame",
    body: "Search by moment, mood, or season. Every image is hand-picked, so there is no page twelve to dig through."
  },
  {
    title: "Pick a license",
    body: "Two plain-English options. Standard covers your site, slides, and socials. Extended covers print runs and merch."
  },
  {
    title: "Download and go",
    body: "Full-resolution files and a license receipt land in your account, ready for the next time someone asks."
  }
];

export default function HomePage() {
  const featuredAssets = catalogAssets.slice(0, 8);
  const heroMain = getCatalogAsset("sunday-set-six-rows-back");
  const heroTop = getCatalogAsset("voices-in-the-room");
  const heroBottom = getCatalogAsset("lobby-after-service");
  const contributorImage = getCatalogAsset("behind-the-board");
  const lowestPrice = Math.min(...catalogAssets.map((asset) => asset.price));

  return (
    <>
      <LensIntro />
      <section className="hero">
        <div className="shell hero-inner">
          <div className="hero-copy">
            <div className="eyebrow on-dark">
              <span className="eyebrow-dot" />
              For His Kingdom · launch collection in preview
            </div>
            <h1 className="display">
              Stock photography that looks like <em>your</em> Sunday.
            </h1>
            <p className="lede">
              Worship sets, baptisms, potlucks, kids ministry, and the quiet weekday work in between. A
              carefully edited library for churches and ministries, with licensing you can explain
              in one sentence.
            </p>
            <form className="hero-search" action="/search" role="search">
              <label htmlFor="hero-q" className="sr-only">
                Search images
              </label>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.5-3.5" />
              </svg>
              <input id="hero-q" name="q" type="search" placeholder="Try “small group”" />
              <button type="submit">Search</button>
            </form>
            <div className="hero-tags">
              <span>Popular:</span>
              {popularSearches.map((term) => (
                <Link key={term} href={{ pathname: "/search", query: { q: term } }}>
                  {term}
                </Link>
              ))}
            </div>
          </div>

          <div className="hero-mosaic" aria-hidden="true">
            {heroMain ? (
              <div className="mosaic-tile mosaic-main">
                <Image src={heroMain.image} alt="" fill sizes="(max-width: 920px) 60vw, 30vw" priority />
              </div>
            ) : null}
            {heroTop ? (
              <div className="mosaic-tile mosaic-top">
                <Image src={heroTop.image} alt="" fill sizes="(max-width: 920px) 40vw, 20vw" priority />
              </div>
            ) : null}
            {heroBottom ? (
              <div className="mosaic-tile mosaic-bottom">
                <Image src={heroBottom.image} alt="" fill sizes="(max-width: 920px) 40vw, 20vw" priority />
              </div>
            ) : null}
            <div className="mosaic-chip">
              <span className="mosaic-chip-check">✓</span>
              <div>
                <strong>Standard license</strong>
                <span>Web, slides, and social</span>
              </div>
            </div>
          </div>
        </div>

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
      </section>

      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          {[...marqueeTags, ...marqueeTags].map((tag, index) => (
            <span key={`${tag}-${index}`}>{tag}</span>
          ))}
        </div>
      </div>

      <section className="section shell">
        <div className="section-head reveal">
          <div>
            <p className="kicker">The launch collection</p>
            <h2 className="section-title">Fresh from the first edit.</h2>
          </div>
          <Link href="/search" className="text-link">
            View all {catalogAssets.length} images →
          </Link>
        </div>
        <div className="masonry">
          {featuredAssets.map((asset, index) => (
            <AssetCard key={asset.id} asset={asset} priority={index < 2} />
          ))}
        </div>
      </section>

      <section className="section shell" id="collections">
        <div className="section-head reveal">
          <div>
            <p className="kicker">Collections</p>
            <h2 className="section-title">Browse by the moment you need.</h2>
          </div>
        </div>
        <div className="collection-grid">
          {collections.map((collection) => {
            const count = catalogAssets.filter((asset) => asset.collection === collection.slug).length;

            return (
              <Link
                key={collection.slug}
                href={{ pathname: "/search", query: { collection: collection.slug } }}
                className="collection-card reveal"
              >
                <Image
                  src={collection.cover}
                  alt=""
                  fill
                  sizes="(max-width: 920px) 100vw, 40vw"
                />
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

      <section className="section shell">
        <div className="section-head reveal">
          <div>
            <p className="kicker">How it works</p>
            <h2 className="section-title">From search to slide in three steps.</h2>
          </div>
        </div>
        <ol className="steps">
          {steps.map((step, index) => (
            <li key={step.title} className="step reveal">
              <span className="step-number">{String(index + 1).padStart(2, "0")}</span>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="band">
        <div className="shell band-inner">
          <div className="reveal">
            <p className="kicker on-dark">Licensing</p>
            <h2 className="section-title">Two licenses. No fine-print surprises.</h2>
            <p className="lede">
              Buy once, use forever. Every download comes with a receipt your admin team can file
              and forget.
            </p>
            <Link href="/licensing" className="button light">
              Compare licenses
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

      <section className="section shell">
        <div className="contributor-cta reveal">
          <div className="contributor-cta-copy">
            <p className="kicker">For photographers</p>
            <h2 className="section-title">You already shoot every Sunday. Get paid for it.</h2>
            <p className="subtle">
              Upload your best frames, keep your copyright, and earn on every license. We handle
              review, delivery, and payouts.
            </p>
            <div className="stack">
              <Link href="/contributors" className="button primary">
                Become a contributor
              </Link>
              <Link href="/pricing" className="button secondary">
                See pricing
              </Link>
            </div>
          </div>
          {contributorImage ? (
            <div className="contributor-cta-media">
              <Image
                src={contributorImage.image}
                alt={contributorImage.title}
                fill
                sizes="(max-width: 920px) 100vw, 40vw"
              />
            </div>
          ) : null}
        </div>
      </section>
    </>
  );
}
