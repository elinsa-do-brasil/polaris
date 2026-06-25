import { uiTranslations } from "fumadocs-ui/i18n";
import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import { DocsHeader } from "@/components/docs-header";
import { i18n } from "@/lib/i18n";
import { gitConfig } from "./shared";

export const translations = i18n
  .translations()
  .extend(uiTranslations())
  .add({
    pt: {
      displayName: "Português",
    },
    es: {
      displayName: "Español",
    },
  });

export function baseOptions(locale: string): BaseLayoutProps {
  return {
    nav: {
      // JSX supported
      title: <DocsHeader />,
    },
    githubUrl: `https://github.com/${gitConfig.user}/${gitConfig.repo}`,
  };
}
