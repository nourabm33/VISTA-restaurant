import type { Metadata } from "next";
import { restaurant } from "@/data/restaurant";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { ReservationForm } from "@/components/reservation/ReservationForm";

export const metadata: Metadata = {
  title: "Prenota un Tavolo",
  description: `Prenota un tavolo da ${restaurant.shortName}: scegli data, ora e numero di persone. Ti confermiamo via email.`,
  alternates: { canonical: "/prenotazione" },
};

export default function ReservationPage() {
  return (
    <>
      <PageHeader
        eyebrow="Prenotazioni"
        title="Prenota un Tavolo"
        description="Compila il modulo: ti confermiamo la disponibilità il prima possibile. Per gruppi numerosi o eventi privati, contattaci direttamente."
      />
      <Container className="grid gap-12 py-12 lg:grid-cols-[1fr_360px] lg:gap-20 lg:py-20">
        <div className="min-w-0">
          <ReservationForm />
        </div>
        <aside className="space-y-8 lg:pt-2" aria-label="Informazioni utili">
          <div>
            <h2 className="eyebrow">Orari</h2>
            <ul className="mt-3 space-y-2 text-sm">
              {restaurant.openingHours.map((row) => (
                <li key={row.days} className="flex justify-between gap-4 border-b border-charcoal-900/8 pb-2">
                  <span className="text-charcoal-700">{row.days}</span>
                  <span className={row.closed ? "text-charcoal-400" : "text-charcoal-900"}>{row.hours}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="eyebrow">Contatti</h2>
            <address className="mt-3 space-y-1.5 text-sm not-italic text-charcoal-700">
              <p>
                {restaurant.address.street}, {restaurant.address.zip} {restaurant.address.city}
              </p>
              <p>
                <a href={`tel:${restaurant.phone.replace(/\s+/g, "")}`} className="hover:text-bronze-600">
                  {restaurant.phone}
                </a>
              </p>
              <p>
                <a href={`mailto:${restaurant.email}`} className="hover:text-bronze-600">
                  {restaurant.email}
                </a>
              </p>
            </address>
          </div>
          <div className="rounded-2xl bg-ivory-100 p-5 text-sm leading-relaxed text-charcoal-700">
            Il tavolo viene tenuto per 15 minuti oltre l&apos;orario prenotato. Per cancellazioni ti chiediamo di
            avvisarci con almeno 4 ore di anticipo.
          </div>
        </aside>
      </Container>
    </>
  );
}
