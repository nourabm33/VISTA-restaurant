import type { Metadata } from "next";
import { categories } from "@/data/categories";
import { getItemsByCategory } from "@/data/menu";
import { restaurant } from "@/data/restaurant";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { CategoryNav } from "@/components/menu/CategoryNav";
import { MenuItemRow } from "@/components/menu/MenuItemRow";
import { ReservationCta } from "@/components/home/ReservationCta";

export const metadata: Metadata = {
  title: "Menu",
  description: `Il menu digitale di ${restaurant.shortName}: antipasti, primi, secondi, dessert, cocktail e vini. Prezzi e allergeni sempre aggiornati.`,
  alternates: { canonical: "/menu" },
};

export default function MenuPage() {
  const sorted = [...categories].sort((a, b) => a.order - b.order);

  return (
    <>
      <PageHeader
        eyebrow="Menu digitale"
        title="Il nostro menu"
        description="Scorri le categorie o tocca un piatto per scoprire ingredienti, allergeni e, presto, la sua versione in realtà aumentata."
      />
      <Container>
        <CategoryNav categories={sorted} />
        <div className="divide-y divide-charcoal-900/8">
          {sorted.map((category) => {
            const items = getItemsByCategory(category.id);
            return (
              <section
                key={category.id}
                id={category.id}
                aria-labelledby={`${category.id}-title`}
                className="scroll-mt-32 py-10 sm:py-14"
              >
                <div className="max-w-2xl">
                  <h2 id={`${category.id}-title`} className="display-serif text-3xl sm:text-4xl">
                    {category.name}
                  </h2>
                  <p className="mt-2 text-sm text-charcoal-500 sm:text-base">{category.description}</p>
                </div>
                <ul className="mt-6 grid gap-2 lg:grid-cols-2 lg:gap-x-8">
                  {items.map((item) => (
                    <MenuItemRow key={item.slug} item={item} />
                  ))}
                </ul>
              </section>
            );
          })}
        </div>
        <p className="py-8 text-center text-xs leading-relaxed text-charcoal-400">
          Prezzi in euro, coperto incluso. Per allergie e intolleranze rivolgersi al personale di sala:
          il nostro staff è a disposizione per indicare gli allergeni presenti in ogni preparazione.
        </p>
      </Container>
      <ReservationCta
        title="Ti è venuta fame?"
        description="Prenota un tavolo e vieni ad assaggiare il menu dal vivo."
      />
    </>
  );
}
