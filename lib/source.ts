import { docs } from "collections/server";
import { loader } from "fumadocs-core/source";
import { lucideIconsPlugin } from "fumadocs-core/source/lucide-icons";
import { i18n } from "@/lib/i18n";
import {
  absolutizeDocsMarkdownLinks,
  createDocsUrl,
  docsContentRoute,
  docsImageRoute,
  docsRoute,
} from "./shared";

// See https://fumadocs.dev/docs/headless/source-api for more info
export const source = loader({
  i18n,
  baseUrl: docsRoute,
  source: docs.toFumadocsSource(),
  plugins: [lucideIconsPlugin()],
});

export function parseLocalizedPageSlug(segments: string[] = []) {
  const [locale, ...slugs] = segments;
  const languages: readonly string[] = i18n.languages;

  if (locale && languages.includes(locale)) {
    return {
      locale,
      slugs,
    };
  }

  return {
    locale: i18n.defaultLanguage,
    slugs: segments,
  };
}

export function getPageImage(page: (typeof source)["$inferPage"]) {
  const locale = page.locale ?? i18n.defaultLanguage;
  const segments = [locale, ...page.slugs, "image.png"];
  const path = `${docsImageRoute}/${segments.join("/")}`;

  return {
    segments,
    path,
    url: createDocsUrl(path),
  };
}

export function getPageMarkdownUrl(page: (typeof source)["$inferPage"]) {
  const locale = page.locale ?? i18n.defaultLanguage;
  const segments = [locale, ...page.slugs, "content.md"];
  const path = `${docsContentRoute}/${segments.join("/")}`;

  return {
    segments,
    path,
    url: createDocsUrl(path),
  };
}

export async function getLLMText(page: (typeof source)["$inferPage"]) {
  const processed = await page.data.getText("processed");
  const content = absolutizeDocsMarkdownLinks(processed, page.url);

  return `# ${page.data.title} (${createDocsUrl(page.url)})

${content}`;
}
