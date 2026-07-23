import Image from "next/image";
import novoOutlook from "@/content/pt/tecnologia/como-definir-a-assinatura-de-email/novo-outlook.svg";
import outlookClassico from "@/content/pt/tecnologia/como-definir-a-assinatura-de-email/outlook-classico.svg";

export function OutlookCompatibilityTable() {
  return (
    <div className="not-prose my-4 w-fit max-w-full overflow-x-auto rounded-lg border border-fd-border">
      <table
        aria-label="Configuração da assinatura nas versões do Outlook"
        className="w-92 table-fixed border-collapse text-left text-sm"
      >
        <colgroup>
          <col className="w-48" />
          <col className="w-32" />
        </colgroup>
        <thead className="bg-fd-muted/50 text-fd-muted-foreground">
          <tr>
            <th className="px-4 py-2 font-medium" scope="col">
              Versão
            </th>
            <th
              className="border-l border-fd-border px-4 py-2 font-medium"
              scope="col"
            >
              Compatibilidade
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-t border-fd-border">
            <td className="px-4 py-2">
              <div className="flex items-center gap-2.5 font-medium">
                <Image
                  src={novoOutlook}
                  alt=""
                  width={28}
                  height={28}
                  className="size-7 shrink-0 object-contain"
                  unoptimized
                />
                Outlook
              </div>
            </td>
            <td className="border-l border-fd-border px-4 py-2 font-medium">
              Funciona
            </td>
          </tr>
          <tr className="border-t border-fd-border">
            <td className="px-4 py-2">
              <div className="flex items-center gap-2.5 font-medium">
                <Image
                  src={outlookClassico}
                  alt=""
                  width={28}
                  height={28}
                  className="size-7 shrink-0 object-contain"
                  unoptimized
                />
                Outlook (classic)
              </div>
            </td>
            <td className="border-l border-fd-border px-4 py-2 font-medium">
              Não funciona
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
