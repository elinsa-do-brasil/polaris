import { HomeLayout } from "fumadocs-ui/layouts/home";
import { i18nProvider } from "fumadocs-ui/i18n";
import { RootProvider } from "fumadocs-ui/provider/next";
import { i18n } from "@/lib/i18n";
import { baseOptions, translations } from "@/lib/layout.shared";

export default function Layout({ children }: LayoutProps<"/home">) {
  return (
    <RootProvider i18n={i18nProvider(translations, i18n.defaultLanguage)}>
      <HomeLayout {...baseOptions(i18n.defaultLanguage)}>{children}</HomeLayout>
    </RootProvider>
  );
}
