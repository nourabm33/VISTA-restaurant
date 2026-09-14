import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { categoryMap } from "@/data/categories";
import { allergenLabels, tagLabels } from "@/data/labels";
import { getItemsByCategory, getMenuItem, menuItems } from "@/data/menu";
import { restaurant } from "@/data/restaurant";
import { formatPrice } from "@/lib/format";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { ArPlaceholder } from "@/components/ar/ArPlaceholder";
import { MenuItemCard } from "@/components/menu/MenuItemCard";

export const dynamicParams = false;

export function generateStaticParams() {
  return menuItems.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: PageProps<"/menu/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const item = getMenuItem(slug);
  if (!item) return { title: "Piatto non trovato" };
  const category = categoryMap[item.category];
  return {
    title: `${item.name} · ${category.name}`,
    description: `${item.description} ${formatPrice(item.price)} — ${restaurant.shortName}.`,
    alternates: { canonical: `/menu/${item.slug}` },
    openGraph: {
      title: item.name,
      description: item.description,
      images: [{ url: item.image.src, width: item.image.width, height: item.image.height, alt: item.image.alt }],
    },
  };
}

export default async function MenuItemPage({ params }: PageProps<"/menu/[slug]">) {
  const { slug } = await params;
  const item = getMenuItem(slug);
  if (!item) notFound();

  const category = categoryMap[item.category];
  const related = getItemsByCategory(item.category)
    .filter((i) => i.slug !== item.slug)
    .slice(0, 3);
  const backHref = item.category === "cocktail" ? "/cocktails" : `/menu#${item.category}`;
  const backLabel = item.category === "cocktail" ? "Torna ai cocktail" : "Torna al menu";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MenuItem",
    name: item.name,
    description: item.description,
    image: `${restaurant.siteUrl}${item.image.src}`,
    offers: { "@type": "Offer", price: item.price, priceCurrency: item.currency },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <article>
        <Container className="pt-6 sm:pt-8">
          <nav aria-label="Percorso" className="text-sm text-charcoal-500">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/" className="hover:text-bronze-600">Home</Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href={backHref} className="hover:text-bronze-600">
                  {item.category === "cocktail" ? "Cocktail" : "Menu"}
                </Link>
              </li>
              {item.category !== "cocktail" ? (
                <>
                  <li aria-hidden="true">/</li>
                  <li>
                    <Link href={`/menu#${item.category}`} className="hover:text-bronze-600">
                      {category.name}
                    </Link>
                  </li>
                </>
              ) : null}
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-charcoal-900">{item.name}</li>
            </ol>
          </nav>
        </Container>

        <Container className="grid gap-10 py-8 lg:grid-cols-[1.15fr_1fr] lg:gap-16 lg:py-12">
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-ivory-200 sm:aspect-[5/4] lg:sticky lg:top-28 lg:aspect-[4/5]">
            <Image
              src={item.image.src}
              alt={item.image.alt}
              fill
              priority
              sizes="(min-width: 1024px) 55vw, 100vw"
              className="object-cover"
            />
          </div>

          <div>
            <p className="eyebrow">{category.name}</p>
            <div className="mt-3 flex flex-wrap items-start justify-between gap-x-6 gap-y-2">
              <h1 className="display-serif text-4xl text-charcoal-900 sm:text-5xl">{item.name}</h1>
              <p className="display-serif text-3xl text-bronze-600 sm:text-4xl">{formatPrice(item.price)}</p>
            </div>
            <p className="mt-4 text-lg leading-relaxed text-charcoal-700">{item.description}</p>
            {item.story ? (
              <p className="mt-4 text-base leading-relaxed text-charcoal-500">{item.story}</p>
            ) : null}

            {item.tags.length > 0 ? (
              <ul className="mt-6 flex flex-wrap gap-2" aria-label="Caratteristiche">
                {item.tags.map((tag) => (
                  <li key={tag}>
                    <Badge tone={tag === "signature" ? "bronze" : "neutral"}>{tagLabels[tag]}</Badge>
                  </li>
                ))}
              </ul>
            ) : null}

            <div className="mt-10 grid gap-8 sm:grid-cols-2">
              <section aria-labelledby="ingredienti-title">
                <h2 id="ingredienti-title" className="eyebrow">Ingredienti</h2>
                <ul className="mt-3 space-y-1.5 text-charcoal-700">
                  {item.ingredients.map((ing) => (
                    <li key={ing} className="flex items-center gap-2.5">
                      <span aria-hidden="true" className="h-1 w-1 rounded-full bg-bronze-500" />
                      {ing}
                    </li>
                  ))}
                </ul>
              </section>
              <section aria-labelledby="allergeni-title">
                <h2 id="allergeni-title" className="eyebrow">Allergeni</h2>
                {item.allergens.length > 0 ? (
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {item.allergens.map((a) => (
                      <li key={a}>
                        <Badge>{allergenLabels[a]}</Badge>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-3 text-sm text-charcoal-500">Nessun allergene dichiarato.</p>
                )}
                <p className="mt-4 text-xs leading-relaxed text-charcoal-400">
                  Informazioni dimostrative. Per allergie e intolleranze chiedere sempre al personale di sala.
                </p>
              </section>
            </div>

            <div className="mt-10">
              <ArPlaceholder item={item} />
            </div>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href={backHref} variant="secondary" size="lg">
                <span aria-hidden="true">←</span> {backLabel}
              </ButtonLink>
              <ButtonLink href="/prenotazione" size="lg">
                Prenota un Tavolo
              </ButtonLink>
            </div>
          </div>
        </Container>

        {related.length > 0 ? (
          <section className="bg-ivory-100 py-16 sm:py-20" aria-labelledby="related-title">
            <Container>
              <h2 id="related-title" className="display-serif text-3xl sm:text-4xl">
                Altri {category.name.toLowerCase()}
              </h2>
              <ul className="mt-8 grid gap-6 sm:grid-cols-3">
                {related.map((r) => (
                  <li key={r.slug}>
                    <MenuItemCard item={r} />
                  </li>
                ))}
              </ul>
            </Container>
          </section>
        ) : null}
      </article>
    </>
  );
}
