import Link from "next/link";

export default function NotFound() {
  return (
    <div className="shell signin">
      <div className="signin-card" style={{ textAlign: "center" }}>
        <p className="kicker">404</p>
        <h1>That frame isn&apos;t in the library.</h1>
        <p className="subtle">The page may have moved, or the link might be out of date.</p>
        <div className="stack" style={{ justifyContent: "center" }}>
          <Link href="/search" className="button primary">
            Browse images
          </Link>
          <Link href="/" className="button secondary">
            Back home
          </Link>
        </div>
      </div>
    </div>
  );
}
