import { readFile } from "node:fs/promises";
import { join } from "node:path";

export async function getFaviconDataUri(): Promise<string> {
  const favicon = await readFile(join(process.cwd(), "public/favicon.png"));
  return `data:image/png;base64,${favicon.toString("base64")}`;
}
