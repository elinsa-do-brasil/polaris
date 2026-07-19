import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
  MarkdownCopyButton,
} from "fumadocs-ui/layouts/docs/page";
import { createRelativeLink } from "fumadocs-ui/mdx";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ViewOptionsPopover } from "@/components/ai/page-actions";
import { getMDXComponents } from "@/components/mdx";
import { getPageImage, getPageMarkdownUrl, source } from "@/lib/source";
import { Clock9 } from "lucide-react";

export default async function Page(props: PageProps<"/[lang]/[[...slug]]">) {
  const params = await props.params;
  const page = source.getPage(params.slug, params.lang);
  if (!page) notFound();

  const MDX = page.data.body;
  const markdownUrl = getPageMarkdownUrl(page).path;

  return (
    <DocsPage
      toc={page.data.toc}
      full={page.data.full}
      tableOfContent={{ style: "clerk" }}
      tableOfContentPopover={{ style: "clerk" }}
    >
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription className="mb-0">
        {page.data.description}
      </DocsDescription>
      <div className="flex flex-row gap-2 items-center border-b pb-6">
        <MarkdownCopyButton markdownUrl={markdownUrl} />
        <ViewOptionsPopover markdownUrl={markdownUrl} />
      </div>
      <DocsBody>
        <MDX
          components={getMDXComponents({
            // this allows you to link to other pages with relative file paths
            a: createRelativeLink(source, page),
          })}
        />
      </DocsBody>
      {page.data.lastModified ? (
        <p className="text-sm text-fd-muted-foreground my-6 py-6 border-t border-t-fd-border border-b border-b-fd-border flex flex-row gap-2 items-center">
          <Clock9 size={14} />
          {formatLastModified(page.data.lastModified, params.lang)}
        </p>
      ) : null}
    </DocsPage>
  );
}

export async function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata(
  props: PageProps<"/[lang]/[[...slug]]">,
): Promise<Metadata> {
  const params = await props.params;
  const page = source.getPage(params.slug, params.lang);
  if (!page) notFound();

  return {
    title: page.data.title,
    description: page.data.description,
    openGraph: {
      images: getPageImage(page).url,
    },
  };
}

function formatLastModified(date: Date, language: string | undefined) {
  const locale = language === "es" ? "es-ES" : "pt-BR";
  const prefix = language === "es" ? "Actualizado el" : "Atualizado em";
  const formattedDate = new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);

  return `${prefix} ${formattedDate}`;
}
