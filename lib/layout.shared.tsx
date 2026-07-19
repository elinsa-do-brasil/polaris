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
      "Choose a language(language switcher)": "Escolha um idioma",
      "Copy Markdown(page actions)": "Copiar como Markdown",
      "Open(page actions)": "Abrir",
      "View as Markdown(page actions)": "Ver como código",
      "Open in ChatGPT(page actions)": "Perguntar ao ChatGPT",
      "Open in Claude(page actions)": "Perguntar ao Claude",
      "Search(search dialog)": "Pesquisar",
      "Search(search trigger)": "Pesquisar",
      "On this page(table of contents)": "Nesta página",
      "No results found(search dialog)": "Nenhum resultado encontrado",
      "Back to Home(404 page)": "Voltar para a página inicial",
      "Last updated on(page footer)": "Atualizado pela última vez em",
    },
    es: {
      displayName: "Español",
      "Choose a language(language switcher)": "Elegir un idioma",
      "Copy Markdown(page actions)": "Copiar como Markdown",
      "Open(page actions)": "Abrir",
      "View as Markdown(page actions)": "Ver como código",
      "Open in ChatGPT(page actions)": "Preguntar a ChatGPT",
      "Open in Claude(page actions)": "Preguntar a Claude",
      "Search(search dialog)": "Buscar",
      "Search(search trigger)": "Buscar",
      "On this page(table of contents)": "En esta página",
      "No results found(search dialog)": "No se encontraron resultados",
      "Back to Home(404 page)": "Volver a la página de inicio",
      "Last updated on(page footer)": "Última actualización el",
    },
  });

export function baseOptions(_locale: string): BaseLayoutProps {
  return {
    nav: {
      // JSX supported
      title: <DocsHeader />,
    },
    githubUrl: `https://github.com/${gitConfig.user}/${gitConfig.repo}`,
  };
}
