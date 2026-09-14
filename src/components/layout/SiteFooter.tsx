import Link from "next/link";
import { mainNav, reservationLink } from "@/data/navigation";
import { restaurant } from "@/data/restaurant";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/layout/Logo";

export function SiteFooter() {
  const { address } = restaurant;
  return (
    <footer className="bg-charcoal-950 text-ivory-200">
      <Container className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4 lg:py-20">
        <div className="sm:col-span-2 lg:col-span-1">
          <Logo tone="dark" />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-ivory-200/70">
            {restaurant.tagline}
          </p>
        </div>

        <div>
          <h2 className="eyebrow text-bronze-300">Dove siamo</h2>
          <address className="mt-4 text-sm leading-relaxed not-italic text-ivory-200/80">
            {address.street}
            <br />
            {address.zip} {address.city}, {address.country}
          </address>
          <ul className="mt-4 space-y-1.5 text-sm">
            <li>
              <a href={`tel:${restaurant.phone.replace(/\s+/g, "")}`} className="hover:text-bronze-300">
                {restaurant.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${restaurant.email}`} className="hover:text-bronze-300">
                {restaurant.email}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="eyebrow text-bronze-300">Orari</h2>
          <ul className="mt-4 space-y-2 text-sm text-ivory-200/80">
            {restaurant.openingHours.map((slot) => (
              <li key={slot.days} className="flex justify-between gap-4">
                <span>{slot.days}</span>
                <span className={slot.closed ? "text-ivory-200/50" : "text-ivory-50"}>{slot.hours}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="eyebrow text-bronze-300">Esplora</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {[...mainNav, reservationLink].map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-bronze-300">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <ul className="mt-6 flex gap-4 text-sm">
            {restaurant.social.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noreferrer" className="hover:text-bronze-300">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Container>
      <div className="border-t border-ivory-50/10">
        <Container className="flex flex-col gap-2 py-5 text-xs text-ivory-200/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {restaurant.name}. Sito dimostrativo.
          </p>
          <p>Fotografie a scopo illustrativo.</p>
        </Container>
      </div>
    </footer>
  );
}
