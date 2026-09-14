import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "light";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-wide transition-colors duration-200 select-none disabled:cursor-not-allowed disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary: "bg-bronze-500 text-ivory-50 hover:bg-bronze-600 active:bg-bronze-700",
  secondary:
    "border border-charcoal-900/25 text-charcoal-900 hover:border-charcoal-900 hover:bg-charcoal-900 hover:text-ivory-50",
  ghost: "text-charcoal-900 hover:text-bronze-600 underline-offset-4 hover:underline",
  light: "border border-ivory-50/40 text-ivory-50 hover:bg-ivory-50 hover:text-charcoal-900",
};

const sizes: Record<Size, string> = {
  md: "min-h-11 px-5 text-sm",
  lg: "min-h-12 px-7 text-[15px]",
};

interface StyleProps {
  variant?: Variant;
  size?: Size;
  className?: string;
}

export function buttonClasses({ variant = "primary", size = "md", className = "" }: StyleProps) {
  return `${base} ${variants[variant]} ${sizes[size]} ${className}`;
}

type ButtonLinkProps = StyleProps &
  Omit<ComponentProps<typeof Link>, "className"> & { children: ReactNode };

export function ButtonLink({ variant, size, className, children, ...rest }: ButtonLinkProps) {
  return (
    <Link className={buttonClasses({ variant, size, className })} {...rest}>
      {children}
    </Link>
  );
}

type ButtonProps = StyleProps & Omit<ComponentProps<"button">, "className">;

export function Button({ variant, size, className, type = "button", children, ...rest }: ButtonProps) {
  return (
    <button type={type} className={buttonClasses({ variant, size, className })} {...rest}>
      {children}
    </button>
  );
}
