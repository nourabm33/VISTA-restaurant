import { restaurant } from "@/data/restaurant";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

interface ReservationCtaProps {
  title?: string;
  description?: string;
}

export function ReservationCta({
  title = "Prenota il tuo tavolo",
  description = "Cena, aperitivo o un'occasione speciale: scegli data e ora, al resto pensiamo noi.",
}: ReservationCtaProps) {
  return (
    <section className="py-20 sm:py-28" aria-labelledby="reservation-cta-title">
      <Container>
        <div className="relative overflow-hidden rounded-3xl bg-charcoal-900 px-6 py-14 text-center text-ivory-50 sm:px-12 sm:py-20">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(198,156,109,0.25),transparent_55%)]"
          />
          <div className="relative mx-auto max-w-2xl">
            <p className="eyebrow text-bronze-300">Prenotazioni</p>
            <h2 id="reservation-cta-title" className="display-serif mt-3 text-4xl sm:text-5xl">
              {title}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ivory-200/80 sm:text-lg">{description}</p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <ButtonLink href="/prenotazione" size="lg">
                Prenota un Tavolo
              </ButtonLink>
              <a
                href={`tel:${restaurant.phone.replace(/\s+/g, "")}`}
                className="inline-flex min-h-12 items-center px-4 text-sm text-ivory-200 underline-offset-4 hover:underline"
              >
                oppure chiama {restaurant.phone}
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
