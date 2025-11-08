import fs from "fs/promises";
import path from "path";
import { remark } from "remark";
import html from "remark-html";
import gfm from "remark-gfm";
import slug from "remark-slug";

interface MarkdownContent {
  title: string;
  html: string;
}

export async function renderMarkdown(
  relativePath: string,
): Promise<MarkdownContent> {
  const absolutePath = path.join(process.cwd(), relativePath);
  const fileContents = await fs.readFile(absolutePath, "utf-8");

  const processedContent = await remark()
    .use(gfm)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    .use(slug as any)
    .use(html)
    .process(fileContents);

  const titleMatch = fileContents.match(/^#\s+(.+)$/m);

  return {
    title: titleMatch ? titleMatch[1].trim() : "",
    html: processedContent.toString(),
  };
}
