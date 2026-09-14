import type { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  tone?: "bronze" | "neutral" | "dark";
  className?: string;
}

const tones = {
  bronze: "bg-bronze-500/10 text-bronze-700 ring-bronze-500/30",
  neutral: "bg-ivory-200 text-charcoal-700 ring-charcoal-900/10",
  dark: "bg-charcoal-900/70 text-ivory-50 ring-ivory-50/20 backdrop-blur-sm",
};

export function Badge({ children, tone = "neutral", className = "" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-medium tracking-wide uppercase ring-1 ring-inset ${tones[tone]} ${className}`}
    >
      {children}
    </span>
  );
}
