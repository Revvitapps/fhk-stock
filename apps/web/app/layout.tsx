import type { Metadata, Viewport } from "next";
import { Fraunces, Instrument_Sans } from "next/font/google";
import { InstallCard } from "@/components/InstallCard";
import { Pwa } from "@/components/Pwa";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { TabBar } from "@/components/TabBar";
import "./globals.css";

const display = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  variable: "--font-display",
  display: "swap"
});

const sans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap"
});

const description =
  "Stock photography for churches and ministries: worship, community, and everyday-ministry imagery with simple licensing.";

const introGate =
  "try{if(sessionStorage.getItem('tm_intro')||matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.dataset.intro='skip'}catch(e){}";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#1b120c"
};

export const metadata: Metadata = {
  metadataBase: new URL("https://tmstock.vercel.app"),
  applicationName: "TMStock",
  appleWebApp: {
    capable: true,
    title: "TMStock",
    // the header is espresso, so the iOS clock and battery read best in white on top of it
    statusBarStyle: "black-translucent"
  },
  title: {
    default: "TMStock | Stock photography that looks like your Sunday",
    template: "%s | TMStock"
  },
  description,
  openGraph: {
    title: "TMStock",
    description,
    type: "website",
    images: ["/catalog/worship-stage-01.jpg"]
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`} suppressHydrationWarning>
      <head>
        {/* Runs before first paint so returning visitors never see a frame of the intro. */}
        <script dangerouslySetInnerHTML={{ __html: introGate }} />
        <noscript>
          <style>{".lens-intro{display:none}"}</style>
        </noscript>
      </head>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        <TabBar />
        <InstallCard />
        <Pwa />
      </body>
    </html>
  );
}
