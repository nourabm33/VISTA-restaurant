import type { ReactNode } from "react";

interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  tone?: "light" | "dark";
  id?: string;
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "light",
  id,
  className = "",
}: SectionHeadingProps) {
  const alignment = align === "center" ? "text-center mx-auto" : "";
  const titleColor = tone === "dark" ? "text-ivory-50" : "text-charcoal-900";
  const descColor = tone === "dark" ? "text-ivory-200/80" : "text-charcoal-500";
  const eyebrowColor = tone === "dark" ? "text-bronze-300" : "";

  return (
    <div className={`max-w-2xl ${alignment} ${className}`}>
      {eyebrow ? <p className={`eyebrow mb-3 ${eyebrowColor}`}>{eyebrow}</p> : null}
      <h2 id={id} className={`display-serif text-3xl sm:text-4xl lg:text-5xl ${titleColor}`}>
        {title}
      </h2>
      {description ? (
        <p className={`mt-4 text-base leading-relaxed sm:text-lg ${descColor}`}>{description}</p>
      ) : null}
    </div>
  );
}
