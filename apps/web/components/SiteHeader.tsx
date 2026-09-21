import Link from "next/link";
import { Logo } from "@/components/Logo";

const links = [
  { href: "/search", label: "Browse" },
  { href: "/pricing", label: "Pricing" },
  { href: "/licensing", label: "Licensing" },
  { href: "/contributors", label: "Contributors" }
] as const;

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="shell site-header-inner">
        <Link href="/" className="brand" aria-label="FHK Stock home">
          <Logo />
        </Link>
        <nav className="nav" aria-label="Primary">
          {links.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="header-actions">
          <Link href="/saved" className="nav-quiet">
            Saved
          </Link>
          <Link href="/sign-in" className="nav-quiet">
            Sign in
          </Link>
          <Link href="/search" className="button primary small">
            Browse images
          </Link>
        </div>
      </div>
    </header>
  );
}
