import Image from "next/image";
import Link from "next/link";
import { InstallButton } from "@/components/InstallButton";
import { Logo } from "@/components/Logo";
import { ReplayIntroButton } from "@/components/ReplayIntroButton";
import { collections } from "@/lib/catalog";

// 640x82 source, shown at the cap height of the label beside it
const WORDMARK_WIDTH = 76;
const WORDMARK_HEIGHT = 10;

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell">
        <div className="footer-top">
          <div className="footer-brand">
            <Link href="/" className="brand on-dark">
              <Logo />
            </Link>
            <p className="footer-tagline">For His Kingdom</p>
            <p>
              A small, carefully edited library of worship, community, and everyday-ministry
              imagery. Currently in preview.
            </p>
            <InstallButton />
          </div>
          <div className="footer-col">
            <h4>Collections</h4>
            {collections.map((collection) => (
              <Link
                key={collection.slug}
                href={{ pathname: "/search", query: { collection: collection.slug } }}
              >
                {collection.name}
              </Link>
            ))}
          </div>
          <div className="footer-col">
            <h4>Marketplace</h4>
            <Link href="/search">Browse images</Link>
            <Link href="/pricing">Pricing</Link>
            <Link href="/licensing">Licensing</Link>
            <Link href="/contributors">Become a contributor</Link>
          </div>
          <div className="footer-col">
            <h4>Account</h4>
            <Link href="/sign-in">Sign in</Link>
            <Link href="/saved">Saved images</Link>
            <Link href="/account">Downloads</Link>
            <Link href="/contributor/dashboard">Contributor dashboard</Link>
          </div>
        </div>
        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} FHK Stock. Preview build, checkout not yet open. <ReplayIntroButton />
          </span>

        </div>
        <div className="powered-by">
          <a href="https://revvit.io" target="_blank" rel="noreferrer">
            <span>Powered by</span>
            <Image
              src="/brand/revvit-wordmark.png"
              alt="Revvit"
              width={WORDMARK_WIDTH}
              height={WORDMARK_HEIGHT}
              className="revvit-wordmark"
            />
          </a>
        </div>
      </div>
    </footer>
  );
}
