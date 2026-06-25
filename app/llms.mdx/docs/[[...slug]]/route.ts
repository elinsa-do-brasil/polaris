import { notFound } from "next/navigation";
import { markdownResponse } from "@/lib/markdown-response";
import {
  getLLMText,
  getPageMarkdownUrl,
  parseLocalizedPageSlug,
  source,
} from "@/lib/source";

export const revalidate = false;

export async function GET(
  _req: Request,
  { params }: RouteContext<"/llms.mdx/docs/[[...slug]]">,
) {
  const { slug } = await params;
  const pageSlug = parseLocalizedPageSlug(slug?.slice(0, -1));
  const page = source.getPage(pageSlug.slugs, pageSlug.locale);
  if (!page) notFound();

  return markdownResponse(await getLLMText(page));
}

export function generateStaticParams() {
  return source.getPages().map((page) => ({
    slug: getPageMarkdownUrl(page).segments,
  }));
}
