import { Render } from "@puckeditor/core/rsc";
import { LensIntro } from "@/components/LensIntro";
import { editorConfig, type EditorData } from "@/lib/editor/config";
import { homeDefault } from "@/lib/editor/home-default";
import { loadPage } from "@/lib/editor/store";

// The homepage is built from editor data (see /edit). Publishing revalidates it at once;
// this is only the fallback refresh.
export const revalidate = 300;

export default async function HomePage() {
  const data = await loadPage("home", homeDefault);

  return (
    <>
      <LensIntro />
      <Render config={editorConfig} data={data as EditorData} />
    </>
  );
}
