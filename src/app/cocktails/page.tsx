import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getCocktails } from "@/data/menu";
import { restaurant } from "@/data/restaurant";
import { formatPrice } from "@/lib/format";
import { tagLabels } from "@/data/labels";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { ReservationCta } from "@/components/home/ReservationCta";

export const metadata: Metadata = {
  title: "Cocktail",
  description: `La cocktail list di ${restaurant.shortName}: signature drink, classici rivisitati e proposte analcoliche.`,
  alternates: { canonical: "/cocktails" },
};

export default function CocktailsPage() {
  const cocktails = getCocktails();
  const signature = cocktails.filter((c) => c.tags.includes("signature"));
  const others = cocktails.filter((c) => !c.tags.includes("signature"));

  return (
    <>
      <PageHeader
        tone="dark"
        eyebrow="Cocktail bar"
        title="La cocktail list"
        description="Spiriti selezionati, sciroppi e infusi fatti in casa, ghiaccio cristallino. Ogni drink è pensato per accompagnare la cucina o per essere protagonista dell'aperitivo."
      />

      <section className="bg-charcoal-950 pb-20 text-ivory-50 sm:pb-28" aria-labelledby="signature-title">
        <Container>
          <h2 id="signature-title" className="eyebrow text-bronze-300">
            Signature
          </h2>
          <ul className="mt-6 grid gap-6 sm:grid-cols-3">
            {signature.map((cocktail, i) => (
              <li key={cocktail.slug} className="group relative">
                <div className="relative aspect-[3/4] overflow-hidden rounded-3xl bg-charcoal-800">
                  <Image
                    src={cocktail.image.src}
                    alt={cocktail.image.alt}
                    fill
                    priority={i === 0}
                    sizes="(min-width: 640px) 30vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-charcoal-950/95 via-charcoal-950/25 to-transparent"
                  />
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <div className="flex items-baseline justify-between gap-3">
                      <h3 className="display-serif text-2xl sm:text-3xl">
                        <Link href={`/menu/${cocktail.slug}`} className="after:absolute after:inset-0 after:content-['']">
                          {cocktail.name}
                        </Link>
                      </h3>
                      <p className="text-sm text-bronze-300">{formatPrice(cocktail.price)}</p>
                    </div>
                    <p className="mt-1.5 text-sm text-ivory-200/80">{cocktail.ingredients.join(" · ")}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="py-20 sm:py-28" aria-labelledby="classici-title">
        <Container>
          <div className="max-w-2xl">
            <p className="eyebrow">La lista</p>
            <h2 id="classici-title" className="display-serif mt-3 text-3xl sm:text-4xl">
              Classici e creazioni
            </h2>
          </div>
          <ul className="mt-10 grid gap-x-10 gap-y-8 md:grid-cols-2">
            {others.map((cocktail) => (
              <li key={cocktail.slug}>
                <Link
                  href={`/menu/${cocktail.slug}`}
                  className="group flex gap-5 rounded-2xl p-2 transition-colors hover:bg-ivory-100"
                >
                  <div className="relative h-28 w-24 shrink-0 overflow-hidden rounded-xl bg-ivory-200 sm:h-32 sm:w-28">
                    <Image
                      src={cocktail.image.src}
                      alt={cocktail.image.alt}
                      fill
                      sizes="112px"
                      loading="lazy"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    />
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col py-1">
                    <div className="flex items-baseline justify-between gap-3">
                      <h3 className="display-serif text-2xl text-charcoal-900 group-hover:text-bronze-600">
                        {cocktail.name}
                      </h3>
                      <p className="shrink-0 text-sm font-medium text-bronze-600">{formatPrice(cocktail.price)}</p>
                    </div>
                    <p className="mt-1 text-sm text-charcoal-500">{cocktail.ingredients.join(" · ")}</p>
                    <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-charcoal-700">
                      {cocktail.description}
                    </p>
                    {cocktail.tags.length > 0 ? (
                      <ul className="mt-auto flex flex-wrap gap-1.5 pt-3" aria-label="Caratteristiche">
                        {cocktail.tags.map((tag) => (
                          <li key={tag}>
                            <Badge>{tagLabels[tag]}</Badge>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-12 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/prenotazione" size="lg">
              Prenota un Tavolo
            </ButtonLink>
            <ButtonLink href="/menu" variant="secondary" size="lg">
              Vai al menu completo
            </ButtonLink>
          </div>
        </Container>
      </section>

      <ReservationCta
        title="Aperitivo al bancone?"
        description="Dalle 18:30 la cocktail list incontra i nostri piccoli piatti. Prenota il tuo posto."
      />
    </>
  );
}
