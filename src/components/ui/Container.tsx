import type { ComponentProps, ElementType, ReactNode } from "react";

type ContainerProps<T extends ElementType> = {
  as?: T;
  className?: string;
  children: ReactNode;
} & Omit<ComponentProps<T>, "as" | "className" | "children">;

export function Container<T extends ElementType = "div">({
  as,
  className = "",
  children,
  ...rest
}: ContainerProps<T>) {
  const Tag = (as ?? "div") as ElementType;
  return (
    <Tag className={`mx-auto w-full max-w-6xl px-5 sm:px-8 ${className}`} {...rest}>
      {children}
    </Tag>
  );
}
