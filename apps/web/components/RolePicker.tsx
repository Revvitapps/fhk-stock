"use client";

import { useRouter } from "next/navigation";

const roles = [
  {
    id: "buyer",
    name: "Buyer",
    detail: "Downloads, receipts, and license history",
    href: "/account"
  },
  {
    id: "contributor",
    name: "Contributor",
    detail: "Uploads, review status, and earnings",
    href: "/contributor/dashboard"
  },
  {
    id: "admin",
    name: "Reviewer",
    detail: "The moderation queue for new submissions",
    href: "/admin/review"
  }
] as const;

export function RolePicker() {
  const router = useRouter();

  return (
    <div className="role-list">
      {roles.map((role) => (
        <button
          key={role.id}
          type="button"
          className="role-button"
          onClick={() => {
            document.cookie = `tmstock-role=${role.id}; path=/; max-age=3600; samesite=lax`;
            router.push(role.href);
          }}
        >
          <div>
            <strong>Continue as {role.name}</strong>
            <span>{role.detail}</span>
          </div>
          <b aria-hidden="true">→</b>
        </button>
      ))}
    </div>
  );
}
