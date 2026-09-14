import Image from "next/image";
import { brandImages } from "@/data/gallery";
import { restaurant } from "@/data/restaurant";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

const pillars = [
  { title: "Materia prima", text: "Fornitori selezionati, stagionalità e rispetto del prodotto." },
  { title: "Tecnica", text: "Cotture precise e una cucina che unisce tradizione e ricerca." },
  { title: "Atmosfera", text: "Luci calde, legno, ottone: un luogo dove restare a lungo." },
];

export function Intro() {
  const image = brandImages.about;
  return (
    <section className="py-20 sm:py-28" aria-labelledby="intro-title">
      <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-ivory-200 sm:aspect-[5/4] lg:aspect-[4/5]">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="object-cover"
          />
        </div>
        <div>
          <SectionHeading
            id="intro-title"
            eyebrow="Il ristorante"
            title={
              <>
                Cucina italiana contemporanea, <em className="text-bronze-600">senza compromessi</em>
              </>
            }
            description={`${restaurant.shortName} nasce dall'idea che un pasto sia un'esperienza completa: piatti riconoscibili ma sorprendenti, cocktail costruiti come ricette e un servizio attento senza essere formale.`}
          />
          <dl className="mt-10 grid gap-6 sm:grid-cols-3">
            {pillars.map((p) => (
              <div key={p.title} className="border-t border-bronze-500/30 pt-4">
                <dt className="display-serif text-xl text-charcoal-900">{p.title}</dt>
                <dd className="mt-1.5 text-sm leading-relaxed text-charcoal-500">{p.text}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Container>
    </section>
  );
}
