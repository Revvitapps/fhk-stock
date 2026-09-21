import type { Metadata } from "next";
import { RolePicker } from "@/components/RolePicker";

export const metadata: Metadata = {
  title: "Sign in",
  robots: { index: false, follow: false }
};

export default function SignInPage() {
  return (
    <div className="shell signin">
      <div className="signin-card">
        <p className="kicker">Preview access</p>
        <h1>Take a look around.</h1>
        <p className="subtle">
          TMStock accounts aren&apos;t open yet. Pick a role to explore that side of the marketplace
          with sample data.
        </p>
        <RolePicker />
      </div>
    </div>
  );
}
