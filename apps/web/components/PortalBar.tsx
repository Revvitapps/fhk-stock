"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

type PortalBarProps = {
  current: "buyer" | "contributor" | "admin";
};

const labels = {
  buyer: "Buyer",
  contributor: "Contributor",
  admin: "Reviewer"
} as const;

export function PortalBar({ current }: PortalBarProps) {
  const router = useRouter();

  return (
    <div className="portal-bar">
      <div className="shell portal-bar-inner">
        <div>
          <span className="pill">Demo mode</span>
          <span className="subtle">Viewing as {labels[current]}. All data on this page is sample data.</span>
        </div>
        <div>
          <Link href="/sign-in" className="text-link">
            Switch role
          </Link>
          <button
            type="button"
            className="link-button"
            onClick={() => {
              document.cookie = "tmstock-role=; path=/; max-age=0";
              router.push("/");
            }}
          >
            Exit demo
          </button>
        </div>
      </div>
    </div>
  );
}
