import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    // stable identity so re-installs update the same app instead of adding a second icon
    id: "/",
    name: "FHK Stock: For His Kingdom",
    short_name: "FHK Stock",
    description: "Stock photography that looks like your Sunday.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    // if a browser can't do standalone, fall back to chrome-less rather than a tab
    display_override: ["standalone", "minimal-ui"],
    orientation: "portrait",
    background_color: "#1b120c",
    theme_color: "#1b120c",
    categories: ["photo", "lifestyle"],
    // reopening from the home screen returns to the app you left, not a fresh window
    launch_handler: { client_mode: ["navigate-existing", "auto"] },
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" }
    ],
    shortcuts: [
      { name: "Browse images", url: "/search" },
      { name: "Saved images", url: "/saved" },
      { name: "Pricing", url: "/pricing" }
    ]
  };
}
