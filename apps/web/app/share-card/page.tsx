import type { Metadata } from "next";
import Image from "next/image";
import { LogoMark } from "@/components/Logo";

/**
 * The 1200x630 link-preview card, laid out with the site's real fonts and photos.
 * scripts/make-share-image.sh screenshots this page into app/opengraph-image.png,
 * so the card is edited here like any other page and then re-captured.
 */
export const metadata: Metadata = {
  title: "Share card",
  robots: { index: false, follow: false }
};

const css = `
.share-card{position:fixed;inset:0 auto auto 0;z-index:1000;width:1200px;height:630px;overflow:hidden;color:#f6ece0;
  background:radial-gradient(ellipse 55% 80% at 78% 40%,rgba(185,87,43,.5),transparent 62%),
  radial-gradient(ellipse 40% 60% at 0% 100%,rgba(224,168,113,.16),transparent 60%),#1b120c;
  font-family:var(--font-sans),sans-serif}
.share-copy{position:absolute;left:72px;top:64px;width:560px}
.share-brand{display:flex;align-items:center;gap:16px;font-family:var(--font-display),serif;font-size:40px;font-weight:600;letter-spacing:-.02em}
.share-brand em{font-weight:400;color:#e0a871}
.share-kicker{margin-top:64px;color:#e0a871;font-size:17px;font-weight:600;letter-spacing:.2em;text-transform:uppercase}
.share-title{margin-top:18px;font-family:var(--font-display),serif;font-size:78px;font-weight:500;line-height:.98;letter-spacing:-.035em}
.share-title em{font-weight:400;color:#e0a871}
.share-foot{position:absolute;left:72px;bottom:60px;display:flex;align-items:center;gap:18px;font-size:21px;color:rgba(246,236,224,.72)}
.share-foot b{padding:9px 20px;border-radius:999px;background:#b9572b;color:#fff6ee;font-weight:600}
.share-photos{position:absolute;right:-30px;top:0;width:560px;height:630px}
.share-photo{position:absolute;overflow:hidden;border-radius:22px;box-shadow:0 30px 70px rgba(0,0,0,.55);border:1px solid rgba(246,236,224,.16)}
.share-photo img{object-fit:cover}
.share-photo.a{left:0;top:54px;width:290px;height:400px;transform:rotate(-3deg)}
.share-photo.b{left:262px;top:36px;width:270px;height:200px;transform:rotate(2.5deg)}
.share-photo.c{left:276px;top:262px;width:262px;height:196px;transform:rotate(-1.5deg)}
.share-photo.d{left:150px;top:438px;width:360px;height:220px;transform:rotate(2deg)}
.share-ring{position:absolute;right:-150px;top:-150px;width:520px;height:520px;border-radius:50%;border:2px solid rgba(224,168,113,.28)}
.share-ring::after{content:"";position:absolute;inset:34px;border-radius:50%;border:1px solid rgba(224,168,113,.16)}
.share-edge{position:absolute;left:0;right:0;bottom:0;height:5px;background:linear-gradient(90deg,rgba(185,87,43,0),#b9572b 28%,#fff4e6 50%,#e0a871 72%,rgba(224,168,113,0))}
`;

export default function ShareCardPage() {
  return (
    <div className="share-card">
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <div className="share-ring" />
      <div className="share-photos">
        <div className="share-photo a">
          <Image src="/catalog/worship-stage-01.jpg" alt="" fill sizes="600px" priority />
        </div>
        <div className="share-photo b">
          <Image src="/catalog/voices-in-the-room.jpg" alt="" fill sizes="600px" priority />
        </div>
        <div className="share-photo c">
          <Image src="/catalog/lobby-after-service.jpg" alt="" fill sizes="600px" priority />
        </div>
        <div className="share-photo d">
          <Image src="/catalog/potluck-line.jpg" alt="" fill sizes="800px" priority />
        </div>
      </div>
      <div className="share-copy">
        <div className="share-brand">
          <LogoMark size={54} />
          <span>
            FHK <em>Stock</em>
          </span>
        </div>
        <p className="share-kicker">For His Kingdom</p>
        <h1 className="share-title">
          Looks like <em>your</em> Sunday.
        </h1>
      </div>
      <div className="share-foot">
        <b>Browse the library</b>
        <span>Photos for churches &amp; ministries</span>
      </div>
      <div className="share-edge" />
    </div>
  );
}
