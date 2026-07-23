import { i18nProvider } from "fumadocs-ui/i18n";
import { RootProvider } from "fumadocs-ui/provider/next";
import type { Metadata } from "next";
import "@/app/global.css";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { DocsLayout } from "fumadocs-ui/layouts/docs";
import { Inter } from "next/font/google";
import iconIco from "@/assets/favicon/e.ico";
import iconPng from "@/assets/favicon/e.png";
import iconSvg from "@/assets/favicon/e.svg";
import { baseOptions, translations } from "@/lib/layout.shared";
import { docsOrigin } from "@/lib/shared";
import { source } from "@/lib/source";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(docsOrigin),
  title: {
    template: "%s | Elinsa",
    default: "Docs | Elinsa",
  },
  icons: {
    icon: [
      {
        url: iconSvg.src,
        type: "image/svg+xml",
      },
      {
        url: iconPng.src,
        type: "image/png",
        sizes: "32x32",
      },
      {
        url: iconIco.src,
      },
    ],
    shortcut: iconIco.src,
    apple: iconPng.src,
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
