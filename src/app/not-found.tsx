import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <Container className="py-24 text-center sm:py-32">
      <p className="eyebrow">Errore 404</p>
      <h1 className="display-serif mt-3 text-4xl sm:text-5xl">Pagina non trovata</h1>
      <p className="mx-auto mt-4 max-w-md text-charcoal-500">
        Il piatto che cerchi non è in menu, o l&apos;indirizzo non è corretto.
      </p>
      <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <ButtonLink href="/menu" size="lg">
          Vai al menu
        </ButtonLink>
        <Link href="/" className="inline-flex min-h-12 items-center px-4 text-sm underline-offset-4 hover:underline">
          Torna alla home
        </Link>
      </div>
    </Container>
  );
}
