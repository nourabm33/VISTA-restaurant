import Link from "next/link";
import type { ArAssets } from "@/types/content";

interface ArPlaceholderProps {
  itemName: string;
  ar: ArAssets;
}

/**
 * Reserved area for the Phase 2 3D/AR viewer. In Phase 1 it only explains
 * what is coming; no camera, no fake 3D, no heavy dependencies.
 */
export function ArPlaceholder({ itemName, ar }: ArPlaceholderProps) {
  return (
    <section
      aria-labelledby="ar-placeholder-title"
      data-ar-enabled={ar.arEnabled}
      data-model-3d={ar.model3d}
      data-ar-model={ar.arModel}
      className="relative overflow-hidden rounded-3xl bg-charcoal-900 p-6 text-ivory-50 sm:p-8"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(198,156,109,0.22),transparent_55%)]"
      />
      <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center">
        <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl border border-dashed border-bronze-300/50 bg-charcoal-800/60">
          <svg
            aria-hidden="true"
            viewBox="0 0 48 48"
            className="h-10 w-10 text-bronze-300"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M24 6 8 14v20l16 8 16-8V14L24 6Z" />
            <path d="M8 14l16 8 16-8M24 22v20" />
          </svg>
        </div>
        <div className="flex-1">
          <p className="eyebrow text-bronze-300">In arrivo · Fase 2</p>
          <h2 id="ar-placeholder-title" className="display-serif mt-2 text-2xl sm:text-3xl">
            Vedi {itemName} sul tuo tavolo
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-ivory-200/75">
            Qui prenderà vita il visualizzatore 3D e in realtà aumentata: potrai vedere il piatto in
            scala reale direttamente dal tuo smartphone, prima di ordinare.
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <span
              aria-disabled="true"
              className="inline-flex min-h-10 cursor-not-allowed items-center rounded-full border border-ivory-50/20 px-4 text-sm text-ivory-200/60"
            >
              Visualizza in AR · presto disponibile
            </span>
            <Link href="/ar" className="text-sm text-bronze-300 underline-offset-4 hover:underline">
              Scopri l&apos;esperienza AR
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
