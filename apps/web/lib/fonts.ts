import { Fraunces, Instrument_Sans } from "next/font/google";

// Shared so the page editor's preview frame can carry the same font variables as the site.
export const display = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  variable: "--font-display",
  display: "swap"
});

export const sans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap"
});
