import { i18nProvider } from "fumadocs-ui/i18n";
import { RootProvider } from "fumadocs-ui/provider/next";
import "@/app/global.css";
import { DocsLayout } from "fumadocs-ui/layouts/docs";
import { Inter } from "next/font/google";
import { baseOptions, translations } from "@/lib/layout.shared";
import { source } from "@/lib/source";

const inter = Inter({
  subsets: ["latin"],
});

export default async function Layout({
  params,
  children,
}: {
  params: Promise<{ lang: string }>;
  children: React.ReactNode;
}) {
  const lang = (await params).lang;

  return (
    <html lang={lang} className={inter.className} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <RootProvider i18n={i18nProvider(translations, lang)}>
          <DocsLayout tree={source.getPageTree()} {...baseOptions(lang)}>
            {children}
          </DocsLayout>
        </RootProvider>
      </body>
    </html>
  );
}
