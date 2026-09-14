import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";

interface PageHeaderProps {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
  tone?: "light" | "dark";
}

export function PageHeader({ eyebrow, title, description, children, tone = "light" }: PageHeaderProps) {
  const dark = tone === "dark";
  return (
    <section className={`${dark ? "bg-charcoal-950 text-ivory-50" : "bg-ivory-100 text-charcoal-900"} py-14 sm:py-20`}>
      <Container>
        {eyebrow ? <p className={`eyebrow ${dark ? "text-bronze-300" : ""}`}>{eyebrow}</p> : null}
        <h1 className="display-serif mt-3 text-4xl sm:text-5xl lg:text-6xl">{title}</h1>
        {description ? (
          <p className={`mt-4 max-w-2xl text-base leading-relaxed sm:text-lg ${dark ? "text-ivory-200/80" : "text-charcoal-500"}`}>
            {description}
          </p>
        ) : null}
        {children}
      </Container>
    </section>
  );
}
