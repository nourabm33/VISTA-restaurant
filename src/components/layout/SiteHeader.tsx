"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";
import { mainNav, reservationLink } from "@/data/navigation";
import { restaurant } from "@/data/restaurant";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/layout/Logo";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const menuId = useId();

  const close = () => setOpen(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 border-b border-charcoal-900/8 bg-ivory-50/90 backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between gap-4 sm:h-[72px]">
        <Link
          href="/"
          className="flex items-center gap-2.5 text-charcoal-900"
          aria-label={`${restaurant.shortName} — torna alla home`}
        >
          <Logo />
        </Link>

        <nav aria-label="Navigazione principale" className="hidden md:block">
          <ul className="flex items-center gap-7">
            {mainNav.map((link) => {
              const active = isActive(link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={`text-sm tracking-wide transition-colors hover:text-bronze-600 ${
                      active ? "text-bronze-600" : "text-charcoal-700"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <ButtonLink href={reservationLink.href} className="hidden sm:inline-flex">
            {reservationLink.label}
          </ButtonLink>
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full text-charcoal-900 hover:bg-ivory-200 md:hidden"
            aria-expanded={open}
            aria-controls={menuId}
            aria-label={open ? "Chiudi il menu di navigazione" : "Apri il menu di navigazione"}
            onClick={() => setOpen((v) => !v)}
          >
            <span aria-hidden="true" className="relative block h-4 w-5">
              <span
                className={`absolute left-0 h-[1.5px] w-5 bg-current transition-transform duration-200 ${
                  open ? "top-[7px] rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute left-0 top-[7px] h-[1.5px] w-5 bg-current transition-opacity duration-200 ${
                  open ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute left-0 h-[1.5px] w-5 bg-current transition-transform duration-200 ${
                  open ? "top-[7px] -rotate-45" : "top-[14px]"
                }`}
              />
            </span>
          </button>
        </div>
      </Container>

      <div
        id={menuId}
        className={`md:hidden ${open ? "block" : "hidden"} border-t border-charcoal-900/8 bg-ivory-50`}
      >
        <nav aria-label="Navigazione mobile">
          <Container as="ul" className="flex flex-col py-3">
            {mainNav.map((link) => {
              const active = isActive(link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={close}
                    aria-current={active ? "page" : undefined}
                    className={`flex min-h-12 items-center justify-between border-b border-charcoal-900/6 text-lg ${
                      active ? "text-bronze-600" : "text-charcoal-900"
                    }`}
                  >
                    {link.label}
                    <span aria-hidden="true" className="text-charcoal-400">
                      →
                    </span>
                  </Link>
                </li>
              );
            })}
            <li className="pt-4 pb-2">
              <ButtonLink href={reservationLink.href} size="lg" className="w-full" onClick={close}>
                {reservationLink.label}
              </ButtonLink>
            </li>
          </Container>
        </nav>
      </div>
    </header>
  );
}
