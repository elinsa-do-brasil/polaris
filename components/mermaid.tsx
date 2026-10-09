"use client";

import { useEffect, useId, useRef, useState } from "react";
import { cn } from "@/lib/cn";

interface MermaidProps {
  chart: string;
  /** Descrição curta do diagrama, lida por leitores de tela. */
  title: string;
  className?: string;
}

function useIsDark() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    const update = () => setIsDark(root.classList.contains("dark"));

    update();
    const observer = new MutationObserver(update);
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });

    return () => observer.disconnect();
  }, []);

  return isDark;
}

export function Mermaid({ chart, title, className }: MermaidProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);
  const isDark = useIsDark();
  const id = `mermaid-${useId().replace(/[^a-zA-Z0-9]/g, "")}`;

  useEffect(() => {
    let cancelled = false;

    async function render() {
      try {
        const { default: mermaid } = await import("mermaid");
        mermaid.initialize({
          startOnLoad: false,
          securityLevel: "strict",
          theme: isDark ? "dark" : "default",
          fontFamily: "inherit",
        });
        const { svg } = await mermaid.render(id, chart);
        if (!cancelled && containerRef.current) {
          containerRef.current.innerHTML = svg;
          setFailed(false);
        }
      } catch {
        if (!cancelled) setFailed(true);
      }
    }

    render();

    return () => {
      cancelled = true;
    };
  }, [chart, id, isDark]);

  if (failed) {
    return (
      <pre className="my-6 overflow-x-auto rounded-lg border p-4 text-sm">
        {chart}
      </pre>
    );
  }

  return (
    <div
      ref={containerRef}
      role="img"
      aria-label={title}
      className={cn(
        "my-6 flex justify-center overflow-x-auto [&_svg]:h-auto [&_svg]:max-w-full",
        className,
      )}
    />
  );
}
