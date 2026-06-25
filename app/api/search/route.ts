import { createFromSource } from "fumadocs-core/search/server";
import { source } from "@/lib/source";

export const { GET } = createFromSource(source, {
  // https://docs.orama.com/docs/orama-js/supported-languages
  localeMap: {
    // [locale]: Orama options
    pt: { language: "portuguese" },
    es: { language: "spanish" },
  },
});
