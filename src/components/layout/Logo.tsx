import { restaurant } from "@/data/restaurant";

interface LogoProps {
  tone?: "light" | "dark";
}

export function Logo({ tone = "light" }: LogoProps) {
  const color = tone === "dark" ? "text-ivory-50" : "text-charcoal-900";
  return (
    <span className={`flex items-center gap-2.5 ${color}`}>
      <svg
        aria-hidden="true"
        viewBox="0 0 32 32"
        className="h-8 w-8"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <circle cx="16" cy="16" r="14.5" className="text-bronze-500" />
        <path d="M9 11l7 11 7-11" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span className="flex flex-col leading-none">
        <span className="display-serif text-2xl font-medium tracking-[0.12em]">
          {restaurant.shortName}
        </span>
        <span className="text-[9px] uppercase tracking-[0.28em] text-bronze-600">
          Cucina &amp; Cocktail
        </span>
      </span>
    </span>
  );
}
