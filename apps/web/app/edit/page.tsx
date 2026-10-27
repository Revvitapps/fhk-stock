import type { Metadata } from "next";
import { PageEditor } from "@/components/editor/PageEditor";
import { Unlock } from "@/components/editor/Unlock";
import { isEditor } from "@/lib/editor/auth";
import { homeDefault } from "@/lib/editor/home-default";
import { loadPage, storageMode } from "@/lib/editor/store";
import "./editor.css";

export const metadata: Metadata = {
  title: "Edit homepage",
  robots: { index: false, follow: false }
};

export const dynamic = "force-dynamic";

export default async function EditPage() {
  if (!(await isEditor())) return <Unlock />;
  const data = await loadPage("home", homeDefault);
  return <PageEditor data={data} storage={storageMode()} />;
}
