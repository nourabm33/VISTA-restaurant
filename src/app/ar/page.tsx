import type { Metadata } from "next";
import Image from "next/image";
import { brandImages } from "@/data/gallery";
import { menuItems } from "@/data/menu";
import { restaurant } from "@/data/restaurant";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { MenuItemCard } from "@/components/menu/MenuItemCard";

export const metadata: Metadata = {
  title: "Esperienza AR — in arrivo",
  description: `Presto da ${restaurant.shortName} potrai vedere piatti e cocktail in realtà aumentata, direttamente sul tuo tavolo, prima di ordinare.`,
  alternates: { canonical: "/ar" },
};

const steps = [
  {
    title: "Scansiona il QR",
    text: "Sul tavolo trovi un codice QR: aprilo con la fotocamera del telefono, nessuna app da installare.",
  },
  {
    title: "Scegli un piatto",
    text: "Sfoglia il menu digitale e apri la scheda del piatto o del cocktail che ti incuriosisce.",
  },
  {
    title: "Guardalo davanti a te",
    text: "Tocca “Vedi sul tavolo” e il piatto compare in 3D, a grandezza reale, nel tuo spazio.",
  },
];

const specs = [
  { label: "Formati 3D", value: "GLB / glTF per Android e web, USDZ per iOS" },
  { label: "Tecnologia", value: "WebAR nel browser, senza app" },
  { label: "Posizionamento", value: "Riconoscimento della superficie del tavolo" },
  { label: "Scala", value: "Dimensioni reali del piatto" },
];

export default function ArPage() {
  const candidates = menuItems.filter((item) => item.ar.arEnabled).slice(0, 3);

  return (
    <>
      <PageHeader
        tone="dark"
        eyebrow="Fase 2 · In arrivo"
        title={
          <>
            Vivilo prima ancora
            <br />
            di assaggiarlo.
          </>
        }
        description="Stiamo preparando un'esperienza di realtà aumentata che ti permetterà di vedere piatti e cocktail in 3D, a grandezza naturale, direttamente sul tuo tavolo. Questa pagina è un'anteprima: la funzione non è ancora attiva."
      >
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/menu" size="lg">
            Scopri il Menu
          </ButtonLink>
          <ButtonLink href="/prenotazione" variant="light" size="lg">
            Prenota un Tavolo
          </ButtonLink>
        </div>
      </PageHeader>

      <section className="bg-charcoal-950 pb-20 text-ivory-50 sm:pb-28">
        <Container>
          <div className="relative aspect-[16/10] overflow-hidden rounded-3xl bg-charcoal-800 sm:aspect-[21/9]">
            <Image
              src={brandImages.arTeaser.src}
              alt={brandImages.arTeaser.alt}
              fill
              priority
              sizes="(min-width: 1280px) 1200px, 100vw"
              className="object-cover"
            />
            <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-charcoal-950/80 to-transparent" />
            <p className="absolute bottom-5 left-5 rounded-full border border-ivory-50/30 bg-charcoal-950/60 px-4 py-2 text-xs uppercase tracking-[0.2em] text-ivory-100 backdrop-blur sm:bottom-8 sm:left-8">
              Anteprima concettuale · nessuna funzione AR attiva
            </p>
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-28" aria-labelledby="come-funziona">
        <Container>
          <p className="eyebrow">Come funzionerà</p>
          <h2 id="come-funziona" className="display-serif mt-3 text-3xl sm:text-4xl">
            Tre passaggi, zero app
          </h2>
          <ol className="mt-10 grid gap-8 sm:grid-cols-3">
            {steps.map((step, i) => (
              <li key={step.title} className="relative rounded-3xl border border-charcoal-900/10 p-6">
                <span className="display-serif text-4xl text-bronze-500">0{i + 1}</span>
                <h3 className="mt-4 text-lg font-medium text-charcoal-900">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-charcoal-500">{step.text}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="bg-ivory-100 py-20 sm:py-28" aria-labelledby="tech-title">
        <Container className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="eyebrow">Sotto il cofano</p>
            <h2 id="tech-title" className="display-serif mt-3 text-3xl sm:text-4xl">
              Pronto per il 3D
            </h2>
            <p className="mt-4 leading-relaxed text-charcoal-700">
              Il menu è già strutturato per accogliere i modelli tridimensionali: ogni piatto ha uno spazio riservato
              per il file 3D, la versione per iOS e le dimensioni reali. Quando i modelli saranno pronti, basterà
              collegarli — senza rifare il sito.
            </p>
            <dl className="mt-8 divide-y divide-charcoal-900/10">
              {specs.map((s) => (
                <div key={s.label} className="grid gap-1 py-4 sm:grid-cols-[140px_1fr] sm:gap-6">
                  <dt className="text-sm font-medium text-charcoal-900">{s.label}</dt>
                  <dd className="text-sm text-charcoal-600">{s.value}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div>
            <p className="eyebrow">Primi candidati</p>
            <h2 className="display-serif mt-3 text-3xl sm:text-4xl">I piatti che vedrai per primi</h2>
            <ul className="mt-8 grid gap-6 sm:grid-cols-3 lg:grid-cols-1">
              {candidates.map((item) => (
                <li key={item.slug}>
                  <MenuItemCard item={item} aspect="square" />
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>
    </>
  );
}
