import Link from "next/link";
import type { MenuItem } from "@/types/content";
import { toArExperience } from "@/data/ar";
import { ArViewer } from "./ArViewer";

interface ArPlaceholderProps {
  item: MenuItem;
}

/**
 * 3D/AR area of a menu detail page. Renders the real viewer when the item has
 * a model; otherwise explains that this dish is not yet available in AR.
 */
export function ArPlaceholder({ item }: ArPlaceholderProps) {
  const experience = toArExperience(item);

  if (experience) {
    return (
      <section aria-labelledby="ar-viewer-title" className="rounded-3xl border border-charcoal-900/10 bg-ivory-50 p-5 sm:p-6">
        <p className="eyebrow">Realtà aumentata</p>
        <h2 id="ar-viewer-title" className="display-serif mt-2 text-2xl sm:text-3xl">
          Vedi {item.name} sul tuo tavolo
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-charcoal-600">
          Esplora il piatto in 3D oppure tocca “Prova in AR” da smartphone per posizionarlo, a grandezza reale, davanti a te.
        </p>
        <ArViewer experience={experience} variant="compact" className="mt-5" />
        <Link href="/ar" className="mt-4 inline-block text-sm text-bronze-600 underline-offset-4 hover:underline">
          Come funziona l&apos;esperienza AR
        </Link>
      </section>
    );
  }

  return (
    <section
      aria-labelledby="ar-placeholder-title"
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
          <p className="eyebrow text-bronze-300">Realtà aumentata</p>
          <h2 id="ar-placeholder-title" className="display-serif mt-2 text-2xl sm:text-3xl">
            {item.name} non è ancora disponibile in AR
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-ivory-200/75">
            Stiamo modellando i nostri piatti uno alla volta. Nel frattempo puoi provare l&apos;esperienza con il
            piatto dimostrativo VISTA Signature.
          </p>
          <div className="mt-4">
            <Link
              href="/ar"
              className="inline-flex min-h-11 items-center rounded-full border border-ivory-50/40 px-5 text-sm text-ivory-50 hover:bg-ivory-50 hover:text-charcoal-900"
            >
              Prova il piatto dimostrativo in AR
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
