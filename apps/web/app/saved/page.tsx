import type { Metadata } from "next";
import { SavedGallery } from "@/components/SavedGallery";

export const metadata: Metadata = {
  title: "Saved images",
  robots: { index: false, follow: false }
};

export default function SavedPage() {
  return (
    <>
      <section className="page-hero">
        <div className="shell">
          <p className="kicker on-dark">Saved</p>
          <h1 className="display">Your shortlist.</h1>
          <p className="lede">
            Images you&apos;ve hearted, kept on this device so they&apos;re here the next time you open
            TMStock.
          </p>
        </div>
      </section>
      <section className="page-body shell">
        <SavedGallery />
      </section>
    </>
  );
}
