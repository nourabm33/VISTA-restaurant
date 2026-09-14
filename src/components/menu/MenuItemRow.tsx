import Image from "next/image";
import Link from "next/link";
import type { MenuItem } from "@/types/content";
import { tagLabels } from "@/data/labels";
import { formatPrice } from "@/lib/format";
import { Badge } from "@/components/ui/Badge";

interface MenuItemRowProps {
  item: MenuItem;
}

/** Compact, touch-friendly list row used in the digital menu (QR experience). */
export function MenuItemRow({ item }: MenuItemRowProps) {
  const visibleTags = item.tags.slice(0, 2);
  return (
    <li className="relative">
      <Link
        href={`/menu/${item.slug}`}
        className="group flex gap-4 rounded-2xl p-3 transition-colors hover:bg-white sm:gap-5 sm:p-4"
      >
        <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-ivory-200 sm:h-28 sm:w-28">
          <Image
            src={item.image.src}
            alt={item.image.alt}
            fill
            sizes="112px"
            loading="lazy"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
        </div>
        <div className="flex min-w-0 flex-1 flex-col">
          <div className="flex items-baseline justify-between gap-3">
            <h3 className="display-serif text-xl leading-tight text-charcoal-900 group-hover:text-bronze-600 sm:text-2xl">
              {item.name}
            </h3>
            <p className="shrink-0 text-sm font-medium text-bronze-600">{formatPrice(item.price)}</p>
          </div>
          <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-charcoal-500">
            {item.description}
          </p>
          {visibleTags.length > 0 ? (
            <ul className="mt-auto flex flex-wrap gap-1.5 pt-3" aria-label="Caratteristiche">
              {visibleTags.map((tag) => (
                <li key={tag}>
                  <Badge tone={tag === "signature" ? "bronze" : "neutral"}>{tagLabels[tag]}</Badge>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </Link>
    </li>
  );
}
