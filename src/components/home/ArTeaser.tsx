import Image from "next/image";
import { brandImages } from "@/data/gallery";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

const steps = [
  { n: "01", title: "Scansiona il QR", text: "Apri il menu digitale direttamente dal tavolo." },
  { n: "02", title: "Scegli un piatto", text: "Ogni portata avrà il proprio modello 3D in scala reale." },
  { n: "03", title: "Guardalo davanti a te", text: "Con la fotocamera, il piatto apparirà sul tuo tavolo." },
];

export function ArTeaser() {
  const image = brandImages.arTeaser;
  return (
    <section className="py-20 sm:py-28" aria-labelledby="ar-teaser-title">
      <Container className="grid items-center gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
        <div>
          <SectionHeading
            id="ar-teaser-title"
            eyebrow="Realtà aumentata"
            title={
              <>
                Il menu che si vede <em className="text-bronze-600">prima di assaggiare</em>
              </>
            }
            description="Prova il nostro piatto dimostrativo in realtà aumentata: lo vedi in 3D, in scala reale, direttamente sul tuo tavolo. Nessuna app da installare."
          />
          <ol className="mt-10 space-y-6">
            {steps.map((step) => (
              <li key={step.n} className="flex gap-5">
                <span className="display-serif shrink-0 text-3xl text-bronze-500">{step.n}</span>
                <div>
                  <h3 className="font-medium text-charcoal-900">{step.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-charcoal-500">{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
          <ButtonLink href="/ar" variant="secondary" className="mt-10">
            Prova in AR
          </ButtonLink>
        </div>

        <div className="relative">
          <div className="relative aspect-square overflow-hidden rounded-3xl bg-ivory-200">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
            />
            <div
              aria-hidden="true"
              className="absolute inset-6 rounded-2xl border border-ivory-50/70 [mask-image:linear-gradient(to_bottom,black,transparent_35%,transparent_65%,black)]"
            />
            <div
              aria-hidden="true"
              className="absolute inset-x-6 top-1/2 h-px bg-ivory-50/60"
            />
          </div>
          <p className="absolute top-5 left-5 rounded-full bg-charcoal-900/80 px-3 py-1.5 text-[11px] font-medium tracking-wider text-ivory-50 uppercase backdrop-blur-sm">
            Anteprima concettuale
          </p>
        </div>
      </Container>
    </section>
  );
}
