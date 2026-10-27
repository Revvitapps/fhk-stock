import { NextResponse } from "next/server";
import { isEditor } from "@/lib/editor/auth";
import { saveUpload, storageMode } from "@/lib/editor/store";

// Vercel functions accept request bodies up to 4.5 MB.
const maxBytes = 4 * 1024 * 1024;

export async function POST(request: Request) {
  if (!(await isEditor())) {
    return NextResponse.json({ error: "Your editing session has ended. Sign in again." }, { status: 401 });
  }
  if (storageMode() === "none") {
    return NextResponse.json({ error: "Uploads need a Blob store connected in Vercel." }, { status: 503 });
  }
  const file = (await request.formData()).get("file");
  if (!(file instanceof File) || !file.type.startsWith("image/")) {
    return NextResponse.json({ error: "Choose a JPG, PNG or WebP image." }, { status: 400 });
  }
  if (file.size > maxBytes) {
    return NextResponse.json({ error: "That photo is over 4 MB. Try a smaller copy." }, { status: 413 });
  }
  return NextResponse.json({ url: await saveUpload(file) });
}
