import Image from "next/image";
import Link from "next/link";
import { getSignatureCocktails } from "@/data/menu";
import { formatPrice } from "@/lib/format";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function SignatureCocktails() {
  const cocktails = getSignatureCocktails(3);
  return (
    <section className="bg-charcoal-950 py-20 text-ivory-50 sm:py-28" aria-labelledby="cocktails-title">
      <Container>
        <SectionHeading
          id="cocktails-title"
          tone="dark"
          align="center"
          eyebrow="Dal bancone"
          title="Signature cocktail"
          description="Classici rivisitati e creazioni originali, preparati con spiriti selezionati e ingredienti freschi."
        />
        <ul className="mt-14 grid gap-8 sm:grid-cols-3">
          {cocktails.map((cocktail) => (
            <li key={cocktail.slug} className="group relative">
              <div className="relative aspect-[3/4] overflow-hidden rounded-3xl bg-charcoal-800">
                <Image
                  src={cocktail.image.src}
                  alt={cocktail.image.alt}
                  fill
                  sizes="(min-width: 640px) 30vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-charcoal-950/90 via-charcoal-950/20 to-transparent"
                />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="display-serif text-2xl sm:text-3xl">
                      <Link
                        href={`/menu/${cocktail.slug}`}
                        className="after:absolute after:inset-0 after:content-['']"
                      >
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
        <div className="mt-12 text-center">
          <ButtonLink href="/cocktails" variant="light" size="lg">
            Tutta la cocktail list
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
