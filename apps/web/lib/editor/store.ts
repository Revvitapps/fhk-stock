import { promises as fs } from "node:fs";
import path from "node:path";
import { list, put } from "@vercel/blob";
import type { Data } from "@puckeditor/core";

/**
 * Published pages live in Vercel Blob when a store is connected (BLOB_READ_WRITE_TOKEN).
 * Every publish writes a new timestamped file, so nothing is overwritten, the CDN never
 * serves a stale copy, and older versions stay around for a restore.
 * Without a store, local dev writes to ./.content and production stays read-only.
 */

export type Version = { url: string; publishedAt: string };

const localDir = path.join(process.cwd(), ".content");

export function storageMode(): "blob" | "local" | "none" {
  if (process.env.BLOB_READ_WRITE_TOKEN) return "blob";
  return process.env.VERCEL ? "none" : "local";
}

const prefix = (page: string) => `pages/${page}/`;

export async function listVersions(page: string): Promise<Version[]> {
  const mode = storageMode();
  if (mode === "blob") {
    const { blobs } = await list({ prefix: prefix(page), limit: 1000 });
    return blobs
      .map((blob) => ({ url: blob.url, publishedAt: new Date(blob.uploadedAt).toISOString() }))
      .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
  }
  if (mode === "local") {
    const dir = path.join(localDir, page);
    const files = await fs.readdir(dir).catch(() => [] as string[]);
    return files
      .filter((file) => file.endsWith(".json"))
      .sort()
      .reverse()
      .map((file) => ({ url: path.join(dir, file), publishedAt: new Date(Number(file.slice(0, -5))).toISOString() }));
  }
  return [];
}

export async function readVersion(version: Version): Promise<Data> {
  if (storageMode() === "blob") {
    const response = await fetch(version.url, { cache: "no-store" });
    if (!response.ok) throw new Error(`Could not read ${version.url}`);
    return (await response.json()) as Data;
  }
  return JSON.parse(await fs.readFile(version.url, "utf8")) as Data;
}

export async function loadPage(page: string, fallback: Data): Promise<Data> {
  try {
    const [latest] = await listVersions(page);
    return latest ? await readVersion(latest) : fallback;
  } catch (error) {
    console.error("Editor content unavailable, showing the built-in page", error);
    return fallback;
  }
}

export async function savePage(page: string, data: Data): Promise<void> {
  const name = `${Date.now()}.json`;
  const body = JSON.stringify(data);
  const mode = storageMode();
  if (mode === "blob") {
    await put(prefix(page) + name, body, { access: "public", contentType: "application/json", addRandomSuffix: false });
    return;
  }
  if (mode === "local") {
    await fs.mkdir(path.join(localDir, page), { recursive: true });
    await fs.writeFile(path.join(localDir, page, name), body);
    return;
  }
  throw new Error("No storage connected");
}

export async function saveUpload(file: File): Promise<string> {
  const safe = file.name.toLowerCase().replace(/[^a-z0-9.]+/g, "-");
  if (storageMode() === "blob") {
    const blob = await put(`uploads/${safe}`, file, { access: "public", addRandomSuffix: true });
    return blob.url;
  }
  if (storageMode() === "local") {
    // Local dev only: drop the file in public/ so next/image can serve it.
    const dir = path.join(process.cwd(), "public", "uploads");
    await fs.mkdir(dir, { recursive: true });
    const name = `${Date.now()}-${safe}`;
    await fs.writeFile(path.join(dir, name), Buffer.from(await file.arrayBuffer()));
    return `/uploads/${name}`;
  }
  throw new Error("No storage connected");
}
