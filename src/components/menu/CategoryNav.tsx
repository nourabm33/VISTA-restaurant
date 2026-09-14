"use client";

import { useEffect, useRef, useState } from "react";
import type { MenuCategory } from "@/types/content";

interface CategoryNavProps {
  categories: MenuCategory[];
}

/**
 * Sticky horizontal rail of category anchors. Highlights the category
 * currently in view so guests scanning a QR code always know where they are.
 */
export function CategoryNav({ categories }: CategoryNavProps) {
  const [active, setActive] = useState<MenuCategory["id"]>(categories[0]?.id ?? "antipasti");
  const linkRefs = useRef<Map<string, HTMLAnchorElement>>(new Map());

  useEffect(() => {
    const sections = categories
      .map((c) => document.getElementById(c.id))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id as MenuCategory["id"]);
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: 0 },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [categories]);

  useEffect(() => {
    linkRefs.current.get(active)?.scrollIntoView({
      block: "nearest",
      inline: "center",
      behavior: "smooth",
    });
  }, [active]);

  return (
    <nav
      aria-label="Categorie del menu"
      className="sticky top-16 z-40 -mx-5 border-b border-charcoal-900/8 bg-ivory-50/95 backdrop-blur-md sm:top-[72px] sm:-mx-8"
    >
      <ul className="scrollbar-none flex gap-2 overflow-x-auto px-5 py-3 sm:px-8">
        {categories.map((category) => {
          const isActive = category.id === active;
          return (
            <li key={category.id} className="shrink-0">
              <a
                href={`#${category.id}`}
                ref={(el) => {
                  if (el) linkRefs.current.set(category.id, el);
                }}
                aria-current={isActive ? "true" : undefined}
                className={`inline-flex min-h-10 items-center rounded-full px-4 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-charcoal-900 text-ivory-50"
                    : "bg-white text-charcoal-700 ring-1 ring-charcoal-900/10 hover:bg-ivory-200"
                }`}
              >
                {category.name}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
