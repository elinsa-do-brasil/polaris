import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import { DocsHeader } from "@/components/docs-header";
import { appName, gitConfig } from "./shared";

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      // JSX supported
      title: <DocsHeader />,
    },
    githubUrl: `https://github.com/${gitConfig.user}/${gitConfig.repo}`,
  };
}
