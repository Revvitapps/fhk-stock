"use client";

import { useActionState } from "react";
import { unlockEditor } from "@/app/edit/actions";

export function Unlock() {
  const [error, action, pending] = useActionState(unlockEditor, null);
  return (
    <div className="shell signin">
      <form className="signin-card" action={action}>
        <p className="kicker">Edit your site</p>
        <h1>Welcome back.</h1>
        <p className="subtle">Enter your editor passcode to change text, photos and sections on your homepage.</p>
        <label className="sr-only" htmlFor="passcode">
          Passcode
        </label>
        <input
          id="passcode"
          name="passcode"
          type="password"
          autoComplete="current-password"
          placeholder="Passcode"
          className="fx-passcode"
          required
        />
        {error ? <p className="fx-error">{error}</p> : null}
        <button className="button primary block" type="submit" disabled={pending}>
          {pending ? "Checking…" : "Open the editor"}
        </button>
      </form>
    </div>
  );
}
