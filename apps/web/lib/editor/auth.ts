import { createHash } from "node:crypto";
import { cookies } from "next/headers";

/**
 * Pilot-grade gate for the editor: one shared passcode per site. A real self-edit tier
 * would use per-client logins; this is enough to keep the public out of /edit.
 */

export const editorCookie = "fhk-editor";

// Falls back to a demo passcode so the prototype works before any env vars are set.
export function editorPasscode() {
  return process.env.EDITOR_PASSCODE || "fhk-demo";
}

export function passcodeToken(passcode: string) {
  return createHash("sha256").update(`fhk-editor:${passcode}`).digest("hex");
}

export async function isEditor() {
  const jar = await cookies();
  return jar.get(editorCookie)?.value === passcodeToken(editorPasscode());
}
