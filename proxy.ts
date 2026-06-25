import { createI18nMiddleware } from "fumadocs-core/i18n/middleware";
import { isMarkdownPreferred, rewritePath } from "fumadocs-core/negotiation";
import {
  type NextFetchEvent,
  type NextRequest,
  NextResponse,
} from "next/server";
import { i18n } from "@/lib/i18n";
import { docsContentRoute, docsRoute } from "@/lib/shared";

const i18nMiddleware = createI18nMiddleware(i18n);

const { rewrite: rewriteDocs } = rewritePath(
  `${docsRoute}{/*path}`,
  `${docsContentRoute}{/*path}/content.md`,
);
const { rewrite: rewriteSuffix } = rewritePath(
  `${docsRoute}{/*path}.md`,
  `${docsContentRoute}{/*path}/content.md`,
);

function removeLocalePrefix(pathname: string) {
  const [, locale, ...segments] = pathname.split("/");
  const languages: readonly string[] = i18n.languages;

  if (locale && languages.includes(locale)) {
    return `/${segments.join("/")}`;
  }

  return pathname;
}

export default function proxy(request: NextRequest, event: NextFetchEvent) {
  const pathname = removeLocalePrefix(request.nextUrl.pathname);
  const result = rewriteSuffix(pathname);
  if (result) {
    return NextResponse.rewrite(new URL(result, request.nextUrl));
  }

  if (isMarkdownPreferred(request)) {
    const result = rewriteDocs(pathname);

    if (result) {
      return NextResponse.rewrite(new URL(result, request.nextUrl));
    }
  }

  return i18nMiddleware(request, event);
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|e.svg).*)"],
};
