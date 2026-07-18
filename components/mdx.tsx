import { ImageZoom } from "fumadocs-ui/components/image-zoom";
import defaultMdxComponents from "fumadocs-ui/mdx";
import type { MDXComponents } from "mdx/types";
import { cn } from "@/lib/cn";
import { DownloadableFile } from "./downloadable-file";

export function getMDXComponents(components?: MDXComponents) {
  return {
    ...defaultMdxComponents,
    DownloadableFile,
    img: (props) => (
      <ImageZoom
        {...(props as any)}
        className={cn("rounded-lg", props.className)}
        zoomInProps={{ className: "rounded-lg" }}
      />
    ),
    ...components,
  } satisfies MDXComponents;
}

export const useMDXComponents = getMDXComponents;

declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>;
}
