import defaultMdxComponents from "fumadocs-ui/mdx";
import type { MDXComponents } from "mdx/types";
import { DownloadableFile } from "./downloadable-file";

export function getMDXComponents(components?: MDXComponents) {
  return {
    ...defaultMdxComponents,
    DownloadableFile,
    ...components,
  } satisfies MDXComponents;
}

export const useMDXComponents = getMDXComponents;

declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>;
}
