import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import type { Data } from "@puckeditor/core";
import { isEditor } from "@/lib/editor/auth";
import { savePage, storageMode } from "@/lib/editor/store";

export async function POST(request: Request) {
  if (!(await isEditor())) {
    return NextResponse.json({ error: "Your editing session has ended. Sign in again." }, { status: 401 });
  }
  if (storageMode() === "none") {
    return NextResponse.json(
      { error: "Publishing isn't switched on for this site yet. Connect a Blob store in Vercel." },
      { status: 503 }
    );
  }
  const data = (await request.json()) as Data;
  if (!data || !Array.isArray(data.content)) {
    return NextResponse.json({ error: "That page data looks broken." }, { status: 400 });
  }
  await savePage("home", data);
  revalidatePath("/");
  return NextResponse.json({ ok: true, publishedAt: new Date().toISOString() });
}
