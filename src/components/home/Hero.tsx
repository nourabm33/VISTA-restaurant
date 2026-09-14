import Image from "next/image";
import Link from "next/link";
import { restaurant } from "@/data/restaurant";
import { brandImages } from "@/data/gallery";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export function Hero() {
  const image = brandImages.hero;
  return (
    <section className="relative isolate overflow-hidden bg-charcoal-950 text-ivory-50">
      <Image
        src={image.src}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-center opacity-60"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/55 to-charcoal-950/25"
      />
      <Container className="relative flex min-h-[88svh] flex-col justify-end pt-28 pb-14 sm:min-h-[80vh] sm:pb-20 lg:pb-24">
        <p className="eyebrow text-bronze-300">{restaurant.cuisine} · {restaurant.address.city}</p>
        <h1 className="display-serif mt-4 max-w-4xl text-5xl sm:text-6xl lg:text-7xl">
          {restaurant.shortName}
          <span className="block text-3xl italic text-ivory-200/90 sm:text-4xl lg:text-5xl">
            Cucina &amp; Cocktail
          </span>
        </h1>
        <p className="display-serif mt-6 max-w-2xl text-2xl leading-snug text-ivory-100 sm:text-3xl">
          {restaurant.tagline}
        </p>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-ivory-200/80 sm:text-lg">
          {restaurant.description}
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
          <ButtonLink href="/menu" size="lg">
            Scopri il Menu
          </ButtonLink>
          <ButtonLink href="/prenotazione" size="lg" variant="light">
            Prenota un Tavolo
          </ButtonLink>
        </div>
        <Link
          href="/ar"
          className="group mt-10 inline-flex w-fit items-center gap-3 rounded-full border border-ivory-50/15 bg-charcoal-900/50 py-2 pr-4 pl-2 text-sm text-ivory-200 backdrop-blur-sm transition-colors hover:border-bronze-300/50"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-bronze-500 text-[10px] font-semibold tracking-wider text-ivory-50">
            AR
          </span>
          <span>
            Presto: guarda i piatti in realtà aumentata
            <span aria-hidden="true" className="ml-1 inline-block transition-transform group-hover:translate-x-0.5">
              →
            </span>
          </span>
        </Link>
      </Container>
    </section>
  );
}
