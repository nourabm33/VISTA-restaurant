import type { Metadata } from "next";
import Link from "next/link";
import { arSupport, featuredArExperience } from "@/data/ar";
import { restaurant } from "@/data/restaurant";
import { ArViewer } from "@/components/ar/ArViewer";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";

export const metadata: Metadata = {
  title: "Esperienza AR — Porta il gusto nella tua realtà",
  description: `Da ${restaurant.shortName} puoi vedere il piatto VISTA Signature in realtà aumentata, a grandezza reale, direttamente sul tuo tavolo.`,
  alternates: { canonical: "/ar" },
};

const steps = [
  {
    title: "Apri da smartphone",
    text: "L'esperienza AR funziona nel browser, senza app: apri questa pagina da un telefono compatibile, su connessione sicura.",
  },
  {
    title: "Tocca “Prova in AR”",
    text: "Il dispositivo ti chiederà il permesso di usare la fotocamera. Nessun accesso viene richiesto prima di questo tocco.",
  },
  {
    title: "Inquadra il tavolo",
    text: "Muovi lentamente il telefono su una superficie piana: il piatto compare a grandezza reale. Trascina per spostarlo, ruota e pizzica per ridimensionarlo.",
  },
  {
    title: "Torna al sito",
    text: "Chiudi la vista AR con il pulsante di chiusura o con Indietro: ritorni esattamente dove eri.",
  },
];

export default function ArPage() {
  const experience = featuredArExperience;

  return (
    <>
      <PageHeader
        tone="dark"
        eyebrow="Esperienza AR"
        title={
          <>
            Porta il gusto
            <br />
            nella tua realtà.
          </>
        }
        description="Inquadra il tuo tavolo e scopri come potrebbe apparire il nostro piatto nella tua esperienza. Un solo tocco, nessuna app: il piatto VISTA Signature prende forma davanti a te, a grandezza reale."
      />

      <section className="bg-ivory-50 py-12 sm:py-16" aria-labelledby="ar-demo-title">
        <Container>
          {experience ? (
            <div className="grid gap-10 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:items-start lg:gap-14">
              <ArViewer experience={experience} variant="hero" />
              <div className="lg:pt-2">
                <p className="eyebrow">Piatto dimostrativo</p>
                <h2 id="ar-demo-title" className="display-serif mt-3 text-3xl sm:text-4xl">
                  {experience.title}
                </h2>
                <p className="mt-4 leading-relaxed text-charcoal-700">{experience.description}</p>
                {experience.scale ? (
                  <dl className="mt-6 grid grid-cols-3 gap-4 rounded-2xl bg-ivory-100 p-4 text-center">
                    {[
                      ["Diametro", experience.scale.width],
                      ["Profondità", experience.scale.depth],
                      ["Altezza", experience.scale.height],
                    ].map(([label, metres]) => (
                      <div key={label}>
                        <dt className="text-xs uppercase tracking-[0.18em] text-charcoal-500">{label}</dt>
                        <dd className="display-serif mt-1 text-2xl text-charcoal-900">
                          {Math.round(Number(metres) * 100)} cm
                        </dd>
                      </div>
                    ))}
                  </dl>
                ) : null}
                <p className="mt-6 text-sm leading-relaxed text-charcoal-500">
                  Il modello è una ricostruzione stilizzata del piatto, in scala reale, pensata per il web: leggero da
                  caricare e fedele nelle proporzioni, non una fotografia tridimensionale.
                </p>
                {experience.menuSlug ? (
                  <Link
                    href={`/menu/${experience.menuSlug}`}
                    className="mt-6 inline-flex min-h-11 items-center text-sm font-medium text-bronze-600 underline-offset-4 hover:underline"
                  >
                    Vai alla scheda del piatto →
                  </Link>
                ) : null}
              </div>
            </div>
          ) : (
            <p className="text-charcoal-600">Nessun piatto è al momento configurato per l&apos;esperienza AR.</p>
          )}
        </Container>
      </section>

      <section className="py-20 sm:py-28" aria-labelledby="come-funziona">
        <Container>
          <p className="eyebrow">Come funziona</p>
          <h2 id="come-funziona" className="display-serif mt-3 text-3xl sm:text-4xl">
            Quattro passaggi, zero app
          </h2>
          <ol className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
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

      <section className="bg-ivory-100 py-20 sm:py-28" aria-labelledby="dispositivi-title">
        <Container className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="eyebrow">Dispositivi supportati</p>
            <h2 id="dispositivi-title" className="display-serif mt-3 text-3xl sm:text-4xl">
              Dove funziona l&apos;AR
            </h2>
            <p className="mt-4 leading-relaxed text-charcoal-700">
              La realtà aumentata usa le funzioni native del tuo telefono e richiede una connessione HTTPS. Se il tuo
              dispositivo non la supporta, il modello 3D resta comunque esplorabile nel visualizzatore.
            </p>
            <dl className="mt-8 divide-y divide-charcoal-900/10">
              {arSupport.map((s) => (
                <div key={s.platform} className="grid gap-1 py-4 sm:grid-cols-[160px_1fr] sm:gap-6">
                  <dt className="text-sm font-medium text-charcoal-900">{s.platform}</dt>
                  <dd className="text-sm text-charcoal-600">{s.detail}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div>
            <p className="eyebrow">Privacy e sicurezza</p>
            <h2 className="display-serif mt-3 text-3xl sm:text-4xl">La fotocamera resta tua</h2>
            <ul className="mt-6 space-y-4 text-sm leading-relaxed text-charcoal-700">
              <li>La fotocamera si attiva solo dopo che tocchi “Prova in AR” e confermi il permesso nel browser.</li>
              <li>Le immagini della fotocamera restano sul tuo dispositivo: nulla viene inviato ai nostri server.</li>
              <li>Se neghi il permesso, puoi comunque esplorare il piatto nel visualizzatore 3D.</li>
            </ul>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/menu" size="lg">
                Scopri il Menu
              </ButtonLink>
              <ButtonLink href="/prenotazione" variant="secondary" size="lg">
                Prenota un Tavolo
              </ButtonLink>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
