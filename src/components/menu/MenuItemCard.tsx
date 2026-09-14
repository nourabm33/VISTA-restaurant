import Image from "next/image";
import Link from "next/link";
import type { MenuItem } from "@/types/content";
import { tagLabels } from "@/data/labels";
import { formatPrice } from "@/lib/format";
import { Badge } from "@/components/ui/Badge";

interface MenuItemCardProps {
  item: MenuItem;
  /** Load eagerly for above-the-fold cards. */
  priority?: boolean;
  /** Portrait aspect for cocktail grids, landscape for dishes. */
  aspect?: "landscape" | "portrait" | "square";
}

const aspects = {
  landscape: "aspect-[4/3]",
  portrait: "aspect-[3/4]",
  square: "aspect-square",
};

export function MenuItemCard({ item, priority = false, aspect = "landscape" }: MenuItemCardProps) {
  const highlight = item.tags.find((t) => t === "signature" || t === "chef" || t === "novita");
  const secondaryTags = item.tags.filter((t) => t !== highlight).slice(0, 3);

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-card ring-1 ring-charcoal-900/5 transition-shadow hover:shadow-soft">
      <div className={`relative ${aspects[aspect]} overflow-hidden bg-ivory-200`}>
        <Image
          src={item.image.src}
          alt={item.image.alt}
          fill
          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
          priority={priority}
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
        {highlight ? (
          <Badge tone="dark" className="absolute top-3 left-3">
            {tagLabels[highlight]}
          </Badge>
        ) : null}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-4">
          <h3 className="display-serif text-2xl text-charcoal-900">
            <Link
              href={`/menu/${item.slug}`}
              className="after:absolute after:inset-0 after:content-[''] hover:text-bronze-600"
            >
              {item.name}
            </Link>
          </h3>
          <p className="shrink-0 pt-1 text-sm font-medium text-bronze-600">{formatPrice(item.price)}</p>
        </div>
        <p className="mt-2 text-sm leading-relaxed text-charcoal-500">{item.description}</p>
        {secondaryTags.length > 0 ? (
          <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Caratteristiche">
            {secondaryTags.map((tag) => (
                <li key={tag}>
                  <Badge>{tagLabels[tag]}</Badge>
                </li>
              ))}
          </ul>
        ) : null}
      </div>
    </article>
  );
}
