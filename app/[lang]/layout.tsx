import { i18nProvider } from "fumadocs-ui/i18n";
import { RootProvider } from "fumadocs-ui/provider/next";
import type { Metadata } from "next";
import "@/app/global.css";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { DocsLayout } from "fumadocs-ui/layouts/docs";
import { Inter } from "next/font/google";
import { baseOptions, translations } from "@/lib/layout.shared";
import { source } from "@/lib/source";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | Elinsa",
    default: "Docs | Elinsa",
  },
  icons: {
    icon: [
      {
        url: "/favicon/e.svg",
        type: "image/svg+xml",
      },
      {
        url: "/favicon/e.png",
        type: "image/png",
        sizes: "32x32",
      },
      {
        url: "/favicon/e.ico",
      },
    ],
    shortcut: "/favicon/e.ico",
    apple: "/favicon/e.png",
  },
};

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
          <DocsLayout tree={source.getPageTree(lang)} {...baseOptions(lang)}>
            {children}
          </DocsLayout>
        </RootProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
