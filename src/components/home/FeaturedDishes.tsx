import { getFeaturedDishes } from "@/data/menu";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MenuItemCard } from "@/components/menu/MenuItemCard";

export function FeaturedDishes() {
  const dishes = getFeaturedDishes(4);
  return (
    <section className="bg-ivory-100 py-20 sm:py-28" aria-labelledby="featured-title">
      <Container>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            id="featured-title"
            eyebrow="Dalla cucina"
            title="I piatti che ci rappresentano"
            description="Una selezione di signature dish che raccontano la nostra idea di cucina."
          />
          <ButtonLink href="/menu" variant="secondary" className="w-fit">
            Tutto il menu
          </ButtonLink>
        </div>
        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {dishes.map((dish) => (
            <li key={dish.slug}>
              <MenuItemCard item={dish} />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
