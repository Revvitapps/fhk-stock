"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { editorCookie, editorPasscode, passcodeToken } from "@/lib/editor/auth";

export async function unlockEditor(_: string | null, form: FormData) {
  const passcode = String(form.get("passcode") ?? "");
  if (passcode !== editorPasscode()) return "That passcode didn't match.";
  const jar = await cookies();
  jar.set(editorCookie, passcodeToken(passcode), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 30
  });
  redirect("/edit");
}

export async function lockEditor() {
  const jar = await cookies();
  jar.delete(editorCookie);
  redirect("/");
}
