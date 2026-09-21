"use client";

/**
 * Persistent app-style tab bar, shown on every screen size so the installed PWA
 * and the web view navigate the same way. Saved sits raised in the middle.
 */

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSavedSlugs } from "@/lib/saved";

const tabs = [
  { href: "/", label: "Home", icon: "M4 11.5 12 4l8 7.5V20h-5.5v-5h-5v5H4z" },
  { href: "/search", label: "Browse", icon: "M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14Zm9 16-3.6-3.6" },
  {
    href: "/saved",
    label: "Saved",
    icon: "M12 20.5s-7.5-4.6-7.5-10.2A4.3 4.3 0 0 1 12 7.6a4.3 4.3 0 0 1 7.5 2.7c0 5.6-7.5 10.2-7.5 10.2Z"
  },
  { href: "/pricing", label: "Pricing", icon: "M4 12.5V5h7.5L20 13.500 13.500 20zM8.500 8.500h.01" },
  { href: "/sign-in", label: "Account", icon: "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm-7.500 8c.8-3.500 3.800-5.500 7.500-5.500s6.700 2 7.500 5.500" }
] as const;

const accountPaths = ["/sign-in", "/account", "/contributor", "/admin"];

export function TabBar() {
  const pathname = usePathname();
  const savedCount = useSavedSlugs().length;

  function isActive(href: string) {
    if (href === "/") return pathname === "/";
    if (href === "/sign-in") return accountPaths.some((path) => pathname.startsWith(path));
    if (href === "/search") return pathname.startsWith("/search") || pathname.startsWith("/assets");
    return pathname.startsWith(href);
  }

  return (
    <nav className="tabbar" aria-label="App">
      <div className="tabbar-inner">
        {tabs.map((tab) => {
          const active = isActive(tab.href);
          const center = tab.href === "/saved";

          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={center ? "tab tab-center" : "tab"}
              aria-current={active ? "page" : undefined}
              aria-label={center ? `Saved images, ${savedCount} saved` : undefined}
            >
              <span className={center ? "tab-icon tab-circle" : "tab-icon"}>
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d={tab.icon} />
                </svg>
                {center && savedCount > 0 ? <b aria-hidden="true">{savedCount}</b> : null}
              </span>
              <span>{tab.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
